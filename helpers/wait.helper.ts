export class WaitHelper {
    waitForPageStopScrolling (totalCount, timeout, currentCount = 0) {
        if (currentCount < totalCount) {
            let startPageYOffset = browser.execute('return window.pageYOffset')
            browser.pause(timeout)
            let finPageYOffset = browser.execute('return window.pageYOffset')
            if (startPageYOffset == finPageYOffset) {
                return
            } else {
                this.waitForPageStopScrolling(totalCount, timeout, ++currentCount)
            }
        } else {
            throw `Page hasn't stop scrolling in more than ${totalCount} attempts.`
        }
    }
}