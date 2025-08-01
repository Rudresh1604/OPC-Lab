const { default: axios } = require("axios");

const schemaController = async (req, res) => {
  const { apiKey, actorId } = req.query;

  try {
    console.log(actorId);

    const response = await axios.get(
      // `https://api.apify.com/v2/acts/${actorId}/`,
      `https://api.apify.com/v2/acts/${actorId}/runs`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log(response.data?.data?.items);

    res.status(200).send({ success: true, data: response.data?.data?.items });
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({
      error: "Failed to fetch actors",
      details: error.response?.data || error.message,
    });
  }
};

const actorController = async (req, res) => {
  const { apiKey } = req.body;
  try {
    const response = await axios.get(`https://api.apify.com/v2/acts`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const items = response.data?.data?.items;

    res.status(200).send({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({
      error: "Failed to fetch actors",
      details: error.response?.data || error.message,
    });
  }
};
const runController = async (req, res) => {
  const { apiKey, actorId, input } = req.body;
  // console.log(input);

  try {
    const response = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/runs`,
      input,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    const items = response.data?.data;

    res.status(200).send({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({
      error: "Failed to fetch actors",
      details: error.response?.data || error.message,
    });
  }
};

const schemaInputHandler = async (req, res) => {
  const { apiKey, storeId } = req.body;
  try {
    console.log(apiKey);
    console.log(storeId);

    const response = await axios.get(
      `https://api.apify.com/v2/key-value-stores/${storeId}/records/INPUT`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log(response.data);
    res.status(200).send({ success: true, data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error });
  }
};

const getLastRunController = async (req, res) => {
  const { actorId, apiKey } = req.query;
  try {
    const response = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs/last`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: true, error });
  }
};

module.exports = {
  schemaController,
  actorController,
  schemaInputHandler,
  runController,
  getLastRunController,
};
