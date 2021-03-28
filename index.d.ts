import type ChromiumCommands from "node_modules/@wdio/protocols/build/commands/chromium"
import type WebdriverCommands from "node_modules/@wdio/protocols/build/commands/webdriver"

declare global {
    namespace WebdriverIO {
        interface Browser extends ChromiumCommands, WebdriverCommands {
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