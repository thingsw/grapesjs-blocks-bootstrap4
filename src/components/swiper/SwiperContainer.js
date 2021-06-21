export const SwiperContainerBlock = (bm, label) => {
  bm.add('swiper-container', {
    label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 7.6c0-1-.5-1.6-1.3-1.6H3.4C2.5 6 2 6.7 2 7.6v9.8c0 1 .5 1.6 1.3 1.6h17.4c.8 0 1.3-.6 1.3-1.6V7.6zM21 18H3V7h18v11z" fill-rule="nonzero"></path><path d="M4 12.5L6 14v-3zM20 12.5L18 14v-3z"></path>
      </svg>
        <div>${label}</div>`,
    category: 'Swiper',
    content: {
      type: 'swiper-container',
      classes: ['swiper-container'],
    },
  })
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('swiper-container', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Swiper Container',
        tagName: 'div',
        classes: ['swiper-container'],
        traits: [
          {
            id: 'show_all',
            type: 'class_select',
            label: 'Show all',
            options: [
              { value: '', name: 'None' },
              { value: 'show', name: 'Show' },
            ],
          },
          {
            type: 'checkbox',
            label: 'Autoplay',
            name: 'autoplay',
            changeProp: 1,
          },
        ],
        script() {

          const truthies = ['1', 'true'];
          const options = {
            slidesPerView: "auto",
            spaceBetween: 60,
            centeredSlides: true,
            freeMode: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          };

          if (truthies.includes('{[ autoplay ]}')) {
            options.autoplay = {
              delay: 3000,
              disableOnInteraction: false,
            };
          }

          new Swiper(this, options);
        }
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          const wrapper = children.add({
            type: 'swiper-wrapper',
          });
          this.createSlide(wrapper.components(), 1);
          this.createSlide(wrapper.components(), 2);
          this.createSlide(wrapper.components(), 3);
          children.add({
            type: 'swiper-pagination',
          })
        }
        const autoplay = this.getAttributes()['data-autoplay'];
        this.set({ autoplay: autoplay !== undefined });
        this.listenTo(this, 'change:autoplay', this.updateAutoplay);
      },
      updateAutoplay() {
        const autoplay = this.get('autoplay');
        this.setAttributes({
          'data-autoplay': autoplay,
        });
      },
      createSlide(wrapper) {
        wrapper.add({
          type: 'swiper-slide',
        })
      }
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('swiper-container')) {
          return { type: 'swiper-container' };
        }
      }
    }),
    view: defaultView,
  })

}