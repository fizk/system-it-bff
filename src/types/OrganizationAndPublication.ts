import { GraphQLObjectType } from "graphql";
import Organization from "./Organization";
import Publication from "./Publication";

const type: GraphQLObjectType = new GraphQLObjectType({
    name: 'OrganizationAndPublication',
    fields: () => ({
        organization: {
            type: Organization
        },
        publication: {
            type: Publication
        }
    }),
});

export default type;
