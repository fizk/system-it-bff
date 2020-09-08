import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import Individual from "../types/Individual";
import IndividualArtistInput from "../inputs/IndividualArtistInput";
import type { Context } from '../definition';

const type: GraphQLFieldConfig<null, Context> = {
    type: Individual,
    args: {
        properties: {
            type: new GraphQLNonNull(IndividualArtistInput),
        },
    },

    resolve(source, {properties}, { client }) {
        return client.post(`/units`, {
            ...{
                ...properties,
                born: properties.born ? properties.born.toISOString() : null ,
                died: properties.died ? properties.died.toISOString() : null ,
            },
            __mime: `artist/individual`
        }).then(response => client.fetch(response.location));
    },
};

export default type;
