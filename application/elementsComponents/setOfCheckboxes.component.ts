import { CheckBox } from './checkbox.component'

export class SetOfCheckboxes {
    constructor(private setOfCheckboxes: WebdriverIO.Element[]) {
    }

    chooseCheckboxFromSet(option: string) {
        const boxesToCheck = this.setOfCheckboxes.filter(el => { 
            return el.parentElement().getText().includes(option)
        })
        expect(boxesToCheck.length).not.toBe(0)
        boxesToCheck.map(el => {
            const needCheckbox = new CheckBox(el)
            needCheckbox.setToTrue()
        })
    }
}