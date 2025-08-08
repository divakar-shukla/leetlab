import React, { use, useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Copy,
  BookmarkCheck,
  RotateCcw,
  SquareCode,
  Send,
  Play,
  CircleCheckBig,
  NotebookText,
  House,
  Loader,
} from "lucide-react";
import Select from "react-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProblemStore from "@/store/useProblemStore";
import Editor from "@monaco-editor/react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Description from "@/components/Description";
import Editorails from "@/components/Editorails";
import Hints from "@/components/Hints";
import { SUPPORT_LANGUAGE } from "@/utills/constants";

const languageOption = SUPPORT_LANGUAGE.reduce(
  (languagess, currentLanguage) => {
    console.log(languagess);
    languagess.push({
      value: currentLanguage,
      label:
        currentLanguage[0].toUpperCase() +
        currentLanguage.slice(1).toLowerCase(),
    });
    return languagess;
  },
  [],
);
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--background)",
    borderColor: state.isFocused ? "var(--primary)" : "#333",
    color: "var(--detail-font-color)",
    boxShadow: "none",
    borderRadius: "5px",
    padding: "2px",
    "&:hover": {
      borderColor: "#333",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--primary)"
      : state.isFocused
      ? "#333"
      : "var(--background)",
    color: state.isSelected ? "#000" : "#fff",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    borderRadius: "8px",
    marginTop: "4px",
    zIndex: 10,
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--detail-font-color)",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "var(--foreground)",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--detail-font-color)",
    fontSize: "0.85rem",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--primary)",
    ":hover": {
      backgroundColor: "var(--primary)",
      color: "#000",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888",
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
};

export function WorkSpace() {
  const [isActiveProblemNav, setIsActiveProblemNav] = useState("Description");
  const [isActiveResultNav, setIsActiveResultNav] = useState("testcase");
  const [copyIcon, setCopyIcon] = useState("text-[var(--primary)]");
  const [savingIcon, setSavingIcon] = useState("text-[var(--primary)]");
  const [resetIcon, setResetIcon] = useState("text-[var(--primary)]");
  const problem = useProblemStore((state) => state.problem);
  const getingProblem = useProblemStore((state) => state.getingProblem); // fixed name
  const getProblemById = useProblemStore((state) => state.getProblemById); // added line
  const [starterCode, setStarterCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");

  const { id } = useParams();
  useEffect(() => {
    getProblemById(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setStarterCode(problem.codeSnippets[selectedLanguage]);
    }
  }, [problem]);

  const resetStarterCode = () => {
    setStarterCode(problem.codeSnippets[selectedLanguage]);
  };

  if (getingProblem) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Problem not found
      </div>
    );
  }

  return (
    <div className="p-4  w-full">
      {/* {console.log(problem)} */}
      <div className="flex justify-between mb-4 border-b bg-[var(--card)] px-4 py-2 rounded">
        <div className="flex justify-between items-center  rounded md:flex-row flex-col gap-3">
          <div className="flex items-center ">
            <div>
              <Link to="/">
                {" "}
                <House size={25} className="text-[var(--foreground)]" />
              </Link>
            </div>
            <div className="w-0.5 h-7 m-2 bg-[var(--primary)]"></div>
            <h2 className="md:text-2xl text-lg  text-[var(--foreground)] ">
              Problem
            </h2>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div
            className="bg-[var(--background)] p-2 rounded cursor-pointer"
            onMouseDown={() => setCopyIcon("text-[var(--detail-font-color)]")}
            onMouseUp={() => setCopyIcon("text-[var(--primary)]")}
            onMouseLeave={() => setCopyIcon("text-[var(--primary)]")}
            onClick={() => navigator.clipboard.writeText(starterCode)}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Copy size={18} className={copyIcon} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Code</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div
            className="bg-[var(--background)] p-2 rounded cursor-pointer "
            onMouseDown={() => setSavingIcon("text-[var(--detail-font-color)]")}
            onMouseUp={() => setSavingIcon("text-[var(--primary)]")}
            onMouseLeave={() => setSavingIcon("text-[var(--primary)]")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <BookmarkCheck size={18} className={savingIcon} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Save in Playlist</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div
            className="bg-[var(--background)] p-2 rounded cursor-pointer"
            onMouseDown={() => setResetIcon("text-[var(--detail-font-color)]")}
            onMouseUp={() => setResetIcon("text-[var(--primary)]")}
            onMouseLeave={() => setResetIcon("text-[var(--primary)]")}
            onClick={() => resetStarterCode()}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <RotateCcw size={18} className={resetIcon} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="min-w-[150px]">
            <Select
              className="basic-single bg-(var(--card))"
              classNamePrefix="select"
              styles={customStyles}
              defaultValue={languageOption[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name="language"
              options={languageOption}
              onChange={(selectedOption) => {
                console.log(selectedLanguage);
                setSelectedLanguage(selectedOption.value);
              }}
            />
          </div>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded border md:min-w-[80%]"
      >
        <ResizablePanel defaultSize={45}>
          <div className="flex items-start flex-col">
            <div className="flex justify-around px-3 py-3 border-b-2 w-full gap-3 h-14">
              <div
                className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${
                  isActiveProblemNav == "Description"
                    ? "border-[var(--foreground)]"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setIsActiveProblemNav("Description");
                }}
              >
                Description
              </div>
              <div
                className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${
                  isActiveProblemNav == "Submission"
                    ? "border-[var(--foreground)]"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setIsActiveProblemNav("Submission");
                }}
              >
                Submission
              </div>
              <div
                className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${
                  isActiveProblemNav == "Editorials"
                    ? "border-[var(--foreground)]"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setIsActiveProblemNav("Editorials");
                }}
              >
                Editorials
              </div>
              <div
                className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${
                  isActiveProblemNav == "Hints"
                    ? "border-[var(--foreground)]"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setIsActiveProblemNav("Hints");
                }}
              >
                Hints & Tags
              </div>
            </div>
            <div
              className="h-[800px] overflow-y-auto w-full"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="h-[900px] w-full px-4">
                <div className="border-b">
                  <h3 className="text-xl text-[var(--primary)] pt-4 ">
                    {problem.title}
                  </h3>
                  <div className="flex gap-2 mb-2 mt-2">
                    <div className="flex justify-between">
                      <Badge className="bg-[var(--detail-font-color)] ">
                        {problem.tags[0]}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <Badge className="bg-[var(--detail-font-color)] ">
                        {problem.tags[1]}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <Badge className="bg-[var(--detail-font-color)] ">
                        {problem.tags[2]}
                      </Badge>
                    </div>
                    {problem.tags.length > 3 ? (
                      <div className="flex justify-between">
                        <Badge className="bg-[var(--detail-font-color)] ">
                          +{problem.tags.length - 3}
                        </Badge>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {isActiveProblemNav == "Description" ? (
                  <Description problem={problem} />
                ) : (
                  ""
                )}
                {isActiveProblemNav == "Editorials" ? (
                  <Editorails problem={problem} />
                ) : (
                  ""
                )}
                {isActiveProblemNav == "Hints" ? (
                  <Hints problem={problem} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-start flex-col">
                <div className="flex justify-between px-3 py-3 border-b-2 w-full gap-3 h-14">
                  <div className="flex gap-1 items-center">
                    <SquareCode className="size-7 mr-3 " />
                    <div className="text-sm text-[var(--primary)]">
                      Code Editer
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-[var(--primary)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
                      <Play className="mr-2 size-4 " />
                      Run
                    </button>
                    <button className="bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer">
                      <Send className="mr-2 size-4" />
                      Submit
                    </button>
                  </div>
                </div>
                <div
                  className="min-h-[800px] overflow-y-auto w-full"
                  style={{ scrollbarWidth: "none" }}
                >
                  <Editor
                    height="100%"
                    language={"javascript"}
                    theme="vs-dark"
                    value={starterCode || ""}
                    onChange={(value) => {
                      setStarterCode(value || "");
                      console.log(starterCode);
                    }}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      scrollBeyondLastLine: true,
                      readOnly: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex flex-col h-full w-full">
                <div className="flex gap-6 p-3 border-b">
                  <div
                    className={`text-sm px-2 py-1 border-b-2 cursor-pointer flex items-center gap-2 ${
                      isActiveResultNav == "testcase"
                        ? "border-[var(--foreground)] text-[var(--foreground)]"
                        : "border-transparent text-[var(--primary)]"
                    }`}
                    onClick={() => {
                      setIsActiveResultNav("testcase");
                    }}
                  >
                    <CircleCheckBig
                      className={`${
                        isActiveResultNav == "testcase"
                          ? "text-[var(--foreground)]"
                          : "text-[var(--primary)]"
                      } `}
                      size="15"
                    />
                    Test Case
                  </div>
                  <div
                    className={`text-sm px-2 py-1 border-b-2 cursor-pointer flex items-center gap-2 ${
                      isActiveResultNav == "result"
                        ? "border-[var(--foreground)] text-[var(--foreground)]"
                        : "border-transparent text-[var(--primary)]"
                    }`}
                    onClick={() => {
                      setIsActiveResultNav("result");
                    }}
                  >
                    <NotebookText
                      className={`${
                        isActiveResultNav == "result"
                          ? "text-[var(--foreground)]"
                          : "text-[var(--primary)]"
                      } `}
                      size="15"
                    />
                    Result
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default WorkSpace;
