export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel-indicator', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel Indicator',
        tagName: 'li',
        classes: ['carousel-indicator'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'LI' && el.classList && el.classList.contains('carousel-indicator')) {
          return { type: 'carousel-indicators' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};