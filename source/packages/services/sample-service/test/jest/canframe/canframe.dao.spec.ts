import AWS from "aws-sdk";
import { listCanframes } from "../../../src/canframe/canframe.dao";

AWS.config.update({ region: 'ap-northeast-1' });

describe("canframe.dao tests", () => {
  beforeEach(() => {
    const ddbData = {
      Items: [{ id: "1", model: "tanto-01", year: "2023" }],
      Count: 0,
      ScannedCount: 0
    };

    const mockDDbScan = jest.fn().mockImplementation(() => {
      return {
        promise() {
          return Promise.resolve(ddbData);
        },
      };
    });

    jest.mock("aws-sdk", () => {
      return {
        DynamoDB: {
          DocumentClient: jest.fn(() => ({
            scan: mockDDbScan,
          })),
        },
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("check listCanframes", async () => {
    const expectedData = {
      canframes: [
        { id: "1", model: "tanto-01", year: "2023" },
      ]
    };
    const tableName = "canframes";
    const year = "2023";
    const sort = "model";
    const canframes = await listCanframes(tableName, year, sort);
    expect(canframes).toEqual(expectedData);
  });
});