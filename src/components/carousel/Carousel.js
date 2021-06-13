import circleIcon from "raw-loader!../../icons/circle-solid.svg";

export const CarouselBlock = (bm, label) => {
  bm.add('carousel', {
    label: `
            ${circleIcon}
            <div>${label}</div>
          `,
    category: 'Carousel',
    content: {
      type: 'carousel',
      classes: ['carousel', 'slide'],
      content: `<div></div>`,
      attributes: {
        'data-ride': 'carousel',
      },
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel',
        tagName: 'div',
        classes: ['carousel', 'slide'],
        attributes: {
          'data-ride': 'carousel',
        },
        traits: [
          {
            type: 'number',
            label: 'The number of carousel items',
            name: 'carousel-count',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          const pid = `carousel-${this.ccid}`;
          this.addAttributes({
            id: pid,
          });
          this.indicators = children.add({
            type: 'carousel-indicators',
          });
          this.inner = children.add({
            type: 'carousel-inner',
          });
          const prev = children.add({
            type: 'carousel-control',
            attributes: {
              href: `#${pid}`,
              role: 'button',
              'data-slide': 'prev',
            },
            content: `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>`,
          });
          prev.addClass(['carousel-control-prev']);

          const next = children.add({
            type: 'carousel-control',
            attributes: {
              href: `#${pid}`,
              role: 'button',
              'data-slide': 'next',
            },
            content: `<span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>`,
          });
          next.addClass(['carousel-control-next']);

          this.createCarouselIndicator(1);
          this.createCarouselIndicator(2);
          this.createCarouselIndicator(3);
          this.createCarouselItem(1);
          this.createCarouselItem(2);
          this.createCarouselItem(3);
        } else {
          this.indicators = this.findType('carousel-indicators')[0];
          this.inner = this.findType('carousel-inner')[0];
        }

        this.listenTo(this, 'change:carousel-count', this.updateCarousel);
      },
      updateCarousel() {
        const count = this.get('carousel-count');
        const currLength = this.indicators.components().length;

        if (currLength < count) {
          for (let i = currLength + 1; i <= count; i++) {
            this.createCarouselIndicator(i);
            this.createCarouselItem(i);
          }
        }
      },
      createCarouselIndicator(index) {
        const indicator = this.indicators.components().add({
          type: 'carousel-indicator',
          attributes: {
            'data-target': `#${this.ccid}`,
            'data-slide-to': `${index - 1}`,
          },
        });
        if (index === 1) {
          indicator.addClass(['active']);
        }
      },
      createCarouselItem(index) {
        const item = this.inner.components().add({
          type: 'carousel-item',
        });
        if (index === 1) {
          item.addClass(['active']);
        }
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('carousel')) {
          return { type: 'carousel' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};
