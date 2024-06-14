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

test("Should show hotel detail",async ({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button",{name:"Search"}).click();

    await page.getByText("Dublin Getaways").click();
    // this is a regex so this ensures url HAS the word detail , as, if we added the whole input, it could change in the future
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button",{name:"Book Now"})).toBeVisible();
})

test("should book hotel" , async ({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    
    // find out how u get this details
    const date = new Date();
    date.setDate(date.getDate()+3)
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    
    await page.getByRole("button",{name:"Search"}).click();

    await page.getByText("Dublin Getaways").click();
    await page.getByRole("button", { name: "Book Now" }).click();
    
    await expect(page.getByText("Total Cost: AED 357.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/42");
    await stripeFrame.locator('[placeholder="CVC"]').fill("444");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("44444");

    await page.getByRole("button",{name:"Confirm Booking"}).click();
    await expect(page.getByText("Booking Saved")).toBeVisible();
})