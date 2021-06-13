export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel-indicators', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel Indicators',
        tagName: 'ol',
        classes: ['carousel-indicators'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'OL' && el.classList && el.classList.contains('carousel-indicators')) {
          return { type: 'carousel-indicators' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};