import exclamationIcon from 'raw-loader!../icons/table_rows.svg';

export const TableCellHeadBlock = (bm, label) => {
  bm.add('table-cell-head', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table-cell-head',
      classes: ['table-cell-head'],
      content: '<th></th>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table-cell-head', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table Cell Head',
        draggable: '.tr',
        droppable: true,
        tagName: 'th',
        traits: [
          {
            type: 'text',
            label: 'Column span',
            name: 'colspan',
          },
          {
            type: 'text',
            label: 'Row span',
            name: 'rowspan',
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'TH' && el.classList && el.classList.contains('table-cell-head')) {
          return { type: 'table-cell-head' };
        }
      },
    }),
    view: defaultView,
  });
};
