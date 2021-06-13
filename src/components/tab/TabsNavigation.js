export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs-navigation', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Tabs Navigation',
        droppable: true,
        tagName: 'ul',
        classes: ['nav', 'nav-tabs'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'UL' && el.classList && el.classList.contains('nav-tabs')) {
          return { type: 'tabs-navigation' };
        }
      },
    }),
    view: defaultView,
  });
};

