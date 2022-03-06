import { newSpecPage } from '@stencil/core/testing';
import { SbbTabGroup } from '../sbb-tab-group';

describe('sbb-tab-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbTabGroup],
      html: `<sbb-tab-group></sbb-tab-group>`,
    });
    expect(page.root).toEqualHtml(`
      <sbb-tab-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sbb-tab-group>
    `);
  });
});
