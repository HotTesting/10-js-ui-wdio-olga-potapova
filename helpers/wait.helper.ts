export class WaitHelper {
    waitForPageStopScrolling() {
        browser.waitUntil(
            () => {
                const startPageYOffset = browser.execute('return window.pageYOffset');
                browser.pause(100);
                const finPageYOffset = browser.execute('return window.pageYOffset');
                return (startPageYOffset == finPageYOffset)
            },
            {
                timeoutMsg: `Page didn't stopped scrolling`
            }
        )
    }
}
