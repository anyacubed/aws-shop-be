import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import products from '../mockData.json';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsList = new lambda.Function(this, 'GetProductsList', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'getProductsList.handler',
      code: lambda.Code.fromAsset('handlers'),
      environment: {
        PRODUCT_AWS_REGION: 'eu-west-1',
        PRODUCTS: JSON.stringify(products),
      },
    });

    const getProductsById = new lambda.Function(this, 'GetProductsById', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'getProductsById.handler',
      code: lambda.Code.fromAsset('handlers'),
      environment: {
        PRODUCTS: JSON.stringify(products),
      },
    });

    const api = new apigateway.RestApi(this, 'ProductApi', {
      restApiName: 'Product Service API',
    });

    // GET method for /products endpoint
    const productsResource = api.root.addResource('products');
    const getProductsListIntegration = new apigateway.LambdaIntegration(getProductsList);
    productsResource.addMethod('GET', getProductsListIntegration);

     // GET method for /products/{productId} endpoint
     const productIdResource = productsResource.addResource('{productId}');
     const getProductsByIdIntegration = new apigateway.LambdaIntegration(getProductsById);
     productIdResource.addMethod('GET', getProductsByIdIntegration);

    // outputs the API endpoint URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
    });
  }
}
