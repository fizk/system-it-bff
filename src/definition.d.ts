export interface Gateway {
    fetch<T>(url: string): Promise<T>
    post(url: string, body?: object | null, method: VERB = 'POST'): Promise<HttpHeaders>
}

export type VERB = 'GET' | 'POST' | 'PUT' | 'PATCH';

export interface Context {
    client: Gateway
}

interface Unit<T extends Reference = Reference> {
    _id: string
    __mime: string
    __ref: ReadonlyArray<T>
}

interface Reference {
    _id: string
    __mime: string
    __unit: string
}

// ORGANIZATION
export interface OrganizationUnitInterface extends Unit {
    name: string
}

export interface PublisherUnit extends OrganizationUnitInterface {

}

export interface OrganizationReferenceUnit extends Reference {

}

// ARTIST
export interface ArtistUnitInterface extends Unit {
    name: string
    description: string | null
    genres: string[]
    aka: string[]
}

export interface IndividualUnit extends ArtistUnitInterface {
    born: string | null,
    died: string | null,
}

export interface GroupUnit extends ArtistUnitInterface {
    formed: string | null
}

export interface MembershipReferenceUnit extends Reference {
    from: string | null
    to: string | null
}

// COLLECTION
export interface CollectionUnitInterface extends Unit {
    name: string
    description: string | null
    genres: string[]
    aka: string[]
}

export interface AlbumUnit extends CollectionUnitInterface {

}

export interface AlbumReferenceUnit extends Reference {

}


// ITEM
interface ItemUnitInterface extends Unit {
    name: string
    description: string
    aka: string[]
    genres: string[]
}

export interface SongUnit extends ItemUnitInterface {}
