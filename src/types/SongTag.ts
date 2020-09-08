import { GraphQLEnumType } from "graphql";

const type = new GraphQLEnumType({
    name: 'SongTag',
    values: {
        PART: {value: 'part'},
    }
});

export default type;
