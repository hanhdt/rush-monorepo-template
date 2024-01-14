import { APIGatewayProxyResult } from "aws-lambda";

export interface ResponseParams {
  headers?: {};
  statusCode: number;
  status: boolean;
  statusMessage: string;
  data?: any;
}

export interface Response {
  statusCode: number;
  headers: any;
  body: string;
}

const _buildResponseHeaders = (originHeaders: any) => {
  let headers = { ...originHeaders };

  /** CORS Headers response */
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Credentials'] = true;

  return headers;
};


/**
 * Attempts to parse a JSON string to JS object, return null if fails.
 * @param {string} str
 * @returns {object|null}
 */
export function tryParseJSON(str: string) {
  try {
    if (str === '') {
      return null;
    } else {
      return JSON.parse(str.replace(/\n/g, ''));
    }
  } catch (e) {
    return null;
  }
}

/**
 * Builds a standard HTTP response object for Lambda function handlers.
 * @example
 * buildLambdaHttpResponse()
 *
 * @example
 * buildLambdaHttpResponse({
 *   data: { key: 'value' },
 * })
 *
 * @example
 * buildLambdaHttpResponse({
 *   status: false,
 *   statusMessage: 'Internal Server Error',
 *   statusCode: 500,
 * })
 */
export function buildLambdaHttpResponse(params: ResponseParams = {
  headers: {},
  statusCode: 200,
  status: true,
  statusMessage: 'Success',
  data: null
}): APIGatewayProxyResult {
  let { headers, statusCode, statusMessage, data, status } = params;

  const responseBody = {
    status: status,
    statusMessage: statusMessage,
    data: data,
  };

  let response = {} as APIGatewayProxyResult;

  headers = _buildResponseHeaders(headers);
  response = {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify(responseBody, null, 2),
  };

  return response;
}
