export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel-inner', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel Inner',
        tagName: 'div',
        droppable: true,
        classes: ['carousel-inner'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('carousel-inner')) {
          return { type: 'carousel-inner' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};