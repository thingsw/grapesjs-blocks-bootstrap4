import exclamationIcon from 'raw-loader!../icons/accordion.svg';

export const AccordionBlock = (bm, label) => {
  bm.add('accordion', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Components',
    content: {
      type: 'accordion',
      content: '<div class="accordion"></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('accordion', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Accordion',
        tagName: 'div',
        classes: ['accordion'],
        attributes: {
          id: 'accordionExample',
        },
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('accordion')) {
          return { type: 'accordion' };
        }
      },
    }),
    view: defaultView,
  });
};
