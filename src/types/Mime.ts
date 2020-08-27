import { GraphQLObjectType, GraphQLString } from 'graphql';

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mime',
    fields: () => ({
        type: {
            type: GraphQLString,
            resolve: ({ type }) => type
        },
        category: {
            type: GraphQLString,
            resolve: ({ category }) => category
        },
        tag: {
            type: GraphQLString,
            resolve: ({ tag }) => tag
        },
    }),
});

export default type;

