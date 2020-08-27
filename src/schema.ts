import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import Artist from './queries/Artist';
import Artists from './queries/Artists';
import Collection from './queries/Collection';
import Collections from './queries/Collections';
import createIndividual from './mutations/createIndividual';
import createGroup from './mutations/createGroup';
import createAlbum from './mutations/createAlbum';
import addAlbum from './mutations/addAlbum';

export default new GraphQLSchema({
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createIndividual,
            createGroup,
            createAlbum,
            addAlbum,
        }
    }),
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            Artist,
            Artists,
            Collection,
            Collections,
        }
    }),
});
