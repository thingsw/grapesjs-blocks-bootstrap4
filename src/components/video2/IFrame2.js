import videoIcon from "raw-loader!../../icons/youtube-brands.svg";


export const IFrame2Block = (bm, label) => {
  bm.add('bs-iframe2', {
    label: `
        ${videoIcon}
        <div>${label}</div>
        `,
    category: 'Media',
    content: {
      type: 'bs-iframe',
      classes: ['iframe'],
      content: '<iframe />',
    }
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('bs-iframe2', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'IFrame2',
        tagName: 'iframe',
        classes: ['iframe'],
        traits: [
          {
            type: 'text',
            label: 'Source (URL)',
            name: 'src'
          },
          {
            type: 'text',
            label: 'allow',
            name: 'allow',
            default: 'autoplay'
          }
        ].concat(defaultModel.prototype.defaults.traits),
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'IFRAME' && el.classList && el.classList.contains('iframe')) {
          return { type: 'bs-iframe2' };
        }
      }
    }),
    view: defaultView,
  });
}