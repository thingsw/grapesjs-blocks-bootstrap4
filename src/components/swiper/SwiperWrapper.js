export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('swiper-wrapper', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Swiper Wrapper',
        tagName: 'div',
        droppable: true,
        classes: ['swiper-wrapper'],
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('swiper-wrapper')) {
          return { type: 'swiper-wrapper' };
        }
      }
    }),
    view: defaultView,
  })

}