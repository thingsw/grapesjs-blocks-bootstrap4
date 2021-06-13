import circleIcon from "raw-loader!../../icons/circle-solid.svg";

export const TabBlock = (bm, label) => {
  bm.add('tabs-tab', {
    label: `
            ${circleIcon}
            <div>${label}</div>
          `,
    category: 'Tabs',
    content: {
      type: 'tabs-tab',
      classes: ['nav-item'],
      content: '<li></li>',
      attributes: {
        role: 'presentation',
      },
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs-tab', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Tab',
        draggable: 'tabs-navigation',
        droppable: true,
        tagName: 'li',
        classes: ['nav-item'],
        attributes: {
          role: 'presentation',
        },
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'LI' && el.classList && el.classList.contains('nav-item')) {
          return { type: 'tabs-tab' };
        }
      },
    }),
    view: defaultView,
  });
};

