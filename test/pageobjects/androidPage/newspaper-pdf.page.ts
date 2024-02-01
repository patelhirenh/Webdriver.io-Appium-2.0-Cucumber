import Page from "../page";

class NewspaperPdfPage extends Page {
    
    public get newsPaperPublishedDate() {
        return $('//android.widget.TextView[@text="Saturday, 6 January"]');
    }

    public get bookIcon() {
        return $('//android.view.ViewGroup[@content-desc="Tap me to open the sections menu"]/android.view.ViewGroup/android.view.ViewGroup');
    }            

    public get pdfPage() {
        return $('//androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout');
    } 

    public get galleryImageCount() {
        return $('//android.view.View[@text="8"]');
    }

    public get initialImageCountTextOnImage() {
        return $('//android.widget.TextView[@text="1 of 9"]');
    }

    public get finalImageCountTextOnImage() {
        return $('//android.widget.TextView[@text="9 of 9"]');
    }

    public get photoGalleryCloseButton() {
        return $('//android.widget.TextView[@text="Close"]');
    }

    public get cameraIconOnImage() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout[4]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.ImageView')
    }             
    public get photoImageGallery() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]')
    }

    private imageCount: number = 0;

    get getImageCount(): number {
        return this.imageCount;
    }

    set setImageCount(value: number) {
        if (value >= 0) {
            this.imageCount = value;
        } else {
            console.error("Image count must be a non-negative number.");
        }
    }

    public async waitForPdfViewIcon(element: WebdriverIO.Element) {
    return browser.waitUntil(async () => {
      return await element.isEnabled();
    }, {
      timeout: 300000, 
      timeoutMsg: 'PDF view icon is not enabled within 30 seconds',
      interval: 1000, 
    });
    }

}

export default new NewspaperPdfPage()