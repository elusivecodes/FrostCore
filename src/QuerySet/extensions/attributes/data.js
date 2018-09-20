Object.assign(QuerySet.prototype, {

    // get data for the first node
    getData(key)
    {
        return core.getData(this.nodes, key);
    },

    // remove custom data for each node
    removeData(key)
    {
        core.removeData(this.nodes, key);
        return this;
    },

    // set custom data for each node
    setData(key, value)
    {
        core.setData(this.nodes, key, value);
        return this;
    }

});