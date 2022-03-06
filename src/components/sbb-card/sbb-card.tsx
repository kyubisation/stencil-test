import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'sbb-card',
  styleUrl: 'sbb-card.css',
  shadow: true,
})
export class SbbCard {
  render() {
    return (
      <Host>
        <slot name="sbb-card-label" />
        Main Content:
        <p>
          <slot></slot>
        </p>
      </Host>
    );
  }
}
