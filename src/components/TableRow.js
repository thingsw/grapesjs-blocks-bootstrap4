import exclamationIcon from 'raw-loader!../icons/table_rows.svg';

export const TableRowBlock = (bm, label) => {
  bm.add('table-row', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table-row',
      classes: ['table-row'],
      content: '<tr></tr>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table-row', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table Row',
        draggable: '.thead,.tbody',
        droppable: true,
        tagName: 'tr',
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'TR' && el.classList && el.classList.contains('table-row')) {
          return { type: 'table-row' };
        }
      },
    }),
    view: defaultView,
  });
};
