export interface Gateway {
    fetch<T>(url: string): Promise<T>
    post(url: string, body?: object | null): Promise<HttpHeaders>
}

export type VERB = 'GET' | 'POST' | 'PUT' | 'PATCH';

export interface Context {
    client: Gateway
}

interface Unit {
    _id: string
    __mime: string
    __ref: ReadonlyArray<Reference>
}

interface Reference {
    _id: string
    __mime: string
    __unit: string
}


export interface IndividualUnit extends Unit {
    name: string
}

export interface GroupUnit extends Unit {
    name: string
}

export interface AlbumUnit extends Unit {
    name: string
}

export interface AlbumReferenceUnit extends Reference {

}
