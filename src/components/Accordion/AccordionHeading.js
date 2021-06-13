import exclamationIcon from 'raw-loader!../../icons/accordion.svg';

export const AccordionHeadingBlock = (bm, label) => {
  bm.add('accordion-heading', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Components',
    content: {
      type: 'accordion-heading',
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('accordion-heading', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Accordion Heading',
        draggable: '.accordion',
        droppable: false,
        tagName: 'div',
        classes: ['accordion-heading'],
        traits: [
          {
            type: 'text',
            label: 'Heading ID',
            name: 'id',
          },
          {
            type: 'text',
            label: 'Body ID',
            name: 'body-id',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('accordion-heading')) {
          return { type: 'accordion-heading' };
        }
      },
    }),
    view: {
      ...defaultView,
      init() {
        this.listenTo(this.model, 'change:body-id', this.updateBody);
      },
      updateBody() {
        const { el, model } = this;

        const bodyId = model.get('body-id');
        const element = el.querySelectorAll('button[data-toggle=\'collapse\']')[0];
        console.log("updateBody", el, bodyId, element);
        if (bodyId && element) {
          element.setAttribute('data-target', bodyId);
        }
      },
    },
  });
};
