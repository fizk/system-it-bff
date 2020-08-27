import { GraphQLObjectType } from "graphql";
import Collection from "./Collection";
import AlbumReference from "./AlbumReference";

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'CollectionAndReference',
    fields: () => ({
        collection: {
            type: Collection
        },
        reference: {
            type: AlbumReference
        }
    })
});

export default type;
