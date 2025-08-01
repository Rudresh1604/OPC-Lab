import SchemaDetails from "../components/Schemadetails";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [schema, setSchema] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchActors = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(apiKey);

      const response = await axios.post(
        `${backendUrl}/api/actors`,

        { apiKey: apiKey }
      );

      const data = response.data;

      console.log(data.data);

      if (response.data.success) {
        setActors(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch actors");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    storeId && fetchInputSchema();
  }, [storeId]);
  const fetchSchema = async (actorId) => {
    setLoading(true);
    setError(null);
    try {
      console.log(apiKey);
      console.log(actorId);

      const response = await axios.get(`${backendUrl}/api/schema`, {
        params: {
          apiKey: apiKey,
          actorId: actorId,
        },
      });
      console.log(response.data.success);

      const { data } = response.data;
      console.log(data);

      if (response.data.success) {
        setSchema(data);
        initializeFormData(data);
      } else {
        throw new Error(data.error || "Failed to fetch schema");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const initializeFormData = (schema) => {
    const initialData = {};
    if (schema.schema.properties) {
      Object.keys(schema.schema.properties).forEach((key) => {
        initialData[key] = schema.schema.properties[key].default || "";
      });
    }
    setFormData(initialData);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };

  const fetchInputSchema = async () => {
    try {
      if (!storeId) return;
      console.log(storeId);

      const response = await axios.post(`${backendUrl}/api/input-schema`, {
        apiKey: apiKey,
        storeId: storeId,
      });
      console.log(response);
      setFormData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const executeActor = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(selectedActor);

      const response = await axios.post(`${backendUrl}/api/run`, {
        apiKey: apiKey,
        actorId: selectedActor,
        input: formData,
      });
      console.log(response.data);
      const data = response.data;
      if (response.data.success) {
        console.log(data?.data);

        setResults(data?.data);
      } else {
        throw new Error(data.error || "Failed to execute actor");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Apify Actor Runner
        </h1>

        {/* API Key Input */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Authenticate</h2>
          <div className="flex">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Apify API key"
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchActors}
              disabled={!apiKey || loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {loading ? <Loader className="animate-spin" /> : "Get Actors"}
            </button>
          </div>
        </div>

        {/* Actor Selection */}
        {actors.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">2. Select Actor</h2>
            <select
              value={selectedActor || ""}
              onChange={(e) => {
                console.log(e.target.value);

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
        )}

        {/* Actor Input Form */}
        {schema && (
          <SchemaDetails
            actorDetails={schema}
            setStoreId={setStoreId}
            storeId={storeId}
            formData={formData}
            setFormData={setFormData}
          />
        )}
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
            <button
              onClick={() => {
                executeActor();
              }}
            >
              Click
            </button>
          </div>
        )}
        {/* Results Display */}
        {results && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Execution Results</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
