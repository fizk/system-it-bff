import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from "graphql";
import OrganizationAndPublication from "../types/OrganizationAndPublication";
import PublicationInput from "../inputs/PublicationInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: OrganizationAndPublication,
    args: {
        publisher_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        album_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        publication: {
            type: new GraphQLNonNull(PublicationInput),
        }
    },

    resolve(source, { publisher_id, album_id, publication}, { client }) {
        return client.post(`/units/${album_id}/references`, {
            __unit: publisher_id,
            __mime: 'organization/publisher',
            ...publication,
        }).then(response => (Promise.all([
                client.fetch(`/units/${publisher_id}`),
                client.fetch(response.location),
            ]))
        ).then(([organization, publication]) => ({ organization, publication}));
    },
};

export default type;
