import { GraphQLObjectType, GraphQLString } from 'graphql';
import CollectionInterface from './CollectionInterface';
import Mime from './Mime';
import { AlbumUnit, Context } from '../definition';

const type: GraphQLObjectType<AlbumUnit, Context> = new GraphQLObjectType<AlbumUnit, Context>({
    name: 'Album',
    interfaces: [CollectionInterface],
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: ({_id}) => _id
        },
        name: {
            type: GraphQLString,
            resolve: ({name}) => name
        },
        _mime: {
            type: Mime,
            resolve: ({ __mime }) => {
                const split = __mime.match(/^((([a-z]+)\/([a-z]+)){1}(\+([a-z]+))?)$/);
                return {
                    type: split ? split[3] : null,
                    category: split ? split[4] : null,
                    tag: split ? split[6] : null,
                }
            }
        },
    }),
});

export default type;
