Feature: tryParseJSON function

  #1
  Scenario: check tryParseJSON with Object string
    Given I have a valid JSON string
    When I attempt to parse the JSON string with tryParseJSON
    Then I should get an JS object back

  #2
  Scenario: check tryParseJSON with Array string
    Given I have an array string
    When I attempt to parse the array string with tryParseJSON
    Then I should get an JS array back

  #Scenario 3
  Scenario: check tryParseJSON with empty string
    Given I have an empty string
    When I attempt to parse the empty string with tryParseJSON
    Then I should get null back