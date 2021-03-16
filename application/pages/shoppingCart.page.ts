export class ShoppingCart {
    private get shoppingCartItems(): WebdriverIO.Element[] {
        return $$('#content form tbody tr');
    }

    get prices(): string [] {
        return this.shoppingCartItems.map(row => row.$('.//td[5]').getText());
    }

    get numberOfProducts(): string [] {
        return this.shoppingCartItems.map(row => row.$('input[name*=quantity]').getAttribute('value')); 
    }

    get quantity(): number {
        return this.shoppingCartItems.length
    }
}