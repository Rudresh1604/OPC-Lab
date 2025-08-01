import ApiKeyContext from "../context/apiKey";
import SchemaDetails from "../components/Schemadetails";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useEffect, useState } from "react";

import ApiInputContainer from "../components/ApiInputContainer";
import ActorSelectionContainer from "../components/ActorSelectionContainer";
import DisplayResult from "../components/DisplayResult";

export default function Home2() {
  const [apiKey, setApiKey] = useState("");
  const [actors, setActors] = useState([]);

  const [selectedActor, setSelectedActor] = useState(null);

  const [storeId, setStoreId] = useState(null);
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const executeActor = async () => {
    setLoading(true);

    try {
      if (!formData) return;
      console.log("Actor", selectedActor);
      console.log(formData);

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
        toast("Actor Run successfully !");
      } else {
        throw new Error(data.error || "Failed to execute actor");
      }
    } catch (err) {
      console.log(err);

      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Apify Actor Runner
        </h1>
        <ToastContainer />
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
          <ApiInputContainer setActors={setActors} />
          {actors.length > 0 && (
            <ActorSelectionContainer
              actors={actors}
              setSelectedActor={setSelectedActor}
              selectedActor={selectedActor}
              setStoreId={setStoreId}
            />
          )}
          {storeId && (
            <SchemaDetails
              storeId={storeId}
              executeActor={executeActor}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {results && <DisplayResult results={results} />}
        </ApiKeyContext.Provider>
      </div>
    </div>
  );
}
