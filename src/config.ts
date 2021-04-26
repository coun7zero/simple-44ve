import { gql } from "@apollo/client";

export const CONTRACT_ADDRESS = "0x8367a1b78CB5E2a2365fF34aCD72FEd6216AEDbF";
export const POOL_ADDRESS = "0x88757f2f99175387ab4c6a4b3067c77a695b0349";

export const RAW_USER_RESERVES_SUBSCRIPTION = gql`
  fragment UserReserveData on UserReserve {
    scaledATokenBalance
    reserve {
      id
      underlyingAsset
      name
      symbol
      decimals
      liquidityRate
      reserveLiquidationBonus
      lastUpdateTimestamp
      aToken {
        id
      }
    }
    usageAsCollateralEnabledOnUser
    stableBorrowRate
    stableBorrowLastUpdateTimestamp
    principalStableDebt
    scaledVariableDebt
    variableBorrowIndex
    lastUpdateTimestamp
  }
  subscription UserPositionUpdateSubscription(
    $userAddress: String!
    $pool: String
  ) {
    userReserves(where: { user: $userAddress, pool: $pool }) {
      ...UserReserveData
    }
  }
`;
export const POOL_RESERVES_DATA_SUBSCRIPTION = gql`
  subscription ReserveUpdateSubscription($pool: String) {
    reserves(where: { pool: $pool }) {
      ...ReserveData
    }
  }
  fragment ReserveData on Reserve {
    id
    underlyingAsset
    name
    symbol
    decimals
    isActive
    isFrozen
    usageAsCollateralEnabled
    borrowingEnabled
    stableBorrowRateEnabled
    baseLTVasCollateral
    optimalUtilisationRate
    averageStableRate
    stableRateSlope1
    stableRateSlope2
    baseVariableBorrowRate
    variableRateSlope1
    variableRateSlope2
    variableBorrowIndex
    variableBorrowRate
    totalScaledVariableDebt
    liquidityIndex
    reserveLiquidationThreshold
    aToken {
      id
    }
    vToken {
      id
    }
    sToken {
      id
    }
    availableLiquidity
    stableBorrowRate
    liquidityRate
    totalPrincipalStableDebt
    totalLiquidity
    utilizationRate
    reserveLiquidationBonus
    price {
      priceInEth
    }
    lastUpdateTimestamp
    stableDebtLastUpdateTimestamp
    reserveFactor
  }
`;
export const USD_PRICE_ETH_SUBSCRIPTION = gql`
  subscription UsdPriceEth {
    priceOracle(id: "1") {
      usdPriceEth
    }
  }
`;
