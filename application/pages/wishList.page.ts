export class WishList {
    private get wishListElements(): WebdriverIO.Element[] {
        return $$('#content tbody tr')
    }

    get prices(): string [] {
        return this.wishListElements.map(row => row.$('div.price').getText())
    }

    get quantity(): number {
        return this.wishListElements.length
    }
}