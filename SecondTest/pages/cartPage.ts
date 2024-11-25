import { type Page } from '@playwright/test';

class CartPage {
    private page: Page;
    private cart_path: string;
    constructor(page: Page) {
        this.page = page;
        this.cart_path = 'https://ramonki.by/cart';
    }

    async open() {
        await this.page.goto(this.cart_path);
        await this.page.waitForSelector('//div[@class="cart__main"]');
    }

    async navigateTo(section_name: string) {
        const section_link_span_selector = `//a[@class="drop-menu__link"]/span[contains(text(), "${section_name}") and not(*)]`;
        await this.page.locator('button.button.catalog-button').click()
        await this.page.waitForSelector(section_link_span_selector);
        await this.page.locator(section_link_span_selector).click();
    }

    async getFirstProductInfo() {
        const title_in_cart = await this.page.locator('//a[@class="cart-item__text"]').innerText();
        const price_in_cart = (await this.page.locator('//p[@class="cart-item__price"]').innerText()).split('\n')[1].trim().split(' ')[0];
        const size_in_cart = (await this.page.locator('//p[@class="cart-item__text" and contains(text(), "Размер")]').innerText()).split(' ')[1];
        return { title_in_cart, price_in_cart, size_in_cart };
    }

}

export default CartPage;