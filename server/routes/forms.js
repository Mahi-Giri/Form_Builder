const express = require("express");
const router = express.Router();

const { getAllForms, getAForm, createForm } = require("../controllers/forms");

router.get("/", getAllForms);

router.get("/:id", getAForm);

router.post("/", createForm);

module.exports = router;
