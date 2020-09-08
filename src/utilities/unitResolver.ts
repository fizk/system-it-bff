import { Unit, Gateway, Reference } from "../definition";
import invert from "./invert";

export default <A extends Unit<B>, B extends Reference = Reference> (source: A, match: RegExp, client: Gateway): Promise<{unit: A, reference: B}[]> => {
    return client.fetch<ReadonlyArray<A>>(`/references/${source._id}`)
        .then(units => units.map(unit => invert<A, B>(source, unit, match)))
        .then(references => references.flat());
}
