import React from "react";

const Description = ({ problem }) => {
  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg text-[var(--primary)] mb-2">Description</h3>
        <p className="text-sm text-[var(--primary)] ">{problem.description}</p>
      </div>
      <div className="mt-6 text-[var(--primary)]">
        <h3 className="text-lg text-[var(--primary)] mb-2">Example</h3>
        <div className="bg-[var(--secondary)]  rounded-sm p-2">
          <div className="mt-2">
            <p className="pl-2">Input</p>
            <div className="bg-[var(--card)] p-2 mt-2 rounded-sm text-sm">
              {problem.examples.JAVA.input}
            </div>
          </div>
          <div className="mt-2">
            <p className="pl-2">Output</p>
            <div className="bg-[var(--card)] p-2 mt-2 rounded-sm text-sm">
              {problem.examples.JAVA.output}
            </div>
          </div>
          <div className="mt-2">
            <p className="pl-2">Explanations</p>
            <div className="bg-[var(--card)] p-2 mt-2  rounded-sm text-sm">
              {problem.examples.JAVA.explanation}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-[var(--primary)]">
        <h3 className="text-lg text-[var(--primary)] mb-2">Constraints</h3>
        <div className="bg-[var(--card)] p-2 mt-2  rounded-sm text-sm">
          {problem.constraints}
        </div>
      </div>
    </>
  );
};

export default Description;
