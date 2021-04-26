import { useSubscription } from '@apollo/client';

import { POOL_ADDRESS, POOL_RESERVES_DATA_SUBSCRIPTION, RAW_USER_RESERVES_SUBSCRIPTION, USD_PRICE_ETH_SUBSCRIPTION } from "../config";

import Assets from "./Assets"
import Spinner from 'react-bootstrap/Spinner';

function SubscriptionsProvider({providerState}: {providerState: ProviderState}) {
  const { walletAddress } = providerState;

  const { loading: poolReservesLoading, error: poolReservesError, data: poolReservesData } = useSubscription(POOL_RESERVES_DATA_SUBSCRIPTION, { variables: { pool: POOL_ADDRESS } });
  const { loading: rawUserReservesLoading , error: rawUserReservesError, data: rawUserReservesData } = useSubscription(RAW_USER_RESERVES_SUBSCRIPTION, { variables: { pool: POOL_ADDRESS, userAddress: walletAddress!.toLowerCase()} });
  const { loading: usdPriceEthLoading , error: usdPriceEthError, data: usdPriceEthData } = useSubscription(USD_PRICE_ETH_SUBSCRIPTION);

  const poolReservesEstablished = !poolReservesLoading && !poolReservesError;
  const rawUserReservesEstablished = !rawUserReservesLoading && !rawUserReservesError;
  const usdPriceEthEstablished = !usdPriceEthLoading && !usdPriceEthError;

  const subscriptionsEstablished = ![poolReservesEstablished, rawUserReservesEstablished, usdPriceEthEstablished].includes(false);

  return subscriptionsEstablished ? (
    <Assets
      providerState={providerState}
      poolReservesData={poolReservesData}
      rawUserReservesData={rawUserReservesData}
      usdPriceEthData={usdPriceEthData}
    />
  ) : (
    <section style={{textAlign:"center", color: "white"}}>
      <Spinner variant="light" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>Please wait</p>
    </section>
  );
}

export default SubscriptionsProvider;
