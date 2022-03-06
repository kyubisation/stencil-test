import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sbb-card-label',
  styleUrl: 'sbb-card-label.css',
  shadow: true,
})
export class SbbCardLabel {

  render() {
    return (
      <Host slot="sbb-card-label">
        <slot></slot>
      </Host>
    );
  }

}
