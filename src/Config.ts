import IRelationshipConfiguration from './interfaces/IRelationshipConfiguration';

declare global {
  interface Window {
    __relConfig: IRelationshipConfiguration;
  }
}
// export default function myConfig() {
//     return {
//         serviceName: 'https://infors-at-dxp-cognitive-search-service.search.windows.net',
//         indexName: 'infors-smart-pages-index-at',
//         apikey: '1B09FB11B19CAD26815E39FCA2154CC5'
//     };
// }
// https://infors-dev-dxp-cognitive-search-service.search.windows.net/indexes/infors-portal-relationship-form-index/docs/search?api-version=2021-04-30-Preview
export default function relConfiguration() {
  if (typeof window !== undefined && typeof window.__relConfig === 'object') {
    return window.__relConfig;
  } else {
    return {
      apikey: 'N7x938TGssNDMrDgfXcPxWDepfgYrHIoc3AakfgG5FAzSeBynbnF',
      formPartialName: 'relationship__Form',
      indexName: 'infors-portal-relationship-form-index',
      relationshipNames: ['RelatesTo', 'DependsOn', 'ContinuedBy', 'ReplacedBy', 'SuperseededBy'],
      searchUrl: 'https://infors-dev-dxp-cognitive-search-service.search.windows.net',
    };
  }
}
