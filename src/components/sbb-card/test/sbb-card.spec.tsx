import { newSpecPage } from '@stencil/core/testing';
import { SbbCard } from '../sbb-card';

describe('sbb-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbCard],
      html: `<sbb-card></sbb-card>`,
    });
    expect(page.root).toEqualHtml(`
      <sbb-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sbb-card>
    `);
  });
});
