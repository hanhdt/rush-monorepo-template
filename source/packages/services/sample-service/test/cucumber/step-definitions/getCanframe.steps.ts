import { Given, When, Then } from "@cucumber/cucumber";
import * as request from 'superagent';
import { fail } from "assert";
import { assert } from "chai";
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { logger } from '../../../src/utils/logger';
import { handler as getCanframeHandler } from "../../../src/getCanframeHandler";

const RESULTS = 'results';
const RESPONSE_STATUS = 'responseStatus';

// Scenario 2
Given('I have a canframeId {string}', function (id: string) {
  this.canframeId = id;
});

When('I retrieve the canframe by id', async function () {
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
      const resp = await getCanframeHandler(lambdaEvent, lambdaContext, null as any);
      logger.info(resp as any);
    } catch (err) {
      fail(`Expected response, instead: ${err}`);        
    }
  } else {
    try {
      // logger.info("api test mode");
      const url = `https://vc90vyprf1.execute-api.ap-northeast-1.amazonaws.com/prod/canframes/${this.canframeId}`;
      const resp = await request.get(url);
      this[RESULTS] = resp.body;
      this[RESPONSE_STATUS] = resp.status.toString();
    } catch (err) {
      fail(`Expected response, instead: ${err}`);        
    }
  }
});

Then('the canframe response status should be {string}', function (status: string) {
  assert.equal(this[RESPONSE_STATUS], status);
});

Then('the canframe response should contain "canframe"', function () {
  assert.containsAllKeys(this[RESULTS].data, ["canframe"]);
});