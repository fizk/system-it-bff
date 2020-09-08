import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import Album from "../types/Album";
import AlbumTag from "../types/AlbumTag";
import AlbumInput from "../inputs/AlbumInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Album,
    args: {
        properties: {
            type: new GraphQLNonNull(AlbumInput),
        },
        tag: {
            type: AlbumTag,
        },
    },

    resolve(source, { properties, tag}, { client }) {
        return client.post(`/units`, { ...properties, __mime: `collection/album${!!tag ? `+${tag}` : ''}`})
            .then(response => client.fetch(response.location));
    },
};

export default type;
