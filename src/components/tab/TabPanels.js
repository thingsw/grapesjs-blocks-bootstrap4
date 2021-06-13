export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('tabs-panels', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Tab Panels',
        droppable: true,
        classes: ['tab-content'],
        tagName: 'div',
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('tab-content')) {
          return { type: 'tabs-panels' };
        }
      },
    }),
    view: defaultView,
  });
};

