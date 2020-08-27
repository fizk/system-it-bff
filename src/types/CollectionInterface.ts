import { GraphQLInterfaceType, GraphQLString } from "graphql";
import Mime from "./Mime";

const type: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: 'CollectionInterface',
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        _mime: {
            type: Mime,
        },
    })
});

export default type;
