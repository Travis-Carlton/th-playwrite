import { test, expect } from '@playwright/test';
import { DocsHomePage } from '../POM/DocsHomePage';
import { DocsLocatorsPage } from '../POM/DocsLocatorsPage';
import { ReleaseNotesPage } from '../POM/ReleaseNotesPage';

test.describe('Playwright docs site', () => {
	test('PW-DOC-01 home page has correct H1', async ({ page }) => {
		const home = new DocsHomePage(page);

		await home.goto();

		await expect(home.mainHeading()).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
	});

	test('PW-DOC-02 search navigates to Locators page', async ({ page }) => {
		const home = new DocsHomePage(page);
		const locators = new DocsLocatorsPage(page);

		await home.goto();
		await home.openSearch();
		await home.search('locators');
		await home.openSearchResult('Locators');

		await locators.assertOnPage();
	});

	test('PW-DOC-03 footer copyright uses regex for year', async ({ page }) => {
		const home = new DocsHomePage(page);

		await home.goto();

		const footerText = await home.footer().innerText();

		expect(footerText).toMatch(/Copyright\s+©\s+\d{4}\s+Microsoft/i);
	});

	test('PW-DOC-04 visual snapshot of stable region', async ({ page }) => {
		const home = new DocsHomePage(page);

		await home.goto();

		const main = page.locator('main');
		await expect(main).toHaveScreenshot('docs-main.png');
	});

	test('PW-DOC-05 release notes Get Started menu is collapsed', async ({ page }) => {
		const releaseNotes = new ReleaseNotesPage(page);

		await releaseNotes.goto();
		await releaseNotes.collapseGetStartedMenu();
		await releaseNotes.assertGetStartedMenuCollapsed();
	});
});
