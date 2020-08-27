import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import type { Context } from '../definition';
import Group from "../types/Group";

const type: GraphQLFieldConfig<null, Context> = {
    type: Group,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },

    resolve(source, {name}, { client }) {
        return client.post(`/units`, {name, __mime: 'artist/group'})
        .then(response => client.fetch(response.location));
    },
};

export default type;
