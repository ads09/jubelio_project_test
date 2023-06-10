const product = require('../controller/product_controller');

module.exports = [
  {
    method: 'GET',
    path: '/getWoocomerce',
    handler: product.getWoocomerceHandler
  },
  {
    method: 'GET',
    path: '/getListProduct',
    handler: product.getList
  },
  {
    method: 'GET',
    path: '/productDetail',
    handler: product.getDetailProduct
  },
  {
    method: 'POST',
    path: '/createProduct',
    handler: product.createProduct
  },
  {
    method: 'PUT',
    path: '/updateProduct/{id}',
    handler: product.updateProduct
  },
];