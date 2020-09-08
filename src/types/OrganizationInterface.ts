import { GraphQLInterfaceType, GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';

const type: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'OrganizationInterface',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
    })
});

export default type;
