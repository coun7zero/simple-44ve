import { useEffect, useState } from 'react';
import { v2, UserSummaryData, ReserveData, ComputedReserveData } from '@aave/protocol-js';

import { walletBalanceGetter, contractBalanceGetter} from '../utils';

import DepositModal from './DepositModal';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const formattedPollReservesSorter = (
  currentReserve: { symbol: string },
  previousReserve: { symbol: string }
) => currentReserve.symbol.localeCompare(previousReserve.symbol)

function Assets({
    providerState,
    poolReservesData,
    rawUserReservesData,
    usdPriceEthData
  } : {
    providerState: ProviderState,
    poolReservesData: any,
    rawUserReservesData: any,
    usdPriceEthData: any
  }
) {

  const [hasBalancesToRefetch, setBalancesToRefetch] = useState(false);
  const { walletAddress } = providerState;
  const [walletBalance, setWalletBalance] = useState();
  const [contractBalance, setContractBalance] = useState();

  const [myAaveDeposits, setMyAaveDeposits] = useState<UserSummaryData>()
  // const [myDelegationsToAave, setMyDelegationsToAave] = useState<UserSummaryData>()
  const [formattedPoolReserves, setFormattedPoolReserves] = useState<ComputedReserveData[]>()
  const [depositActivity, setDepositActivity] = useState<DepositActivity>({
    enabled: false
  });


  useEffect(() => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const formattedPoolReservesData = v2.formatReserves(poolReservesData.reserves, currentTimestamp);

    async function updateWalletBalance(){
      const getWalletBalance = walletBalanceGetter(providerState);
      return setWalletBalance(await getWalletBalance(formattedPoolReservesData));
    }
    async function updateContractBalance(){
      const getContractBalance = contractBalanceGetter(providerState);
      return setContractBalance(await getContractBalance(formattedPoolReservesData));
    }

    if(hasBalancesToRefetch){
      updateWalletBalance();
      updateContractBalance();

      setFormattedPoolReserves(formattedPoolReservesData);
      setBalancesToRefetch(false);
    }
  }, [hasBalancesToRefetch, providerState, poolReservesData.reserves]);

  useEffect(() => {
    setBalancesToRefetch(true);
  }, [providerState]);

  useEffect(() => {
    function updateMyAaveDeposits(){
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const formattedUserSummaryData = v2.formatUserSummaryData(poolReservesData.reserves, rawUserReservesData!.userReserves, walletAddress!.toLowerCase(), usdPriceEthData!.priceOracle!.usdPriceEth, currentTimestamp);
        setMyAaveDeposits(formattedUserSummaryData);
    }
    // function updateMyDlegationsToAave(){

    // }

    updateMyAaveDeposits();
    // updateMyDlegationsToAave();

    const updateValues = setInterval(() => {
      updateMyAaveDeposits();
    }, 1500);

    return () => clearInterval(updateValues);
  }, [walletAddress, poolReservesData, rawUserReservesData, usdPriceEthData, contractBalance]);

  const disableDepositActivity = () => setDepositActivity({enabled:false});
  const enableDepositActvity = (action: string, reserve: ReserveData) => setDepositActivity({enabled:true, reserve, action});

  const formatMyAaveDeposit = (id: string)=> {
    const myAaveDeposit = myAaveDeposits?.reservesData.find(({reserve})=> reserve.id === id);
    return myAaveDeposit ? parseFloat(myAaveDeposit.underlyingBalance).toFixed(6) : 0
  }
  const formatMyDelegationToAave = (aTokenId: string)=> {
    const myDelegationToAave = contractBalance![aTokenId];
    return myDelegationToAave ? parseFloat(myDelegationToAave).toFixed(6) : 0
  }

  const getModal = () => depositActivity.enabled ? (<DepositModal
    balance={walletBalance![depositActivity!.reserve!.id]}
    providerState={providerState}
    setBalancesToRefetch={setBalancesToRefetch}
    // @ts-ignore
    deposited={formatMyDelegationToAave(depositActivity!.reserve!.aToken!.id)}
    handleClose={disableDepositActivity}
    depositActivity={depositActivity}
  />) : null;

  const formattedPollReservesMapper = (reserve: ReserveData) => {
    const {
      symbol,
      id,
      liquidityRate,
      // @ts-ignore
      aToken
    } = reserve
    return (
      <tr key={id}>
        <td> {symbol} </td>
        <td style={{fontSize: "0.9rem"}}>
          { walletBalance![id] ? parseFloat(walletBalance![id]).toFixed(6): ''}
        </td>
        <td style={{ width: 250, fontSize: "0.9rem" }}>
          {formatMyAaveDeposit(id) || ""}
        </td>
        <td>
          { formatMyDelegationToAave(aToken.id) || '' }
        </td>
        <td>
          {parseFloat(liquidityRate).toFixed(2)}&nbsp;%
        </td>
        <td>
          <Button
            size="sm"
            variant={!walletBalance![id] ? "outline-secondary" : "outline-success"}
            onClick={() => enableDepositActvity('deposit', reserve)}
            disabled={!walletBalance![id]}
          >
            Deposit
          </Button>
          &nbsp;&nbsp;
          <Button
            size="sm"
            variant={formatMyDelegationToAave(aToken.id) <= 0 ? "outline-secondary" : "outline-danger"}
            onClick={() => enableDepositActvity('withdraw', reserve)}
            disabled={ formatMyDelegationToAave(aToken.id) <= 0}
          >
            Withdraw
          </Button>
        </td>
      </tr>
    );
  };

  const dataFetched = walletBalance !== undefined && contractBalance !== undefined && formattedPoolReserves !== undefined;
  const assetsView = dataFetched ? (
    <div>
      <header style={{color:"white", textAlign:"right"}}>
        <p>
          Wallet address: {walletAddress} [Kovan]
        </p>
      </header>
      <Row>
        <Col>
          <Table variant="dark" striped hover>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Wallet balance</th>
                <th>My Aave deposits</th>
                <th>My delegated Aave deposits</th>
                <th>APY</th>
                <th>Delegation</th>
              </tr>
            </thead>
            <tbody>
              {formattedPoolReserves!
                .sort(formattedPollReservesSorter)
                .map(formattedPollReservesMapper)
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      {getModal()}
    </div>
  ) : (
    <section style={{textAlign:"center", color: "white"}}>
      <Spinner variant="light" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>Please wait</p>
    </section>
  );

  return (
    <Container fluid>
      {assetsView}
    </Container>
  );
}

export default Assets;
