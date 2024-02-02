import Page from "../page"

class WelcomePage extends Page{

    public get yourAppNeedsUpdating(){
        return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]')
    }

    public get cancelUpdateAppButton(){
        return $('//android.widget.Button[@resource-id="android:id/button2"]')
    }

    public get closeFailoverMenu(){
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[1]')
    }

    public get allowUATText(){
        return $('//android.widget.TextView[@resource-id="com.android.permissioncontroller:id/permission_message"]')
    }

    public get dontAllowButton(){
        return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]')
    }

    public async yourAppNeedsUpdatingGetText(){
        try {
            await this.cancelUpdateAppButton.waitForDisplayed({ timeout: 10000 })
            await this.cancelUpdateAppButton.click()
        } catch (error) {
            
        }
    }
    

    public async allowUATGetText(){
        try {
            await this.dontAllowButton.click()
    } catch (error) {
            console.log('Allow UAT - Mail+ to send you notifications? popup is not displayed')
        }
    }
    
    public async failOverGetText(){
        try{
            await this.closeFailoverMenu.click()
        } catch (error) {
            console.log('Failover text is not displayed')
        }
    }

    
}

export default new WelcomePage()