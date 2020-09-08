import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import Group from "../types/Group";
import GroupArtistInput from "../inputs/GroupArtistInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Group,
    args: {
        properties: {
            type: new GraphQLNonNull(GroupArtistInput),
        },
    },

    resolve(source, {properties}, { client }) {
        return client.post(`/units`, {
            ...{
                ...properties,
                formed: properties.formed ? properties.formed.toISOString() : null,
            },
            __mime: `artist/group`
        }).then(response => client.fetch(response.location));
    },
};

export default type;
