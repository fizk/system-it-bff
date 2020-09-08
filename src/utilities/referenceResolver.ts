import { Unit, Gateway, Reference } from "../definition";

const resolver = async <A extends Unit<any> = Unit<Reference>, B extends Reference = Reference>(source: Unit<B>, match: RegExp, client: Gateway): Promise<{unit: A, reference: B}[]> => {
    const references = source.__ref.filter(item => item.__mime.match(match));
    if (!references.length) return [];
    const ids = references.map(item => item.__unit);
    const units = await client.fetch<ReadonlyArray<A>>(`/units?ids=${ids.join(',')}`);

    return references.map((item, i) => ({
        unit: units[i],
        reference: item
    }));
}

export default resolver;
