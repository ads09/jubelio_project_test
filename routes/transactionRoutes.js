const transaction = require('../controller/transaction_controller');

module.exports = [
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