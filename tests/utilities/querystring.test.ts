import querystring from '../../src/utilities/querystring';

test('scalar values', () => {

    expect(querystring({

    })).toEqual(
        ''
    );

    expect(querystring({
        hundur: 2
    })).toEqual(
        'hundur=2'
    );

    expect(querystring({
        key: 'value'
    })).toEqual(
        'key=value'
    );

    expect(querystring({
        key1: true,
        key2: false,
    })).toEqual(
        'key1=true&key2=false'
    );

    expect(querystring({
        key1: null,
        key2: undefined,
    })).toEqual(
        'key1=null&key2=null'
    );

    expect(querystring({
        key: 'some long value',
    })).toEqual(
        'key=some%20long%20value'
    );
});

test('array values', () => {
    expect(querystring({
        hundur: [1, 2],
        key: 2
    })).toEqual(
        'hundur[]=1&hundur[]=2&key=2'
    );

    expect(querystring({
        hundur: [true, false],
        key: 2
    })).toEqual(
        'hundur[]=true&hundur[]=false&key=2'
    );
});

test('object values', () => {
    expect(querystring({
        key: { one: 1, two: 2 },
    })).toEqual(
        'key[one]=1&key[two]=2'
    );

    expect(querystring({
        str: 'ing',
        key: { one: 1, two: 2 },
    })).toEqual(
        'str=ing&key[one]=1&key[two]=2'
    );

    expect(querystring({
        str: true,
        key: { one: undefined, two: null },
    })).toEqual(
        'str=true&key[one]=null&key[two]=null'
    );
});
