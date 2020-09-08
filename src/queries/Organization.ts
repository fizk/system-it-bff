import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import Organization from "../types/Organization";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Organization,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units/${args.id}`);
    },
};

export default type;
