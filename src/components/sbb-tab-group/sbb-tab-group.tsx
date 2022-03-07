import { Component, Element, Event, Host, h, State, Listen, Prop, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'sbb-tab-group',
  styleUrl: 'sbb-tab-group.css',
  shadow: true,
})
export class SbbTabGroup {
  @Element() el!: HTMLElement;
  @State() tabs: HTMLSbbTabElement[] = [];
  @Prop({ mutable: true }) selectedIndex = 0;
  @Event() selectedTabChange!: EventEmitter<HTMLSbbTabElement>;

  private _tabLabelMap: WeakMap<HTMLSbbTabElement, HTMLButtonElement> = new WeakMap();

  render() {
    return (
      <Host>
        <div>
          {this.tabs.map((tab, index) => (
            <button
              type="button"
              onClick={() => this._handleLabelClick(tab, index)}
              ref={el => this._registerTabLabelAndAttachContent(tab, el!)}
            ></button>
          ))}
        </div>
        <slot name="sbb-tab" onSlotchange={this._handleTabsChange}></slot>
      </Host>
    );
  }

  @Listen('tabLabelChanged')
  _handleTabLabelChanged(event: CustomEvent<void>) {
    const tabElement = event.target as HTMLSbbTabElement;
    const labelHost = this._tabLabelMap.get(tabElement);
    if (!labelHost) {
      return;
    }

    const newNode = this._getTabLabelTemplate(tabElement);
    if (newNode) {
      labelHost.replaceChildren(newNode);
    } else {
      labelHost.replaceChildren();
    }
  }

  @Watch('selectedIndex')
  _handleSelectedIndexChange(newValue: number, oldValue: number) {
    if (newValue < 0) {
      this.selectedIndex = 0;
      return;
    } else if (newValue >= this.tabs.length) {
      this.selectedIndex = this.tabs.length - 1;
      return;
    } else if (newValue === oldValue) {
      return;
    }
    const newIndex = this.tabs.findIndex(t => t.active);
    if (newValue === newIndex) {
      return;
    }
    for (const tab of this.tabs.filter((t, i) => i !== newValue && t.active)) {
      tab.active = false;
    }
    this.tabs[newValue].active = true;
  }

  private _handleTabsChange = (_event: Event) => {
    this.tabs =
      this.el
        .shadowRoot!.querySelector<HTMLSlotElement>(':host>slot[name="sbb-tab"]')
        ?.assignedElements()
        .filter((e): e is HTMLSbbTabElement => e.nodeName === 'SBB-TAB') ?? [];
    const activeTabs = this.tabs.filter(t => t.active);
    if (activeTabs.length === 0 && this.tabs.length) {
      this.tabs[0].active = true;
    } else if (activeTabs.length > 1) {
      for (const tab of activeTabs.slice(1)) {
        tab.active = false;
      }
    }
    const newIndex = this.tabs.findIndex(t => t.active);
    if (this.selectedIndex !== newIndex) {
      this.selectedIndex = newIndex;
    }
  };

  private _handleLabelClick = (tab: HTMLSbbTabElement, index: number) => {
    for (const tabEntry of this.tabs.filter(t => t !== tab)) {
      tabEntry.active = false;
    }
    if (!tab.active) {
      tab.active = true;
    }
    if (this.selectedIndex !== index) {
      this.selectedIndex = index;
      this.selectedTabChange.emit(tab);
    }
  };

  private _registerTabLabelAndAttachContent(tab: HTMLSbbTabElement, el: HTMLButtonElement): void {
    if (this._tabLabelMap.has(tab)) {
      return;
    }

    this._tabLabelMap.set(tab, el);
    const newNode = this._getTabLabelTemplate(tab);
    if (newNode) {
      el.replaceChildren(newNode);
    }
  }

  private _getTabLabelTemplate(tab: HTMLSbbTabElement): Node | undefined {
    const templateElement = tab.shadowRoot?.querySelector<HTMLTemplateElement>(
      ':host>template.sbb-tab-label-template',
    )?.firstElementChild;
    return templateElement?.nodeName === 'SLOT'
      ? (templateElement as HTMLSlotElement).assignedElements()[0]?.cloneNode(true)
      : templateElement?.cloneNode(true);
  }
}
