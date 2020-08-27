import { GraphQLObjectType } from "graphql";
import Artist from "./Artist";
import Membership from "./Membership";

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'ArtistAndMembership',
    fields: () => ({
        artist: {
            type: Artist
        },
        membership: {
            type: Membership
        }
    })
});

export default type;
