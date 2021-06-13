import ellipsisIcon from "raw-loader!../../icons/ellipsis-h-solid.svg";

export const VerticalTabsBlock = (bm, label) => {
  bm.add('tabs-vertical', {
    label: `
            ${ellipsisIcon}
            <div>${label}</div>
          `,
    category: 'Tabs',
    content: {
      type: 'tabs-vertical',
      classes: ['tabs-vertical'],
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs-vertical', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Vertical Tabs',
        droppable: true,
        tagName: 'div',
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          const row = children.add({
            type: 'row',
            classes: ['row'],
          }).components();
          const col1 = row.add({
            type: 'column',
            classes: ['col-3'],
          }).components();
          const col2 = row.add({
            type: 'column',
            classes: ['col-9', 'border'],
          }).components();
          this.createTabsNavigation(col1, this.ccid);
          this.crateTabPanels(col2, this.ccid);
        }
      },
      crateTabPanels(col, pid) {
        const panels = col.add({
          type: 'tabs-panels',
          attributes: {
            id: `tab-panel-content-${pid}`,
          },
        }).components();
        this.createTabPanel(panels, pid, 1);
        this.createTabPanel(panels, pid, 2);
        this.createTabPanel(panels, pid, 3);
        this.createTabPanel(panels, pid, 4);
        this.createTabPanel(panels, pid, 5);
        this.createTabPanel(panels, pid, 6);
        this.createTabPanel(panels, pid, 7);
        this.createTabPanel(panels, pid, 8);
      },
      createTabPanel(panels, pid, index) {
        const panel = panels.add({
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
      createTabsNavigation(col, pid) {
        const nav = col.add({
          type: 'tabs-navigation',
          classes: ['nav', 'flex-column', 'nav-pills'],
          attributes: {
            id: `tab-${pid}`,
            role: 'tablist',
            'aria-orientation': 'vertical',
          },
        }).components();
        this.createTab(nav, pid, 1);
        this.createTab(nav, pid, 2);
        this.createTab(nav, pid, 3);
        this.createTab(nav, pid, 4);
        this.createTab(nav, pid, 5);
        this.createTab(nav, pid, 6);
        this.createTab(nav, pid, 7);
        this.createTab(nav, pid, 8);
      },
      createTab(nav, pid, index) {
        const tab = nav.add({
          type: 'tabs-tab',
        }).components();
        tab.add({
          type: 'link',
          classes: ['nav-link', index === 1 ? 'active' : undefined],
          attributes: {
            id: `tab-${pid}-${index}`,
            'data-toggle': 'pill',
            href: `#tab-panel-${pid}-${index}`,
            role: 'tab',
            'aria-controls': `tab-panel-${pid}-${index}`,
            'aria-selected': index === 1 ? 'true' : 'false',
          },
          content: `Tab #${index}`,
        });
      },
      updated(property, value, prevValue) {
        if (property === 'components') {
          const { models } = value;
          const pid = this.ccid;
          const headings = models.filter((model) => model.attributes.type === 'tabs-tab');
          const hindex = headings.length;
          const bodies = models.filter((model) => model.attributes.type === 'tabs-panel');
          const bindex = bodies.length;
          const foundH = headings.find((h) => h.attributes.attributes.id === undefined);
          const foundB = bodies.find((h) => h.attributes.attributes.id === undefined);
          if (foundH) {
            foundH.addAttributes({
              id: `tab-${pid}-${hindex}`,
            });
            this.createTab(foundH, pid, hindex);
          }
          if (foundB) {
            foundB.addAttributes({
              id: `tab-panel-${pid}-${bindex}`,
            });
            this.createTabPanel(foundB, pid, bindex);
          }
        }
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

