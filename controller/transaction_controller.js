const db = require('../database/db');
const shared = require('../utils/shared/shared');

async function createTransaction(request, h) {
  const { sku, qty } = request.payload;
  try {
    const stockQuery = `SELECT stock, price FROM product WHERE sku = $1`;
    const stock = await db.query(stockQuery, [sku]);

    if (stock.rows[0].stock <= 0) {
      return h.response({
        message: 'Failed stock 0',
      }).code(400);
    }
    const price = stock.rows[0].price * qty;
    const transactionQuery = `INSERT INTO adjustment_transaction (sku, qty, amount) VALUES ($1, $2, $3)`;
    await db.query(transactionQuery, [sku, qty, price]);

    const newStock = stock.rows[0].stock - qty;
    const updateQuery = `UPDATE product SET stock = $1 WHERE sku = $2`;
    await db.query(updateQuery, [newStock, sku]);
    const response = {
      message: 'Transaction Success',
    }
    return h.response(response).code(200);
  } catch (err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function getList(request, h) {
  const { page, limit } = request.query;
  try {
    const data = await shared.getAllTransaction(page, limit);
    const response = {
      message: 'Success',
      data: data,
    }
    return h.response(response).code(200);
  } catch (err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function getDetailTransaction(request, h) {
  const {sku} = request.query;
  try {
    const data = await shared.getSkuTransaction(sku);
    if (data.length > 0) {
      const response = {
        message: 'Success',
        data: data,
      }
      return h.response(response).code(200);
    }
    return h.response({
      message: 'SKU not found'
    }).code(404);
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function updateTransaction(request, h) {
  const {id} = request.params;
  const {sku, qty} = request.payload;

  try {
    const getId = await shared.getTransactionId(id);

    if (getId.length > 0) {
      const query = `UPDATE adjustment_transaction SET sku = $1, qty = $2 WHERE id = $3`;
      const result = await db.query(query, [sku, qty, id]);

      if (result.rowCount) {
        const response = {
          message: 'Update transaction success'
        };
        return h.response(response).code(200);
      }
    }
    return h.response({
      message: "ID not found"
    }).code(409);
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function deleteTransaction(request, h) {
  const {id} = request.params;

  try {
    const getId = await shared.getTransactionId(id);

    if (getId.length > 0) {
      const query = `DELETE FROM adjustment_transaction WHERE id = $1`;
      const result = await db.query(query, [id]);

      if (result.rowCount) {
        const response = {
          message: 'Delete transaction success'
        };
        return h.response(response).code(200);
      }
    }
    return h.response({
      message: "ID not found"
    }).code(409);
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

module.exports = {
  createTransaction,
  getList,
  getDetailTransaction,
  updateTransaction,
  deleteTransaction
}