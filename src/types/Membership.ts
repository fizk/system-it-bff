import { GraphQLObjectType, GraphQLString } from 'graphql';

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'Membership',
    fields: () => ({
        from: {
            type: GraphQLString,
        },
        to: {
            type: GraphQLString,
        },
    }),
});

export default type;
