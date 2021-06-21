import videoIcon from "raw-loader!../../icons/youtube-brands.svg";

export const YoutubeThumbnailBlock = (bm, label) => {
  bm.add('youtube-thumbnail', {
    label: `
            ${videoIcon}
            <div>${label}</div>
          `,
    category: 'Media',
    content: {
      type: 'youtube-thumbnail',
      classes: ['youtube-thumbnail'],
      content: '<div />',
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('youtube-thumbnail', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Youtube Thumbnail',
        // Autoplay
        autoplay: true,
        tagName: 'div',
        classes: ['youtube-thumbnail'],
        traits: [
          {
            type: 'text',
            label: 'Youtube ID',
            name: 'youtube-id',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
        script() {
          const modals = $(this).children(".modal");
          const modal = modals[0];
          if (modal) {
            $(modal).remove();
            $('body').append(modal);
            // console.log("youtube tumb", modal);
          }
          $(this).on('click', function () {
            if (modal) {
              const iframe = $(modal).find('* > iframe')[0];
              const src = iframe.src;
              $(modal).on('show.bs.modal', function (e) {
                $(iframe).attr('src', `${src}?autoplay=1&wmode=transparent&rel=0&enablejsapi=1`);
              });
              $(modal).on('hide.bs.modal', function (e) {
                $(iframe).attr('src', src);
              });
              $(modal).modal('show');
            }
          })
        }
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          this.image = children.add({
            type: 'bs-image',
          });
          children.add({
            type: 'youtube-play-button',
          });
          this.modal = children.add({
            type: 'modal',
          });
        } else {
          this.image = this.findType('bs-image')[0];
          this.modal = this.findType('modal')[0];
        }
        this.listenTo(this, 'change:youtube-id', this.updateYoutube);
      },
      updateYoutube() {
        const youtubeId = this.get('youtube-id');
        this.addAttributes({
          'data-youtube-id': youtubeId,
        })
        this.image.set({
          src: `https://img.youtube.com/vi/${youtubeId}/0.jpg`
        });
        this.modal.set({ 'youtube-id': youtubeId });
        const view = this.getView();
        // this.image.getView().render();
        view.render();
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === "DIV" && el.classList && el.classList.contains('youtube-thumbnail')) {
          return { type: 'youtube-thumbnail' };
        }
      },
    }),
    view: defaultView,
  });
};
