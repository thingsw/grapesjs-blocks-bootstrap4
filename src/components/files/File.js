const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};


export const FileBlock = (bm) => {
  bm.add('files-file', {
    label: `
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" style="padding: 10px 0" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
            <div>File</div>
          `,
    category: 'Files',
    content: {
      type: 'files-file',
      classes: ['files-file'],
    },
  });
};

export default (domc, serverUri) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('files-file', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'File',
        tagName: 'div',
        classes: ['files-file'],
        traits: [
          {
            type: 'text',
            label: 'File ID',
            name: 'file-id',
            changeProp: 1,
          },
        ].concat(defaultModel.prototype.defaults.traits),
        script() {
          const self = $(this);
          const fileId = self.attr('data-file-id');
          const serverUri = self.attr('data-server-uri'); console.log("serverUri", serverUri);
          if (fileId) {
            fetch(`${serverUri}/fulfillment/api/files/${fileId}`).then(function (resp) {
              return resp.json();
            }).then(function (file) {
              $('#tw-file-title').text(file.title);
              $('#tw-file-version').text(file.version);
              $('#tw-file-download').text(file.downloadCount);
              $('#tw-file-size').text(formatBytes(file.size));
              $('#tw-file-last-updated').text(moment(file.updated).format('MMM D, YYYY'));
              $('#tw-file-download-link').html(`<a href="/fulfillment/api/files/${file.id}/presigned" class="btn btn-primary" role="button">Download</a>`);
              $('#tw-file-description').html(file.html);
            });
          }
        },
      },
      init() {
        this.addAttributes({ 'data-server-uri': serverUri });
        this.listenTo(this, 'change:file-id', this.updateFileId);
      },
      updateFileId() {
        const fileId = this.get('file-id');
        this.setAttributes({ 'data-file-id': fileId });
      }
    }, {
      isComponent(el) {
        if (el && el.tagName === 'DIV' && el.classList && el.classList.contains('files-file')) {
          return { type: 'files-file' };
        }
      },
    }),
    view: defaultView.extend({
      init() {
        const comps = this.model.components();
        // Add a basic template if it's not yet initialized
        if (!comps.length) {
          comps.add(`
            <h1 id='tw-file-title'></h1>
            <table class="file-table table table-bordered">
              <tbody>
                <tr>
                  <td>Version</td>
                  <td id='tw-file-version'></td>
                </tr>
                <tr>
                  <td>Download</td>
                  <td id='tw-file-download'></td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td id='tw-file-size'></td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td id='tw-file-last-updated'></td>
                </tr>
                <tr>
                  <td>Download link</td>
                  <td id='tw-file-download-link'></td>
                </tr>
              </tbody>
            </table>
            <div id='tw-file-description'></div>
          `);
        }
      }
    }),
  });
};

