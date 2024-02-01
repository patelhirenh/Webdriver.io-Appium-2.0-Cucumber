import { Given, When, Then, } from '@wdio/cucumber-framework';
import welcomePage from '../../pageobjects/androidPage/welcome.page';
import commonElements from '../../pageobjects/androidPage/common.elements';
import newspaperViewPage from '../../pageobjects/androidPage/newspaper-view-page';
import androidUtils from '../../utils/android.utils';
import latestViewPage from '../../pageobjects/androidPage/latest-view.page';
import bestOfTheMailPage from '../..//pageobjects/androidPage/best-of-the-mail.page';
import puzzlesPage from '../../pageobjects/androidPage/puzzles.page';
import mailPlusHomePage from '../../pageobjects/androidPage/mail-plus-home.page';
import allIssuesPage from '../../pageobjects/androidPage/all-issues.page';
import welcomeToMailPlusEditionsPage from '../../pageobjects/androidPage/welcome-to-mail-plus-editions';
import signinPage from '../../pageobjects/androidPage/signin-page';
import newspaperPdfPage from '../../pageobjects/androidPage/newspaper-pdf.page';


Given(/^I am on the Welcome page$/, async () => {
  await welcomePage.allowUATGetText()
  await welcomePage.yourAppNeedsUpdatingGetText()
  await welcomePage.failOverGetText()
  await browser.pause(3000);
});

When(/^I navigate to the Mail plus homepage$/, async () => {
  
  await commonElements.continueButton.click();
  await newspaperViewPage.newspaperViewMessage.waitForDisplayed({ timeout: 5000 });
  await commonElements.continueButton.click();
  await latestViewPage.latestViewMessage.waitForDisplayed({ timeout: 5000 });
  await commonElements.continueButton.click();
  await bestOfTheMailPage.bestOfTheMailMessage.waitForDisplayed({ timeout: 5000 });
  await commonElements.continueButton.click();
  await puzzlesPage.puzzlesMessage.waitForDisplayed({ timeout: 5000 });
  await commonElements.continueButton.click();
  await mailPlusHomePage.newspaperTab.isEnabled();
});

When(/^I tap on see more link from recent issues section$/, async () => {
  await androidUtils.verticalScrollByText(0, 'Recent issues')
  await androidUtils.horizontalScroll()
  await mailPlusHomePage.seeMoreLink.click()
});


Then(/^I should see "([^"]*)" page$/, async (page) => {
	const allIssues:string =  await allIssuesPage.allIssuesGetText.getText(); 
  await expect(allIssues).toContain(page)
});


When(/^I tap to download (.*) edition from archive tab$/, async (date) => {
  try {
    await allIssuesPage.archiveTab.click()
  } catch (error) {
    console.log('Archive tab is not selected')
  }
  await allIssuesPage.archiveTab.waitForEnabled()
  await androidUtils.verticalScrollByText(1, date)
  await (await allIssuesPage.editionDate(date)).click()
});

Then(/^I navigate to Welcome to Mail plus Editions page/, async () => {
  await welcomeToMailPlusEditionsPage.appStorePurchaseLink.waitForDisplayed({ timeout: 10000 })
  await expect(welcomeToMailPlusEditionsPage.mailPlusEditionsHeaderText).toBeDisplayed()
});

When(/^I tap on signin using email "([^"]*)" and password "([^"]*)"$/, async (email, password) => {
	await welcomeToMailPlusEditionsPage.signInButton.waitForExist()
  await welcomeToMailPlusEditionsPage.signInButton.click()
  await browser.switchContext('WEBVIEW_chrome')
  await androidUtils.waitForContext('WEBVIEW_chrome')
  await signinPage.emailAddress.clearValue()
  await signinPage.emailAddress.addValue(email)
  await signinPage.password.addValue(password)
  await signinPage.signInButton.click()
});

Then(/^I should see the "([^"]*)" edition has been downloaded$/, async (date) => {
  await browser.switchContext('NATIVE_APP')
  await androidUtils.waitForContext('NATIVE_APP')
  await browser.pause(150000)
  await newspaperPdfPage.bookIcon.waitForEnabled({ timeout: 150000 })
  await expect(newspaperPdfPage.newsPaperPublishedDate).toHaveText(date)
  await expect(newspaperPdfPage.bookIcon).toBeEnabled()  
});


Given(/^I am on the downloaded news edition for "([^"]*)"$/, async (date) => {
	await expect(newspaperPdfPage.newsPaperPublishedDate).toHaveText(date)
});

When(/^I navigate to page "([^"]*)" in the PDF view, which displays The squeaky-clean mouse$/, async (pageNumber) => {
	await androidUtils.swipeRight(await newspaperPdfPage.pdfPage, pageNumber)
});

When(/^I tap on the gallery icon to go to the ALB page$/,  async () => {
	await newspaperPdfPage.pdfPage.click()
});

When(/^I tap on the camera icon of an image to open fullscreen mode$/,  async () => {
  await newspaperPdfPage.cameraIconOnImage.waitForDisplayed({ timeout: 10000 })
	await newspaperPdfPage.cameraIconOnImage.click()
  await androidUtils.tapOnElement(await newspaperPdfPage.cameraIconOnImage)
});

When(/^I traverse through all the gallery images$/,  async () => {
  await newspaperPdfPage.initialImageCountTextOnImage.waitForDisplayed({ timeout: 10000 })
  const pageCount: string = await newspaperPdfPage.initialImageCountTextOnImage.getText();
  newspaperPdfPage.setImageCount = parseInt(pageCount.slice(-1), 10)
  await androidUtils.swipeRight(await newspaperPdfPage.photoImageGallery, newspaperPdfPage.getImageCount)
  
});

Then(/^I should observe that I am on the last page of the image gallery$/,  async () => {
	const totalImages = newspaperPdfPage.getImageCount.toString()
  await expect(await newspaperPdfPage.finalImageCountTextOnImage).toHaveText(`${totalImages} of ${totalImages}`)
});

When(/^I click on the close button$/,  async () => {
	await newspaperPdfPage.photoGalleryCloseButton.click()
});

Then(/^I should be returned back to the ALB page$/,  async () => {
	await expect(newspaperPdfPage.cameraIconOnImage).toBeDisplayed()
});
