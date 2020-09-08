import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'SongInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        aka: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        description: {
            type: GraphQLString,
        },
        genres: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
    })
});

export default type;
