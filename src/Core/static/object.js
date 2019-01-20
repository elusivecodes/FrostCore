Object.assign(Core, {

    forgetDot(pointer, key) {
        const keys = key.split('.');

        let current;
        while (current = keys.shift() && keys.length) {
            if (!pointer.hasOwnProperty(current)) {
                return;
            }
        }

        delete pointer[current];
    },

    getDot(pointer, key, defaultValue) {
        key.split('.').forEach(key => {
            if (!pointer.hasOwnProperty(key)) {
                pointer = defaultValue;
                return false;
            }

            pointer = pointer[key];
        });

        return pointer;
    },

    hasDot(pointer, key) {
        let result = true;

        key.split('.').forEach(key => {
            if (!pointer.hasOwnProperty(key)) {
                result = false;
                return false;
            }
        });

        return result;
    },

    pluckDot(pointers, key) {
        return pointers.map(pointer => this.getDot(pointer, key));
    },

    setDot(pointer, key, value, overwrite = true) {
        const keys = key.split('.');

        let current;
        while (current = keys.shift() && keys.length) {
            if (current === '*') {
                return Object.keys(pointer).forEach(k =>
                    this.dotSet(
                        pointer[k],
                        keys.join('.'),
                        value,
                        overwrite
                    )
                );
            }

            if (!pointer.hasOwnProperty(current)) {
                pointer[current] = {};
            }

            pointer = pointer[current];
        }

        if (overwrite || !pointer.hasOwnProperty(current)) {
            pointer[current] = value;
        }
    }

});