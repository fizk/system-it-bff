import { GraphQLUnionType } from "graphql";
import Album from "./Album";

const type:GraphQLUnionType = new GraphQLUnionType({
    name: 'Collection',
    types: [Album],
    resolveType(value) {
        return Album;
    },
});

export default type;
