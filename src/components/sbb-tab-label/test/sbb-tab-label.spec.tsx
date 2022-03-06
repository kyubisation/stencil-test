import { newSpecPage } from '@stencil/core/testing';
import { SbbTabLabel } from '../sbb-tab-label';

describe('sbb-tab-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbTabLabel],
      html: `<sbb-tab-label></sbb-tab-label>`,
    });
    expect(page.root).toEqualHtml(`
      <sbb-tab-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sbb-tab-label>
    `);
  });
});
