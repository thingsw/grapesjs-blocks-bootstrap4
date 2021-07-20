import imageIcon from "raw-loader!../../icons/image-solid.svg";

export const ImageLoopBlock = (bm) => {
  bm.add('bs-image-loop', {
    label: `
      ${imageIcon}
      <div>Image Loop</div>
    `,
    category: 'Media',
    content: {
      type: 'bs-image-loop'
    }
  });
};


const ImageLoop = (domc) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const model = defaultModel.extend({
    // Extend default properties
    defaults: {
      ...defaultModel.prototype.defaults, // Can't drop other elements inside it
      droppable: true,
      'custom-name': 'Image Loop',
      traits: [
        {
          label: 'Effect',
          type: 'select',
          name: 'effect',
          options: [
            { value: '', name: 'None' },
            { value: 'zoom', name: 'Zoom' },
          ],
          changeProp: 1,
        },
      ],
      classes: ['bs-image-loop'],
      script() {
        const images = document.getElementsByClassName("img-loop");
        let t1;
        const resizeend = () => {
          if ($('body.gjs-dashed').length === 0) {
            if (t1 === undefined) {
              t1 = gsap.timeline({ repeat: -1, repeatDelay: 0 });
              let offset = 0;
              const interval = 5;
              const effect = this.attributes['data-effect'];
              for (let i = 0; i < images.length; i++) {
                const img = images[i];
                if (i !== 0) {
                  img.style = "opacity:0;"
                  t1.to(img, { opacity: 1, duration: 1 }, offset);
                } else {
                  t1.to(img, { opacity: 1, duration: 1 }, interval * images.length);
                  t1.to(img, { scale: 1, transformOrigin: "50% 50%", duration: 1 }, interval * images.length - 1);
                }
                if (effect !== undefined && effect.value === 'zoom') {
                  t1.to(img, { scale: 1.5, transformOrigin: "50% 50%", duration: interval }, offset);
                }
                t1.to(img, { opacity: 0, duration: 1 }, offset + interval);
                offset = offset + interval;
              }
            }
          } else {
            if (t1 !== undefined) {
              t1.kill();
              t1 = undefined;
              for (let i = 0; i < images.length; i++) {
                const img = images[i];
                img.style = "opacity:1;"
              }
            }
          }
        }
        let timeout;
        $(window).on('resize', function () {
          clearTimeout(timeout);
          timeout = setTimeout(resizeend, 100);
        })

        // t1.to("")
      }
    },
    init() {
      const children = this.components();
      if (children.length === 0) {
        const div = children.add({ type: "default" });
        div.addClass('img-loop-overlay');
        const div2 = children.add({ type: "default" });
        div2.addClass('img-loop-container');
        const item1 = div2.components().add({ type: 'bs-image' });
        item1.addClass('img-loop');
        const item2 = div2.components().add({ type: 'bs-image' });
        item2.addClass('img-loop');
        const item3 = div2.components().add({ type: 'bs-image' });
        item3.addClass('img-loop');
      }
      this.listenTo(this, 'change:effect', this.changeEffect);
    },
    changeEffect() {
      let effect = this.get('effect');
      let attrs = this.get('attributes');

      if (effect) {
        attrs['data-effect'] = effect;
      } else {
        delete attrs['data-effect'];
      }

      this.set('attributes', { ...attrs });
    }
  }, {
    isComponent(el) {
      let result = '';
      if (el.tagName === 'DIV' && el.className === 'bs-image-loop') {
        result = { type: 'bs-image-loop' };
      }
      return result;
    },
  });

  const view = defaultView.extend({

  });

  domc.addType('bs-image-loop', {
    // Define the Model
    model,

    // Define the View
    view,
  });
};

export default ImageLoop;
