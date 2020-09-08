type scalar = string | number | boolean | null | undefined;
type dictValues = scalar | ReadonlyArray<scalar> | { [key: string]: scalar };
type dict = { [key: string]: dictValues }

const numericValue = (key: string, value: number): string => {
    return `${key}=${encodeURIComponent(value)}`;
}
const stringValue = (key: string, value: string): string => {
    return `${key}=${encodeURIComponent(value)}`;
}
const booleanValue = (key: string, value: boolean): string => {
    return `${key}=${Boolean(value) ? 'true' : 'false'}`;
}
const unsetValue = (key: string): string => {
    return `${key}=null`;
}
const arrayValue = (key: string, value: scalar[]): string => {
    return value.map(item => {
        if (Number.isFinite(item) || typeof item === 'string') {
            return `${key}[]=${encodeURIComponent(item as string)}`;
        }

        if (typeof item === 'boolean') {
            return `${key}[]=${Boolean(item) ? 'true' : 'false'}`;
        }

        if (item === null || item === undefined) {
            return `${key}[]=null`;
        }

        throw new Error(`${typeof item} is not a valid in array`)

    }).join('&');
}
const objectValue = (key: string, value: { [key: string]: scalar }): string => {
    return Object.entries(value).map(([index, item]) => {
        if (Number.isFinite(item) || typeof item === 'string') {
            return `${key}[${index}]=${encodeURIComponent(item as string)}`;
        }

        if (typeof item === 'boolean') {
            return `${key}[${index}]=${Boolean(item) ? 'true' : 'false'}`;
        }

        if (item === null || item === undefined) {
            return `${key}[${index}]=null`;
        }

        throw new Error(`${typeof item} is not a valid in object`)
    }).join('&');
}

const decode = (key: string, value: dictValues): string => {
    if (typeof value === 'boolean') {
        return booleanValue(key, value);
    }

    if (typeof value === 'string') {
        return stringValue(key, value);
    }

    if (value === null || value === undefined) {
        return unsetValue(key);
    }

    if (Number.isFinite(value)) {
        return numericValue(key, (value as unknown as number));
    }

    if (Array.isArray(value)) {
        return arrayValue(key, value);
    }

    if (value.constructor === Object) {
        return objectValue(key, value as unknown as { [key: string]: scalar });
    }

    throw new Error(`${typeof value} is not a valid querystring value`);
}

export default (obj: dict | null = null): string => {

    if (obj !== null || typeof obj === 'object') {
        return Object.entries(obj!)
            .map(([key, value]): string => decode(key, value))
            .join('&');
    }

    throw new Error(`${typeof obj} is not a valid querystring value`);

}
