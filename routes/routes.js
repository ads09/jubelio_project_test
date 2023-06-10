const product = require('../controller/product_controller');
const transaction = require('../controller/transaction_controller');

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
  {
    method: 'DELETE',
    path: '/deleteProduct/{id}',
    handler: product.deleteProduct
  },
  {
    method: 'POST',
    path: '/createTransaction',
    handler: transaction.createTransaction
  },
  {
    method: 'GET',
    path: '/getListTransaction',
    handler: transaction.getList
  },
  {
    method: 'GET',
    path: '/transactionDetail',
    handler: transaction.getDetailTransaction
  },
  {
    method: 'PUT',
    path: '/updateTransaction/{id}',
    handler: transaction.updateTransaction
  },
  {
    method: 'DELETE',
    path: '/deleteTransaction/{id}',
    handler: transaction.deleteTransaction
  },
];