import { GraphQLFieldConfig, GraphQLList } from "graphql";
import Artist from "../types/Artist";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: GraphQLList(Artist),

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units?filter=artist/.*`);
    },
};

export default type;
