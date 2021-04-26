import { useState } from 'react';
import { ethers } from "ethers";
import { ERC20__factory } from '../contracts/factories/ERC20__factory'
import { MyV2CreditDelegation__factory } from '../contracts/factories/MyV2CreditDelegation__factory'

import {CONTRACT_ADDRESS} from '../config'

import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

// @ts-ignore
function DepositModal({handleClose, balance, depositActivity, deposited, providerState, setBalancesToRefetch}){
  const {action, reserve, enabled} = depositActivity;
  const {signer, provider} = providerState;

  const [step, setStep] = useState('start');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  // @ts-ignore
  const formValidation = (event, callback) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      callback();
    }
  }

  const extractDepositContent = () => {
    const title = `Deposit ${reserve.symbol}`;
    const getBodySection = ({text, variant, disabled=false}:{text: string, variant: string, disabled:boolean}) => (
      <section>
        <Alert variant={variant}>
          {text}
        </Alert>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Amount</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={value}
            type="number"
            min={1}
            required
            disabled={disabled}
            max={balance}
            onChange={(event)=> setValue(event.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text>{reserve.symbol}</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </section>
    );
    if(step === 'approve'){
      return {
        title,
        body: getBodySection({text: `You need to allow the app to spend your
        ${reserve.symbol}`, variant: "warning", disabled: true}),
        buttonContent: "Approve",
        onSubmit: (event: any) => formValidation(event, () => {
          function setAllowance(){
            const tokenAddress = `0x${reserve.id.split("0x")[1]}`;

            const token = ERC20__factory.connect(tokenAddress, signer);
            const allowance = token.approve( CONTRACT_ADDRESS, ethers.constants.MaxUint256);

            allowance.then(async function(transaction){
              setTransactionHash(transaction.hash)
              await provider.waitForTransaction(transaction.hash);
              setIsLoading(false);
              setStep('deposit');
            }).catch((error)=> {
              setIsLoading(false);
            })
          }
          setTransactionHash('');
          setIsLoading(true);
          setAllowance();
        })
      }
    } else if(step === 'deposit') {
      return {
        title,
        body: getBodySection({text: `Accept to deposit`, variant: "primary", disabled: true}),
        buttonContent: "Accept",
        onSubmit: (event: any) => formValidation(event, () => {
          async function deposit(){
            const tokenAddress = `0x${reserve.id.split("0x")[1]}`;
            const lendingPool = MyV2CreditDelegation__factory.connect(CONTRACT_ADDRESS, signer);
            const depositCollateral = lendingPool.depositCollateral(tokenAddress, ethers.utils.parseUnits(
              value,
              reserve.decimals
            ), true);

            depositCollateral.then(async function(transaction){
              setTransactionHash(transaction.hash)
              await provider.waitForTransaction(transaction.hash);
              setIsLoading(false);
              setStep('final');
              setBalancesToRefetch(true);
            }).catch((error)=> {
              setIsLoading(false);
            })
          }
          setTransactionHash('');
          setIsLoading(true)
          deposit()
        })
      }
    } else if(step === 'final'){
      return {
        title,
        body: getBodySection({text: `Successful deposit!`, variant: "success", disabled: true}),
        buttonContent: "Close",
        onSubmit: (event: any) => formValidation(event, () => {
          handleClose()
        })
      }
    } else {
      return {
        title,
        body: getBodySection({text:`Available to deposit: ${balance} ${reserve.symbol}`, variant:"primary", disabled: false}),
        buttonContent: "Continue",
        onSubmit: (event: any) => formValidation(event, () => {
          async function checkAllowance(){
            const tokenAddress = `0x${reserve.id.split("0x")[1]}`;
            const walletAddress = await signer.getAddress();

            const token = ERC20__factory.connect(tokenAddress, provider);

            const allowance = await token.allowance(walletAddress, CONTRACT_ADDRESS);
            const hasAllowance = allowance.isZero() ? 0
            : ethers.constants.MaxUint256.div(allowance).toNumber();

            setStep(hasAllowance ? 'deposit' : 'approve')
            setIsLoading(false)
          }
          setTransactionHash('');
          setIsLoading(true);
          checkAllowance();
        })
      }
    }
  }
  const extractWitdrawalContent = () => {
    const title = `Withdraw ${reserve.symbol}`;
    const getBodySection = ({text, variant, disabled=false}:{text: string, variant: string, disabled:boolean}) => (
      <section>
        <Alert variant={variant}>
          {text}
        </Alert>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Amount</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={value}
            type="number"
            min={1}
            required
            disabled={disabled}
            max={deposited}
            onChange={(event)=> setValue(event.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text>{reserve.symbol}</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

      </section>
    );
    if(step === 'withdraw'){
      return {
        title,
        body: getBodySection({text: `Accept to withdraw`, variant: 'primary', disabled: true}),
        buttonContent: "Accept",
        onSubmit: (event: any) => formValidation(event, () => {
          async function witdraw(){
            const tokenAddress = `0x${reserve.id.split("0x")[1]}`;
            const lendingPool = MyV2CreditDelegation__factory.connect(CONTRACT_ADDRESS, signer);
            const withdrawCollateral = lendingPool.withdrawCollateral(tokenAddress, ethers.utils.parseUnits(
              value,
              reserve.decimals
            ));

            withdrawCollateral.then(async function(transaction){
              setTransactionHash(transaction.hash);
              await provider.waitForTransaction(transaction.hash);
              setIsLoading(false);
              setStep('final');
              setBalancesToRefetch(true);
            }).catch((error)=> {
              setIsLoading(false);
            })
          }
          setTransactionHash('');
          setIsLoading(true)
          witdraw()
        })
      }
    } else if(step === 'final') {
      return {
        title,
        body: getBodySection({text: `Successful withdrawal!`, variant: 'success', disabled: true}),
        buttonContent: "Close",
        onSubmit: (event: any) => formValidation(event, () => {
          handleClose()
        })
      }
    } else {
      return {
        title,
        body: getBodySection({text: `Available to withdraw: ${deposited} ${reserve.symbol}`, variant:"primary", disabled: false}),
        buttonContent: "Continue",
        onSubmit: (event: any) => formValidation(event, () => {
          setStep('withdraw');
          setTransactionHash('');
          })
      }
    }
  }
  const extractModalContent = (() => action === "deposit" ? extractDepositContent() : extractWitdrawalContent());

  const {title, body, buttonContent, onSubmit} = extractModalContent();
  const getTransactionHashSection = () => {
    const etherscanUrl = `https://kovan.etherscan.io/tx/${transactionHash}`;
    return transactionHash !== '' ? (
      <p style={{fontSize:"0.9rem"}}>
        <a href={etherscanUrl} target="blank">
          Open transaction on Etherscan
        </a>
      </p>
    ) : null;
  }

  const modalBody = isLoading ? (
    <section style={{textAlign:"center"}}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>Please wait</p>
      {getTransactionHashSection}
    </section>
  ) : (
    <Form onSubmit={onSubmit} id="depositForm">
      {body}
    </Form>
  );

  return (
    <Modal
      show={enabled}
      onHide={handleClose}
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button
          form="depositForm"
          type="submit"
          variant={isLoading ? "secondary" : "primary"}
          disabled={isLoading}
        >
          {buttonContent}
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default DepositModal;
