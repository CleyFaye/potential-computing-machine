/** Predicate to determine if an object is of a given type */
export type TypePredicate<ResType> = (obj: unknown) => obj is ResType;
