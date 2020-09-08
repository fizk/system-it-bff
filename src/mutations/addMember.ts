import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import ArtistAndMembership from "../types/ArtistAndMembership";
import ArtistCategory from "../types/ArtistCategory";
import ArtistMembershipInput from "../inputs/ArtistMembershipInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: ArtistAndMembership,
    args: {
        artist_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        member_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        membership: {
            type: ArtistMembershipInput,
        },
        category: {
            type: ArtistCategory,
        },
    },

    resolve(source, { artist_id, member_id, membership, category}, { client }) {
        return client.post(`/units/${artist_id}/references`, {
            __unit: member_id,
            __mime: `artist/${category}+member`,
            ...{...membership,
                from: membership.from ? membership.from.toISOString() : null,
                to: membership.to ? membership.to.toISOString() : null,
            },
        }).then(response => (Promise.all([
                client.fetch(`/units/${member_id}`),
                client.fetch(response.location),
            ]))
        ).then(([artist, membership]) => ({ artist, membership}));
    },
};

export default type;
