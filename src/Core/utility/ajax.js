Object.assign(Core.prototype, {

    // perform an XHR request
    ajax(url, data = null) {
        if (Core.isObject(url)) {
            data = url;
        } else {
            data = data || {};
            data.url = url;
        }

        const settings = {
            ...Core.ajaxDefaults,
            ...data
        };

        if (!settings.url) {
            settings.url = window.location;
        }

        if (settings.cache) {
            settings.url += (
                settings.url.indexOf('?') < 0 ?
                    '?' :
                    '&'
            ) + Date.now();
        }

        if (!settings.headers) {
            settings.headers = {};
        }

        if (settings.contentType && !settings.headers['Content-Type']) {
            settings.headers['Content-Type'] = settings.contentType;
        }

        if (!settings.headers['X-Requested-With']) {
            settings.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;

            xhr.open(settings.method, settings.url, true);

            Object.keys(settings.headers)
                .forEach(key =>
                    xhr.setRequestHeader(key, settings.headers[key])
                );

            if (settings.responseType) {
                xhr.responseType = settings.responseType;
            }

            xhr.onload = e => {
                if (xhr.status > 400) {
                    reject(xhr.status, xhr, e);
                } else {
                    resolve(xhr.response, xhr, e);
                }
            };

            xhr.onerror = e => {
                reject(xhr.status, xhr, e);
            };

            if (settings.uploadProgress) {
                xhr.upload.onprogress = e => {
                    settings.uploadProgress(e.loaded / e.total, xhr, e);
                };
            }

            if (settings.beforeSend) {
                settings.beforeSend(xhr);
            }

            if (settings.data && settings.processData) {
                if (settings.contentType == 'application/json') {
                    settings.data = JSON.stringify(settings.data);
                } else {
                    settings.data = Core._parseParams(settings.data);
                }
            }
            xhr.send(settings.data);
        });
    },

    // perform an XHR request for a file upload
    upload(url, data) {
        if (Core.isObject(url)) {
            data = url;
        } else {
            data.url = url;
        }

        if (!data.method) {
            data.method = 'POST';
        }

        if (data.data) {
            data.data = Core._parseFormData(data.data);
            data.processData = false;
            data.contentType = false;
        }

        return this.ajax(data);
    },

    // load and executes a JavaScript file
    loadScript(script, cache) {
        return this.ajax(script, { cache })
            .then(response =>
                eval.apply(window, response)
            );
    },

    // load and execute multiple JavaScript files (in order)
    loadScripts(scripts, cache) {
        return Promise.all
            (
                scripts.map(script =>
                    this.ajax(script, { cache })
                )
            )
            .then(responses =>
                responses.forEach(response =>
                    eval.apply(window, response)
                )
            );
    },

    // import A CSS Stylesheet file
    loadStyle(stylesheet, cache) {
        return this.ajax(stylesheet, { cache })
            .then(response =>
                this.append(
                    this.findOne('head'),
                    this.create('style', response)
                )
            );
    },

    // import multiple CSS Stylesheet files
    loadStyles(stylesheets, cache) {
        const head = this.findOne('head');

        return Promise.all
            (
                stylesheets.map(stylesheet =>
                    this.ajax(stylesheet, { cache })
                )
            )
            .then(responses =>
                responses.forEach(response =>
                    this.append(
                        head,
                        this.create('style', response)
                    )
                )
            );
    }

});