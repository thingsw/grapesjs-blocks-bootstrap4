export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('swiper-pagination', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Swiper Pagination',
        tagName: 'div',
        classes: ['swiper-pagination'],
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('swiper-pagination')) {
          return { type: 'swiper-pagination' };
        }
      }
    }),
    view: defaultView,
  })

}