export const registerWaitForStopScrolling = () => {
    browser.addCommand('waitForPageStopScrolling', function () {
        this.waitUntil(
            function () {
                const startPageYOffset = this.execute('return window.pageYOffset');
                this.pause(100);
                const finPageYOffset = this.execute('return window.pageYOffset');
                return (startPageYOffset == finPageYOffset)
            },
            {
                timeoutMsg: `Page didn't stopped scrolling`
            }
        )
    })
}

