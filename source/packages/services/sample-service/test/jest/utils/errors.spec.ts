import { expect } from "chai";
import { handleError, ErrorWithResponse } from "../../../src/utils/errors";

describe("Error tests", () => {
  test("check handleError", () => {
    const error = new Error("test error") as ErrorWithResponse;
    const result = handleError(error);
    expect(result).to.equal(`handleError: ${JSON.stringify(error)}`);
  });
});