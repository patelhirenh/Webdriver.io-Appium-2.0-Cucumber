import Page from "../page"

class CommonElements extends Page {

    public get errorCloseButton() {
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup')
    }

    public get continueButton() {
        return $('//android.widget.TextView[@text="Continue"]')
    }
}

export default new CommonElements()