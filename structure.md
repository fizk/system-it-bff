* Artist (ArtistInterface)
    * Individual
        - (artist/individual)
        * __ref
            - (collection/album)
            - (collection/album+single)
            - (collection/album+ep)
            - (collection/album+compilation)
    * Group
        - (artist/group)
        * __ref
            - (artist/individual+member)
            - (collection/album)
            - (collection/album+single)
            - (collection/album+ep)
            - (collection/album+compilation)

* Collection (CollectionInterface)
    * Album
        - (collection/album)
        - (collection/album+single)
        - (collection/album+ep)
        - (collection/album+compilation)
