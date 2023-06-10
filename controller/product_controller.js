const db = require('../database/db');
const shared = require('../utils/shared/shared');

async function getWoocomerceHandler(request, h) {
  try {
    const getData = await shared.getWoocomerceData();

    let data = getData.data.map(obj => {
      const { name, sku, price, description, stock_quantity, images } = obj;
      const { src } = images[0];
      return { name, sku, price, description, stock_quantity, src };
    });      

    data = shared.removeDuplicateSku(data);

    const product_query = 'INSERT INTO product (name, sku, image, price, description) VALUES ($1, $2, $3, $4, $5)';

    for (const obj of data) {
      const product = [obj.name, obj.sku, obj.src, obj.price, obj.description];

      const sku = await shared.getSku(obj.sku);

      if (sku.length > 0) {
        const response = {
          message: `SKU '${obj.sku}' already exists on databse.`
        };
        return h.response(response).code(409);
      }

      await db.query(product_query, product);
    }
    
    const response = {
      message: 'Success',
      data: data
    }
    return h.response(response).code(200);
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
};

async function getList(request, h) {
  const { page, limit } = request.query;
  try {
    const data = await shared.getAllProduct(page, limit);
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

async function getDetailProduct(request, h) {
  const {sku} = request.query;
  try {
    const data = await shared.getSku(sku);
    const response = {
      message: 'Success',
      data: data,
    }
    return response;
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function createProduct(request, h) {
  const {name, sku, image, price, description, stock} = request.payload;

  try {
    const getSku = await shared.getSku(sku);

    if (getSku.length > 0) {
      return h.response({
        message: "SKU already exists"
      }).code(409);
    }
    const query = `INSERT INTO product (name, sku, price, image, description, stock) VALUES ($1, $2, $3, $4, $5, $6)`;
    const result = await db.query(query, [name, sku, price, image, description, stock]);

    if (result.rowCount) {
      const response = {
        message: 'Create product success'
      };
      return h.response(response).code(200);
    }
  } catch(err) {
    console.log(err);
    return h.response('Internal server error').code(500);
  }
}

async function updateProduct(request, h) {
  const {id} = request.params;
  const {name, sku, image, price, description, stock} = request.payload;

  try {
    const getId = await shared.getProductId(id);

    if (getId.length > 0) {
      const query = `UPDATE product SET name = $1, sku = $2, price = $3, image = $4, description = $5, stock = $6 WHERE id = $7`;
      const result = await db.query(query, [name, sku, price, image, description, stock, id]);

      if (result.rowCount) {
        const response = {
          message: 'Update product success'
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

async function deleteProduct(request, h) {
  const {id} = request.params;

  try {
    const getId = await shared.getProductId(id);

    if (getId.length > 0) {
      const query = `DELETE FROM product WHERE id = $1`;
      const result = await db.query(query, [id]);

      if (result.rowCount) {
        const response = {
          message: 'Delete product success'
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
  getWoocomerceHandler,
  getList,
  getDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct
}