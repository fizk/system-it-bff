import { GraphQLFieldConfig, GraphQLList } from "graphql";
import Item from "../types/Item";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: GraphQLList(Item),

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units?filter=item/.*`);
    },
};

export default type;
