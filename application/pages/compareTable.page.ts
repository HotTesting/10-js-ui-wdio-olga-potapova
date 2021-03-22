export class CompareTable {
    private get compareTableItems(): WebdriverIO.Element[] {
        return $$('#content tbody tr')
    }

    get prices(): string [] {
        const priceRows = this.compareTableItems.find(row => row.$('td:first-of-type').getText() == 'Price')
        return priceRows.$$('td').map(row => row.getText())
    }

    get quantity(): number {
        return $$('#content tbody tr td img').length
    }
}