import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloProvider } from '@apollo/client/react';

const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan'
});

const wsLink = new WebSocketLink({
  uri: 'wss://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <div>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
