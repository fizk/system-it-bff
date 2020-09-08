import { Unit, Reference } from "../definition";

export default <A extends Unit<B>, B extends Reference>(parent: A, reference: A, mime: RegExp): ReadonlyArray<{unit: A, reference: B}> => {
    return reference.__ref
        .filter((item) => item.__unit === parent._id && item.__mime.match(mime))
        .map(item => ({
            unit: reference,
            reference: item
        })
    );
}
