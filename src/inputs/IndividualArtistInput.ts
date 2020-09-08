import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import {GraphQLDate} from 'graphql-iso-date';

const type:GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'IndividualArtistInput',
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
        born: {
            type: GraphQLDate
        },
        died: {
            type: GraphQLDate
        }
    })
});

export default type;
