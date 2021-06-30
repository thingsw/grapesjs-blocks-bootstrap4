const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};


export const CategoryBlock = (bm) => {
  bm.add('files-category', {
    label: `
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" style="padding: 10px 0" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
            <div>Category</div>
            `,
    category: 'Files',
    content: {
      type: 'files-category',
      classes: ['files-category'],
    },
  });
};

export default (domc, serverUri) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('files-category', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Category',
        tagName: 'div',
        classes: ['files-category'],
        traits: [
          {
            type: 'text',
            label: 'Category ID',
            name: 'category-id',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
        script() {
          const pdfPath = '/static/icons/pdf.svg';
          const zipPath = '/static/icons/zip.svg';
          const firmwarePath = '/static/icons/download_drive.png';
          const formatterPath = '/static/icons/formatter.svg';
          const self = $(this);
          const categoryId = self.attr('data-category-id');
          const serverUri = self.attr('data-server-uri'); console.log("serverUri", serverUri);
          if (categoryId) {
            fetch(`${serverUri}/fulfillment/api/categories/${categoryId}`).then(function (resp) {
              return resp.json();
            }).then(function (category) {
              if (category && category.files) {
                const regex = /\s+-\s+/

                const html = category.files.map(file => {
                  let icon = pdfPath;
                  if (file.fileType === 'zip') {
                    icon = zipPath;
                  }
                  if (file.fileType === 'firmware') {
                    icon = firmwarePath;
                  }
                  if (file.fileType === 'formatter') {
                    icon = formatterPath;
                  }
                  return `<div class="tw-file-category">
                    <div>
                      <img
                        src="${icon}"
                        alt="${file.fileType}"
                      />
                    </div>
                    <div class="tw-file-detail">
                      <div><a href='/pages/${file.title.replace(regex, '-').replace(' ', '-').toLowerCase()}'>${file.title}</a></div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg> ${formatBytes(file.size)}
                      </div>
                      <div><a href='/fulfillment/api/files/${file.id}/presigned'>Download</a></div>
                    </div>
                  </div>`
                });
                $('#tw-categories').html(html);
              }

              // $('#tw-file-title').text(file.title);
              // $('#tw-file-version').text(file.version);
              // $('#tw-file-download').text(file.downloadCount);
              // $('#tw-file-size').text(formatBytes(file.size));
              // $('#tw-file-last-updated').text(moment(file.updated).format('MMM D, YYYY'));
              // $('#tw-file-download-link').html(`<a href="/fulfillment/api/files/${file.id}/presigned" class="btn btn-primary" role="button">Download</a>`);
              // $('#tw-file-description').html(file.html);
            });
          }
        },
      },
      init() {
        this.addAttributes({ 'data-server-uri': serverUri });
        this.listenTo(this, 'change:category-id', this.updateCategoryId);
      },
      updateCategoryId() {
        const categoryId = this.get('category-id');
        this.setAttributes({ 'data-category-id': categoryId });
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('files-category')) {
          return { type: 'files-category' };
        }
      },
    }),
    view: defaultView.extend({
      init() {
        const comps = this.model.components();
        // Add a basic template if it's not yet initialized
        if (!comps.length) {
          comps.add(`              
              <div id='tw-categories'></div>
            `);
        }
      }
    }),
  });
};

