export class ProductCardComponent {
    constructor(private root: WebdriverIO.Element) {
        //this.root = root //is done like this by declaration above 
    }

    title(): string {
        return this.root.$('h4').getText()
    }

    addToCart() {
        const addButton = this.root.$('button[onclick*="cart.add"]')
        expect(addButton).toBeVisible()
        addButton.click()
    };

    addToWishList() {
        const addToWishListButton = this.root.$('button[onclick*="wishlist.add"]')
        expect(addToWishListButton).toBeVisible()
        addToWishListButton.click()
    }

    compareThisProduct() {
        const addToCompareButton = this.root.$('button[onclick*="compare.add"]')
        expect(addToCompareButton).toBeVisible()
        addToCompareButton.click()
    }

    openDetails(){
        const linkToDetails = this.root.$('h4 a')
        expect(linkToDetails).toBeVisible()
        linkToDetails.click()
    }
}