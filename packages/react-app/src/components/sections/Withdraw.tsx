import React, {ChangeEvent, FC, useState} from 'react';
import ButtonGroup from '../elements/ButtonGroup';
import ActionButton from '../elements/ActionButton';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import TextField from '@material-ui/core/TextField';
import Autocomplete, {AutocompleteInputChangeReason} from '@material-ui/lab/Autocomplete';
import tokenList from "../../assets/tokens/coinGeckoTokenList.json";
import {Avatar, Typography} from "@material-ui/core";
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {ethers} from "ethers";
import {Contract} from '@ethersproject/contracts';
import {abis, addresses} from "@project/contracts";
import {Web3Provider} from "@ethersproject/providers";
import {isAddress} from "ethers/lib/utils";
import Modal from "../elements/Modal";
import WithdrawSuccessModal from "./WithdrawSuccessModal";
import ReactGA from "react-ga";
import PanicWithdrawModal from "./PanicWithdrawModal";
import {Token} from "../../utils/Token";

interface Web3Props {
  provider: Web3Provider,
}

const Withdraw: FC<Web3Props> = ({provider}) => {

  const {loading, error, data} = useQuery(GET_TRANSFERS);
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [amount, setAmount] = useState<number>(-1);
  const [successModalActive, setSuccessModalActive] = useState(false);
  const [panicWithdrawalModalActive, setPanicWithdrawalModalActive] = useState(false);

  let tokens: Token[] = tokenList.tokens;

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({transfers: data.transfers});
    }
  }, [loading, error, data]);

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 65,
    stringify: (option: Token) => option.name
  });

  const closeModal = (e: any) => {
    e.preventDefault();
    setSuccessModalActive(false);
    setPanicWithdrawalModalActive(false);
  }

  async function readOnChainData(token: Token) {
    const tokenContract = new Contract(token.address, abis.erc20, provider);
    const tokenBalance = await tokenContract.balanceOf(addresses.tokenLockerRopstenContractAddress);
    return parseFloat(ethers.utils.formatUnits(tokenBalance));
  }

  async function readTokenData(tokenAddress: string): Promise<Token> {
    const tokenContract = new Contract(tokenAddress, abis.erc20, provider);
    const tokenBalance = await tokenContract.balanceOf(addresses.tokenLockerRopstenContractAddress);
    const decimals = await tokenContract.decimals()
    const symbol = await tokenContract.symbol()
    const name = await tokenContract.name()
    setAmount(parseFloat(ethers.utils.formatUnits(tokenBalance)))
    setSelectedToken(tokenContract.name())
    return {
      "chainId": 1,
      "address": tokenAddress,
      "name": name,
      "symbol": symbol,
      "decimals": decimals,
      "logoURI": ""
    }
  }

  function customTokenInput(event: ChangeEvent<{}>, address: string, reason: AutocompleteInputChangeReason) {
    console.log(address);
    console.log(reason);

    if (isAddress(address)) {
      console.log(event);
      readTokenData(address)
        .then(token => {
          tokens.push(token)
          setSelectedToken(token)
          console.log(token);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }

  function tokenInput(event: object, token: string | Token | null, reason: string) {
    console.log(token);
    if (token != null && typeof token !== "string") {
      setSelectedToken(token)
      readOnChainData(token).then(res => {
        console.log(res)
        setAmount(res)
      }).catch((error: Error) => {
        console.error(error);
      });
    } else {
      if (typeof token === "string" && isAddress(token)) {
        console.log(event);
        readTokenData(token)
          .then(token => {
            tokens.push(token)
            setSelectedToken(token)
            console.log(token);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      }
    }
  }

  function withdrawToken() {
    ReactGA.event({
      category: 'User',
      action: 'Click Withdraw Button'
    });
    if (selectedToken !== undefined) {
      const signer = provider.getSigner()
      const tokenLockerContract = new Contract(addresses.tokenLockerRopstenContractAddress, abis.tokenLocker.abi, signer);
      tokenLockerContract.withdraw(selectedToken.address).then(() => {
        console.log("Tokens transferred back to your wallet successfully. ")
        setSuccessModalActive(true)
      }).catch((error: Error) => {
        console.error(error);
        setPanicWithdrawalModalActive(true)
      });
    }
  }

  return (
    <section className="hero section center-content">
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16">
          Unlock <span className="text-color-primary">Token</span>
        </h1>
        <p className="mt-24 mb-32">
          Select ERC20 token you have previously locked and click withdraw to get your tokens back.
        </p>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="container-xs">
              <Autocomplete
                id="token-selection"
                className="mt-24 mb-24"
                options={tokens}
                getOptionLabel={(option) => option.symbol}
                filterOptions={filterOptions}
                noOptionsText={"For custom token, input full address"}
                freeSolo={true}
                onInputChange={customTokenInput}
                includeInputInList={true}
                onChange={tokenInput}
                renderOption={(option) => (
                  <React.Fragment>
                    <Avatar src={option.logoURI}
                            style={{marginRight: 8}}
                    />
                    {option.symbol} {option.name}
                  </React.Fragment>
                )}
                renderInput={(params) =>
                  <TextField {...params} label="Select token or paste address" variant="outlined"/>
                }
              />

              {amount > 0 ? <Typography>Total locked: {amount}</Typography> : <div/>}
              {amount === 0 ? <p>You haven't locked any amount of this token.</p> : <div/>}

              <ButtonGroup className="mt-32">
                <ActionButton wide wideMobile onClick={withdrawToken}>Withdraw</ActionButton>
              </ButtonGroup>
              <Modal
                id="success-modal"
                show={successModalActive}
                handleClose={closeModal}
                className
                closeHidden>
                <WithdrawSuccessModal/>
              </Modal>
              <Modal
                id="panic-withdraw-modal"
                show={panicWithdrawalModalActive}
                handleClose={closeModal}
                className
                closeHidden>
                <PanicWithdrawModal provider={provider} tokenAddress={selectedToken?.address}/>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Withdraw;
