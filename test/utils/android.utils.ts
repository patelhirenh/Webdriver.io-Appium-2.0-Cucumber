import Page from "../pageobjects/page";
import commonElements from '../pageobjects/androidPage/common.elements';
import newspaperPdfPage from "../pageobjects/androidPage/newspaper-pdf.page";

class AndroidUtils extends Page {
    
    public async tapScreen(elementToTap: WebdriverIO.Element) {

        await browser.touchAction({
            action: 'tap',
            element: elementToTap
        });
    }

    public async closeErrorMessage() {
        try{
        await commonElements.errorCloseButton.waitForDisplayed({ timeout: 3000 })
        await commonElements.errorCloseButton.click();
        } catch {
            console.log("Error message is not displayed. The message is already closed before or the test is running in production.")
        }
    }

    public async clickWithRetry(element: WebdriverIO.Element, attemptsToClicks: number) {
        let attempts = 0;
        while (attempts < attemptsToClicks) {
            try {
            await element.click();
            break;
        } catch (error: any) {
            console.error(`Attempt ${attempts + 1} failed to click. Error: ${error.message}`);
            attempts += 1;
            await browser.pause(10000); 
        }
        }
    }

    public async getTotalImageCountFromGalleryIcon() {
        await newspaperPdfPage.galleryImageCount.waitForDisplayed({ timeout:10000 });
        const imageCount: string = await newspaperPdfPage.galleryImageCount.getText();
        const totalImageCount: number = parseInt(imageCount) + 1;
        return totalImageCount;
    }

    public async swipeToLastImageInGallery() {
        await newspaperPdfPage.initialImageCountTextOnImage.waitForDisplayed({ timeout: 10000 });
        const imageCountTextInGallery: string = await newspaperPdfPage.initialImageCountTextOnImage.getText();
        const imageCountFromText: number = parseInt(imageCountTextInGallery.slice(-1));
        for (let i: number = 0; i < imageCountFromText; i++) {
            await browser
                .action('pointer')
                .move(555, 1154)
                .down()
                .pause(10)
                .move({ x: 555, y: 1154 })
                .up()
                .perform();
        }
    }

    public async closeImageGallery() {
        await newspaperPdfPage.photoGalleryCloseButton.waitForDisplayed({ timeout: 5000 });
        await newspaperPdfPage.photoGalleryCloseButton.click();
    }

    public async verticalScrollByText(instance: number, textToScroll: string) {
        await $(`android=new UiScrollable(new UiSelector().scrollable(true).instance(${instance})).scrollTextIntoView("${textToScroll}")`)
    }
    public async horizontalScroll() {
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward(5)')
    }

    public async swipeDown() {
        await $('android=new UiScrollable(new UiSelector().scrollable(true).instance(1)).scrollTextIntoView("6 January 2024")')
    }

    public async swipeRight(elementToSwipe: WebdriverIO.Element, swipeCount: number) {
    
        const size = await elementToSwipe.getSize();
        const location = await elementToSwipe.getLocation();
        const startX = location.x + size.width * 0.8; // 80% from the left
        const endX = location.x + size.width * 0.2;   // 20% from the left
        const centerY = location.y + size.height / 2; // Center Y coordinate

    for (let i = 0; i < swipeCount; i++) {
    await browser.performActions([
        {
        type: 'pointer',
        id: `finger${i + 1}`, // Use a unique id for each swipe
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: centerY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 600, x: endX, y: centerY },
            { type: 'pointerUp', button: 0 }
        ],
        },
    ]);
    }
}

public async tapOnElement(elementToTap: WebdriverIO.Element) {
    try {
        await browser.touchAction({
            action: 'tap',
            element: elementToTap,
        });

        console.log('Tapped on the element successfully!');
    } catch (error) {
        console.error('Error tapping on the element:', error);
    }
}

async tapOnElement1(elementToTap: WebdriverIO.Element) {
    try {
        // Perform the tap using the Action API
        await elementToTap.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', origin: 'viewport', x: 0, y: 0 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);

        console.log('Tapped on the element successfully!');
    } catch (error) {
        console.error('Error tapping on the element:', error);
    }
}

public async waitForContext(contextName: string) {
    return browser.waitUntil(async () => {
        const currentContext = await browser.getContext();
        return currentContext === contextName;
    }, {
        timeout: 15000, // Adjust the timeout as needed
        timeoutMsg: `Context '${contextName}' not found within 10 seconds`,
        interval: 1000, // Check every 1 second
    });
  }
    

}

export default new AndroidUtils();