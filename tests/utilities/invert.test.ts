import invert from "../../src/utilities/invert";

it('invert', () => {
    const parent = {
        _id: '5f4d7e62c95cbd209f58df73',
        name: 'John Lennon',
        born: '1940-10-09T00:00:00.000Z',
        died: '1980-12-08T00:00:00.000Z',
        __mime: 'artist/individual',
        __ref: []
    };
    const references = {
        "_id": "5f4d839338287f20bd373947",
        "name": "The Beatles",
        "formed": "",
        "born": "",
        "died": "",
        "__mime": "artist/group",
        "__ref": [
            {
                "__unit": "5f4d7e62c95cbd209f58df73",
                "__mime": "artist/individual+member",
                "from": "",
                "to": "",
                "_id": "5f4d840c2c5f6a105a23fe62"
            },
            {
                "__unit": "5f4d7e92ebd9514e2234ae34",
                "__mime": "artist/individual+member",
                "from": "1960-01-01T00:00:00.000Z",
                "to": "1970-01-01T00:00:00.000Z",
                "_id": "5f4d847c2c5f6a105a23fe63"
            },
            {
                "__unit": "5f4d7ef738287f20bd373946",
                "__mime": "artist/individual+member",
                "from": "1960-01-01T00:00:00.000Z",
                "to": "1970-01-01T00:00:00.000Z",
                "_id": "5f4d84b32c5f6a105a23fe64"
            },
            {
                "__unit": "5f4d7e62c95cbd209f58df73",
                "__mime": "artist/individual+member",
                "from": "1960-01-01T00:00:00.000Z",
                "to": "1970-01-01T00:00:00.000Z",
                "_id": "5f4d84de1bdae5777a09bd7a"
            }
        ]
    };

    const expected = [
    {
            unit: references,
            reference: {
                "__unit": "5f4d7e62c95cbd209f58df73",
                "__mime": "artist/individual+member",
                "from": "",
                "to": "",
                "_id": "5f4d840c2c5f6a105a23fe62"
            }
    }, {
            unit: references,
            reference: {
                "__unit": "5f4d7e62c95cbd209f58df73",
                "__mime": "artist/individual+member",
                "from": "1960-01-01T00:00:00.000Z",
                "to": "1970-01-01T00:00:00.000Z",
                "_id": "5f4d84de1bdae5777a09bd7a"
            }
        }
    ];
    const actual = invert(parent, references, /artist\/(individual|group)\+member/);
    expect(actual).toEqual(expected);
});
