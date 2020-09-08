import { GraphQLObjectType } from "graphql";
import Item from "./Item";
import ItemPosition from "./ItemPosition";

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'ItemAndPosition',
    fields: () => ({
        item: {
            type: Item
        },
        position: {
            type: ItemPosition
        }
    })
});

export default type;
