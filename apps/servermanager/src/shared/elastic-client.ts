// import * as ElasticAppSearch from "@elastic/app-search-javascript";
// const { Client } = require('@elastic/elasticsearch');
// import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

// Use either API Key or username/password

// Option 1: Using Cloud ID and API Key
// const client = new Client({
//   cloud: { id: 'https://93f76a47a8f3448383a7f18ac460ad1e.europe-west3.gcp.cloud.es.io:443' },
//   auth: {
//   }
// });

// var client = ElasticAppSearch.createClient({
//   searchKey: "RmN5SzJwSUI0RkFPb1ViT0xUc2E6bW02bXVTMmxSaHVDWlo0RDFQYzZwZw",
//   endpointBase: "https://93f76a47a8f3448383a7f18ac460ad1e.europe-west3.gcp.cloud.es.io:443",
//   engineName: "servermanager"
// });

// const connector = new ElasticsearchAPIConnector({
//   cloud: {
//     id: "b91b4c4f07e342159340d51d094eb7b4:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbyQ5M2Y3NmE0N2E4ZjM0NDgzODNhN2YxOGFjNDYwYWQxZSQyODBmMDFlMmJjMTM0MjkyYmRhYTc5Mzg0MWE2NGZkMQ=="
//   },
//   index: "servermanager"
// });



// "id": "x2gj2pIB5T5B2drkqt-O",
// "name": "servermanager",
// "expiration": 1735420623502,
// "encoded": "eDJnajJwSUI1VDVCMmRya3F0LU86TjFoMHhfeDNRZEs0aTVVWVVPbk1mQQ==",
// "beats_logstash_format": "x2gj2pIB5T5B2drkqt-O:N1h0x_x3QdK4i5UYUOnMfA"
// }  // Use the generated API key

// Option 2: Using Cloud ID with username/password
// const client = new Client({
//   cloud: { id: 'your-cloud-id' },
//   auth: {
//     username: 'elastic',
//     password: 'your-password'
//   }
// });

export async function searchIndex(indexName:string, query:string) {
    try {
      // const result = await client.search({
      //   index: indexName,
      //   body: {
      //     query: {
      //       match: { field_name: query }  // Replace field_name and query as needed
      //     }
      //   }
      // });
      // console.log(result.hits.hits);
    } catch (error) {
      console.error('Error executing search', error);
    }
  }