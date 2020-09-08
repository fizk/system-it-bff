import { GraphQLUnionType } from "graphql";
import Song from "./Song";

const type: GraphQLUnionType = new GraphQLUnionType({
    name: 'Item',
    types: [Song],
    resolveType: (value) => {
        return Song
    },
});

export default type;
