import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import Artist from './queries/Artist';
import Artists from './queries/Artists';
import Collection from './queries/Collection';
import Collections from './queries/Collections';
import Item from './queries/Item';
import Items from './queries/Items';
import Organization from './queries/Organization';
import Organizations from './queries/Organizations';
import createIndividual from './mutations/createIndividual';
import createGroup from './mutations/createGroup';
import createAlbum from './mutations/createAlbum';
import createSong from './mutations/createSong';
import createPublisher from './mutations/createPublisher';
import addAlbum from './mutations/addAlbum';
import addMember from './mutations/addMember';
import addSong from './mutations/addSong';
import addPublisher from './mutations/addPublisher';

export default new GraphQLSchema({
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createIndividual,
            createGroup,
            createAlbum,
            createSong,
            createPublisher,
            addAlbum,
            addMember,
            addSong,
            addPublisher,
        }
    }),
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            Artist,
            Artists,
            Collection,
            Collections,
            Item,
            Items,
            Organization,
            Organizations,
        }
    }),
});
