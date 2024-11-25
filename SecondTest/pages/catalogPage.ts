import { type Page } from '@playwright/test';

class CatalogPage {
    private page: Page;
    private first_product_selector: string;
    constructor(page: Page) {
        this.page = page;
        this.first_product_selector = '//main/div[contains(@class, "product-card")][1]';
    }

    async navigateTo(section_name: string) {
        const section_link_span_selector = `//a[@class="drop-menu__link"]/span[contains(text(), "${section_name}") and not(*)]`;
        await this.page.locator('button.button.catalog-button').click()
        await this.page.waitForSelector(section_link_span_selector);
        await this.page.locator(section_link_span_selector).click();
    }

    async getFirstProductInfo() {
        await this.page.waitForSelector(this.first_product_selector);
        await this.page.waitForTimeout(1000);
        const first_product = this.page.locator(this.first_product_selector);
        await first_product.scrollIntoViewIfNeeded();

        const title = await this.page.locator(this.first_product_selector + '//div[@class="product-card-description__title-kit"]').innerText();
        let price_raw = await this.page.locator(this.first_product_selector + '//span[@class="product-card-description__price-current"]').innerText();
        price_raw = price_raw.replace('\u00A0', ' ');
        const price = price_raw.split(' ')[0];
        return { title, price };
    }

    async addFirstProductToCart() {
        await this.page.locator(this.first_product_selector + '//div[@class="product-card-description__buy"]').click();
    }
}

export default CatalogPage;