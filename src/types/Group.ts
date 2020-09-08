import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import ArtistInterface from './ArtistInterface';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import CollectionAndReference from './CollectionAndReference';
import ArtistAndMembership from './ArtistAndMembership';
import referenceResolver from '../utilities/referenceResolver';
import type { GroupUnit, Context, CollectionUnitInterface, ArtistUnitInterface } from '../definition';

const type: GraphQLObjectType<GroupUnit, Context> = new GraphQLObjectType<GroupUnit, Context>({
    name: 'Group',
    interfaces: [ArtistInterface],
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({_id}) => _id
        },
        name: {
            type: GraphQLString,
            resolve: ({name}) => name
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
        formed: {
            type: GraphQLDate,
            resolve: ({ formed }) => {
                return Boolean(formed) ? new Date(formed!) : null
            }
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
        albums: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, {client}) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        singles: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, {client}) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+single$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        eps: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, {client}) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+ep$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        compilations: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, {client}) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+compilation$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        membersIn: {
            type: GraphQLList(ArtistAndMembership),
            resolve: (source, _, {client}) => {
                return referenceResolver<ArtistUnitInterface>(source, /^artist\/(individual|group)\+member$/, client)
                    .then(result => result.map(item => ({
                        artist: item.unit,
                        membership: item.reference
                    })));
            }
        }
    }),
});

export default type;
