import exclamationIcon from 'raw-loader!../icons/table_rows.svg';

export const TableHeadBlock = (bm, label) => {
  bm.add('table-head', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table-head',
      classes: ['table-head'],
      content: '<thead></thead>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table-head', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table Head',
        draggable: '.table',
        droppable: true,
        tagName: 'thead',
        traits: [
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'THEAD' && el.classList && el.classList.contains('table-head')) {
          return { type: 'table-head' };
        }
      },
    }),
    view: defaultView,
  });
};
