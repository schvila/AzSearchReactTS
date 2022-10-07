import useRelationshipsCollapsedState from './hooks/useRelationshipsCollapsedState';
import RelationshipApp from './RelationshipApp';

function RelationshipAppCollapsible() {
  const [collapsed] = useRelationshipsCollapsedState();
  return collapsed ? null : <RelationshipApp />;
}

export default RelationshipAppCollapsible;
