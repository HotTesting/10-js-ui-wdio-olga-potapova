import { ProductCardComponent } from './productCategoryComponents/productCard.component'
import { SuccessMessage } from '../commonPageComponents/successMessage.component'
import { TopLinks } from '../commonPageComponents/toplinks.component'


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