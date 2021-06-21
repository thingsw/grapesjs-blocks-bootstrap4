export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('modal', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Modal',
        tagName: 'div',
        classes: ['modal', 'fade'],
        traits: [
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
          const dialog = children.add({
            type: 'modal-dialog'
          });
          const content = dialog.components().add({
            type: 'modal-content',
          });
          const body = content.components().add({
            type: 'modal-body',
          });
          this.video = body.components().add({
            type: 'bs-video2'
          })
        } else {
          this.video = this.findType('bs-video2')[0];
        }
        this.listenTo(this, 'change:youtube-id', this.updateYoutube);
        this.listenTo(this, 'change:autoplay', this.updateAutoplay);
      },
      updateYoutube() {
        const youtubeId = this.get('youtube-id');
        this.video.updateYoutube(youtubeId);
      },
      updateAutoplay() {
        const autoplay = this.get('autoplay');
        this.video.set({ autoplay });
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('modal')) {
          return { type: 'modal' };
        }
      }
    }),
    view: defaultView,
  })

  domc.addType('modal-dialog', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Modal Dialog',
        tagName: 'div',
        classes: ['modal-dialog', 'modal-dialog-centered'],
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('modal-dialog')) {
          return { type: 'modal-dialog' };
        }
      }
    }),
    view: defaultView,
  })

  domc.addType('modal-content', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Modal Content',
        tagName: 'div',
        classes: ['modal-content'],
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('modal-content')) {
          return { type: 'modal-content' };
        }
      }
    }),
    view: defaultView,
  })

  domc.addType('modal-body', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Modal Body',
        tagName: 'div',
        droppable: true,
        classes: ['modal-body'],
      },
    }, {
      isComponent: function (el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('modal-body')) {
          return { type: 'modal-body' };
        }
      }
    }),
    view: defaultView,
  })

}