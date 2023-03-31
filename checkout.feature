Feature: Flipkart checkout automation
  As a customer of Flipkart
  I want to be able to checkout my items
  So that I can complete my purchase
  
  @checkout
  Scenario: Checkout
    Given I am on the Flipkart homepage
    When I search for "iPhone XR"
    And I click on the first search result
    And I add the item to my cart
    And I go to my cart
    And I proceed to checkout
    And I enter my shipping address
    And I select "Cash on Delivery"
    And I confirm my order
    Then I should see a confirmation message


    #npx cucumber-js
