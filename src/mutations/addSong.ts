import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import ItemAndPosition from "../types/ItemAndPosition";
import SongPositionInput from "../inputs/SongPositionInput";
import SongTag from "../types/SongTag";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: ItemAndPosition,
    args: {
        album_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        song_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        position: {
            type: SongPositionInput,
        },
        tag: {
            type: SongTag,
        },
    },

    resolve(source, { song_id, album_id, position, tag}, { client }) {
        return client.post(`/units/${album_id}/references`, {
            __unit: song_id,
            __mime: 'item/song' + (!!tag ? `+${tag}` : ''),
            position: position
        }).then(response => (Promise.all([
                client.fetch(`/units/${album_id}`),
                client.fetch(response.location),
            ]))
        ).then(([item, position]) => ({ item, position}));
    },
};

export default type;
