import { GraphQLFieldConfig, GraphQLList } from "graphql";
import Organization from "../types/Organization";
import type { Context, Unit } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: GraphQLList(Organization),

    resolve(source, args, {client}) {
        return client.fetch<ReadonlyArray<Unit>>(`/units?filter=organization.*`);
    },
};

export default type;
