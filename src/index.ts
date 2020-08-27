import http from 'http';
import { printSchema } from 'graphql';
import schema from './schema';
import requestListener from './requestListener';

const port = process.env.SERVER_PORT || 8080;

// console.log('GraphQL server starting up\n');
// console.log(printSchema(schema));

http.createServer(requestListener).listen(port, () => console.log(`Server started on ${port}`));


// import { graphql } from 'graphql';
// import client from './client';

// var query = `mutation {
//     addAlbum(album_id: "5f45a2f0d07e5b4ea70e3a03" artist_id: "5f45a2dfa687fe76e0414772") {
//         __typename
//         collection {
//             __typename
//             ... on Album {
//                 id
//                 name
//             }
//         }
//         reference {
//             __typename
//             id
//             _mime {type category tag}
//         }
//     }
// }`;

// var query = `mutation {
//     createGroup(name: "The Beatles") {
//         __typename
//         ... on ArtistInterface {
//             id
//             name
//             _mime {type category tag}
//         }
//     }
// }`;

// var query = `mutation {
//     createAlbum(name: "Please, please me") {
//         __typename
//         ... on CollectionInterface {
//             id
//             name
//             _mime {type category tag}
//         }
//     }
// }`;

// var query = `{
//     Artists {
//         ... on ArtistInterface {
//             id
//             name
//             _mime {type}
//         }
//         ... on Group {
//             albums {
//                 __typename
//                 collection {
//                     ... on Album {
//                         id
//                         name
//                     }
//                 }
//                 reference {
//                     id
//                 }
//             }
//         }
//     }
// }`;

// var query = `{
//     Collections {
//         ... on CollectionInterface {
//             id
//             name
//             _mime {type}
//         }
//     }
// }`;

// let hrstart = process.hrtime();
// graphql(
//     schema,
//     query,
//     {},
//     { client: client({}) }
// ).then(result => {
//     let hrend = process.hrtime(hrstart);
//     console.info("request.on:end (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
//     console.log(JSON.stringify(result, undefined, 4));
// }).catch(error => {
//     let hrend = process.hrtime(hrstart);
//     console.info("request.on:end (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
//     console.error(error);
// });

