import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import type { MembershipReferenceUnit } from '../definition';

const type: GraphQLObjectType = new GraphQLObjectType<MembershipReferenceUnit>({
    name: 'Membership',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: ({_id}) => _id
        },
        from: {
            type: GraphQLDate,
            resolve: ({ from }) => {
                return Boolean(from) ? new Date(from!) : null
            }
        },
        to: {
            type: GraphQLDate,
            resolve: ({ to }) => {
                return Boolean(to) ? new Date(to!) : null
            }
        },
    }),
});

export default type;
