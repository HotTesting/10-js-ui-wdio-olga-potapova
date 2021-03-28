export class AppleCinema30Parameters {
    typeText(text: string) {
        const textField = $('input#input-option208')
        expect(textField).toBeDisplayed({ message:'Text input didn\'t shown on the page'})
        textField.setValue(text)
    }
    
    typeTextArea(text: string) {
        const textAreaField = $('textarea#input-option209')
        expect(textAreaField).toBeDisplayed({ message:'Text area input didn\'t shown on the page'})
        textAreaField.setValue(text)
    }

    chooseDate(date: string) {
        const dateField = $('input#input-option219')
        expect(dateField).toBeDisplayed({ message: 'Date field isn\'t shown on the page' })
        dateField.clearValue()
        dateField.setValue(date)
    }

    chooseTime(time: string) {
        const timeField = $('input#input-option221')
        expect(timeField).toBeDisplayed({ message: 'Time field isn\'t shown on the page'})
        timeField.clearValue()
        timeField.setValue(time)
    }

    chooseDateAndTime(time: string) {
        const dateAndTimeField = $('input#input-option220')
        expect(dateAndTimeField).toBeDisplayed({ message: 'Date and Time field isn\'t shown on the page'})
        dateAndTimeField.clearValue()
        dateAndTimeField.setValue(time)
    }
}