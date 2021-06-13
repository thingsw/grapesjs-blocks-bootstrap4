import circleIcon from "raw-loader!../../icons/circle-solid.svg";

export const CarouselItemBlock = (bm, label) => {
  bm.add('carousel-item', {
    label: `
            ${circleIcon}
            <div>${label}</div>
          `,
    category: 'Carousel',
    content: {
      type: 'carousel-item',
      classes: ['carousel-item'],
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('carousel-item', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Carousel Item',
        tagName: 'div',
        draggable: 'carousel-inner',
        droppable: true,
        classes: ['carousel-item'],
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          children.add({
            type: 'bs-image',
            classes: ['d-block', 'w-100'],
          });
        }
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('carousel-item')) {
          return { type: 'carousel-item' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};