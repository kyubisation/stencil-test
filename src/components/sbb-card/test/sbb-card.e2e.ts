import { newE2EPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-card></sbb-card>');

    const element = await page.find('sbb-card');
    expect(element).toHaveClass('hydrated');
  });
});
