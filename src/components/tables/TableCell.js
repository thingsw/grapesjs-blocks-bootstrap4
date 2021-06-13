import exclamationIcon from 'raw-loader!../../icons/table_rows.svg';

export const TableCellBlock = (bm, label) => {
  bm.add('table-cell', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table-cell',
      classes: ['table-cell'],
      content: '<td></td>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table-cell', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table Cell',
        draggable: '.tr',
        droppable: true,
        tagName: 'td',
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
        if (el && el.tagName === 'TD' && el.classList && el.classList.contains('table-cell')) {
          return { type: 'table-cell' };
        }
      },
    }),
    view: defaultView,
  });
};
