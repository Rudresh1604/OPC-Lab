const {
  schemaController,
  actorController,
  runController,
  schemaInputHandler,
  getLastRunController,
} = require("../controller/apify");

const router = require("express").Router();

router.post("/actors", actorController);

router.get("/schema", schemaController);
router.post("/input-schema", schemaInputHandler);
router.post("/run", runController);
router.get("/last-run", getLastRunController);

module.exports = router;
