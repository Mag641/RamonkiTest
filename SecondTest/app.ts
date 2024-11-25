import { test, expect } from '@playwright/test';

async function main() {
    const { chromium } = require('playwright'); // или другая библиотека (firefox, webkit)
    const browser = await chromium.launch({'headless': false});
    const page = await browser.newPage();

    await page.goto('https://ramonki.by'); 

    await page.locator('button.button.catalog-button').click()

    const dresses_link_span_selector = '//a[@class="drop-menu__link"]/span[contains(text(), "Платья и сарафаны") and not(*)]';
    await page.waitForSelector(dresses_link_span_selector);
    await page.locator(dresses_link_span_selector).click();

    const first_product_selector = '//main/div[contains(@class, "product-card")][1]';
    await page.waitForSelector(first_product_selector);
    await page.waitForTimeout(1000);
    const first_product = page.locator(first_product_selector);
    await first_product.scrollIntoViewIfNeeded();

    await page.locator('//button[contains(text(), "Отклонить все")]').click();

    const title = await page.locator(first_product_selector + '//div[@class="product-card-description__title-kit"]').innerText();
    const price = (await page.locator(first_product_selector + '//span[@class="product-card-description__price-current"]').innerText()).split(' ')[0];

    await page.locator(first_product_selector + '//div[@class="product-card-description__buy"]').click();

    await page.waitForSelector('//div[@class="options-selector-modal"]');
    await page.waitForTimeout(500);

    const first_size_li_selector = '//div[@class="options-selector" and .//span[contains(text(), "Выберите размер")]]//li[1]'
    const first_size_li = page.locator(first_size_li_selector);

    const size = await first_size_li.innerText();

    console.log(title);
    console.log(price);
    console.log(size);

    await first_size_li.click();
    await page.locator('//button[contains(text(), "Выбрать")]').click();
    //await page.locator('//button[contains(text(), "Продолжить покупки")]').click();

    await page.goto('/cart');
    await page.waitForSelector('//div[@class="cart__main"]');

    const title_in_cart = await page.locator('//a[@class="cart-item__text"]').innerText();
    const size_in_cart = (await page.locator('//p[@class="cart-item__text" and contains(text(), "Размер")]').innerText()).split(' ')[1];
    const price_in_cart = (await page.locator('//p[@class="cart-item__price"]').innerText()).split('\n')[1].trim();


    console.log(title_in_cart);
    console.log(price_in_cart);
    console.log(size_in_cart);


    await expect(title_in_cart).toEqual(title);
    await expect(price_in_cart).toEqual(price);
    await expect(size_in_cart).toEqual(size);

    //// 4. Переходим в корзину
    //await cartPage.navigateToCart();

    //// 5. Проверяем корректность добавленного товара
    //const productDetails = await cartPage.getProductDetails();
    //console.log('Детали товара:', productDetails);
    //expect(productDetails.title).toContain('Платье'); // Название товара
    //expect(productDetails.price).not.toBeNull(); // Цена должна быть указана
    //expect(productDetails.size).not.toBeNull(); // Размер должен быть указан
};

main();