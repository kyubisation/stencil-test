import { newE2EPage } from '@stencil/core/testing';

describe('sbb-card-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-card-label></sbb-card-label>');

    const element = await page.find('sbb-card-label');
    expect(element).toHaveClass('hydrated');
  });
});
