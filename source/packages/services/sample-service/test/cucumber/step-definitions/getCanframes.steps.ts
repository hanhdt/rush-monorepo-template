import { When, Then } from "@cucumber/cucumber";
import * as request from 'superagent';
import { fail } from "assert";
import { assert } from "chai";
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { logger } from '../../../src/utils/logger';
import { handler as getCanframesHandler } from "../../../src/getCanframesHandler";


const RESULTS = 'results';
const RESPONSE_STATUS = 'responseStatus';

// Scenario 1
When('I retrieve all canframes', async function () {
  // Write code here that turns the phrase above into concrete actions
  if (process.env.TEST_MODE === "local"){
    // logger.info("local lambda test mode");
    const lambdaEvent: APIGatewayProxyEvent = {
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: '',
      pathParameters: {},
      queryStringParameters: {},
      multiValueQueryStringParameters: {},
      stageVariables: {},
      requestContext: {} as any,
      resource: "",
    };
    const lambdaContext: Context = null as any;

    try {
      const resp = await getCanframesHandler(lambdaEvent, lambdaContext, null as any);
      logger.info(resp as any);
      // const result = JSON.parse(resp["body"] as any);
      // this[RESULTS] = resp["body"];
    } catch (err) {
      fail(`Expected response, instead: ${err}`);        
    }
  } else {
    try {
      // logger.info("api test mode");
      const url = `https://vc90vyprf1.execute-api.ap-northeast-1.amazonaws.com/prod/canframes`;
      const resp = await request.get(url);
      // logger.info(resp.body);
      this[RESULTS] = resp.body;
      this[RESPONSE_STATUS] = resp.status.toString();
    } catch (err) {
      fail(`Expected response, instead: ${err}`);        
    }
  }
});

Then('the canframes response status should be {string}', function (status: string) {
  assert.equal(this[RESPONSE_STATUS], status);
});

Then('the canframes response should be in JSON format', function () {
  assert.isObject(this[RESULTS]);
});

Then('the canframes response should contain "canframes"', function () {
  assert.containsAllKeys(this[RESULTS].data, ["canframes"]);
});