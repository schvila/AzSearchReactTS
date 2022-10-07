import React from 'react';
import ReactDOM from 'react-dom/client';
import RelationshipAppCollapsible from './RelationshipAppCollapsible';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('relationsEntry') as HTMLElement, // relationsEntry, root
);
root.render(
  <React.StrictMode>
    <RelationshipAppCollapsible />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
