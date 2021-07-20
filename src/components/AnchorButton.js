import buttonIcon from 'raw-loader!../icons/button.svg';
import contexts from '../bootstrap-contexts';
import sizes from '../bootstrap-btn-sizes';
import { capitalize } from '../utils';

export const AnchorButtonBlock = (bm, label) => {
  bm.add('anchor-button', {
    label: `${buttonIcon}<div>${label}</div>`,
    category: 'Forms',
    content: '<a class="btn btn-primary">Send</a>',
  });
};

export default (editor) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  dc.addType('anchor-button', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'AnchorButton',
        droppable: false,
        attributes: {
          role: 'button',
          href: '#',
        },
        classes: ['btn'],
        traits: [
          {
            type: 'content',
            label: 'Text',
            changeProp: 1,
          },
          {
            type: 'text',
            label: 'Href',
            name: 'href',
          },
          {
            type: 'text',
            label: 'Target',
            name: 'target',
          },
          {
            type: 'class_select',
            options: [
              { value: '', name: 'None' },
              ...contexts.map((v) => ({ value: `btn-${v}`, name: capitalize(v) })),
              ...contexts.map((v) => ({ value: `btn-outline-${v}`, name: `${capitalize(v)} (Outline)` })),
            ],
            label: 'Context',
          },
          {
            type: 'class_select',
            options: [
              { value: '', name: 'Default' },
              ...Object.keys(sizes).map((k) => ({ value: `btn-${k}`, name: sizes[k] })),
            ],
            label: 'Size',
          },
          {
            type: 'class_select',
            options: [
              { value: '', name: 'Inline' },
              { value: 'btn-block', name: 'Block' },
            ],
            label: 'Width',
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      afterChange(e) {
        if (this.attributes.type === 'anchor-button') {
          if (this.attributes.classes.filter((klass) => klass.id === 'btn').length === 0) {
            this.changeType('link');
          }
        }
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'A' && el.classList && el.classList.contains('btn')) {
          return { type: 'anchor-button' };
        }
      },
    }),
    view: defaultView.extend({
      events: {
        click: 'handleClick',
      },

      init() {
        this.editor = editor;
        this.listenTo(this.model, 'change:content', this.updateContent);
      },

      updateContent() {
        if (this.model) {
          this.el.innerHTML = this.model.get('content');
          this.component = this.editor.getSelected();
          if (this.component) {
            const htmlCode = this.getComponentHtml(this.component);
            const cssCode = this.editor.CodeManager.getCode(this.component, 'css', {
              cssc: this.editor.CssComposer,
            });
            this.updateHtml(htmlCode, cssCode);
          }
        }
      },

      handleClick(e) {
        e.preventDefault();
      },

      updateHtml(htmlCode, cssCode) {
        const { editor, component } = this;
        if (!htmlCode || htmlCode === this.previousHtmlCode) return;
        this.previousHtmlCode = htmlCode;

        let idStyles = '';
        cssCode
          .split(/(?<=}\n)/g)
          .forEach((rule) => {
            if (/^#/.test(rule)) idStyles += rule;
          });

        if (component.collection) {
          editor.select(component.replaceWith(`${htmlCode}<style>${idStyles}</style>`));
        }
      },
      getComponentHtml(component) {
        const { pfx, opts } = this;
        let result = '';
        const componentEl = component.getEl();

        !opts.clearData && componentEl.classList.remove(`${pfx}selected`);
        const html = opts.clearData ? component.toHTML()
          : (componentEl.id === 'wrapper' ? componentEl.innerHTML : componentEl.outerHTML);
        !opts.clearData && componentEl.classList.add(`${pfx}selected`);
        result += html;

        const js = opts.editJs ? component.getScriptString() : '';
        result += js ? `<script>${js}</script>` : '';

        return result;
      },
    }),
  });
};
