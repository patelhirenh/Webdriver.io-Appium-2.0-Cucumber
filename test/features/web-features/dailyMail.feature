Feature: The Daily Mail web page

  Background: 
    Given I am on Daily Mail homepage

  Scenario: Verify the video player functionality.
    When I navigate to Daily Mail video page
    And I have accepted cookies
    When I click on a video for playback
    Then I should observe the video playing
    When I click on the video to pause playback
    Then I should witness the video being paused
    When I navigate to the next video using the forward arrow
    Then I should encounter the subsequent video
    When I navigate to the previous video using the back arrow
    Then I should be directed to the preceding video
    When I click on the speaker icon to mute the video
    Then I should observe that the volume is muted
    When I click on the speaker icon again to unmute the video
    Then I should observe that the volume is unmuted
    When the video playback is complete
    Then the next video should automatically start playing

  Scenario: Get the Position and Points for the given team from the Premier League table.
    When I click on sport menu
    And I have selected the Premier League table
    Then I should be on the Premier League table page
    When I look up the team named "Tottenham"
    Then I should observe its Position and Points


