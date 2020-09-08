import { GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import CollectionAndReference from './CollectionAndReference';
import Mime from "./Mime";

const type: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'ArtistInterface',
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
        aka: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        genres: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        _mime: {
            type: Mime,
        },
        albums: {
            type: GraphQLList(CollectionAndReference),
        },
        singles: {
            type: GraphQLList(CollectionAndReference),
        },
        eps: {
            type: GraphQLList(CollectionAndReference),
        },
        compilations: {
            type: GraphQLList(CollectionAndReference),
        },
    })
});

export default type;
