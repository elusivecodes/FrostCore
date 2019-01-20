Object.assign(Core.prototype, {

    // get custom data for the first node
    getData(nodes, key)
    {
        const node = this.nodeFirst(nodes, false, true, true);

        if (!node) {
            return;
        }

        if (!this.nodeData.has(node)) {
            return;
        }

        if (!key) {
            return this.nodeData.get(node);
        }

        return this.nodeData.get(node)[key];
    },

    // set custom data for each node
    setData(nodes, key, value)
    {
        const data = Core._parseData(key, value);

        this.nodeArray(nodes, false, true, true)
            .forEach(node =>
            {
                if (!this.nodeData.has(node)) {
                    this.nodeData.set(node, {});
                }

                Object.assign(
                    this.nodeData.get(node),
                    data
                );
            });
    },

    // remove custom data for each node
    removeData(nodes, key)
    {
        this.nodeArray(nodes, false, true, true)
            .forEach(node =>
            {
                if (!this.nodeData.has(node)) {
                    return;
                }

                if (key) {
                    const nodeData = this.nodeData.get(node);
                    delete nodeData[key];
                    if (Object.keys(nodeData).length) {
                        return;
                    }
                }

                this.nodeData.delete(node);
            });
    }

});