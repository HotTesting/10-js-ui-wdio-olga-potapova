export class SearchPage {
    private content: WebdriverIO.Element
    constructor() {
        this.content = $('#content')
    }

    open() {
        browser.url('/index.php?route=common/home')
    }

    searchBy(query: string) {
        const searchField = $('input[name="search"]')
        expect(searchField).toBeVisible({
            message: 'Search field didn\'t appear'
        })
        searchField.setValue(`${query}\n`)
    }

    get heading(): WebdriverIO.Element {
        return this.content.$('h2')
    }

    get noResultsMessage(): WebdriverIO.Element {
        return this.content.$('p=There is no product that matches the search criteria.')
    }

    get results(): WebdriverIO.Element [] {
        return $$('div.product-layout.product-grid h4 a')
    }
}