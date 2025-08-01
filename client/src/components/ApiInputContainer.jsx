import axios from "axios";
import ApiKeyContext from "../context/apiKey";
import React, { useContext, useState } from "react";
import { Eye, EyeOffIcon, Loader } from "lucide-react";
import { toast } from "react-toastify";

const ApiInputContainer = ({ setActors }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passVisible, setPassVisible] = useState(false);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handlePasswordVisible = () => {
    setPassVisible(!passVisible);
    console.log(passVisible);
  };

  const authenticateActor = async () => {
    setLoading(true);

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
      console.log(err);
      toast(err.message);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white shadow rounded-lg border border-blue-300 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">1. Authenticate</h2>
      <div className="flex items-center max-sm:flex-col gap-3">
        <div className="flex items-center justify-between w-full border rounded-md border-gray-300">
          <input
            type={passVisible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Apify API key"
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="p-2 cursor-pointer" onClick={handlePasswordVisible}>
            {passVisible ? <EyeOffIcon /> : <Eye />}
          </span>
        </div>
        <button
          onClick={authenticateActor}
          disabled={!apiKey || loading}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-r-md max-sm:w-full max-sm:rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? <Loader className="animate-spin" /> : "Validate"}
        </button>
      </div>
    </div>
  );
};

export default ApiInputContainer;
