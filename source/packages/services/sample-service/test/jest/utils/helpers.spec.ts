import { expect } from "chai";
import { tryParseJSON, buildLambdaHttpResponse } from "../../../src/utils/helpers";

describe("Helper tests", () => {
  test("check tryParseJSON with Object string", () => {
    const obj = { key: "value" };
    const str = JSON.stringify(obj);
    const result = tryParseJSON(str);

    expect(result).to.deep.equal(obj);
  });

  test("check tryParseJSON with Array string", () => {
    const arr = ["value1", "value2"];
    const str = JSON.stringify(arr);
    const result = tryParseJSON(str);

    expect(result).to.deep.equal(arr);
  });

  test("check tryParseJSON with empty string", () => {
    const str = "";
    const result = tryParseJSON(str);

    expect(result).to.equal(null);
  });

  test("check tryParseJSON with invalid string", () => {
    const str = "invalid";
    const result = tryParseJSON(str);

    expect(result).to.equal(null);
  });

  test("check tryParseJSON with null", () => {
    const result = tryParseJSON(null as any);

    expect(result).to.equal(null);
  });

  test("check buildLambdaHttpResponse with default params", () => {
    const result = buildLambdaHttpResponse();

    expect(result).to.deep.equal({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(
        {
          status: true,
          statusMessage: "Success",
          data: null,
        },
        null,
        2
      ),
    });
  });

  test("check buildLambdaHttpResponse with custom params", () => {
    const result = buildLambdaHttpResponse({
      headers: { "Content-Type": "application/json" },
      statusCode: 400,
      status: false,
      statusMessage: "Bad Request",
      data: { key: "value" },
    });

    expect(result).to.deep.equal({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          status: false,
          statusMessage: "Bad Request",
          data: { key: "value" },
        },
        null,
        2
      ),
    });
  });
});
