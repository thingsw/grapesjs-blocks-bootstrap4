import exclamationIcon from 'raw-loader!../../icons/table_rows.svg';

export const TableBlock = (bm, label) => {
  bm.add('table', {
    label: `
            ${exclamationIcon}
            <div>${label}</div>
        `,
    category: 'Table',
    content: {
      type: 'table',
      classes: ['table'],
      content: '<table class="table"></table>'
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('table', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Table',
        tagName: 'table',
        droppable: true,
        traits: [
          {
            id: 'table_style',
            type: 'class_select',
            label: 'Table style',
            options: [
              { value: '', name: 'None' },
              { value: 'table-striped', name: 'Striped rows' },
              { value: 'table-bordered', name: 'Bordered table' },
              { value: 'table-borderless', name: 'Borderless table' },
            ],
          },
          {
            id: 'table_hover',
            type: 'class_select',
            label: 'Hoverable rows',
            options: [
              { value: '', name: 'None' },
              { value: 'table-hover', name: 'Hoverable rows' },
            ],
          },
          {
            id: 'table_small',
            type: 'class_select',
            label: 'Small table',
            options: [
              { value: '', name: 'None' },
              { value: 'table-sm', name: 'Small table' },
            ],
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init2() {
        const children = this.components();
        if (children.length === 0) {
          this.createTableHeader();
          this.createTableBody();
        }
      },
      createTableHeader() {
        const children = this.components();
        const thead = children.add({
          type: 'table-head',
          tagName: 'thead',
          classes: ['table-head'],
          content: '<thead></thead>',
        }).components();
        const thead_tr = thead.add({
          type: 'table-row',
          tagName: 'tr',
          classes: ['table-row'],
          content: '<tr></tr>',
        }).components();
        thead_tr.add({
          type: 'table-cell-head',
          tagName: 'th',
          classes: ['table-cell-head'],
          content: 'Cell head #1',
        });
        thead_tr.add({
          type: 'table-cell-head',
          tagName: 'th',
          classes: ['table-cell-head'],
          content: 'Cell head #2',
        });
        thead_tr.add({
          type: 'table-cell-head',
          tagName: 'th',
          classes: ['table-cell-head'],
          content: 'Cell head #3',
        });
      },
      createTableBody() {
        const children = this.components();
        const tbody = children.add({
          type: 'table-body',
          tagName: 'tbody',
          classes: ['table-body'],
          content: '<tbody></tbody>',
        }).components();
        this.createTableRow(tbody);
        this.createTableRow(tbody);
        this.createTableRow(tbody);
      },
      createTableRow(tbody) {
        const tbodyTr = tbody.add({
          type: 'table-row',
          tagName: 'tr',
          classes: ['table-row'],
          content: '<tr></tr>',
        }).components();
        tbodyTr.add({
          type: 'table-cell',
          tagName: 'td',
          classes: ['table-cell'],
          content: 'Cell #1',
        });
        tbodyTr.add({
          type: 'table-cell',
          tagName: 'td',
          classes: ['table-cell'],
          content: 'Cell #1',
        });
        tbodyTr.add({
          type: 'table-cell',
          tagName: 'td',
          classes: ['table-cell'],
          content: 'Cell #1',
        });
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'TABLE' && el.classList && el.classList.contains('table')) {
          return { type: 'table' };
        }
      },
    }),
    view: defaultView,
  });
};
