import {test,expect} from "@playwright/test";
import path from "path";


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

test("should allow user to add a hotel",async({page})=>{
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page.locator("[name=description]").fill("Test is a description for the hotel");
    await page.locator("[name=pricePerNight]").fill("100");
    await page.selectOption('select[name="starRating"]',"3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
    await page.locator("[name=adultCount]").fill("1");
    await page.locator("[name=childCount]").fill("3");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
        path.join(__dirname,"files","2.jpg"),
        path.join(__dirname,"files","3.jpg"),
        path.join(__dirname,"files","4.jpg"),
    ]);

    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();


})

test("should display hotels", async ({page})=>{
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText("Dublin Getaways")).toBeVisible();

    await expect(page.getByText('Lorem ipsum dolor sit amet, consectetur')).toBeVisible();

    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("AED 119 per night")).toBeVisible();
    await expect(page.getByText("2 adults, children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();

    // too many links soo either show one of them or comment
    // await expect(page.getByRole("link",{name:"View Details"})).toBeVisible();
    await expect(page.getByRole("link",{name:"Add Hotel"})).toBeVisible();


})