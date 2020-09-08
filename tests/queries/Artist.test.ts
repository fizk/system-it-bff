import { graphql } from "graphql";
import schema from '../../src/schema';

it('Test get Group - common fields', async () => {
    const mock = {
        fetch: (url: string ) => ({
            _id: '1234',
            name: 'my name',
            __mime: 'artist/group'
        })
    };

    const query = `{
        Artist(id: "1234") {
            __typename
            ... on ArtistInterface {
                id
                name
                _mime {type category tag}
            }
        }
    }`;
    const expected = {
        Artist: {
            __typename: "Group",
            id: '1234',
            name: 'my name',
            _mime: { type: 'artist', category: 'group', tag: null}
        }
    };
    const actual = await graphql(schema, query, {},{ client: mock });
    expect(expected).toEqual(actual.data);
});

it('Test get Individual - common fields', async () => {
    const mock = {
        fetch: (url: string) => ({
            _id: '1234',
            name: 'my name',
            __mime: 'artist/individual'
        })
    };

    const query = `{
        Artist(id: "1234") {
            __typename
            ... on ArtistInterface {
                id
                name
                _mime {type category tag}
            }
        }
    }`;
    const expected = {
        Artist: {
            __typename: "Individual",
            id: '1234',
            name: 'my name',
            _mime: { type: 'artist', category: 'individual', tag: null }
        }
    };
    const actual = await graphql(schema, query, {}, { client: mock });
    expect(expected).toEqual(actual.data);
});
