import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import Individual from "../types/Individual";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Individual,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },

    resolve(source, {name}, { client }) {
        return client.post(`/units`, {name, __mime: 'artist/individual'})
        .then(response => client.fetch(response.location));
    },
};

export default type;
