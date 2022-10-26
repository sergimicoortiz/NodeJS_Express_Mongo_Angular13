const router = require('express').Router();
const auth = require('../auth.js');
const category_controller = require("../../controllers/category_controller")
const product_controller = require("../../controllers/products_controller")
const carousel_controller = require('../../controllers/carousel_controller');
const user_controller = require('../../controllers/users_controller');
const profile_controller = require('../../controllers/profile_controller.js');
const comment_constroller = require('../../controllers/comment_controller.js');

//Carusel
router.get('/carousel/category', carousel_controller.getCarousel_category);

//Category
router.get('/category', category_controller.getall_category);

//Product
router.get('/products', auth.optional, product_controller.getall_products);
router.get('/products/:category', auth.optional, product_controller.getall_products);
router.get('/products_popular', auth.optional, product_controller.getall_products_popular);
router.get('/product/:slug', auth.optional, product_controller.getone_product);
router.post('/product/:slug/like', auth.required, product_controller.like);
router.delete('/product/:slug/unlike', auth.required, product_controller.unlike);

//User
router.get('/user', auth.required, user_controller.get_user);
router.post('/user', user_controller.create_user);
router.post('/user/login', user_controller.login);
router.put('/settings', auth.required, user_controller.update_user);
router.get('/user/likes', auth.required, product_controller.get_likes);
router.get('/user/products', auth.required, product_controller.get_user_products);

//Profile
router.param('username', profile_controller.param_username);
router.get('/profile/:username', auth.optional, profile_controller.get_profile);
router.post('/profile/:username/follow', auth.required, profile_controller.follow);
router.delete('/profile/:username/unfollow', auth.required, profile_controller.unfollow);


//Comments
router.param('slug_comment', comment_constroller.get_param);
router.get('/comment/:slug_comment', auth.optional, comment_constroller.get_comment);
router.post('/comment/:slug_comment', auth.required, comment_constroller.add_comment);
router.delete('/comment/:id', auth.required, comment_constroller.delete_comment);

module.exports = router;