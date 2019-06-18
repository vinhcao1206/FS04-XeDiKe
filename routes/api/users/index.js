const express = require("express")
const userController = require("./users")
const { User } = require('../../../models/user')
const upload = require('../../../middlewares/uploadImage')
const {authenticating, authorizing } = require("../../../middlewares/auth")


const router = express.Router()
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/test-private", 
    authenticating,
    authorizing(["passenger", "admin"]),
    userController.testPrivate
)
router.post("/upload-avatar", 
    authenticating,
    upload.single('avatar'),
    userController.uploadAvatar
)
module.exports = router;