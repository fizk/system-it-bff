import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import ArtistInterface from './ArtistInterface';
import CollectionAndReference from './CollectionAndReference';
import Mime from './Mime';
import type { Context, IndividualUnit, Unit } from '../definition';

const type: GraphQLObjectType<IndividualUnit, Context> = new GraphQLObjectType<IndividualUnit, Context>({
    name: 'Individual',
    interfaces: [ArtistInterface],
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
        albums: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, { client }) => {
                const references = source.__ref.filter(item => item.__mime.match(/^collection\/album$/));
                const ids = references.map(item => item.__unit);
                const units = await client.fetch<ReadonlyArray<Unit>>(`/units?ids=${ids.join(',')}`);

                return references.map((item, i) => ({ collection: units[i], reference: item }));
            }
        },
        singles: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, { client }) => {
                const references = source.__ref.filter(item => item.__mime.match(/^collection\/album\+single$/));
                const ids = references.map(item => item.__unit);
                const units = await client.fetch<ReadonlyArray<Unit>>(`/units?ids=${ids.join(',')}`);

                return references.map((item, i) => ({ collection: units[i], reference: item }));
            }
        },
        eps: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, { client }) => {
                const references = source.__ref.filter(item => item.__mime.match(/^collection\/album\+ep$/));
                const ids = references.map(item => item.__unit);
                const units = await client.fetch<ReadonlyArray<Unit>>(`/units?ids=${ids.join(',')}`);

                return references.map((item, i) => ({ collection: units[i], reference: item }));
            }
        },
        compilations: {
            type: GraphQLList(CollectionAndReference),
            resolve: async (source, _, { client }) => {
                const references = source.__ref.filter(item => item.__mime.match(/^collection\/album\+compilation$/));
                const ids = references.map(item => item.__unit);
                const units = await client.fetch<ReadonlyArray<Unit>>(`/units?ids=${ids.join(',')}`);

                return references.map((item, i) => ({ collection: units[i], reference: item }));
            }
        },
    }),
});

export default type;
