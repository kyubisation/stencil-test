import { newE2EPage } from '@stencil/core/testing';

describe('sbb-tab-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sbb-tab-group></sbb-tab-group>');

    const element = await page.find('sbb-tab-group');
    expect(element).toHaveClass('hydrated');
  });
});
