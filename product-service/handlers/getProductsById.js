const products = JSON.parse(process.env.PRODUCTS);

const buildResponse = (statusCode, body) => ({
  statusCode: statusCode,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  try {
    const productId = event.pathParameters.productId;

    const product = products.find((item) => item.id === productId);

    if (!product) {
      return buildResponse(404, { message: 'Product not found' });
    }

    return buildResponse(200, product);
  } catch (error) {
    return buildResponse(500, { message: error.message });
  }
};
