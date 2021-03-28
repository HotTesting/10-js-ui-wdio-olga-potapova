import { SuccessMessage } from "../commonPageComponents/successMessage.component"
import { SetOfCheckboxes } from "../../elementsComponents/setOfCheckboxes.component"
import { SetOfRadios } from "../../elementsComponents/setOfRadios.component"
import { AppleCinema30Parameters } from "./components/appleCinema30.component"

export class ProductDetailsPage {
    private content: WebdriverIO.Element
    constructor() {
        this.content = $('#content')
    }

    get heading(): WebdriverIO.Element {
        return this.content.$('#content h1')
    }

    selectOptionFromCheckboxes(option: string) {
        const options = new SetOfCheckboxes($$('#content div.checkbox label input'))
        options.chooseCheckboxFromSet(option)
    }

    selectOptionFromRadios(option: string) {
        const options = new SetOfRadios($$('#content div.radio label input'))
        options.chooseRadioFromSet(option)
    }


    selectOptionFromSelector(option: string) {
        const selector = this.content.$('#content select.form-control')
        expect(selector).toBeDisplayed({ message: "There is no add to cart button" })
        selector.selectByVisibleText(option)
    }

    enterQuantity(number: string) {
        const qty = this.content.$('#content input#input-quantity')
        expect(qty).toBeDisplayed({ message: "There is no quantity input" })
        qty.setValue(number)
    }

    addToCart() {
        const cartButton = this.content.$('#content button#button-cart')
        expect(cartButton).toBeDisplayed({ message: "There is no add to cart button" })
        cartButton.click()
    }

    get successMessage(): SuccessMessage {
        return new SuccessMessage()
    }

    get productParameters(): {
        appleCinema30: AppleCinema30Parameters
        // to do: add more products... 
    } {
        return {
            appleCinema30: new AppleCinema30Parameters()
        }
    }
}