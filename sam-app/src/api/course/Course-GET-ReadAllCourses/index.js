// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

const { Endpoint } = require('aws-sdk');
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

 const AWS = require('aws-sdk');
 require('dotenv').config();
 const uuid = require('uuid');
 
 if (process.env.AWS_SAM_LOCAL) {
     AWS.config.update({ endpoint: 'http://localhost:8000' })
 }
 
 AWS.config.update({ region: process.env.REGION, apiVersion: "2012-08-10" });
 
 const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {

    var response = {};
    var params = {
        TableName: 'Course',
        Key: {
            'id': 12345
        }
    };

    console.log("Finding item...");
    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to find item: ", JSON.stringify(err, null, 2));
            response = {
                'statusCode': 400,
                'body': JSON.stringify({
                    err: err
                })
            };
        } else {
            console.log("Found item: ", JSON.stringify(data, null, 2));
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: 'Success!'
                }),
                'data': JSON.stringify(data, null, 2)
            }
        }
    });

    return response;
};
