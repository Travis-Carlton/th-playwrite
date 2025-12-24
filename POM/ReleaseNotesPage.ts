import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class ReleaseNotesPage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	async goto(): Promise<void> {
		await this.page.goto('https://playwright.dev/docs/release-notes');
	}

	getStartedNavItem(): Locator {
		return this.page.getByRole('link', { name: /^get started$/i });
	}

	getStartedSectionContainer(): Locator {
		return this.getStartedNavItem().locator('..');
	}

	async assertGetStartedMenuCollapsed(): Promise<void> {
		const container = this.getStartedSectionContainer();
		await expect(container).toHaveAttribute('aria-expanded', /false/i);
	}
}
