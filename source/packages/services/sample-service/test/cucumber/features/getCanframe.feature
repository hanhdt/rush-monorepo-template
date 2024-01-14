Feature: Canframe API

  Scenario: Can retrive a canframe by id
    Given I have a canframeId "1"
    When I retrieve the canframe by id
    Then the canframe response status should be "200"
    And the canframe response should contain "canframe"