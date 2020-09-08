import { GraphQLEnumType } from "graphql";

const type = new GraphQLEnumType({
    name: 'AlbumTag',
    values: {
        SINGLE: {value: 'single'},
        EP: {value: 'ep'},
        COMPILATION: {value: 'compilation'},
    }
});

export default type;
