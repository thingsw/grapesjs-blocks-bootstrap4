import exclamationIcon from 'raw-loader!../icons/accordion.svg';

export const AccordionBodyBlock = (bm, label) => {
  bm.add('accordion-body', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Components',
    content: {
      type: 'accordion-body',
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('accordion-body', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'AccordionvBody',
        draggable: '.accordion',
        droppable: true,
        tagName: 'div',
        classes: ['accordion-body', 'collapse'],
        traits: [
          {
            type: 'text',
            label: 'Parent ID',
            name: 'data-parent',
          },
          {
            type: 'text',
            label: 'Body ID',
            name: 'id',
          },
          {
            type: 'text',
            label: 'Heading ID',
            name: 'aria-labelledby',
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('accordion-body')) {
          return { type: 'accordion-body' };
        }
      },
    }),
    view: {
      ...defaultView,
      init() {
        // this.listenTo(this.model, 'change:heading-id', this.updateHeading);
      },
      updateParent() {
        const { el, model } = this;
        const parentId = model.get('parent-id');
        if (parentId) {
          el.setAttribute('data-parent', `#${parentId}`);
          console.log(el.getAttribute('data-parent'));
        }
        console.log('updateParent', parentId);
      },
      updateHeading() {
        const { el, model } = this;
        const idPrefix = model.get('id-prefix');
        console.log('updatePrefix', idPrefix);
      },
    },
  });
};
