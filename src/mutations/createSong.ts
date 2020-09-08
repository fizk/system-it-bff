import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import Song from "../types/Song";
import SongTag from "../types/SongTag";
import SongInput from "../inputs/SongInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Song,
    args: {
        properties: {
            type: new GraphQLNonNull(SongInput),
        },
        tag: {
            type: SongTag,
        },
    },

    resolve(source, { properties, tag}, { client }) {
        return client.post(`/units`, { ...properties, __mime: `item/song${!!tag ? `+${tag}` : ''}`})
            .then(response => client.fetch(response.location));
    },
};

export default type;
