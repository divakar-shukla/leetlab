import React from "react";
import { Badge } from "@/components/ui/badge";

const Hints = ({ problem }) => {
  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg text-[var(--primary)] mb-2">Hints</h3>
        <p className="text-sm text-[var(--primary)] ">{problem.hints}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-[var(--primary)] mb-2">Tags</h3>
        <div className="flex gap-2 mb-2 mt-2">
          {problem.tags.map((tag) => (
            <div key={tag}>
              <div className="flex justify-between">
                <Badge className="bg-[var(--detail-font-color)] ">{tag}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hints;
