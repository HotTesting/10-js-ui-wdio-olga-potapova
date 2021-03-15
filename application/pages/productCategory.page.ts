import { ProductCardComponent } from "./components/productCard.component"
import { SuccessMessage } from "./components/successMessage.component"
import { TopLinks } from "./components/toplinks.component"


export class ProductCategoryPage {
    topLinks: TopLinks = new TopLinks()

    open(url: string) {
        browser.url(url)
    }

    get products(): ProductCardComponent[] {
        return $$('div.product-layout').map(elem => {
            return new ProductCardComponent(elem)
        })
    }

    get successMessage(): SuccessMessage {
        return new SuccessMessage()
    }

}