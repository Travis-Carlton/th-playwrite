import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class DocsLocatorsPage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	heading(): Locator {
		return this.page.getByRole('heading', { name: 'Locators', exact: true });
	}

	async assertOnPage(): Promise<void> {
		await expect(this.page).toHaveURL(/\/docs\/locators/);
		await expect(this.heading()).toBeVisible();
	}
}
