import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-tab></sbb-tab>');

    const element = await page.find('sbb-tab');
    expect(element).toHaveClass('hydrated');
  });
});
