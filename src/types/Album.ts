import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import CollectionInterface from './CollectionInterface';
import Mime from './Mime';
import CollectionAndReference from './CollectionAndReference';
import OrganizationAndPublication from './OrganizationAndPublication';
import ItemAndPosition from './ItemAndPosition';
import mimeResolver from '../utilities/mimeResolver';
import referenceResolver from '../utilities/referenceResolver';
import unitResolver from '../utilities/unitResolver';
import type { AlbumUnit, Context, ArtistUnitInterface, ItemUnitInterface, OrganizationUnitInterface } from '../definition';

const type: GraphQLObjectType<AlbumUnit, Context> = new GraphQLObjectType<AlbumUnit, Context>({
    name: 'Album',
    interfaces: [CollectionInterface],
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
        artists: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, { client }) => {
                return unitResolver<ArtistUnitInterface>(source, /collection\/(album)*/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        songs: {
            type: GraphQLList(ItemAndPosition),
            resolve: (source, _, { client }) => {
                return referenceResolver<ItemUnitInterface>(source, /^item\/song$/, client)
                    .then(result => result.map(item => ({
                        item: item.unit,
                        position: item.reference
                    })));
            }
        },
        publisher: {
            type: new GraphQLList(OrganizationAndPublication),
            resolve: (source, _, { client }) => {
                return referenceResolver<OrganizationUnitInterface>(source, /^organization\/publisher$/, client)
                    .then(result => result.map(item => ({
                        organization: item.unit,
                        publication: item.reference
                    })));
            }
        }
    }),
});

export default type;
