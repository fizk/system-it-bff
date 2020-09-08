import { GraphQLEnumType } from "graphql";

const type = new GraphQLEnumType({
    name: 'CollectionCategory',
    values: {
        ALBUM: {value: 'album'},
    }
});

export default type;
