"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { chromium } = require('playwright'); // или другая библиотека (firefox, webkit)
        const browser = yield chromium.launch({ 'headless': false });
        const page = yield browser.newPage();
        yield page.goto('https://ramonki.by');
        yield page.locator('button.button.catalog-button').click();
        const dresses_link_span_selector = '//a[@class="drop-menu__link"]/span[contains(text(), "Платья и сарафаны") and not(*)]';
        yield page.waitForSelector(dresses_link_span_selector);
        yield page.locator(dresses_link_span_selector).click();
        const first_product_selector = '//main/div[contains(@class, "product-card")][1]';
        yield page.waitForSelector(first_product_selector);
        yield page.waitForTimeout(1000);
        const first_product = page.locator(first_product_selector);
        yield first_product.scrollIntoViewIfNeeded();
        yield page.locator('//button[contains(text(), "Отклонить все")]').click();
        const title = yield page.locator(first_product_selector + '//div[@class="product-card-description__title-kit"]').innerText();
        const price = (yield page.locator(first_product_selector + '//span[@class="product-card-description__price-current"]').innerText()).split(' ')[0];
        yield page.locator(first_product_selector + '//div[@class="product-card-description__buy"]').click();
        yield page.waitForSelector('//div[@class="options-selector-modal"]');
        yield page.waitForTimeout(500);
        const first_size_li_selector = '//div[@class="options-selector" and .//span[contains(text(), "Выберите размер")]]//li[1]';
        const first_size_li = page.locator(first_size_li_selector);
        const size = yield first_size_li.innerText();
        console.log(title);
        console.log(price);
        console.log(size);
        yield first_size_li.click();
        yield page.locator('//button[contains(text(), "Выбрать")]').click();
        //await page.locator('//button[contains(text(), "Продолжить покупки")]').click();
        yield page.goto('/cart');
        yield page.waitForSelector('//div[@class="cart__main"]');
        const title_in_cart = yield page.locator('//a[@class="cart-item__text"]').innerText();
        const size_in_cart = (yield page.locator('//p[@class="cart-item__text" and contains(text(), "Размер")]').innerText()).split(' ')[1];
        const price_in_cart = (yield page.locator('//p[@class="cart-item__price"]').innerText()).split('\n')[1].trim();
        console.log(title_in_cart);
        console.log(price_in_cart);
        console.log(size_in_cart);
        yield (0, test_1.expect)(title_in_cart).toEqual(title);
        yield (0, test_1.expect)(price_in_cart).toEqual(price);
        yield (0, test_1.expect)(size_in_cart).toEqual(size);
        //// 4. Переходим в корзину
        //await cartPage.navigateToCart();
        //// 5. Проверяем корректность добавленного товара
        //const productDetails = await cartPage.getProductDetails();
        //console.log('Детали товара:', productDetails);
        //expect(productDetails.title).toContain('Платье'); // Название товара
        //expect(productDetails.price).not.toBeNull(); // Цена должна быть указана
        //expect(productDetails.size).not.toBeNull(); // Размер должен быть указан
    });
}
;
main();
//# sourceMappingURL=app.js.map