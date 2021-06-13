export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel-control', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel Control',
        tagName: 'a',
        classes: ['carousel-control'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'A' && el.classList && el.classList.contains('carousel-control')) {
          return { type: 'carousel-control' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};