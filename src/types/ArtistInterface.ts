import { GraphQLInterfaceType, GraphQLString, GraphQLList } from "graphql";
import CollectionAndReference from './CollectionAndReference';
import Mime from "./Mime";

const type: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'ArtistInterface',
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
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
