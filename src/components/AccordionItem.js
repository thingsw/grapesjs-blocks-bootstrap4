
import exclamationIcon from 'raw-loader!../icons/accordion.svg';

export const AccordionItemBlock = (bm, label) => {
  bm.add('accordion-item', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Components',
    content: {
      type: 'accordion-item',
      content: `
      <div>
        <div id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Collapsible Group Item #1
            </button>
          </h2>
        </div>

        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div>
            Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
          </div>
        </div>
      </div>`,
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('accordion-item', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'AccordionItem',
        draggable: '.accordion',
        droppable: true,
        tagName: 'div',
        classes: ['accordion-item'],
        traits: [
          {
            type: 'text',
            label: 'Parent ID',
            name: 'parent-id',
            changeProp: 1,
          },
          {
            type: 'text',
            label: 'ID Prefix',
            name: 'id-prefix',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('accordion-item')) {
          return { type: 'accordion-item' };
        }
      },
    }),
    view: {
      ...defaultView,
      init() {
        this.listenTo(this.model, 'change:parent-id', this.updateParent);
        this.listenTo(this.model, 'change:id-prefix', this.updatePrefix);
      },
      updateParent() {
        const { el, model } = this;
        const parentId = model.get('parent-id');
        console.log('updateParent', parentId);
      },
      updatePrefix() {
        const { el, model } = this;
        const idPrefix = model.get('id-prefix');
        console.log('updatePrefix', idPrefix);
      },
    },
  });
};
