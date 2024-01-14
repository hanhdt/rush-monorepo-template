import { expect } from "chai";
import { logger } from "../../../src/utils/logger";

describe("Logger tests", () => {
  test("check logger", () => {
    expect(logger).to.not.equal(undefined);
  });
});