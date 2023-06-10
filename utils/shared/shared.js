const axios = require('axios');
require('dotenv').config();

const db = require('../../database/db');

async function getWoocomerceData() {
  const url = process.env.URL;
  const auth = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  };
  try {
    const response = await axios.get(url, { auth });
    return response;
  } catch(err) {
    throw new Error('Failed to fetch data from woocomerce API');
  }
}

function removeDuplicateSku(products) {
  let skuSet = new Set();
  let result = [];

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (!skuSet.has(product.sku)) {
      skuSet.add(product.sku);
      result.push(product);
    }
  }
  return result;
}

async function getSku(sku) {
  try { 
    const query = 'SELECT * FROM product WHERE sku = $1';
    const result = await db.query(query, [sku]);
    return result.rows;
  } catch(err) {
    console.log('Error get SKU : ', err);
  }
}

async function getProductId(id) {
  try { 
    const query = 'SELECT * FROM product WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows;
  } catch(err) {
    console.log(err);
  }
}

async function getTransactionId(id) {
  try { 
    const query = 'SELECT * FROM adjustment_transaction WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows;
  } catch(err) {
    console.log(err);
  }
}

async function getAllProduct(page, limit) {
  const offset = (page - 1) * limit;
  try { 
    const query = 'SELECT * FROM product LIMIT $1 OFFSET $2';
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  } catch(err) {
    console.log(err);
    return err;
  }
}

async function getAllTransaction(page, limit) {
  const offset = (page - 1) * limit;
  try { 
    const query = 'SELECT * FROM adjustment_transaction LIMIT $1 OFFSET $2';
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  } catch(err) {
    console.log(err);
    return err;
  }
}

async function getSkuTransaction(sku) {
  try { 
    const query = 'SELECT * FROM adjustment_transaction WHERE sku = $1';
    const result = await db.query(query, [sku]);
    return result.rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  getWoocomerceData,
  removeDuplicateSku,
  getSku,
  getProductId,
  getAllProduct,
  getAllTransaction,
  getSkuTransaction,
  getTransactionId
};