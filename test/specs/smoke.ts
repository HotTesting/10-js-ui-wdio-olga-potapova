describe('Website', () => {
    
    it('should open', () => {
        browser.url('/');
        expect($('#logo')).toBeDisplayed();
        browser.pause(10000);
    })
})