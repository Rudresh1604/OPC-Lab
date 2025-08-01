import React from "react";

const ActorSelectionContainer = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">2. Select Actor</h2>
      <select
        value={selectedActor || ""}
        onChange={(e) => {
          setSelectedActor(e.target.value);
          fetchSchema(e.target.value);
        }}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select an actor</option>
        {actors.map((actor) => (
          <option key={actor.id} value={actor.id}>
            {actor.name}
          </option>
        ))}
      </select>
      <div className="flex">
        <input
          type="password"
          value={apiKey}
          // onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your input schema"
          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchSchema(selectedActor)}
          disabled={!apiKey || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? <Loader className="animate-spin" /> : "Get Actors"}
        </button>
      </div>
    </div>
  );
};

export default ActorSelectionContainer;
