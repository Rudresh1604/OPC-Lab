import React, { useEffect, useState } from "react";

const SchemaDetails = ({
  actorDetails = {},
  storeId,
  setStoreId,
  schema = {},
  loading,
  executeActor,
}) => {
  const formData = {};
  // const [storeId, setStoreId] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formData[name] = value;
  };
  useEffect(() => {
    actorDetails.length > 0 &&
      setStoreId(actorDetails[actorDetails.length - 1]?.defaultKeyValueStoreId);
    console.log(storeId);
  }, [actorDetails]);
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {actorDetails.title || "Actor Details"}
      </h1>

      {/* Basic Info */}
      <div className="space-y-2 mb-6">
        <p>
          <span className="font-medium">ID:</span> {actorDetails.id}
        </p>
        <p>
          <span className="font-medium">Name:</span> {actorDetails.name}
        </p>
        <p>
          <span className="font-medium">Username:</span> {actorDetails.username}
        </p>
        <p>
          <span className="font-medium">Description:</span>{" "}
          {actorDetails.description}
        </p>
        <p>
          <span className="font-medium">Public:</span>{" "}
          {actorDetails.isPublic ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(actorDetails.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Last Modified:</span>{" "}
          {new Date(actorDetails.modifiedAt).toLocaleString()}
        </p>
      </div>

      {/* Run Stats */}
      {actorDetails.stats && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Usage Stats
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Total Runs: {actorDetails.stats.totalRuns}</li>
            <li>Total Users: {actorDetails.stats.totalUsers}</li>
            <li>
              Last Run:{" "}
              {new Date(actorDetails.stats.lastRunStartedAt).toLocaleString()}
            </li>
            {actorDetails.stats.publicActorRunStats30Days && (
              <>
                <li>
                  Success (30d):{" "}
                  {actorDetails.stats.publicActorRunStats30Days.SUCCEEDED}
                </li>
                <li>
                  Failures (30d):{" "}
                  {actorDetails.stats.publicActorRunStats30Days.FAILED}
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Pricing Info */}
      {actorDetails.pricingInfos?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pricing</h2>
          <ul className="space-y-2 text-gray-600">
            {actorDetails.pricingInfos.map((info, i) => (
              <li key={i} className="border p-2 rounded-md bg-gray-50">
                <p>
                  <span className="font-medium">Price:</span> $
                  {info.pricePerUnitUsd} per {info.unitName}
                </p>
                {info.reasonForChange && (
                  <p className="text-sm italic text-gray-500 mt-1">
                    {info.reasonForChange}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Run Options */}
      {actorDetails.defaultRunOptions && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Default Run Options
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Memory:</span>{" "}
            {actorDetails.defaultRunOptions.memoryMbytes} MB
            <br />
            <span className="font-medium">Timeout:</span>{" "}
            {actorDetails.defaultRunOptions.timeoutSecs
              ? `${actorDetails.defaultRunOptions.timeoutSecs / 60} min`
              : "Unlimited"}
          </p>
        </div>
      )}

      {/* Input Form from Schema */}
      {schema && Object.keys(schema).length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            3. Provide Inputs
          </h2>
          <div className="space-y-4">
            {Object.entries(schema).map(([key, prop]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                <input
                  type={prop?.type === "integer" ? "number" : "text"}
                  name={key}
                  onChange={handleInputChange}
                  placeholder={prop?.description || "Enter value"}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {prop?.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {prop.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={executeActor}
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
      >
        {loading ? "Running..." : "Execute Actor"}
      </button>
    </div>
  );
};

export default SchemaDetails;
