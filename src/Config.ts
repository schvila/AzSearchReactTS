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

export default function relConfiguration() {
  if (typeof window !== undefined && typeof window.__relConfig === 'object') {
    return window.__relConfig;
  } else {
    return {
      apikey: '1B09FB11B19CAD26815E39FCA2154CC5',
      formPartialName: 'relationship__Form',
      indexName: 'infors-smart-pages-index-at',
      relationshipNames: ['RelatesTo', 'DependsOn', 'ContinuedBy', 'ReplacedBy', 'SuperseededBy'],
      searchUrl: 'https://infors-at-dxp-cognitive-search-service.search.windows.net',
    };
  }
}
