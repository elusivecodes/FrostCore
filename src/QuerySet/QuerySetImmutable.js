class QuerySetImmutable extends QuerySet
{

    pushStack(nodes)
    {
        return new QuerySetImmutable(nodes);
    }

}