import exclamationIcon from 'raw-loader!../../icons/table_rows.svg';

export const TableBodyBlock = (bm, label) => {
  bm.add('table-body', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table-body',
      classes: ['table-body'],
      content: '<tbody></tbody>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table-body', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table Body',
        draggable: '.table',
        droppable: true,
        tagName: 'tbody',
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'TBODY' && el.classList && el.classList.contains('table-body')) {
          return { type: 'table-body' };
        }
      },
    }),
    view: defaultView,
  });
};
