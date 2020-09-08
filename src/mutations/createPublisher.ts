import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import Publisher from "../types/Publisher";
import PublisherInput from "../inputs/PublisherInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Publisher,
    args: {
        properties: {
            type: new GraphQLNonNull(PublisherInput),
        },
    },

    resolve(source, { properties }, { client }) {
        return client.post(`/units`, { ...properties, __mime: `organization/publisher`})
            .then(response => client.fetch(response.location));
    },
};

export default type;
