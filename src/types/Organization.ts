import { GraphQLUnionType } from "graphql";
import Publisher from "./Publisher";

const type:GraphQLUnionType = new GraphQLUnionType({
    name: 'Organization',
    types: [Publisher],
    resolveType(value) {
        return Publisher;
    },
});

export default type;
