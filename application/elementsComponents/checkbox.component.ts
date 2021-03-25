export class CheckBox {
    constructor(private checkbox: WebdriverIO.Element) {
        //this.root = root //is done like this by declaration above 
    }

    isChecked(): boolean {
        return this.checkbox.isSelected()
    }

    setToTrue() {
        expect(this.checkbox).toBeClickable({ wait: 5000, message: 'Checkbox isn\'t clickable. Probably invalid label text is sent' })
        expect(this.checkbox).toHaveAttribute('type', 'checkbox', { message: 'This is not a checkbox' })
        if(this.isChecked() == false) {
            this.checkbox.click()
        }
        expect(this.isChecked()).toBe(true)
    }

    setToFalse() {
        expect(this.checkbox).toBeClickable({ wait: 5000, message: 'Checkbox isn\'t clickable. Probably invalid label text is sent' })
        expect(this.checkbox).toHaveAttribute('type', 'checkbox', { message: 'This is not a checkbox' })
        if(this.isChecked() == true) {
            this.checkbox.click()
        }
        expect(this.isChecked()).toBe(false)
    }
}