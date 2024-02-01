import Page from "../page";

class DailyMailVideo extends Page {
    
    public get acceptCookies() {
        return $('button[class*="primary"]')
    }

    public get videoDescriptionText() {
        return $$('.vjs-title-text div')[0]    
    }

    public get videoWindow() {
        return $$('.vjs-tech')[0]
    }

    public get backArrowButton() {
        return $$('.mol-previous-control')[0]
    }

    public get forwardArrowButton() {
        return $$('.mol-skip-control')[0]
    }

    public get volumeButton() {
        return $$('.vjs-volume-menu-button')[0]
    }

    public get playButton() {
        return $$('.vjs-play-control')[0]
    }

    private videoDescription: string = ''

    get getValue(): string {
        return this.videoDescription
    }

    set setValue(value: string) {
        this.videoDescription = value;
    }

    public get videoHeadline() {
        return $('.video-headline')
    }

    private videoPlayTime: string = ''
    get getDurationTime(): string {
        return this.videoPlayTime
    }

    set setDurationTime(value: string) {
        this.videoPlayTime = value;
    }

    public get videoDurationTimeGetText() {
        return $$('.vjs-duration-display')[0]
    }

    public get videoProgressBar() {
        return $$('.vjs-progress-control.vjs-control')[0]
    }

    public get videoSliderHandle() {
        return $$('.vjs-seek-handle.vjs-slider-handle')[0]
    }
    
public async slideProgressBar() {
    const origin = await this.videoSliderHandle;
    const targetOrigin = await this.videoProgressBar;

    if (origin && targetOrigin) {
        const originSize = await targetOrigin.getSize();
        const targetX = Math.round(originSize.width * 0.9);
        const targetY = Math.round(originSize.height * 0.9);

        await browser.action('pointer')
            .move({ duration: 0, origin, x: 0, y: 0 })
            .down({ button: 0 })
            .pause(10)
            .move({ duration: 0, origin: targetOrigin, x: targetX, y: targetY })
            .up({ button: 0 })
            .perform();
    } else {
        console.error("Source or target element not found");
    }
}

private totalWaitTime: number = 0;
    get getTotalWaitTime(): number {
        return this.totalWaitTime;
    }
    set setTotalWaitTime(value: number) {
        if (value >= 0) {
            this.totalWaitTime = value;
        } else {
            console.error("Total wait time must be a non-negative number.");
        }
    }

}

export default new DailyMailVideo()