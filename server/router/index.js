const express = require("express");
const Controller = require("../controller/controller");
const userController = require("../controller/userController");
const router = express.Router();
const {
  authorize,
  authenticate,
  authorizeAdminOnly,
} = require("../middleware/auth");

router.post("/register", Controller.registerAdmin);
router.post("/login", Controller.login);
router.post("/pub/register", userController.registerCustomer);
router.post("/pub/login", userController.loginCustomer);
router.post("/pub/googleLogin", userController.googleLogin);
router.post("/login-by-google", Controller.loginByGoogle);
router.get("/pub/posts", userController.readPosts);
router.get("/pub/posts/:id", userController.readPostsById);
router.use(authenticate);

router.post("/posts/", Controller.add);
router.get("/posts/", Controller.read);
router.get("/histories", Controller.readHistory);
router.get("/users", Controller.getUser);
router.get("/pub/bookmarks", userController.readBookmarks);
router.get("/pub/bookmarks/:id", userController.addBookmarks);

router.get("/categories/", Controller.readCategories);
router.post("/categories/", Controller.addCategories);
router.delete("/categories/:id", Controller.deleteCategories);
router.get("/categories/:id", Controller.readCategoryById);
router.put("/categories/:id", Controller.editCategory);

router.put("/posts/:id", authorize, Controller.replace);
router.patch("/posts/:id", authorizeAdminOnly, Controller.modify);
router.get("/posts/:id", Controller.readById);
router.delete("/posts/:id", authorize, Controller.deleteById);

module.exports = router;
