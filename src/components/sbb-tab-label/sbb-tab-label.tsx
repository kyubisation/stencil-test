import { Component, Element, Event, Host, h, EventEmitter, ComponentInterface } from '@stencil/core';

const contentObserverConfig: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};

@Component({
  tag: 'sbb-tab-label',
  styleUrl: 'sbb-tab-label.css',
  shadow: true,
})
export class SbbTabLabel implements ComponentInterface {
  @Element() el!: HTMLElement;
  @Event() tabLabelContentChanged!: EventEmitter<void>;

  private _observer = new MutationObserver(() => this.tabLabelContentChanged.emit());

  render() {
    return (
      <Host slot="sbb-tab-label">
        <slot></slot>
      </Host>
    );
  }

  connectedCallback() {
    this._observer.observe(this.el, contentObserverConfig);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }
}
