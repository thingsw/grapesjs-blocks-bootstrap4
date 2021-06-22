export const TimelineBlock = (bm) => {
  bm.add('timeline', {
    label: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16" style="padding: 16px 0;">
    <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
  </svg>
            <div>Timeline</div>
          `,
    category: 'Components',
    content: {
      type: 'timeline',
      classes: ['timeline'],
    },
  });
};

export default (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;


  domc.addType('timeline', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline',
        droppable: true,
        tagName: 'div',
        classes: ['timeline']
      },
      init() {
        console.log("init");
        const children = this.components();
        if (children.length === 0) {
          const wrapper = children.add({
            type: 'timeline-wrapper',
          });
          wrapper.components().add({
            type: 'timeline-connector-wrapper',
          });
          const itemsWrapper = wrapper.components().add({
            type: 'timeline-items-wrapper',
          });
          this.createItem(itemsWrapper.components());
          this.createItem(itemsWrapper.components());
          this.createItem(itemsWrapper.components());
        }
      },
      createItem(wrapper) {
        const item = wrapper.add({
          type: 'timeline-item'
        });
        item.components().add({
          type: 'timeline-card',
        });
        item.components().add({
          type: 'timeline-marker',
        });
        item.components().add({
          type: 'timeline-card-date',
        });
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline')) {
          return { type: 'timeline' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-wrapper', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Wrapper',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-wrapper'],
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-wrapper')) {
          return { type: 'timeline-wrapper' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-connector-wrapper', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Connector Wrapper',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-connector-wrapper'],
        script() {
          const self = $(this);
          const connectors = self.children('.timeline-connector');
          const connector = connectors[0];
          $(window).on('scroll', $.proxy(function () {
            const top = $(window).scrollTop();
            const height = $(window).outerHeight();
            const conTop = self.offset().top;
            const conPos = top + height / 2 - conTop;
            const maxConPos = self.outerHeight();
            const progress = Math.min(Math.max(conPos, 0), maxConPos);

            $(connector).css('height', progress + 'px');
          }, this));
        },
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          children.add({
            type: 'timeline-connector-bg',
          });
          children.add({
            type: 'timeline-connector',
          });
        }
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-connector-wrapper')) {
          return { type: 'timeline-connector-wrapper' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-connector', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Connector',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-connector'],
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-connector')) {
          return { type: 'timeline-connector' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-connector-bg', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Connector Background',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-connector-bg'],
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-connector-bg')) {
          return { type: 'timeline-connector-bg' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-items-wrapper', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Items Wrapper',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-items-wrapper'],
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-items-wrapper')) {
          return { type: 'timeline-items-wrapper' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-item', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Item',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-item'],
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-item')) {
          return { type: 'timeline-item' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-card', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Card',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-card'],
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          children.add({
            type: 'paragraph',
            content: '20xx',
            classes: ['timeline-card-date-text']
          });
          children.add({
            type: 'header',
            content: 'title',
          });
          children.add({
            type: 'paragraph',
            content: 'this is our timeline',
          });
        }
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-card')) {
          return { type: 'timeline-card' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-card-date', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Card Date',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-card-date'],
      },
      init() {
        const children = this.components();
        if (children.length === 0) {
          children.add({
            type: 'paragraph',
            content: '20xx',
          });
        }
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-card-date')) {
          return { type: 'timeline-card-date' };
        }
      },
    }),
    view: defaultView,
  });

  domc.addType('timeline-marker', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Timeline Marker',
        droppable: true,
        tagName: 'div',
        classes: ['timeline-marker'],
        content: `<div class="timeline-marker-calendar">
                    <i class="fas fa-calendar"></i>
                  </div>`
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('timeline-marker')) {
          return { type: 'timeline-marker' };
        }
      },
    }),
    view: defaultView,
  });
};

