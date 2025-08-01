import React from "react";

const DisplayResult = ({ results }) => {
  return (
    <div className="bg-white shadow border border-blue-300 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Execution Results</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
};

export default DisplayResult;
