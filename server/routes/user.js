const express = require("express")
const { registerUser, loginUser, googleauth, getuser, forgotPassword, resetPassword, getAllUser, logout, updateAvatar, updateUserInfo, updateUserPassword } = require("../controllers/userController")
const { isAuthenticate, isAdmin } = require("../middleware/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/googleauth").post(googleauth)
router.route('/getuser').get(isAuthenticate, getuser)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword/:token").put(resetPassword)
router.route("/getAllUser").get(isAuthenticate, isAdmin("Admin"), getAllUser)

router.route("/logout").get(logout)
router.route("/update-avatar").put(isAuthenticate, updateAvatar)

router.route("/update-user-info").put(isAuthenticate, updateUserInfo)

router.route("/update-user-password").put(isAuthenticate, updateUserPassword)

module.exports = router