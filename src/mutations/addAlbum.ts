import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import CollectionAndReference from "../types/CollectionAndReference";
import AlbumTag from "../types/AlbumTag";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: CollectionAndReference,
    args: {
        artist_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        album_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        tag: {
            type: AlbumTag,
        },
    },

    resolve(source, { artist_id, album_id, tag}, { client }) {
        return client.post(`/units/${artist_id}/references`, {
            __unit: album_id,
            __mime: 'collection/album' + (!!tag ? `+${tag}` : '')
        }).then(response => (Promise.all([
                client.fetch(`/units/${album_id}`),
                client.fetch(response.location),
            ]))
        ).then(([collection, reference]) => ({collection, reference}));
    },
};

export default type;
