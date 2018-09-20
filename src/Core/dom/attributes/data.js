Object.assign(Core.prototype, {

    // get data for the first node
    getData(nodes, key)
    {
        const node = Core.nodeFirst(nodes, false, true, true);

        if ( ! node) {
            return;
        }

        if ( ! this.nodeData.has(node)) {
            return;
        }

        const nodeData = this.nodeData.get(node);

        if ( ! key) {
            return nodeData;
        }

        return nodeData[key];
    },

    // remove custom data for each node
    removeData(nodes, key)
    {
        Core.nodeArray(nodes, false, true, true)
            .forEach(node => {
                if ( ! this.nodeData.has(node)) {
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
    },

    // set custom data for each node
    setData(nodes, key, value)
    {
        Core.nodeArray(nodes, false, true, true)
            .forEach(node => {
                if ( ! this.nodeData.has(node)) {
                    this.nodeData.set(node, {});
                }

                this.getData(node)[key] = value;
            });
    }

});