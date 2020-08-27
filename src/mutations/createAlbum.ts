import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import type { Context } from '../definition';
import Album from "../types/Album";

const type: GraphQLFieldConfig<null, Context> = {
    type: Album,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        tag: {
            type: GraphQLString,
        },
    },

    resolve(source, { name, tag}, { client }) {
        return client.post(`/units`, { name, __mime: 'collection/album' + (!!tag ? `+${tag}` : '')})
        .then(response => client.fetch(response.location));
    },
};

export default type;
