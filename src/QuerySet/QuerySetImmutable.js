class QuerySetImmutable extends QuerySet {
    constructor() {
        super(...arguments);
    }

    pushStack(nodes)
    {
        return new QuerySetImmutable(nodes);
    }
}