import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import ItemInterface from './ItemInterface';
import CollectionAndReference from './CollectionAndReference';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import unitResolver from '../utilities/unitResolver';
import type { Context, SongUnit, CollectionUnitInterface } from '../definition';

const type: GraphQLObjectType<SongUnit, Context> = new GraphQLObjectType<SongUnit, Context>({
    name: 'Song',
    interfaces: [ItemInterface],
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({_id}) => _id
        },
        name: {
            type: GraphQLString,
            resolve: ({name}) => name
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
        aka: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            resolve: ({ aka }) => Boolean(aka) ? aka : []
        },
        description: {
            type: GraphQLString,
        },
        genres: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
            resolve: ({ genres }) => Boolean(genres) ? genres : []
        },
        albums: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, { client }) => {
                return unitResolver<CollectionUnitInterface>(source, /item\/(song)*/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        }
    }),
});

export default type;
