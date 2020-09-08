import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'PublisherInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString,
        },
    })
});

export default type;
