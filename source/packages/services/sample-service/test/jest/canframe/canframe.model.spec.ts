import { expect } from "chai";
import { CanframeItem } from "../../../src/canframe/canframe.model";

describe("canframe.model tests", () => {
  test("check CanframeItem model", () => {
    const canframeItem = new CanframeItem();
    canframeItem.id = "id";
    canframeItem.year = "year";
    canframeItem.model = "model";

    expect(canframeItem).to.deep.equal({
      id: "id",
      year: "year",
      model: "model",
    });
  });

  test("check CanframeItem model with empty values", () => {
    const canframeItem = new CanframeItem();
    canframeItem.id = "";
    canframeItem.year = "";
    canframeItem.model = "";

    expect(canframeItem).to.deep.equal({
      id: "",
      year: "",
      model: "",
    });
  });

  test("check CanframeItem model with null values", () => {
    const canframeItem = new CanframeItem();
    canframeItem.id = null as any;
    canframeItem.year = null as any;
    canframeItem.model = null as any;

    expect(canframeItem).to.deep.equal({
      id: null,
      year: null,
      model: null,
    });
  });
});