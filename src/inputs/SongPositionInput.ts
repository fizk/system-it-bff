import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'SongPositionInput',
    fields: () => ({
        position: {
            type: GraphQLString
        },
    })
});

export default type;
