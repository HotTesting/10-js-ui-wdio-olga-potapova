import { Radio } from './radio.component'

export class SetOfRadios {
    constructor(private setOfRadios: WebdriverIO.Element []) {
    }

    chooseRadioFromSet(option: string) {
        const needed = this.setOfRadios.find(el => el.parentElement().getText().includes(option))
        expect(needed).toBeDefined()
        const needRadio = new Radio(needed)
        needRadio.setToTrue()
    }
}