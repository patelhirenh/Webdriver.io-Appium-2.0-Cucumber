import Page from "../page";

class AllIssuesPage extends Page {

    public get archiveTab() {
        return $('//android.widget.TextView[@text="Archive"]');
    }

    public get allIssuesGetText() {
        return $('//android.widget.TextView[@text="All issues"]')
    }

    public async editionDate(date: string) {
        return $(`//android.widget.TextView[@text=${date}]`)
    } 
    
}

export default new AllIssuesPage()