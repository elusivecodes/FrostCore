Object.assign(Core.prototype, {

    // get a cookie value (optionally json encoded)
    getCookie(name, json = false)
    {
        const cookie = decodeURIComponent(this.context.cookie)
            .split(';')
            .find(cookie =>
                cookie.trimStart()
                    .substring(0, name.length) === name
            );

        if (!cookie) {
            return null;
        }

        const value = cookie.trimStart().
            substring(name.length + 1);

        return json ?
            JSON.parse(value) :
            value;
    },

    // remove a cookie
    removeCookie(name, options)
    {
        this.setCookie(
            name,
            '',
            {
                expires: -1,
                ...options
            }
        );
    },

    // set a cookie (optionally json encoded)
    setCookie(name, value, options, json = false)
    {
        if (!name) {
            return;
        }

        if (json) {
            value = JSON.stringify(value);
        }

        let cookie = name + '=' + value;

        if (options) {
            if (options.expires) {
                let date = new Date();
                date.setTime(date.getTime() + (options.expires * 1000));
                cookie += ';expires=' + date.toUTCString();
            }

            if (options.path) {
                cookie += ';path=' + options.path;
            }

            if (options.secure) {
                cookie += ';secure';
            }
        }

        this.context.cookie = cookie;
    }

});