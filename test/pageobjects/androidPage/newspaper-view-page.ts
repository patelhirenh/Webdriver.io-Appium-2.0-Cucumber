import Page from "../page";

class NewspaperViewPage extends Page {

    public get newspaperViewMessage() {
        return $('//android.widget.TextView[@text="Two ways to read! Turn the pages just like in the paper including Weekend and YOU magazines…"]');
    }
}

export default new NewspaperViewPage()