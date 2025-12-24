import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class AuthLoginPage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	async goto(): Promise<void> {
		await this.page.goto('http://localhost:3000/');
	}

	usernameInput(): Locator {
		return this.page.getByLabel(/username/i);
	}

	passwordInput(): Locator {
		return this.page.getByLabel(/password/i);
	}

	loginButton(): Locator {
		return this.page.getByRole('button', { name: /log in|login/i });
	}

	errorMessage(): Locator {
		return this.page.getByText(/invalid|error|wrong/i);
	}

	async login(username: string, password: string): Promise<void> {
		await this.usernameInput().fill(username);
		await this.passwordInput().fill(password);
		await this.loginButton().click();
	}

	async assertLoginFailed(): Promise<void> {
		await expect(this.errorMessage()).toBeVisible();
	}
}
