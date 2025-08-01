import axios from "axios";
import ApiKeyContext from "../context/apiKey";
import { Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ActorSelectionContainer = ({
  selectedActor,
  actors,
  setStoreId,
  setSelectedActor,
}) => {
  console.log(selectedActor);

  const [loading, setLoading] = useState(false);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    selectedActor && fetchActorDetails();
  }, [selectedActor]);

  const fetchActorDetails = async (actorId) => {
    if (!actorId) return;
    setLoading(true);
    try {
      console.log(apiKey);
      console.log(actorId);

      const response = await axios.get(`${backendUrl}/api/schema`, {
        params: {
          apiKey: apiKey,
          actorId: actorId,
        },
      });

      const { data } = response.data;
      console.log(data);

      if (response.data.success) {
        setStoreId(data[data?.length - 1]?.defaultKeyValueStoreId);
      } else {
        throw new Error(data.error || "Failed to fetch schema");
      }
    } catch (err) {
      console.log(err);
      setSelectedActor("");
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white  shadow rounded-lg p-6 mb-6 border border-blue-300">
        <h2 className="text-xl font-semibold mb-4">2. Select Actor</h2>

        <div className="flex items-center justify-between max-sm:flex-col gap-3">
          <select
            value={selectedActor || ""}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedActor(e.target.value);
              fetchActorDetails(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-2 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an actor</option>
            {actors?.map((actor) => (
              <option key={actor?.id} value={actor?.id}>
                {actor?.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => fetchActorDetails(selectedActor)}
            disabled={!apiKey || loading}
            className="bg-blue-600 text-white border px-2 py-1 max-sm:w-full max-sm:rounded-lg cursor-pointer rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500  disabled:bg-gray-400"
          >
            {loading ? <Loader className="animate-spin" /> : "Get Actors"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorSelectionContainer;
