import asyncHandler from "../utills/async-handler.js";
import ApiError from "../utills/api-error.js";
import db from "../lib/db.js";
import ApiResponse from "../utills/api-response.js";
import {
  getJudgeLanguageName,
  pollBatchResult,
  submitBatch,
} from "../lib/judge0.lib.js";

const submitCode = asyncHandler(async (req, res) => {
  const { source_code, stdin, expected_output, language_id, problemId } =
    req.body;

  const userId = req.user.id;
  const submission = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));

  const tokens = await submitBatch(submission);
  const results = await pollBatchResult(tokens);

  let IsPassedAllTestcases = true;
  const detailedResult = results.map((result, index) => {
    const stdout = result?.stdout.trim();
    const expectedOutput = expected_output[index];
    const passed = stdout == expectedOutput;
    if (!passed) IsPassedAllTestcases = false;
    return {
      teestcase: index + 1,
      passed,
      stdout,
      expected: expected_output,
      sdterr: result.sdterr,
      compileOutput: result.compile_output,
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });

  const newSubmission = await db.submission.create({
    data: {
      userId: userId,
      problemId: problemId,
      sourceCode: source_code,
      language: getJudgeLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailedResult.map((output) => output.stdout)),
      stderr: detailedResult.some((r) => r.stderr)
        ? JSON.stringify(detailedResult.map((r) => r.stderr))
        : null,
      compileOutput: detailedResult.some((r) => r.compile_output)
        ? JSON.stringify(detailedResult.map((r) => r.compile_output))
        : null,
      status: IsPassedAllTestcases ? "Accepted" : "Wrong Answer",
      memory: detailedResult.some((r) => r.memory)
        ? JSON.stringify(detailedResult.map((r) => r.memory))
        : null,
      time: detailedResult.some((r) => r.time)
        ? JSON.stringify(detailedResult.map((r) => r.time))
        : null,
    },
  });

  if (IsPassedAllTestcases) {
    await db.problemSolved.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }

  const testcasesData = detailedResult.map((result) => ({
    submissionId: newSubmission.id,
    testCase: result.teestcase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected.join("\n"),
    stderr: result.sdterr || null,
    compileOutput: results.compileOutput || null,
    status: result.status || null,
    time: result.time || null,
  }));

  await db.TestCaseResult.createMany({
    data: testcasesData,
  });

  const submissionWithTestcases = await db.submission.findUnique({
    where: {
      id: newSubmission.id,
    },
    include: {
      testCases: true,
    },
  });
  console.log(detailedResult);

  return res
    .status(200)
    .json(
      new ApiResponse(200, submissionWithTestcases, "Code run successfully"),
    );
});
const executeCode = asyncHandler(async (req, res) => {
  const { source_code, stdin, expected_output, language_id, problemId } =
    req.body;

  const userId = req.user.id;
});
export { submitCode, executeCode };
