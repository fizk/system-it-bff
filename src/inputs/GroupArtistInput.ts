import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import {GraphQLDate} from 'graphql-iso-date';

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'GroupArtistInput',
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
        formed: {
            type: GraphQLDate
        },
    })
});

export default type;
