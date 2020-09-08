import { GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import Mime from "./Mime";

const type: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'ItemInterface',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        aka: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        genres: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        _mime: {
            type: Mime,
        },
    })
});

export default type;
