import { ConfirmationPage } from './pages/checkout/confirmation.page'
import { CheckoutPage } from './pages/checkout/index'
import { CompareTable } from './pages/compareTable.page'
import { ContactUsPage } from './pages/contactUs.page'
import { GiftSertificatePage } from './pages/gift.page'
import { HomePage } from './pages/home.page'
import { LoginPage } from './pages/login.page'
import { ProductCategoryPage } from './pages/productCategory/productCategory.page'
import { RegistrationPage } from './pages/registration.page'
import { ReturnPage } from './pages/return.page'
import { SearchPage } from './pages/search.page'
import { ShoppingCart } from './pages/shoppingCart.page'
import { WishList } from './pages/wishList.page'


export class App {
    home: HomePage
    productCategory: ProductCategoryPage
    checkout: CheckoutPage
    confirmation: ConfirmationPage
    registration: RegistrationPage
    wishList: WishList
    compareTable: CompareTable
    shoppingCart: ShoppingCart
    login: LoginPage
    return: ReturnPage
    gift: GiftSertificatePage
    contactUs: ContactUsPage
    search: SearchPage

    constructor() {
        this.home = new HomePage()
        this.productCategory = new ProductCategoryPage()
        this.checkout = new CheckoutPage()
        this.confirmation = new ConfirmationPage()
        this.registration = new RegistrationPage()
        this.wishList = new WishList()
        this.compareTable = new CompareTable()
        this.shoppingCart = new ShoppingCart()
        this.login = new LoginPage()
        this.return = new ReturnPage()
        this.gift = new GiftSertificatePage()
        this.contactUs = new ContactUsPage()
        this.search = new SearchPage()
    }
}