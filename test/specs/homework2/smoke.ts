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
  describe('Product return', function () {
    it('can be submited', function () {
      browser.deleteCookies()
      browser.url('/index.php?route=account/return/add')
      const content = $('#content')

      const firstName = content.$('#input-firstname')
      expect(firstName).toBeVisible({
        message: 'First name input wasn\'t displayed'
      })
      firstName.setValue('Test')

      const lastName = content.$('#input-lastname')
      expect(lastName).toBeVisible({
        message: 'Last name input wasn\'t displayed'
      })
      lastName.setValue('Test')

      const email = content.$('#input-email')
      expect(email).toBeVisible({
        message: 'Email input wasn\'t displayed'
      })
      email.setValue(`Test${Date.now()}@example.com`)

      const phone = content.$('#input-telephone')
      expect(phone).toBeVisible({
        message: 'Phone number input wasn\'t displayed'
      })
      phone.setValue('1111111')

      const orderID = content.$('#input-order-id')
      expect(orderID).toBeVisible({
        message: 'Order ID input wasn\'t displayed'
      })
      orderID.setValue('222222')

      const productName = content.$('#input-product')
      expect(productName).toBeVisible({
        message: 'Product name input wasn\'t displayed'
      })
      productName.setValue('Product1')

      const productCode = content.$('#input-model')
      expect(productCode).toBeVisible({
        message: 'Product code input wasn\'t displayed'
      })
      productCode.setValue('123456')

      const reason = content.$('label*=Dead On Arrival')
      expect(reason).toBeVisible({
        message: 'Reason input wasn\'t displayed'
      })
      reason.click()

      const submit = content.$('input[type="submit"]')
      expect(submit).toBeVisible({
        message: 'Submit button input wasn\'t displayed'
      })
      submit.click()

      const successfullMessages = content.$$('p')
      expect(successfullMessages[0]).toHaveText('Thank you for submitting your return request. Your request has been sent to the relevant department for processing.')
      expect(successfullMessages[1]).toHaveText('You will be notified via e-mail as to the status of your request.')
    })
  })

  // http://93.126.97.71:10082/index.php?route=account/voucher
  // this test gives you 20 points
  describe('Gift Certificate', function () {
    it('can be purchased', function () {
      browser.deleteCookies()
      browser.url('/index.php?route=account/voucher')
      const content = $('#content')

      const recipientName = content.$('[name="to_name"]')
      expect(recipientName).toBeVisible({
        message: 'recipient name input wasn\'t displayed'
      })
      recipientName.setValue('Test1')

      const recipientEmail = content.$('#input-to-email')
      expect(recipientEmail).toBeVisible({
        message: 'Recipient email input wasn\'t displayed'
      })
      recipientEmail.setValue(`Test1${Date.now()}@example.com`)

      const fromName = content.$('#input-from-name')
      expect(fromName).toBeVisible({
        message: 'From name input wasn\'t displayed'
      })
      fromName.setValue('Test2')

      const fromEmail = content.$('#input-from-email')
      expect(fromEmail).toBeVisible({
        message: 'From email input wasn\'t displayed'
      })
      fromEmail.setValue('Test2${Date.now()}@example.com')

      const reason = content.$('label*=Christmas')
      expect(reason).toBeVisible({
        message: 'Reason input wasn\'t displayed'
      })
      reason.click()

      const agreeToNotRefundable = content.$('[type="checkbox"]')
      expect(agreeToNotRefundable).toBeVisible({
        message: 'Agree to not refundable checkbox wasn\'t displayed'
      })
      agreeToNotRefundable.click()

      const submit = content.$('input[type="submit"]')
      expect(submit).toBeVisible({
        message: 'Submit button wasn\'t displayed'
      })
      submit.click()

      const heading = content.$('h1')
      expect(heading).toHaveText('Purchase a Gift Certificate')

      const successfullMessage = content.$('#content p')
      expect(successfullMessage).toHaveText('This gift certificate will be emailed to the recipient after your order has been paid for.')
    })
  })

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