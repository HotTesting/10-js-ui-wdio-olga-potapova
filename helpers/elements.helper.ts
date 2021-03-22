export class ElementsHelper {
    static setSwitcherToTrue(el: WebdriverIO.Element) {
        expect(el).toBeClickable({ wait: 5000 })
        if(el.isSelected() == false) {
            el.click()
        }
        expect(el.isSelected()).toBe(true)
    }

    static setSwitcherToFalse(el: WebdriverIO.Element) {
        expect(el).toBeClickable({ wait: 5000 })
        if(el.isSelected() == true) {
            el.click()
        }
        expect(el.isSelected()).toBe(false)
    }
}