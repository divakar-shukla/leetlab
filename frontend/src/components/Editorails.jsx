const Editorails = ({ problem }) => {
  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg text-[var(--primary)] mb-2">Editorial</h3>
        <p className="text-sm text-[var(--primary)] ">{problem.editorial}</p>
      </div>
    </>
  );
};

export default Editorails;
