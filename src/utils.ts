import { ethers } from "ethers";
import { getTokensBalance } from "@mycrypto/eth-scan";

import { CONTRACT_ADDRESS } from "./config";

// @ts-ignore
export function reduceTokensBalance(reserves) {
  // @ts-ignore
  return function tokensBalanceReducer(accumulator, entry) {
    // @ts-ignore
    const found = reserves.find((token) => {
      return token.id.includes(entry[0]);
    });
    const value = ethers.utils.formatUnits(entry[1], found.decimals);
    return parseInt(value, 10) === 0
      ? accumulator
      : { ...accumulator, [found.id]: value };
  };
}

export function walletBalanceGetter(providerState: ProviderState) {
  const { walletAddress, provider } = providerState;

  async function getWalletBalance(formattedPoolReservesData: any) {
    const ids = formattedPoolReservesData.map(
      // @ts-ignore
      (data) => `0x${data.id.split("0x")[1]}`
    );

    const tokensBalance = await getTokensBalance(provider, walletAddress!, ids);

    const reducedTokensBalance = Object.entries(tokensBalance).reduce(
      reduceTokensBalance(formattedPoolReservesData),
      {}
    );

    return reducedTokensBalance;
  }
  return getWalletBalance;
}
export function contractBalanceGetter(providerState: ProviderState) {
  const { provider } = providerState;

  async function getReservesBalance(formattedPoolReservesData: any) {
    // @ts-ignore
    const ids = formattedPoolReservesData.map((data) => data.aToken.id);
    const tokensBalance = await getTokensBalance(
      provider,
      CONTRACT_ADDRESS,
      ids
    );

    // @ts-ignore
    const reservesWithATokenId = formattedPoolReservesData.map((reserve) => ({
      id: reserve.aToken.id,
      decimals: reserve.decimals,
    }));

    const reducedTokensBalance = Object.entries(tokensBalance).reduce(
      reduceTokensBalance(reservesWithATokenId),
      {}
    );

    return reducedTokensBalance;
  }
  return getReservesBalance;
}
