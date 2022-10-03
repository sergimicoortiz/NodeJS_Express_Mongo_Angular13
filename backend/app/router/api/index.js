var router = require('express').Router();

const category_controller = require("../../controllers/category_controller")
const product_controller = require("../../controllers/products_controller")
const comment_constroller = require('../../controllers/comment_controller');
const carousel_controller = require('../../controllers/carousel_controller');


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


router.post('/product/:id/comments', comment_constroller.add_comment);
router.delete('/product/:id/comments/:comment_id', comment_constroller.delete_comment);

module.exports = router;