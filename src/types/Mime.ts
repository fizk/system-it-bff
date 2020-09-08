import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mime',
    fields: () => ({
        type: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: ({ type }) => type
        },
        category: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: ({ category }) => category
        },
        tag: {
            type: GraphQLString,
            resolve: ({ tag }) => Boolean(tag) ? tag : null
        },
    }),
});

export default type;

