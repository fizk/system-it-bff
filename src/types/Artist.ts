import { GraphQLUnionType } from "graphql";
import Individual from "./Individual";
import Group from "./Group";

const type: GraphQLUnionType = new GraphQLUnionType({
    name: 'Artist',
    types: [Individual, Group],
    resolveType: (value) => {
        return value.__mime.match(/^artist\/individual.*/)
            ? Individual
            : Group;
    },
});

export default type;
