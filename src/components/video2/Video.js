import videoIcon from "raw-loader!../../icons/youtube-brands.svg";

export const Video2Block = (bm, label) => {
  bm.add('bs-video2', {
    label: `
            ${videoIcon}
            <div>${label}</div>
          `,
    category: 'Media',
    content: {
      type: 'bs-video2',
      classes: ['video', 'embed-responsive', 'embed-responsive-16by9'],
      content: '<div></div>',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('bs-video2', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Video2',
        droppable: true,
        tagName: 'div',
        classes: ['video', 'embed-responsive', 'embed-responsive-16by9'],
        traits: [
          {
            type: 'class_select',
            options: [
              { value: 'embed-responsive-21by9', name: '21:9' },
              { value: 'embed-responsive-16by9', name: '16:9' },
              { value: 'embed-responsive-4by3', name: '4:3' },
              { value: 'embed-responsive-1by1', name: '1:1' },
            ],
            label: 'Aspect Ratio',
          },
          {
            type: 'text',
            label: 'Youtube ID',
            name: 'youtube-id',
            changeProp: 1,
          },
          {
            type: 'checkbox',
            label: 'Auto play',
            name: 'autoplay',
            defaut: false,
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          this.iframe = children.add({
            type: 'bs-iframe2',
            classes: ['iframe', 'embed-responsive-item'],
            attributes: {
              'allowfullscreen': true,
            },
          });
        } else {
          this.iframe = this.findType('bs-iframe2')[0];
        }
        this.listenTo(this, 'change:youtube-id', this.updateYoutube);
        this.listenTo(this, 'change:autoplay', this.updateAutoplay);
      },
      updateYoutube(id) {
        const youtubeId = this.get('youtube-id') ?? id;
        const autoplay = this.get('autoplay');
        let src = `https://www.youtube.com/embed/${youtubeId}`;

        if (autoplay) {
          src = src + '?autoplay=1&wmode=transparent&rel=0&enablejsapi=1';
        }

        this.iframe.addAttributes({ src });
      },
      updateAutoplay() {
        const autoplay = this.get('autoplay');
        const src = this.iframe.getAttributes().src;
        const indx = src.indexOf('?autoplay=1&wmode=transparent&rel=0&enablejsapi=1');
        if (autoplay) {
          if (indx === -1) {
            this.iframe.setAttributes({
              src: `${src}?autoplay=1&wmode=transparent&rel=0&enablejsapi=1`
            })
          }
        } else {
          if (indx > -1) {
            console.log(src.substring(0, indx));
          }
        }
      }
    }, {
      isComponent(el) {
        if (el && el.classList && el.classList.contains('video') && el.classList.contains('embed-responsive')) {
          return { type: 'bs-video2' };
        }
      },
    }),
    view: defaultView,
  });
};

