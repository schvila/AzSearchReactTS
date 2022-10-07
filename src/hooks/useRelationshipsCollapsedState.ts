import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import relationshipsApi from '../utils/relationshipsApi';

export default function useRelationshipsCollapsedState(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  useEffect(() => {
    if (typeof relationshipsApi === 'object') {
      relationshipsApi.collapsed = collapsed;
      relationshipsApi.setCollapsed = setCollapsed;
    }
    return () => {
      if (typeof relationshipsApi === 'object') {
        relationshipsApi.collapsed = undefined;
        relationshipsApi.setCollapsed = undefined;
      }
    };
  }, [collapsed]);

  return [collapsed, setCollapsed];
}
