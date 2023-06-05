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

exports.handler = async () => {
  try {
    return buildResponse(200, products);
  } catch (error) {
    return buildResponse(500, { message: error.message });
  }
};
