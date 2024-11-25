import { test, expect } from '@playwright/test';
import CatalogPage from '../pages/catalogPage';
import CartPage from '..//pages/cartPage';

test('Добавить товар в корзину и проверить параметры', async ({ page }) => {
    await page.goto('https://ramonki.by/');
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);
    await page.waitForSelector('//button[contains(text(), "Отклонить все")]');
    await page.locator('//button[contains(text(), "Отклонить все")]').click();

    await catalogPage.navigateTo('Платья и сарафаны');
    const { title, price } = await catalogPage.getFirstProductInfo();
    await catalogPage.addFirstProductToCart();

    await page.waitForSelector('//div[@class="options-selector-modal"]');
    await page.waitForTimeout(500);

    const first_size_li_selector = '//div[@class="options-selector" and .//span[contains(text(), "Выберите размер")]]//li[1]'
    await page.waitForSelector(first_size_li_selector);
    const first_size_li = page.locator(first_size_li_selector);
    const size = await first_size_li.innerText();

    await first_size_li.click();
    await page.waitForTimeout(500);
    await page.locator('//button[contains(text(), "Выбрать")]').click();

    await cartPage.open();
    const { title_in_cart, price_in_cart, size_in_cart } = await cartPage.getFirstProductInfo();

    await expect(title_in_cart).toEqual(title);
    await expect(price_in_cart).toEqual(price);
    await expect(size_in_cart).toEqual(size);
});
