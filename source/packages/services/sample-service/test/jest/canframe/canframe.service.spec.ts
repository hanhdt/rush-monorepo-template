import { listCanframesDummy } from '../../../src/canframe/canframe.service';

describe("canframe.service tests", () => {
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

  test("check listCanframesDummy", async () => {
    const expectedData = {
      canframes: [
        { id: "1", model: "tanto-01", year: "2023" },
      ]
    };
    const tableName = "canframes";
    const year = "2023";
    const sort = "model";
    const canframes = await listCanframesDummy(tableName, year, sort);
    expect(canframes).toEqual(expectedData);
  });
});