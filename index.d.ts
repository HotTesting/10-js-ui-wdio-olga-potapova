declare global {
    namespace WebdriverIO {
        interface Browser {
            waitForPageStopScrolling: () => void
        }

        interface MultiRemoteBrowser {
            //browserCustomCommand: (arg: any) => void
        }

        interface Element {
            //elementCustomCommand: (arg: any) => number
        }
    }
}

export {}