
class WebUtils  {

    public async waitUntilStringsAreNotEqual( actualValue: string, expectedValue: string, waitTimeOut: number) {
        try {
            await browser.waitUntil(
                async () => {
                    const currentVideoDescription = actualValue;
                    const expectedStringValue = expectedValue;
                    return currentVideoDescription !== expectedStringValue;
                },
                {
                    timeout: waitTimeOut,
                    interval: 500,
                    timeoutMsg: 'The video description did not change within the specified timeout',
                }
            );
        } catch (error) {
            console.error('Error:', error);
        }
    } 

}

export default new WebUtils()