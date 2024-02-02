class LatestViewPage {

    public get latestViewMessage() {
        return $('//android.widget.TextView[@text="Or browse today’s paper by section – includes your 5pm update with the latest news & sport"]')
    }
}

export default new LatestViewPage()