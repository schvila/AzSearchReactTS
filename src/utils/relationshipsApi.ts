declare global {
  interface Window {
    __relationshipsApi: Record<string, any>;
  }
}

const getRelationshipsApi = (): Record<string, any> => {
  if (typeof window !== 'undefined') {
    if (typeof window.__relationshipsApi !== 'object') {
      window.__relationshipsApi = {};
    }
    return window.__relationshipsApi;
  }

  return {};
};

const relationshipsApi: Record<string, any> = getRelationshipsApi();

export default relationshipsApi;
