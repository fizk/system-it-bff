import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import OrganizationInterface from './OrganizationInterface';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import type { PublisherUnit, Context } from '../definition';

const type: GraphQLObjectType<PublisherUnit, Context> = new GraphQLObjectType<PublisherUnit, Context>({
    name: 'Publisher',
    interfaces: [OrganizationInterface],
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({_id}) => _id
        },
        name: {
            type: GraphQLString,
            resolve: ({name}) => name
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
