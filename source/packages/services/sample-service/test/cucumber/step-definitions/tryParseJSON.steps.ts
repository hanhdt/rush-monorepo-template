import { Given, When, Then } from "@cucumber/cucumber";
import { fail } from "assert";
import { assert } from "chai";

import { tryParseJSON } from "../../../src/utils/helpers";

// Scenario: I have a valid JSON string
Given('I have a valid JSON string', function () {
  this.jsonString = '{"key": "value"}';
});

When('I attempt to parse the JSON string with tryParseJSON', function () {
  try {
    this.jsonStringResult = tryParseJSON(this.jsonString);
  } catch (err) {
    fail(`Expected response, instead: ${err}`);        
  }
});

Then('I should get an JS object back', function () {
  assert.isObject(this.jsonStringResult);
});

// Scenario: I have an array string
Given('I have an array string', function () {
  this.jsonArrayString = '["key", "value"]';
});

When('I attempt to parse the array string with tryParseJSON', function () {
  try {
    this.jsonArrayStringResult = tryParseJSON(this.jsonArrayString);
  } catch (err) {
    fail(`Expected response, instead: ${err}`);        
  }
});

Then('I should get an JS array back', function () {
  assert.isArray(this.jsonArrayStringResult);
});

// Scenario: I have an invalid JSON string
Given('I have an empty string', function () {
  this.emptyString = '';
});

When('I attempt to parse the empty string with tryParseJSON', function () {
  try {
    this.emptyStringResult = tryParseJSON(this.emptyString);
  } catch (err) {
    fail(`Expected response, instead: ${err}`);        
  }
});

Then('I should get null back', function () {
  assert.isNull(this.emptyStringResult);
});