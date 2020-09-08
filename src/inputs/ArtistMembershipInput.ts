import { GraphQLInputObjectType } from "graphql";
import { GraphQLDate } from "graphql-iso-date";

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ArtistMembershipInput',
    fields: () => ({
        from: {
            type: GraphQLDate
        },
        to: {
            type: GraphQLDate
        },
    })
});

export default type;
