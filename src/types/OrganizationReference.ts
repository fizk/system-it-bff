import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import type { OrganizationReferenceUnit, Context } from '../definition';

const type: GraphQLObjectType<OrganizationReferenceUnit, Context> = new GraphQLObjectType<OrganizationReferenceUnit, Context>({
    name: 'OrganizationReference',
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
    }),
});

export default type;
