import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-tab-label></sbb-tab-label>');

    const element = await page.find('sbb-tab-label');
    expect(element).toHaveClass('hydrated');
  });
});
