import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import ArtistInterface from './ArtistInterface';
import CollectionAndReference from './CollectionAndReference';
import ArtistAndMembership from './ArtistAndMembership';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import referenceResolver from '../utilities/referenceResolver';
import unitResolver from '../utilities/unitResolver';
import type { Context, IndividualUnit, ArtistUnitInterface, CollectionUnitInterface } from '../definition';

const type: GraphQLObjectType<IndividualUnit, Context> = new GraphQLObjectType<IndividualUnit, Context>({
    name: 'Individual',
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
        born: {
            type: GraphQLDate,
            resolve: ({ born }) => {
                return Boolean(born) ? new Date(born!) : null
            }
        },
        died: {
            type: GraphQLDate,
            resolve: ({ died }) => {
                return Boolean(died) ? new Date(died!) : null
            }
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
        albums: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, { client }) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        singles: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, { client }) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+single$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        eps: {
            type: GraphQLList(CollectionAndReference),
            resolve: (source, _, { client }) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+ep$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        compilations: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, { client }) => {
                return referenceResolver<CollectionUnitInterface>(source, /^collection\/album\+compilation$/, client)
                    .then(result => result.map(item => ({
                        collection: item.unit,
                        reference: item.reference
                    })));
            }
        },
        memberOf: {
            type: GraphQLList(ArtistAndMembership),
            resolve: (source, _, { client }) => {
                return unitResolver<ArtistUnitInterface>(source, /artist\/(individual|group)\+member/, client)
                    .then(result => result.map(item => ({
                        artist: item.unit,
                        membership: item.reference
                    })));
            }
        }
    }),
});

export default type;
