import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class ReleaseNotesPage {
	constructor(readonly page: Page) { }

	async goto(): Promise<void> {
		await this.page.goto('https://playwright.dev/docs/release-notes');
	}

	getStartedNavItem(): Locator {
		return this.page
			.getByRole('navigation', { name: 'Docs sidebar' })
			.getByRole('button', { name: /^getting started$/i });
	}

	async collapseGetStartedMenu(): Promise<void> {
		const navItem = this.getStartedNavItem();
		await navItem.waitFor({ state: 'visible' });
		// Use JS click to bypass anchor href="#" behavior in Firefox
		await expect(navItem).toHaveAttribute('aria-expanded', 'true');
		await navItem.evaluate((el) => (el as HTMLElement).click());
	}

	async assertGetStartedMenuCollapsed(): Promise<void> {
		await expect(this.getStartedNavItem()).toHaveAttribute('aria-expanded', 'false');
	}
}
