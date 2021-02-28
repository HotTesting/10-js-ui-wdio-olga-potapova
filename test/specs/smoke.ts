describe('Website', () => {
    
    it('should open', () => {
        browser.url('/');
        expect($('#logo')).toBeDisplayed();
        browser.pause(10000);
    });

    it('should allow to register', () => 
    {
        browser.url('/index.php?route=account/register');
        browser.pause(2000);    
        const content = $('#content');

        const firstName = content.$('#input-firstname');
        firstName.setValue('Test');

        const lastName = content.$('#input-lastname');
        lastName.setValue('Test');

        const email = content.$('#input-email');
        email.setValue(`Test${Date.now()}@example.com`);

        const phone = content.$('#input-telephone');
        phone.setValue('111111111111111');

        const password = content.$('#input-password');
        password.setValue('2222');

        const passwordConfirm = content.$('#input-confirm');
        passwordConfirm.setValue('2222');

        const policy = content.$('input[type="checkbox"][name="agree"]');
        policy.click();

        const continueButton = content.$('input[type="submit"][value="Continue"]');
        continueButton.click();

        const heading = content.$('h1');
        expect(heading).toHaveText('Your Account Has Been Created!');
    });

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
describe("Product return", function() {
    it("can be submited", function() {
      browser.deleteCookies('OCSESSID');
      browser.url('/index.php?route=account/return/add');
      browser.pause(2000);
      const content = $('#content');

      const firstName = content.$('#input-firstname');
      firstName.setValue('Test');

      const lastName = content.$('#input-lastname');
      lastName.setValue('Test');

      const email = content.$('#input-email');
      email.setValue(`Test${Date.now()}@example.com`);   

      const phone = content.$('#input-telephone');
      phone.setValue('1111111');   
      
      const orderID = content.$('#input-order-id');
      orderID.setValue('222222');

      const productName = content.$('#input-product');
      productName.setValue('Product1');   
      
      const productCode = content.$('#input-model');
      productCode.setValue('123456');

      const reason = content.$('label*=Dead On Arrival');
      reason.click();

      const submit = content.$('input[type="submit"]');
      submit.click();

      const successfullMessages = /*content.*/$$('#content p');
      expect(successfullMessages[0]).toHaveText("Thank you for submitting your return request. Your request has been sent to the relevant department for processing.");
      expect(successfullMessages[1]).toHaveText("You will be notified via e-mail as to the status of your request.");
    });
});

  // http://93.126.97.71:10082/index.php?route=account/voucher
  // this test gives you 20 points
describe("Gift Certificate", function() {
    it("can be purchased", function() {
      browser.deleteCookies('OCSESSID');
      browser.url('/index.php?route=account/voucher');
      browser.pause(2000);
      const content = $('#content');

      const recipientName = content.$('[name="to_name"]');
      recipientName.setValue('Test1');

      const recipientEmail = content.$('#input-to-email');
      recipientEmail.setValue(`Test1${Date.now()}@example.com`);

      const fromName = content.$('#input-from-name');
      fromName.setValue('Test2');

      const fromEmail = content.$('#input-from-email');
      fromEmail.setValue('Test2${Date.now()}@example.com');   

      const reason = content.$('label*=Christmas');
      reason.click();

      const agreeToNotRefundable = content.$('[type="checkbox"]');
      agreeToNotRefundable.click();

      const submit = content.$('input[type="submit"]');
      submit.click();

      const heading = content.$('h1');
      expect(heading).toHaveText('Purchase a Gift Certificate')
      
      const successfullMessage = content.$('#content p');
      expect(successfullMessage).toHaveText('This gift certificate will be emailed to the recipient after your order has been paid for.')
    });
});   

  // this test gives you 20 points
  // http://93.126.97.71:10082/index.php?route=information/contact
describe("Contact us form", function() {
    it("must send messages to shop administration", function() {
      browser.deleteCookies('OCSESSID');
      browser.url('/index.php?route=information/contact');
      browser.pause(2000);
      const content = $('#content');

      const name = content.$('#input-name');
      name.setValue('Test1');

      const email = content.$('#input-email');
      email.setValue(`Test1${Date.now()}@example.com`);

      const enquiry = content.$('#input-enquiry');
      enquiry.setValue('Hi everyone here is the message for you');

      const submit = content.$('input[type="submit"]');
      submit.click();

      const heading = content.$('h1');
      expect(heading).toHaveText('Contact Us');
      
      const continueButton = content.$('a.btn.btn-primary');
      continueButton.click();

      expect(browser).toHaveUrlContaining('route=common/home');
    });
  });

// Each implemented test gives you 20 points 
describe("Items search", function() {
    it("should show results in case multiple items matches", function() {
      browser.deleteCookies('OCSESSID');
      browser.url('/index.php?route=common/home');
      browser.pause(2000);
      const content = $('#content');

      const searchField = $('input[name="search"]');
      searchField.setValue('ipod\n');
      
      const heading = content.$('h2');
      expect(heading).toHaveText('Products meeting the search criteria');

      const foundItems = $$('div.product-layout.product-grid');
      expect(foundItems.length).toBe(4);

      foundItems.forEach(el => {
        const searchResultHeader = el.$('h4 a');
        expect(searchResultHeader).toHaveTextContaining('iPod');
      });
    });
  
    it("should redirect to 'no matching results' in case no items matched", function() {
      browser.deleteCookies('OCSESSID');
      browser.url('/index.php?route=common/home');
      browser.pause(2000);
      const content = $('#content');

      const searchField = $('input[name="search"]');
      searchField.setValue('tratata\n');

      const foundItems = $$('div.product-layout.product-grid');
      expect(foundItems.length).toBe(0);
      
      const heading = content.$('h2');
      expect(heading).toHaveText('Products meeting the search criteria');

      const noResultsMessage = content.$('p=There is no product that matches the search criteria.');
      expect(noResultsMessage).toBePresent();
    });
  });
  
})