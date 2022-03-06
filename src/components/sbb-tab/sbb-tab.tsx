import { Component, Element, Host, h, Prop, State, Event, EventEmitter, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'sbb-tab',
  styleUrl: 'sbb-tab.css',
  shadow: true,
})
export class SbbTab {
  @Element() el!: HTMLElement;

  @Prop() label?: string;
  @Prop() active = false;

  @State() _hasLabelElement = false;

  @Event() tabLabelChanged!: EventEmitter<void>;

  render() {
    return (
      <Host slot="sbb-tab">
        <template>
          {this._hasLabelElement ? '' : <span>{this.label}</span>}
          <slot name="sbb-tab-label" onSlotchange={this._handleLabelSlotChange} />
        </template>
        {this.active && <slot></slot>}
      </Host>
    );
  }

  @Watch('label')
  _handleLabelChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      setTimeout(() => this.tabLabelChanged.emit());
    }
  }

  @Listen('tabLabelContentChanged')
  _handleTabLabelChanged(_event: CustomEvent<void>) {
    this.tabLabelChanged.emit();
  }

  private _handleLabelSlotChange = (event: Event) => {
    const slot = event.composedPath()[0] as HTMLSlotElement;
    const hasLabelElement = !!slot.assignedNodes().length;
    if (hasLabelElement !== this._hasLabelElement) {
      this._hasLabelElement = hasLabelElement;
    }
  };
}
