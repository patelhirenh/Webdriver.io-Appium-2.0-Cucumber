import Page from "../page"

class MailPlusHomePage extends Page {

    public get newspaperTab() {
        return $('//android.widget.Button[@content-desc="Newspaper"]/android.view.ViewGroup')
    }

    public get seeMoreLink() {
        return $('//android.widget.TextView[@text="SEE MORE"]')
    }
}

export default new MailPlusHomePage()