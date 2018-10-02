class QuerySetImmutable extends QuerySet
{

    constructor(...args)
    {
        super(...args);
    }

    pushStack(nodes)
    {
        return new QuerySetImmutable(nodes);
    }

}