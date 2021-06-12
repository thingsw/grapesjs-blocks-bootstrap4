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
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          this.addAttributes({ id: this.ccid });
          this.createHeading(this.ccid, 1);
          this.createBody(this.ccid, 1);
          this.createHeading(this.ccid, 2);
          this.createBody(this.ccid, 2);
          this.createHeading(this.ccid, 3);
          this.createBody(this.ccid, 3);
        }
      },
      createHeading(pid, index) {
        const children = this.components();
        const heading = children.add({
          type: 'accordion-heading',
          classes: ['accordion-heading'],
          attributes: {
            id: `heading-${pid}-${index}`,
          },
        });
        this.addHeadingComp(heading, pid, index);
      },
      addHeadingComp(heading, pid, index) {
        const h = heading.components().add({
          type: 'header',
          tagName: 'h2',
          classes: ['mb-0'],
        }).components();

        h.add({
          type: 'button',
          tagName: 'button',
          classes: ['btn', 'btn-link', 'btn-block', 'text-left'],
          content: `Collapsible Group Item #${index}`,
          attributes: {
            'data-toggle': 'collapse',
            'aria-expanded': 'true',
            'data-target': `#collapse-${pid}-${index}`,
            'aria-controls': `collapse-${pid}-${index}`,
          },
        });
      },
      createBody(pid, index) {
        const children = this.components();
        const body = children.add({
          type: 'accordion-body',
          classes: ['accordion-body', 'collapse', index === 1 ? 'show' : undefined],
          attributes: {
            id: `collapse-${pid}-${index}`,
          },
        });
        this.addBodyComp(body, pid, index);
      },
      addBodyComp(body, pid, index) {
        body.addAttributes({
          'aria-labelledby': `heading-${pid}-${index}`,
          'data-parent': `#${pid}`,
        });
        body.components().add({
          type: 'paragraph',
          tagName: 'p',
          content: 'Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.',
        });
      },
      updated(property, value, prevValue) {
        if (property === 'components') {
          const { models } = value;
          const pid = this.ccid;
          const headings = models.filter((model) => model.attributes.type === 'accordion-heading');
          const hindex = headings.length;
          const bodies = models.filter((model) => model.attributes.type === 'accordion-body');
          const bindex = bodies.length;
          const foundH = headings.find((h) => h.attributes.attributes.id === undefined);
          const foundB = bodies.find((h) => h.attributes.attributes.id === undefined);
          if (foundH) {
            foundH.addAttributes({
              id: `heading-${pid}-${hindex}`,
            });
            this.addHeadingComp(foundH, pid, hindex);
          }
          if (foundB) {
            foundB.addAttributes({
              id: `collapse-${pid}-${bindex}`,
            });
            this.addBodyComp(foundB, pid, bindex);
          }
        }
      },
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('accordion')) {
          return { type: 'accordion' };
        }
        return undefined;
      },
    }),
    view: defaultView,
  });
};
