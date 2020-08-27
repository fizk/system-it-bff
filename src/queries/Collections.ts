import { GraphQLFieldConfig, GraphQLList } from "graphql";
import Collection from "../types/Collection";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: GraphQLList(Collection),
    args: {},

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units?filter=collection/.*`);
    },
};

export default type;
