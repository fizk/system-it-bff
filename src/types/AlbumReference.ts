import { GraphQLObjectType, GraphQLString } from 'graphql';
import Mime from './Mime';
import type {AlbumReferenceUnit, Context } from '../definition';

const type: GraphQLObjectType<AlbumReferenceUnit, Context> = new GraphQLObjectType<AlbumReferenceUnit, Context>({
    name: 'AlbumReference',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id
        },
        _unit: {
            type: GraphQLString,
            resolve: ({ __unit }) => __unit
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
