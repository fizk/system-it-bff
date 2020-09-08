import { GraphQLEnumType } from "graphql";

const type = new GraphQLEnumType({
    name: 'ArtistCategory',
    values: {
        GROUP: {value: 'group'},
        INDIVIDUAL: {value: 'individual'},
    }
});

export default type;
