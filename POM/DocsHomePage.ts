import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class DocsHomePage {
	constructor(readonly page: Page) {}

	async goto(): Promise<void> {
		await this.page.goto('https://playwright.dev/');
	}

	mainHeading(): Locator {
		return this.page.getByRole('heading', { level: 1 });
	}

	searchButton(): Locator {
		return this.page.getByRole('button', { name: /search/i });
	}

	searchInput(): Locator {
		return this.page.getByPlaceholder(/search/i);
	}

	async openSearch(): Promise<void> {
		await this.searchButton().click();
		await expect(this.searchInput()).toBeVisible();
	}

	async search(term: string): Promise<void> {
		await this.searchInput().fill(term);
	}

	async openSearchResult(resultName: string): Promise<void> {
		await this.page.getByRole('link', { name: resultName }).first().click();
	}

	footer(): Locator {
		return this.page.locator('footer');
	}
}
