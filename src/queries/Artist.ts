import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import Artist from "../types/Artist";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Artist,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units/${args.id}`);
    },
};

export default type;
