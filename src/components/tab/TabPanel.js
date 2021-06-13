import windowIcon from "raw-loader!../../icons/window-maximize-solid.svg";

export const TabPanelBlock = (bm, label) => {
  bm.add('tabs-panel', {
    label: `
            ${windowIcon}
            <div>${label}</div>
          `,
    category: 'Tabs',
    content: {
      type: 'tabs-panel',
      classes: ['tab-pane', 'fade'],
      content: '<div></div>',
      attributes: {
        role: 'tabpanel',
      },
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs-panel', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Tab Panel',
        draggable: 'tabs-panels',
        droppable: true,
        classes: ['tab-pane', 'fade'],
        attributes: {
          role: 'tabpanel',
        },
        tagName: 'div',
        traits: [
          {
            id: 'panel_style',
            type: 'class_select',
            label: 'Pane style',
            options: [
              { value: '', name: 'None' },
              { value: 'tab-pane-bordered', name: 'Bordered pane' },
            ],
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('tab-pane')) {
          return { type: 'tabs-panel' };
        }
      },
    }),
    view: defaultView,
  });
};

