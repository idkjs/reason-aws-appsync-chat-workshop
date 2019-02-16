import React from 'react'
import ReactDOM from 'react-dom'
import {client as AWSAppSyncClient} from './re/AppSyncClient.bs';
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'
import { configure } from './re/Amplify.bs'

import config from './aws-exports'
import './index.css'
import App from './App'
import Loading from './components/Loading'

// Amplify.configure(config)
configure();
const client = AWSAppSyncClient();

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated
      render={({ rehydrated }) => (
        rehydrated ? <App /> : <Loading />
      )}
    />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
