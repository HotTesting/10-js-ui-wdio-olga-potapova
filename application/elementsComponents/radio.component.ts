export class Radio {
    constructor(private radio: WebdriverIO.Element) {
        //this.root = root //is done like this by declaration above 
    }

    isChecked(): boolean {
        return this.radio.isSelected()
    }

    setToTrue() {
        expect(this.radio).toBeClickable({ wait: 5000, message: 'Radio isn\'t clickable. Probably invalid label text is sent' })
        expect(this.radio).toHaveAttribute('type', 'radio', { message: 'This is not a radio' })
        if(this.isChecked() == false) {
            this.radio.click()
        }
        expect(this.isChecked()).toBe(true)
    }

    setToFalse() {
        expect(this.radio).toBeClickable({ wait: 5000, message: 'Radio isn\'t clickable' })
        expect(this.radio).toHaveAttribute('type', 'radio', { message: 'This is not a radio. Probably invalid label text is sent' })
        if(this.isChecked() == true) {
            this.radio.click()
        }
        expect(this.isChecked()).toBe(false)
    }
}