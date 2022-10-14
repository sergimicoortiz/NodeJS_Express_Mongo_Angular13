const router = require('express').Router();
const auth = require('../auth.js');


const category_controller = require("../../controllers/category_controller")
const product_controller = require("../../controllers/products_controller")
//const comment_constroller = require('../../controllers/comment_controller');
const carousel_controller = require('../../controllers/carousel_controller');
const user_controller = require('../../controllers/users_controller');
const profile_controller = require('../../controllers/profile_controller.js');


router.get('/carousel/category', carousel_controller.getCarousel_category);
router.get('/category', category_controller.getall_category);
router.get('/category/:id', category_controller.getone_category);
router.post('/category', category_controller.create_category);
router.delete('/category/:id', category_controller.delete_category);
router.put('/category/:id', category_controller.update_category);
router.delete('/category_all', category_controller.deleteAll_category);



router.get('/products', product_controller.getall_products);
router.get('/products/:category', product_controller.getall_products);
router.get('/products_popular', product_controller.getall_products_popular);
router.get('/product/:id', product_controller.getone_product);
router.post('/product', product_controller.create_product);
router.delete('/product/:id', product_controller.delete_product);
router.delete('/products_all', product_controller.deleteAll_product);
router.put('/product/:id', product_controller.update_product);

router.get('/user', auth.required, user_controller.get_user);
router.post('/user', user_controller.create_user);
router.post('/user/login', user_controller.login);
router.put('/settings', auth.required, user_controller.update_user);


router.param('username', profile_controller.param_username);
router.get('/profile/:username', profile_controller.get_profile);


//router.post('/product/:id/comments', comment_constroller.add_comment);
//router.delete('/product/:id/comments/:comment_id', comment_constroller.delete_comment);

module.exports = router;