import { GraphQLInputObjectType, GraphQLString } from "graphql";

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'PublicationInput',
    fields: () => ({
        description: {
            type: GraphQLString,
        },
    })
});

export default type;
