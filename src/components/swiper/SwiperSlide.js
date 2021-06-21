export const SwiperSlideBlock = (bm, label) => {
  bm.add('swiper-slide', {
    label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 7.6c0-1-.5-1.6-1.3-1.6H3.4C2.5 6 2 6.7 2 7.6v9.8c0 1 .5 1.6 1.3 1.6h17.4c.8 0 1.3-.6 1.3-1.6V7.6zM21 18H3V7h18v11z" fill-rule="nonzero"></path><path d="M4 12.5L6 14v-3zM20 12.5L18 14v-3z"></path>
      </svg>
        <div>${label}</div>`,
    category: 'Swiper',
    content: {
      type: 'swiper-slide',
      classes: ['swiper-slide'],
    },
  })
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('swiper-slide', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Swiper Slide',
        tagName: 'div',
        draggable: ['[data-gjs-type=swiper-wrapper]'],
        droppable: true,
        classes: ['swiper-slide'],
        init() {
          console.log("aaaaa");
          const children = this.components();
          if (children.length === 0) {
            children.add({
              type: 'paragraph',
              content: `swiper slide`,
            });
          }
        }
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('swiper-slide')) {
          return { type: 'swiper-slide' };
        }
      }
    }),
    view: defaultView.extend({
      init() {
        console.log("view", "init");
        const comps = this.model.components();
        if (!comps.length) {
          comps.add({
            type: 'paragraph',
            content: `swiper slide`,
          });
        }
      }
    }),
  })

}