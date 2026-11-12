import { test, expect } from '../fixtures';

test('Change avatar', async ({ page, registerUser }) => {
    const newAvatar = 'https://www.svgrepo.com/show/530661/genetic-data.svg';

    await page.goto(`/articles/profile/${registerUser.username}`);
    await page.getByText("Edit profile").click();

    await page.getByTestId("settings-image").fill(newAvatar);
    await page.getByTestId("settings-submit").click();
    await expect(page.getByText("Edit Profile")).toBeVisible();

    const avatarUrl = page.locator("(//img)[2]");
    await expect(avatarUrl).toHaveAttribute("src",newAvatar);

    await page.reload();
    await expect(avatarUrl).toHaveAttribute("src", newAvatar);
})