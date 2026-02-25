import { test, expect } from '@playwright/test';

test.describe('Admin Project Management', () => {
  test('Admin accesses the project page', async ({ page }) => {
    // Given I am logged in as an admin
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');

    // When I navigate to the project page
    await page.goto('/admin/project');

    // Then I should see a list of existing projects
    await expect(page.locator('text=Existing Projects')).toBeVisible();
  });

  test('Admin sets up a new project', async ({ page }) => {
    // Given I am on the project page
    await page.goto('/admin/project');

    // When I click on "Setup New Project"
    await page.click('text=Setup New Project');

    // And I enter "New Project" as the project name
    await page.fill('input[placeholder="Project Name"]', 'New Project');

    // And I enter "2023-11-01" as the start date
    await page.fill('input[placeholder="Start Date"]', '2023-11-01');

    // And I enter "2024-11-01" as the end date
    await page.fill('input[placeholder="End Date"]', '2024-11-01');

    // And I submit the form
    await page.click('button:has-text("Submit New Project")');

    // Then I should see a confirmation message "Project Created Successfully"
    await expect(page.locator('text=Project Created Successfully')).toBeVisible();
  });

  test('Admin enters invalid project dates', async ({ page }) => {
    // Given I am on the project setup form
    await page.goto('/admin/project');

    // When I enter "New Project" as the project name
    await page.fill('input[placeholder="Project Name"]', 'New Project');

    // And I enter "2024-11-01" as the start date
    await page.fill('input[placeholder="Start Date"]', '2024-11-01');

    // And I enter "2023-11-01" as the end date
    await page.fill('input[placeholder="End Date"]', '2023-11-01');

    // And I submit the form
    await page.click('button:has-text("Submit New Project")');

    // Then I should see an error message "End date must be after start date"
    await expect(page.locator('text=End date must be after start date')).toBeVisible();
  });

  test('Admin tries to create a project without a name', async ({ page }) => {
    // Given I am on the project setup form
    await page.goto('/admin/project');

    // When I leave the project name field empty
    // And I enter "2023-11-01" as the start date
    await page.fill('input[placeholder="Start Date"]', '2023-11-01');

    // And I enter "2024-11-01" as the end date
    await page.fill('input[placeholder="End Date"]', '2024-11-01');

    // And I submit the form
    await page.click('button:has-text("Submit New Project")');

    // Then I should see an error message "Project name is required"
    await expect(page.locator('text=Project name is required')).toBeVisible();
  });
});
