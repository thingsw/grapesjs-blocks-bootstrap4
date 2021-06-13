import ellipsisIcon from "raw-loader!../../icons/ellipsis-h-solid.svg";

export const TabsBlock = (bm, label) => {
  bm.add('tabs', {
    label: `
            ${ellipsisIcon}
            <div>${label}</div>
          `,
    category: 'Tabs',
    content: {
      type: 'tabs',
      classes: ['tabs'],
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Tabs',
        droppable: true,
        tagName: 'div',
        traits: [
          {
            id: 'tab_style',
            type: 'class_select',
            label: 'Tab style',
            options: [
              { value: '', name: 'None' },
              { value: 'nav-pills', name: 'Pills' },
            ],
          },
          {
            id: 'tab_width',
            type: 'class_select',
            label: 'Tab width',
            options: [
              { value: '', name: 'None' },
              { value: 'nav-fill', name: 'Fill' },
            ],
          },
          {
            type: 'number',
            label: 'The number of tabs',
            name: 'tabs-count',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          const pid = this.ccid;
          this.navigation = children.add({
            type: 'tabs-navigation',
            classes: ['nav', 'nav-tabs'],
            attributes: {
              id: `tab-${pid}`,
              role: 'tablist',
            },
          });
          this.createTab(pid, 1);
          this.createTab(pid, 2);
          this.createTab(pid, 3);

          this.panels = children.add({
            type: 'tabs-panels',
            attributes: {
              id: `tab-panel-content-${pid}`,
            },
          });
          this.createTabPanel(pid, 1);
          this.createTabPanel(pid, 2);
          this.createTabPanel(pid, 3);
        } else {
          this.panels = this.findType('tabs-panels')[0];
          this.navigation = this.findType('tabs-navigation')[0];
        }
        this.listenTo(this, 'change:tabs-count', this.updateTabs);
      },
      updateTabs() {
        const count = this.get('tabs-count');
        const currLength = this.panels.components().length;

        if (currLength < count) {
          for (let i = currLength + 1; i <= count; i++) {
            this.createTab(this.ccid, i);
            this.createTabPanel(this.ccid, i);
          }
        }
      },
      createTabPanel(pid, index) {
        const panel = this.panels.components().add({
          type: 'tabs-panel',
        });
        panel.addAttributes({
          id: `tab-panel-${pid}-${index}`,
          'aria-labelledby': `tab-${pid}-${index}`,
        });
        if (index === 1) {
          panel.addClass(['show', 'active']);
        }
        panel.components().add({
          type: 'paragraph',
          content: 'Placeholder content for the tab panel.',
        });
      },
      createTab(pid, index) {
        const tab = this.navigation.components().add({
          type: 'tabs-tab',
        }).components();
        tab.add({
          type: 'link',
          classes: ['nav-link', index === 1 ? 'active' : undefined],
          attributes: {
            id: `tab-${pid}-${index}`,
            'data-toggle': 'tab',
            href: `#tab-panel-${pid}-${index}`,
            role: 'tab',
            'aria-controls': `tab-panel-${pid}-${index}`,
            'aria-selected': index === 1 ? 'true' : 'false',
          },
          content: `Tab #${index}`,
        });
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('tabs')) {
          return { type: 'tabs' };
        }
      },
    }),
    view: defaultView,
  });
};

