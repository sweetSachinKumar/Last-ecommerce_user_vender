const express = require("express")
const { createEvent, getAllEvent, getsingleEvent } = require("../controllers/eventController")
const router = express.Router()

router.route("/createEvent").post(createEvent)
router.route("/get-all-event").get(getAllEvent)
router.route("/get-single-event/:id").get(getsingleEvent)



module.exports = router