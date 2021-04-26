/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MyV2CreditDelegationInterface extends ethers.utils.Interface {
  functions: {
    "approveBorrower(address,uint256,address)": FunctionFragment;
    "depositCollateral(address,uint256,bool)": FunctionFragment;
    "repayBorrower(uint256,address)": FunctionFragment;
    "withdrawCollateral(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approveBorrower",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "repayBorrower",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCollateral",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveBorrower",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayBorrower",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCollateral",
    data: BytesLike
  ): Result;

  events: {};
}

export class MyV2CreditDelegation extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MyV2CreditDelegationInterface;

  functions: {
    approveBorrower(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "approveBorrower(address,uint256,address)"(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositCollateral(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "depositCollateral(address,uint256,bool)"(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repayBorrower(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "repayBorrower(uint256,address)"(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawCollateral(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdrawCollateral(address,uint256)"(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approveBorrower(
    borrower: string,
    amount: BigNumberish,
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "approveBorrower(address,uint256,address)"(
    borrower: string,
    amount: BigNumberish,
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositCollateral(
    asset: string,
    amount: BigNumberish,
    isPull: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "depositCollateral(address,uint256,bool)"(
    asset: string,
    amount: BigNumberish,
    isPull: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repayBorrower(
    amount: BigNumberish,
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "repayBorrower(uint256,address)"(
    amount: BigNumberish,
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawCollateral(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdrawCollateral(address,uint256)"(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveBorrower(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "approveBorrower(address,uint256,address)"(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: CallOverrides
    ): Promise<void>;

    depositCollateral(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "depositCollateral(address,uint256,bool)"(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    repayBorrower(
      amount: BigNumberish,
      asset: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "repayBorrower(uint256,address)"(
      amount: BigNumberish,
      asset: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawCollateral(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawCollateral(address,uint256)"(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    approveBorrower(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "approveBorrower(address,uint256,address)"(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositCollateral(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "depositCollateral(address,uint256,bool)"(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repayBorrower(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "repayBorrower(uint256,address)"(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawCollateral(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdrawCollateral(address,uint256)"(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveBorrower(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "approveBorrower(address,uint256,address)"(
      borrower: string,
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositCollateral(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "depositCollateral(address,uint256,bool)"(
      asset: string,
      amount: BigNumberish,
      isPull: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repayBorrower(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "repayBorrower(uint256,address)"(
      amount: BigNumberish,
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawCollateral(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdrawCollateral(address,uint256)"(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}