import axios from "axios";
import ApiKeyContext from "../context/apiKey";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SchemaDetails = ({ storeId, executeActor, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);

  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formData[name] = value;
  };
  const fetchInputSchema = async () => {
    try {
      if (!storeId) return;
      console.log(storeId);

      const response = await axios.post(`${backendUrl}/api/input-schema`, {
        apiKey: apiKey,
        storeId: storeId,
      });
      console.log(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    storeId && fetchInputSchema();
  }, [storeId]);
  return (
    <div className="bg-white shadow border border-blue-300 rounded-lg p-6 mb-6">
      {/* Input Form from Schema */}
      {formData && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            3. Provide Inputs
          </h2>
          <div className="space-y-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                <input
                  type={typeof value === "number" ? "number" : "text"}
                  name={key}
                  defaultValue={value}
                  onChange={handleInputChange}
                  placeholder="Enter value"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Value type: {typeof value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={executeActor}
        disabled={loading}
        className="mt-4 bg-green-600 cursor-pointer max-sm:w-full text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
      >
        {loading ? "Running..." : "Execute Actor"}
      </button>
    </div>
  );
};

export default SchemaDetails;
