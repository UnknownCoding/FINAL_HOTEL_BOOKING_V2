import test, { expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({page})=>{
    // sign user in
    await page.goto(UI_URL);

    await page.getByRole("link",{name:"Sign In"}).click();

    await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");

    await page.getByRole("button",{name:"Login"}).click();

    await expect(page.getByText("Login Success")).toBeVisible();
    await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
    await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();

})


test("Should show a new hotel with the search results", async ({page}) => {
    await page.goto(UI_URL);
    
    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button",{name:"Search"}).click();

    await expect(page.getByText("1 Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways")).toBeVisible();

})