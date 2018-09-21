Object.assign(Core.prototype, {

    // perform an XHR request
    ajax(url, data = null, method = 'GET')
    {
        if (frost.isObject(url)) {
            method = data || method;
            data = url;
        } else {
            data = data || {};
            data.url = url;
        }

        const settings = {
            ...Core.ajaxDefaults,
            ...data
        };

        if ( ! settings.method) {
            settings.method = method;
        }

        if ( ! settings.url) {
            settings.url = window.location;
        }

        if (settings.cache) {
            settings.url += (settings.url.indexOf('?') < 0 ? '?' : '&') + Date.now();
        }

        if (settings.contentType && ! settings.headers['Content-Type']) {
            settings.headers['Content-Type'] = settings.contentType;
        }

        if ( ! settings.headers['X-Requested-With']) {
            settings.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(settings.method, settings.url, true);

            Object.keys(settings.headers).forEach(key => xhr.setRequestHeader(key, settings.headers[key]));

            if (settings.responseType) {
                xhr.responseType = settings.responseType;
            }

            xhr.onload = e => {
                if (xhr.status === 200) {
                    resolve(xhr.response, xhr, e);
                } else {
                    reject(xhr.status, xhr, e);
                }
            };

            xhr.onerror = e => {
                reject(xhr.status, xhr, e);
            };

            if (settings.uploadProgress) {
                xhr.upload.onprogress = e => {
                    settings.uploadProgress(e.loaded / e.total * 100, xhr, e);
                };
            }

            if (settings.beforeSend) {
                settings.beforeSend(xhr);
            }

            if (settings.data) {
                if (settings.processData) {
                    if (settings.contentType == 'application/json') {
                        settings.data = JSON.stringify(settings.data);
                    } else {
                        settings.data = Core.parseParams(settings.data);
                    }
                }
                xhr.send(settings.data);
            } else {
                xhr.send();
            }
        });
    },

    // load and executes a JavaScript file
    loadScript(script)
    {
        return this.xhr(script)
            .then(response => eval.apply(window, response));
    },

    // load and execute multiple JavaScript files (in order)
    loadScripts(scripts)
    {
        return Promise.all(scripts.map(script => this.xhr(script)))
            .then(responses => responses.forEach(response => eval.apply(window, response)));
    },

    // import A CSS Stylesheet file
    loadStyle(stylesheet)
    {
        const head = this.findOne('head');

        const link = this.create('link');
        this.setAttribute(link, 'rel', 'stylesheet');
        this.setAttribute(link, 'href', stylesheet);
        this.append(head, link);
    },

    // import multiple CSS Stylesheet files
    loadStyles(stylesheets)
    {
        stylesheets.forEach(stylesheet => this.loadStyle(stylesheet));
    },

    // perform an XHR request for a file upload
    upload(url, data, method = 'POST')
    {
        if (frost.isObject(url)) {
            data = url;
        } else {
            data.url = url;
        }

        const formData = new FormData();
        Object.keys(data.data).forEach(key => formData.append(key, data.data[key]));
        data.data = formData;

        if ( ! data.contentType) {
            data.contentType = 'multipart/form-data';
        }

        if ( ! data.processData) {
            data.processData = false;
        }

        this.xhr(data, null, method);
    }

});