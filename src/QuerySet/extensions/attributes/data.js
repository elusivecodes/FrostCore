Object.assign(QuerySet.prototype, {

    // get data for the first node
    getData(key)
    {
        return this.core.getData(this.nodes, key);
    },

    // remove custom data for each node
    removeData(key)
    {
        this.core.removeData(this.nodes, key);
        return this;
    },

    // set custom data for each node
    setData(key, value)
    {
        this.core.setData(this.nodes, key, value);
        return this;
    }

});