import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { AuthLoginPage } from '../POM/AuthLoginPage';

const storageStatePath = path.resolve('.auth/storageState.json');

const VALID_USERNAME = process.env.AUTH_USER ?? 'testuser';
const VALID_PASSWORD = process.env.AUTH_PASS ?? 'testpass';

test.describe('Auth app', () => {
	test('PW-AUTH-01 login through UI and save storage state', async ({ page }) => {
		const login = new AuthLoginPage(page);

		await login.goto();
		await login.login(VALID_USERNAME, VALID_PASSWORD);

		await expect(page).toHaveURL(/login/i);

		await page.context().storageState({ path: storageStatePath });
	});

	test('PW-AUTH-02 invalid login shows error', async ({ page }) => {
		const login = new AuthLoginPage(page);

		await login.goto();
		await login.login('wrong', 'wrong');

		await login.assertLoginFailed();
	});

	test('PW-AUTH-03 storage state can access protected route', async ({ browser }) => {
		if (!fs.existsSync(storageStatePath)) {
			throw new Error('Missing storage state. Run PW-AUTH-01 first.');
		}

		const context = await browser.newContext({ storageState: storageStatePath });
		const page = await context.newPage();

		await page.goto('http://localhost:3000/protected');

		await expect(page).toHaveURL(/\/protected/);
		await expect(page.locator('body')).toContainText(/protected/i);

		await context.close();
	});

});
