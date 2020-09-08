import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import Mime from './Mime';
import mimeResolver from '../utilities/mimeResolver';
import type {AlbumReferenceUnit, Context } from '../definition';

const type: GraphQLObjectType<AlbumReferenceUnit, Context> = new GraphQLObjectType<AlbumReferenceUnit, Context>({
    name: 'AlbumReference',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({ _id }) => _id
        },
        _unit: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({ __unit }) => __unit
        },
        _mime: {
            type: Mime,
            resolve: mimeResolver
        },
    }),
});

export default type;
