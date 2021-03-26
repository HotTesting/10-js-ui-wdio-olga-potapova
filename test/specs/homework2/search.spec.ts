import { App } from "../../../application/application"

beforeEach(function () {
    browser.deleteCookies()
})

describe('Items search', function () {
    it('should show results in case multiple items matches', function () {
        const app = new App()
        app.search.open()
        app.search.searchBy('ipod')
        expect(app.search.heading).toHaveText('Products meeting the search criteria', {
            wait: 5000,
            message: 'There is no heading on the search results page'
        })
        expect(app.search.results.length).toBe(4)
        app.search.results.forEach(el => {
            expect(el).toHaveTextContaining('iPod', { message: 'Shown result doesn\'t meet search criteria' })
        })
    })

    it('should redirect to \'no matching results\' in case no items matched', function () {
        const app = new App()
        app.search.open()
        app.search.searchBy('tratata')
        expect(app.search.heading).toHaveText('Products meeting the search criteria', {
            wait: 5000,
            message: 'There is no heading on the search results page'
        })
        expect(app.search.noResultsMessage).toBeDisplayed({
            message: 'There is no "No results message on the gage"'
        })
        expect(app.search.results.length).toBe(0)
    })
})