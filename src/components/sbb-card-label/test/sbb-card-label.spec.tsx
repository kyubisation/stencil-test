import { newSpecPage } from '@stencil/core/testing';
import { SbbCardLabel } from '../sbb-card-label';

describe('sbb-card-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbCardLabel],
      html: `<sbb-card-label></sbb-card-label>`,
    });
    expect(page.root).toEqualHtml(`
      <sbb-card-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sbb-card-label>
    `);
  });
});
