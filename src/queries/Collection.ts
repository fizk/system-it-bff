import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import Collection from "../types/Collection";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Collection,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },

    resolve(source, args, {client}) {
        return client.fetch<Unit>(`/units/${args.id}`);
    },
};

export default type;
