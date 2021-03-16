import { ConfirmationPage } from "./pages/checkout/confirmation.page";
import { CheckoutPage } from "./pages/checkout/index";
import { CompareTable } from "./pages/compareTable.page";
import { HomePage } from "./pages/home/home.page";
import { ProductCategoryPage } from "./pages/productCategory.page";
import { RegistrationPage } from "./pages/registration/registration.page";
import { ShoppingCart } from "./pages/shoppingCart.page";
import { WishList } from "./pages/wishList.page";


export class App {
    home: HomePage
    productCategory: ProductCategoryPage
    checkout: CheckoutPage
    confirmation: ConfirmationPage
    registration: RegistrationPage;
    wishList: WishList;
    compareTable: CompareTable;
    shoppingCart: ShoppingCart;

    constructor() {
        this.home = new HomePage()
        this.productCategory = new ProductCategoryPage()
        this.checkout = new CheckoutPage()
        this.confirmation = new ConfirmationPage()
        this.registration = new RegistrationPage();
        this.wishList = new WishList();
        this.compareTable = new CompareTable();
        this.shoppingCart = new ShoppingCart();
    }
}