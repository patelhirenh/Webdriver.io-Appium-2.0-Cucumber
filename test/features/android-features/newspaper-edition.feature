@test
Feature: The Daily Mail+ Newapaper Edition 
  
  Scenario: Verify the Newspaper edition is downloadable
  
  Given I am on the Welcome page
  When I navigate to the Mail plus homepage
  And I tap on see more link from recent issues section
  Then I should see "All issues" page
  When I tap to download "6 January 2024" edition from archive tab
  Then I navigate to Welcome to Mail plus Editions page
  When I tap on signin using email "mailqatest94@gmail.com" and password "World123!"
  Then I should see the "Saturday, 6 January" edition has been downloaded


Scenario: Verify the Images in the Gallery Section should be traversable of the Downloaded Newspaper Edition

Given I am on the downloaded news edition for "Saturday, 6 January"
And I navigate to page "3" in the PDF view, which displays The squeaky-clean mouse
When I tap on the gallery icon to go to the ALB page
And I tap on the camera icon of an image to open fullscreen mode
And I traverse through all the gallery images
Then I should observe that I am on the last page of the image gallery
When I click on the close button
Then I should be returned back to the ALB page