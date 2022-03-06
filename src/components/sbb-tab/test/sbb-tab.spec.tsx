import { newSpecPage } from '@stencil/core/testing';
import { SbbTab } from '../sbb-tab';

describe('sbb-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbTab],
      html: `<sbb-tab></sbb-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <sbb-tab>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sbb-tab>
    `);
  });
});
