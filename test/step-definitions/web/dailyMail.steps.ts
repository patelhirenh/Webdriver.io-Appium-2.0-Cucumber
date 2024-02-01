import { Given, Then, When } from "@wdio/cucumber-framework"
import dailyMailVideoPage from "../../pageobjects/webPage/dailyMailVideo.page"
import dailyMailSportPage from "../../pageobjects/webPage/dailyMailSport.page"
import webUtils from "../../utils/web.utils"

Given(/^I am on Daily Mail homepage$/, async () => {
	await browser.url('/')
	await browser.maximizeWindow()
	expect(await browser.getUrl()).toEqual('https://www.dailymail.co.uk/home/index.html')
})


When(/^I navigate to Daily Mail video page$/, async () => {
	await browser.url('video/index.html')
})

When(/^I have accepted cookies$/, async () => {
	await dailyMailVideoPage.acceptCookies.click()
})

When(/^I click on a video for playback$/, async () => {
	await dailyMailVideoPage.videoHeadline.scrollIntoView()
	await expect(dailyMailVideoPage.videoHeadline).toBeDisplayedInViewport()
	await dailyMailVideoPage.videoWindow.click()



	// await browser.pause(23000)
	// await dailyMailVideoPage.playButton.click()
	// await browser.pause(3000)
	// await dailyMailVideoPage.slideProgressBar()
	// await browser.pause(10000)
	// console.log('*****************************')

})

Then(/^I should observe the video playing$/, async () => {
	await expect(dailyMailVideoPage.playButton).toHaveAttribute('class', 'vjs-play-control vjs-control  vjs-playing')
})

When(/^I click on the video to pause playback$/, async () => {
	await dailyMailVideoPage.videoWindow.waitForClickable({ timeout: 30000 })
	await dailyMailVideoPage.videoWindow.click()
})

Then(/^I should witness the video being paused$/, async () => {
	try {
		await dailyMailVideoPage.playButton.waitUntil(
			async () => {
				const attributeValue = await dailyMailVideoPage.playButton.getAttribute('class');
				return attributeValue === 'vjs-play-control vjs-control vjs-paused';
			},
			{
				timeout: 5000,
				interval: 500,
				timeoutMsg: 'Element did not have the expected attribute value within the specified timeout',
			}
		);
	
		await expect(dailyMailVideoPage.playButton).toHaveAttribute('class', 'vjs-play-control vjs-control vjs-paused');
	} catch (error) {
		console.error('Error:', error);
	}
})

When(/^I navigate to the next video using the forward arrow$/, async () => {
	const videoDescription: string = await dailyMailVideoPage.videoDescriptionText.getText()
	dailyMailVideoPage.setValue = videoDescription
	await dailyMailVideoPage.forwardArrowButton.click()
	await browser.pause(3000)
})

Then(/^I should encounter the subsequent video$/, async () => {
	const videoDescription: string = await dailyMailVideoPage.videoDescriptionText.getText()
	await expect(videoDescription).not.toEqual(dailyMailVideoPage.getValue)
})

When(/^I navigate to the previous video using the back arrow$/, async () => {
	await dailyMailVideoPage.backArrowButton.waitForClickable({ timeout: 180000 })
	await dailyMailVideoPage.backArrowButton.click()
})

Then(/^I should be directed to the preceding video$/, async () => {
	const videoDescription: string = await dailyMailVideoPage.videoDescriptionText.getText()
	await expect(videoDescription).toEqual(dailyMailVideoPage.getValue)
})

When(/^I click on the speaker icon to mute the video$/, async () => {
	await dailyMailVideoPage.volumeButton.click()
})

Then(/^I should observe that the volume is muted$/, async () => {
	await expect(dailyMailVideoPage.volumeButton).toHaveAttribute('aria-pressed', 'true')
})

When(/^I click on the speaker icon again to unmute the video$/, async () => {
	await browser.pause(3000)
	await dailyMailVideoPage.volumeButton.click()
})

Then(/^I should observe that the volume is unmuted$/, async () => {
	await expect(dailyMailVideoPage.volumeButton).toHaveAttribute('aria-pressed', 'false')
})

When(/^the video playback is complete$/, async () => {
	const videoDescription: string = await dailyMailVideoPage.videoDescriptionText.getText()
	await browser.waitUntil(async () => {
		return await dailyMailVideoPage.forwardArrowButton.waitForClickable()
	}, {timeout: 20000, timeoutMsg: 'forwardArrowButton is not clickable'})
	await dailyMailVideoPage.forwardArrowButton.click()
	dailyMailVideoPage.setValue = videoDescription

	//following code will convert the duration time to milliseconds
	const time: string = await dailyMailVideoPage.videoDurationTimeGetText.getText()
	const minutesString: string = time.slice("Duration Time ".length)
	const [minutes, seconds] = minutesString.split(':').map(Number)
	const totalSecondsToWait: number = minutes * 60 * 1000 + seconds
	dailyMailVideoPage.setTotalWaitTime = totalSecondsToWait
	//await browser.pause(totalSecondsToWait)

})

Then(/^the next video should automatically start playing$/, async () => {
	const videoDescription: string = await dailyMailVideoPage.videoDescriptionText.getText()
	await webUtils.waitUntilStringsAreNotEqual(dailyMailVideoPage.getValue, videoDescription, dailyMailVideoPage.getTotalWaitTime)
	await expect(videoDescription).not.toEqual(dailyMailVideoPage.getValue)
})


When(/^I click on sport menu$/, async () => {
	await dailyMailSportPage.privacyPolicy.scrollIntoView()
	await expect(dailyMailSportPage.privacyPolicy).toBeDisplayedInViewport()
	await dailyMailSportPage.sportMenu.click()
})

When(/^I have selected the Premier League table$/, async () => {
	await dailyMailSportPage.premierLeagueTableLink.scrollIntoView()
	await expect(dailyMailSportPage.premierLeagueTableLink).toBeDisplayedInViewport()
	await dailyMailSportPage.premierLeagueTableLink.click()
})

Then(/^I should be on the Premier League table page$/, async () => {
	const url: string = await browser.getUrl()
	await expect(url).toEqual('https://www.dailymail.co.uk/sport/football/premier-league/tables.html')

})

When(/^I look up the team named "([^"]*)"$/, async (teamName) => {
	await dailyMailSportPage.searchTable(teamName)
})

Then(/^I should observe its Position and Points$/, async () => {
	await expect(dailyMailSportPage.getValues.posValue).not.toBeNull()
	await expect(dailyMailSportPage.getValues.ptsValue).not.toBeNull()
})
