class BestOfTheMailPage {

    public get bestOfTheMailMessage() {
        return $('//android.widget.TextView[@text="Our editor’s choice of highlights and hidden gems you may have missed"]');
    }
}

export default new BestOfTheMailPage()