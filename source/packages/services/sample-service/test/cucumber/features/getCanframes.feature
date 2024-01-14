Feature: Canframes API

  Scenario: Can retrieve a list of canframes with all attributes
    When I retrieve all canframes
    Then the canframes response status should be "200"
    And the canframes response should be in JSON format
    And the canframes response should contain "canframes"