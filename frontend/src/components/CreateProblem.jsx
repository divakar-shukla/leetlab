import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { addProblem } from "@/zodSchema/problem.schema";
import { Link } from "react-router-dom";
import {
  BookOpen,
  RotateCw,
  Plus,
  Trash2,
  CheckCircle2,
  Code2,
  ChevronRight,
  Lightbulb,
  LoaderCircle,
  House,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORT_LANGUAGE } from "../utills/constants";
import Editor from "@monaco-editor/react";
import problemService from "@/lib/problemService";
import toast from "react-hot-toast";

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};
const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
          * @param {number} n
          * @return {number}
          */
          function climbStairs(n) {
          // Write your code here
          }          

          // Parse input and execute
          const readline = require('readline');
          const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: false
          });          

          rl.on('line', (line) => {
          const n = parseInt(line.trim());
          const result = climbStairs(n);          

          console.log(result);
          rl.close();
          });`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Base cases
        if n <= 2:
            return n

        # DP approach
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b


# Input parsing
if __name__ == "__main__":
    import sys

    # Parse input
    n = int(sys.stdin.readline().strip())

    # Solve
    sol = Solution()
    result = sol.climbStairs(n)

    # Print result
    print(result)
`,
    JAVA: `import java.util.Scanner;          

          class Main {
            public int climbStairs(int n) {
                // Write your code here
                return 0;
            }
            
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                int n = Integer.parseInt(scanner.nextLine().trim());
                
                // Use Main class instead of Solution
                Main main = new Main();
                int result = main.climbStairs(n);
                
                System.out.println(result);
                scanner.close();
            }
          }`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
          * @param {number} n
          * @return {number}
          */
          function climbStairs(n) {
          // Base cases
          if (n <= 2) {
            return n;
          }          

          // Dynamic programming approach
          let dp = new Array(n + 1);
          dp[1] = 1;
          dp[2] = 2;          

          for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
          }          

          return dp[n];          

          /* Alternative approach with O(1) space
          let a = 1; // ways to climb 1 step
          let b = 2; // ways to climb 2 steps          

          for (let i = 3; i <= n; i++) {
            let temp = a + b;
            a = b;
            b = temp;
          }          

          return n === 1 ? a : b;
          */
          }          

          // Parse input and execute
          const readline = require('readline');
          const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          terminal: false
          });          

          rl.on('line', (line) => {
          const n = parseInt(line.trim());
          const result = climbStairs(n);          

          console.log(result);
          rl.close();
          });`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Base cases
        if n <= 2:
            return n

        # Dynamic programming approach
        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2

        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[n]

        # Alternative approach with O(1) space
        # a, b = 1, 2
        # for i in range(3, n + 1):
        #     a, b = b, a + b
        # return a if n == 1 else b


# Input parsing
if __name__ == "__main__":
    import sys

    # Parse input
    n = int(sys.stdin.readline().strip())

    # Solve
    sol = Solution()
    result = sol.climbStairs(n)

    # Print result
    print(result)
`,
    JAVA: `import java.util.Scanner;          

          class Main {
            public int climbStairs(int n) {
                // Base cases
                if (n <= 2) {
                    return n;
                }
                
                // Dynamic programming approach
                int[] dp = new int[n + 1];
                dp[1] = 1;
                dp[2] = 2;
                
                for (int i = 3; i <= n; i++) {
                    dp[i] = dp[i - 1] + dp[i - 2];
                }
                
                return dp[n];
                
                /* Alternative approach with O(1) space
                int a = 1; // ways to climb 1 step
                int b = 2; // ways to climb 2 steps
                
                for (int i = 3; i <= n; i++) {
                    int temp = a + b;
                    a = b;
                    b = temp;
                }
                
                return n == 1 ? a : b;
                */
            }
            
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);
                int n = Integer.parseInt(scanner.nextLine().trim());
                
                // Use Main class instead of Solution
                Main main = new Main();
                int result = main.climbStairs(n);
                
                System.out.println(result);
                scanner.close();
            }
          }`,
  },
};

const CreateProblem = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [sampleDataType, setSampleDataType] = useState("DP");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProblem),
    defaultValues: {
      difficulty: "",
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    fields: testcasesFields,
    append: appendTestcases,
    remove: removeTestcases,
    replace: replaceTestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: repalceTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const { addProblemQuery } = problemService;

  const onSubmit = async (value) => {
    try {
      setIsLoading(true);
      console.log();
      const response = await addProblemQuery(value);
      toast.success(response.message);
      setIsLoading(true);
      reset({
        title: "",
        difficulty: "",
        tags: [""],
        testcases: [{ input: "", output: "" }],
        examples: {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippets: {
          JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
          PYTHON: "def solution():\n    # Write your code here\n    pass",
          JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        },
        referenceSolutions: {
          JAVASCRIPT: "// Add your reference solution here",
          PYTHON: "# Add your reference solution here",
          JAVA: "// Add your reference solution here",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    console.log(sampleDataType);
    const sampleData =
      sampleDataType == "DP" ? sampledpData : sampleStringProblem;
    repalceTag(sampleDataType.tags);
    replaceTestcases(sampleDataType.testcases);
    reset(sampleData);
  };
  useEffect(() => {
    if (tagFields.length === 0) {
      appendTag("");
    }
  }, []);
  return (
    <div className="mx-auto py-8 px-4 w-full text-[var(--primary)]">
      <div className="flex justify-between items-center mb-8 border-b bg-[var(--card)] px-4 py-2 rounded md:flex-row flex-col gap-3">
        <div className="flex items-center ">
          <div>
            <Link to="/">
              {" "}
              <House size={25} className="text-[var(--foreground)]" />
            </Link>
          </div>
          <div className="w-0.5 h-7 m-2 bg-[var(--primary)]"></div>
          <h2 className="md:text-2xl text-lg  text-[var(--foreground)] ">
            Create Problem
          </h2>
        </div>
        <div className="flex gap-2 items-start md:items-end md:flex-row flex-col ">
          <div className="flex gap-2">
            <button
              className={` py-2 px-3 text-sm rounded flex items-center cursor-pointer ${
                sampleDataType === "DP"
                  ? "bg-[var(--primary)] text-[var(--background)]"
                  : "bg-[var(--background)] text-[var(--primary)]"
              }`}
              onClick={() => setSampleDataType("DP")}
            >
              DP Problem
            </button>
            <button
              className={` py-2 px-3 text-sm rounded flex items-center cursor-pointer ${
                sampleDataType !== "DP"
                  ? "bg-[var(--primary)] text-[var(--background)]"
                  : "bg-[var(--background)] text-[var(--primary)]"
              }`}
              onClick={() => setSampleDataType("String")}
            >
              String Problem
            </button>
          </div>
          <div className="md:w-auto w-full flex justify-center">
            <button
              className="bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer"
              onClick={() => loadSampleData()}
            >
              <RotateCw size={20} className="mr-2" />
              Load problem
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[var(--card)] p-4 flex flex-col md:flex-row md:gap-4">
          <div className="w-full">
            <div className="mb-6">
              <div>
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Enter your problem's title"
                  className={
                    " w-full bg-transparent p-2 placeholder:capitalize rounded-lg border focus:outline-1 focus:outline-[var(--foreground)]  placeholder:text-[var(--detail-font-color)] text-sm"
                  }
                />
              </div>
              {errors.title && (
                <p className="text-xs text-red-600 mt-2 ml-2">
                  {errors.title.message}
                  {console.log(errors)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <div>
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Difficulty
                </label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full focus:outline-1 focus:outline-[var(--foreground)]">
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.difficulty && (
                <p className="text-xs text-red-600 mt-2 ml-2">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full mb-6">
            <div className="h-[90%]">
              <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                Description
              </label>
              <Textarea
                {...register("description")}
                placeholder="Enter You Problem Description"
                className={"h-full"}
              />
            </div>
            {errors.description && (
              <p className="text-xs text-red-600 mt-2 ml-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between ">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <BookOpen className="size-7" />
              Tags
            </h3>
            <button
              type="button"
              className="bg-[var(--primary)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer"
              onClick={() => appendTag("")}
            >
              <Plus size={20} className="mr-2" />
              Add Tags
            </button>
          </div>
          <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
          <div className="min-h-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-[var(--background)] p-4 rounded">
            {tagFields.map((fields, index) => (
              <div key={fields.id} className="flex gap-2 items-center">
                <div>
                  <input
                    {...register(`tags.${index}`)}
                    type="text"
                    placeholder="Enter tags"
                    className={
                      "mb-6 w-full bg-transparent p-2 placeholder:capitalize rounded-lg border focus:outline-1 focus:outline-[var(--foreground)]  placeholder:text-[var(--detail-font-color)] text-sm "
                    }
                  />
                </div>

                <button
                  className=""
                  onClick={() => removeTag(index)}
                  disabled={tagFields.length === 1}
                >
                  {" "}
                  <Trash2 className="size-5 mb-6 text-red-600" />
                </button>
              </div>
            ))}

            {errors.tags && (
              <div className="text-xs text-red-600 mt-2 ml-2">
                {errors.tags?.root.message}
                {console.log(errors)}
              </div>
            )}
          </div>
          {errors.tags && (
            <div className="mt-2 ml-2">
              <span className="text-error text-xs text-red-600">
                {errors.tags.message}
              </span>
            </div>
          )}
        </div>
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <CheckCircle2 className="size-7" />
              Test Cases
            </h3>
            <button
              type="button"
              className="bg-[var(--primary)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer"
              onClick={() => appendTestcases("")}
            >
              <Plus size={20} className="mr-2" />
              Add Test Cases
            </button>
          </div>
          <div className="w-full border border-[var(--sidebar-border)] mt-5 mb-5 h-[1px]"></div>
          {testcasesFields.map((fields, index) => (
            <div
              key={fields.id}
              className=" bg-[var(--background)] p-4 rounded mt-3"
            >
              <div className="flex justify-between items-center ">
                <h4 className="text-[var(--primary)]">
                  Test Case #{index + 1}
                </h4>
                <button
                  className="bg-[var(--background)] text-[var(--primary)] py-2 px-4 text-sm rounded flex items-center cursor-pointer"
                  onClick={() => removeTestcases(index)}
                  disabled={testcasesFields.length === 1}
                >
                  <Trash2 className="size-5  text-red-600" />
                </button>
              </div>
              <div className="min-h-20 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className=" ">
                  <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                    Input
                  </label>
                  <Textarea
                    {...register(`testcases.${index}.input`)}
                    placeholder="Enter Your Test Case Input"
                    className={""}
                  />
                  {errors.testcases?.[index]?.input && (
                    <p className="text-xs text-red-600 mt-1 ml-1 ">
                      {errors.testcases[index].input.message}
                    </p>
                  )}
                </div>
                <div className=" ">
                  <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                    Output
                  </label>
                  <Textarea
                    {...register(`testcases.${index}.output`)}
                    placeholder="Enter Expected Output"
                    className={""}
                  />
                  {errors.testcases?.[index]?.output && (
                    <p className="text-xs text-red-600 mt-1 ml-1">
                      {errors.testcases[index].output.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {SUPPORT_LANGUAGE.map((language, index) => (
          <div key={language}>
            <div className="bg-[var(--card)] p-4 mt-6">
              <div className="w-full flex justify-between">
                <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
                  <Code2 className="size-7" />
                  {language}
                </h3>
              </div>
              <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Starter Code Template</h4>
                <div className="border rounded-md overflow-hidden mt-2 bg-[var(--card)] p-2">
                  <Controller
                    name={`codeSnippets.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="300px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: true,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          accessibilitySupport: "off",
                        }}
                      />
                    )}
                  />
                </div>
                {errors.codeSnippets?.[language] && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.codeSnippets[language].message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Reference Solution</h4>
                <div className="border rounded-md overflow-hidden mt-2 bg-[var(--card)] p-2">
                  <Controller
                    name={`referenceSolutions.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="300px"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: true,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                </div>
                {errors.referenceSolutions?.[language] && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.referenceSolutions[language].message}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 bg-[var(--background)] p-4">
                <h4 className="text-[var(--primary)]">Example</h4>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Input
                    </label>
                    <Textarea
                      {...register(`examples.${language}.input`)}
                      placeholder="Enter Your Example Input"
                      className={""}
                    />
                    {errors.examples?.[language]?.input && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].input.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Output
                    </label>
                    <Textarea
                      {...register(`examples.${language}.output`)}
                      placeholder="Enter Your Example Output"
                      className={""}
                    />
                    {errors.examples?.[language]?.output && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].output.message}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 col-span-1">
                    <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                      Explanation
                    </label>
                    <Textarea
                      {...register(`examples.${language}.explanation`)}
                      placeholder="Enter Your Explanation of Example"
                      className={""}
                    />
                    {errors.examples?.[language]?.explanation && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          {errors.examples?.[language].explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-[var(--card)] p-4 mt-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-[var(--primary)] flex items-center gap-2">
              <Lightbulb className="size-7" /> Additional Information
            </h3>
          </div>
          <div className="w-full border  mt-5 mb-5 h-[1px]"></div>
          <div className="bg-[var(--background)] p-4 rounded mt-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Constraints
                </label>
                <Textarea
                  {...register("constraints")}
                  placeholder="Enter Problem Constraints"
                  className={""}
                />
                {errors.constraints && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.constraints?.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Hints
                </label>
                <Textarea
                  {...register("hints")}
                  placeholder="Enter Hints(Optional)"
                  className={""}
                />
                {errors.hints && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.hints?.message}
                    </span>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 col-span-1">
                <label className="text-sm ml-2 text-[var(--detail-font-color)]">
                  Editorial
                </label>
                <Textarea
                  {...register("editorial")}
                  placeholder="Enter Editorial(Optional)"
                  className={""}
                />
                {errors.editorial && (
                  <div className="mt-2">
                    <span className="text-xs text-red-600">
                      {errors.editorial?.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className={` text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer ${
              isLoading
                ? "bg-[var(--muted-foreground)]"
                : "bg-[var(--foreground)]"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="size-5 animate-spin mr-2" />
            ) : (
              <ChevronRight size={20} className="mr-2" />
            )}
            Create Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProblem;
