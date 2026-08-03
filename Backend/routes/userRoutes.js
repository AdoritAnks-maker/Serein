const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById
} = require("../controllers/usercontroller");


router.get(
    "/profile",
    authMiddleware,
    getProfile
);


router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


router.get(
    "/",
    authMiddleware,
    getAllUsers
);


router.get(
    "/:id",
    authMiddleware,
    getUserById
);


module.exports = router;
