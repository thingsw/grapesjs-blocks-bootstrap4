export const PageLoaderBlock = (bm) => {
  bm.add('page-loader', {
    label: `
      <svg class="gjs-block-svg" version="1.1" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 470 470">
        <g>
          <path d="m462.5,22.5h-455c-4.142,0-7.5,3.357-7.5,7.5v410c0,4.143 3.358,7.5 7.5,7.5h455c4.142,0 7.5-3.357 7.5-7.5v-80c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v72.5h-440v-335h440v232.5c0,4.143 3.358,7.5 7.5,7.5s7.5-3.357 7.5-7.5v-300c0-4.143-3.358-7.5-7.5-7.5zm-447.5,15h277.5v45h-277.5v-45zm292.5,45v-45h147.5v45h-147.5z"/>
          <path d="m381.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
          <path d="m340.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
          <path d="m422.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
          <path d="m148.714,225.989c2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.594c1.188-3.968-1.064-8.148-5.032-9.337-3.966-1.188-8.148,1.064-9.337,5.032l-12.374,41.306-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.928,19.908-12.372-41.298c-1.188-3.968-5.369-6.221-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.586c0.853,2.847 3.306,4.921 6.254,5.29 0.312,0.039 0.623,0.058 0.932,0.058 2.612,0 5.066-1.366 6.432-3.646l14.233-23.756 14.233,23.756c1.53,2.549 4.42,3.959 7.366,3.588z"/>
          <path d="m206.358,225.982c0.312,0.039 0.623,0.058 0.932,0.058 2.612,0 5.066-1.366 6.432-3.646l14.233-23.756 14.233,23.756c1.527,2.549 4.416,3.957 7.364,3.588 2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.594c1.188-3.968-1.064-8.148-5.032-9.337-3.968-1.189-8.148,1.063-9.337,5.032l-12.374,41.307-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.926,19.908-12.372-41.299c-1.188-3.968-5.367-6.222-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.587c0.853,2.846 3.306,4.92 6.254,5.289z"/>
          <path d="m368.865,153.755c-3.967-1.188-8.148,1.064-9.337,5.032l-12.374,41.305-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.928,19.908-12.372-41.298c-1.189-3.967-5.367-6.22-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.586c0.853,2.847 3.306,4.921 6.254,5.29 2.949,0.369 5.836-1.038 7.364-3.588l14.233-23.756 14.233,23.756c1.366,2.279 3.819,3.646 6.432,3.646 0.309,0 0.621-0.019 0.932-0.058 2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.593c1.19-3.968-1.062-8.149-5.03-9.337z"/>
          <path d="m136.7,268.547c0-4.143-3.358-7.5-7.5-7.5h-40c-4.142,0-7.5,3.357-7.5,7.5v40c0,4.143 3.358,7.5 7.5,7.5h40c4.142,0 7.5-3.357 7.5-7.5v-40zm-15,32.5h-25v-25h25v25z"/>
          <path d="m129.2,331.047h-40c-4.142,0-7.5,3.357-7.5,7.5v40c0,4.143 3.358,7.5 7.5,7.5h40c4.142,0 7.5-3.357 7.5-7.5v-40c0-4.143-3.358-7.5-7.5-7.5zm-7.5,40h-25v-25h25v25z"/>
          <path d="m366.712,281.047h-30c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h30c4.142,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
          <path d="m306.712,281.047h-147.512c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h147.513c4.142,0 7.5-3.357 7.5-7.5s-3.359-7.5-7.501-7.5z"/>
          <path d="m366.712,351.047h-30c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h30c4.142,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
          <path d="m306.712,351.047h-147.512c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h147.513c4.142,0 7.5-3.357 7.5-7.5s-3.359-7.5-7.501-7.5z"/>
        </g>
      </svg>
      <div>Page Loader</div>`,
    category: 'Components',
    content: {
      type: 'page-loader',
    },
  });
};

const PageLoader = (domc, serverUri) => {
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const traits = [{
    type: 'text',
    placeholder: 'Page ID',
    label: 'Page ID',
    name: 'data-page-id',
  }];

  const model = defaultModel.extend({
    // Extend default properties
    defaults: {
      ...defaultModel.prototype.defaults, // Can't drop other elements inside it
      droppable: false,
      classes: ['page-loader'],
      traits,
      script() {
        // `this` is bound to the component element
        const pageId = this.getAttribute('data-page-id');
        const serverUri = this.getAttribute('data-server-uri');
        function LoadPage(id, el) {
          fetch(`${serverUri}/fulfillment/api/graphql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              operationName: 'GetPage',
              query: 'query GetPage($id: String!) {\n  page(id: $id) {\n    id\n    html\n    css\n }\n}\n',
              variables: { id },
            }),
          })
            .then((r) => r.json())
            .then((resp) => {
              const { data } = resp;
              el.innerHTML = data.page.html;
              const styleEl = document.createElement('style');
              styleEl.innerHTML = data.page.css;
              document.head.appendChild(styleEl);
            });
        }

        if (pageId) {
          LoadPage(pageId, this);
        }
      }
    },
    init() {
      this.addAttributes({ 'data-server-uri': serverUri });
    }
  }, {
    isComponent(el) {
      let result = '';
      if (el.tagName === 'DIV' && el.className === 'page-loader') {
        result = { type: 'page-loader' };
      }
      return result;
    },
  });

  const view = defaultView.extend({

  });

  domc.addType('page-loader', {
    // Define the Model
    model,

    // Define the View
    view,
  });
};

export default PageLoader;
