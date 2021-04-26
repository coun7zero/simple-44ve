
import { ethers } from "ethers";
import { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import SubscriptionsProvider from "./SubscriptionsProvider";

const ethereum = window.ethereum;

function App() {
  const [providerState, setProviderState] = useState<ProviderState>({connected: false});

  async function connectProvider(ethereum: any) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    await ethereum.sendAsync({ method: "eth_requestAccounts" }, async function(){
      const address = await signer.getAddress();
      setProviderState({provider, signer, connected: true, walletAddress: address});
    })
  }
  const isKovanNetwork = ethereum.networkVersion === '42'
  const isConnected = providerState.connected && isKovanNetwork

  useEffect(()=>{
    async function listenOnchange(ethereum: any){
      ethereum.on('accountsChanged', () => connectProvider(ethereum));
      ethereum.on('chainChanged', () => connectProvider(ethereum));
    }
    if(ethereum){
      listenOnchange(ethereum);
      connectProvider(ethereum);
    }
  }, []);

  const appView = isConnected ?(
    <section>
      <SubscriptionsProvider
        providerState={providerState}
      />
    </section>
  ) : (
    <Row className="justify-content-md-center">
    <Col md="auto">
      <Button
        variant="primary"
        size="lg"
        onClick={connectProvider}
        >
          Connect
      </Button>
    </Col>
  </Row>
  );

  return (
    <Container fluid className="App">
      {appView}
    </Container>
  );
}

export default App;
