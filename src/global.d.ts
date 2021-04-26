interface Window {
  ethereum: any;
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const content: DocumentNode;
  export default content;
}

type ProviderState = {
  connected: boolean;
  walletAddress?: string;
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
};

type DepositActivity = {
  enabled: boolean;
  action?: string;
  reserve?: ReserveData;
};
