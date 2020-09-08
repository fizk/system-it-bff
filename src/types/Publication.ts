import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import type { MembershipReferenceUnit } from '../definition';

const type: GraphQLObjectType = new GraphQLObjectType<MembershipReferenceUnit>({
    name: 'Publication',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({ _id }) => _id
        },
        _unit: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({ __unit }) => __unit
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
        description: {
            type: GraphQLString,
        },
    }),
});

export default type;
