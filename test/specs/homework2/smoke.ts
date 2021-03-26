describe('Website', () => {


  /**
  - Try to implement as much tests as you can
  - Do not overload tests with logic, be simple
  - browser.pause() allowed
  - copy/paste is allowed
  - prefer css selectors
  - don't forget about assertions
  */

  // this test gives you 20 points
  // http://93.126.97.71:10082/index.php?route=account/return/add
  // Notice that datepicker is optional
  
  // http://93.126.97.71:10082/index.php?route=account/voucher
  // this test gives you 20 points
  
  // this test gives you 20 points
  // http://93.126.97.71:10082/index.php?route=information/contact
  describe('Contact us form', function () {
    it('must send messages to shop administration', function () {
      browser.deleteCookies()
      browser.url('/index.php?route=information/contact')
      
      const content = $('#content')

      const name = content.$('#input-name')
      expect(name).toBeVisible({
        message: 'Name input didn\'t appear'
      })
      name.setValue('Test1')

      const email = content.$('#input-email')
      expect(email).toBeVisible({
        message: 'Email input didn\'t appear'
      })
      email.setValue(`Test1${Date.now()}@example.com`)

      const enquiry = content.$('#input-enquiry')
      expect(enquiry).toBeVisible({
        message: 'Enquiry input didn\'t appear'
      })
      enquiry.setValue('Hi everyone here is the message for you')

      const submit = content.$('input[type="submit"]')
      expect(submit).toBeVisible({
        message: 'Email input didn\'t appear'
      })
      submit.click()

      const heading = content.$('h1')

      expect(heading).toHaveText('Contact Us')

      const continueButton = content.$('a.btn.btn-primary')
      expect(continueButton).toBeVisible({
        message: 'Continue button didn\'t appear'
      })
      continueButton.click()

      expect(browser).toHaveUrlContaining('route=common/home')
    })
  })

  // Each implemented test gives you 20 points 
  describe('Items search', function () {
    it('should show results in case multiple items matches', function () {
      browser.deleteCookies()
      browser.url('/index.php?route=common/home')
      const content = $('#content')

      const searchField = $('input[name="search"]')
      expect(searchField).toBeVisible({
        message: 'Search field didn\'t appear'
      })
      searchField.setValue('ipod\n')

      const heading = content.$('h2')
      expect(heading).toHaveText('Products meeting the search criteria')

      const foundItems = $$('div.product-layout.product-grid')
      expect(foundItems.length).toBe(4)

      foundItems.forEach(el => {
        const searchResultHeader = el.$('h4 a')
        expect(searchResultHeader).toHaveTextContaining('iPod')
      })
    })

    it('should redirect to \'no matching results\' in case no items matched', function () {
      browser.deleteCookies()
      browser.url('/index.php?route=common/home')
      const content = $('#content')

      const searchField = $('input[name="search"]')
      expect(searchField).toBeVisible({
        message: 'Search field didn\'t appear'
      })
      searchField.setValue('tratata\n')
      
      const heading = content.$('h2')
      expect(heading).toHaveText('Products meeting the search criteria')

      const noResultsMessage = content.$('p=There is no product that matches the search criteria.')
      expect(noResultsMessage).toBePresent()

      const foundItems = $$('div.product-layout.product-grid')
      expect(foundItems.length).toBe(0)
    })
  })

})