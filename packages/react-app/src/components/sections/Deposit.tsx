import React, {ChangeEvent, FC, useState} from 'react';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {AutocompleteInputChangeReason} from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';
import {styled} from '@material-ui/core/styles';
import tokenList from "../../assets/tokens/coinGeckoTokenList.json";
import {Avatar, Typography} from "@material-ui/core";
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {ethers} from "ethers";
import {Contract} from '@ethersproject/contracts';
import {abis, addresses} from "@project/contracts";
import {Web3Provider} from "@ethersproject/providers";
import {isAddress} from "ethers/lib/utils";


interface Web3Props {
  provider: Web3Provider,
}

const Deposit: FC<Web3Props> = ({provider}) => {

  const {loading, error, data} = useQuery(GET_TRANSFERS);
  const [amount, setAmount] = useState(0);
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [token, setToken] = useState("");
  const [unlockDate, setUnlockDate] = useState(new Date(2022, 1, 1).getTime() / 1000);
  const [penaltyFee, setPenaltyFee] = useState(20);

  let tokens: Token[] = tokenList.tokens;

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({transfers: data.transfers});
    }
  }, [loading, error, data]);

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
  }));

  const DepositButton = styled(Button)({
    background: 'linear-gradient(45deg, #429DDA 30%, #5773DD 90%)',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 2px 2px 2px rgba(33, 203, 243, .3)',
    color: 'white'
  });

  const classes = useStyles();

  const marks = [{
    value: 20,
    label: '20%',
  }];

  function valueText(value: number) {
    marks[0].value = value
    marks[0].label = value + "%"
    return `${value} %`;
  }

  type Token = {
    "chainId": number,
    "address": string,
    "name": string,
    "symbol": string,
    "decimals": number,
    "logoURI"?: any
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 65,
    stringify: (option: Token) => option.symbol || option.name || option.address
  });

  async function readOnChainData(token: Token) {
    const tokenContract = new Contract(token.address, abis.erc20, provider);
    const signer = provider.getSigner()
    const tokenBalance = await tokenContract.balanceOf(signer.getAddress());
    return parseFloat(ethers.utils.formatUnits(tokenBalance));
  }

  async function readTokenData(tokenAddress: string): Promise<Token> {
    const tokenContract = new Contract(tokenAddress, abis.erc20, provider);
    const signer = provider.getSigner()
    const tokenBalance = await tokenContract.balanceOf(signer.getAddress());
    const decimals = await tokenContract.decimals()
    const symbol = await tokenContract.symbol()
    const name = await tokenContract.name()
    setAmount(tokenBalance)
    setToken(tokenContract.name())
    return {
      "chainId": 1,
      "address": tokenAddress,
      "name": name,
      "symbol": symbol,
      "decimals": decimals,
      "logoURI": ""
    }
  }

  function amountInput(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(parseFloat(event.target.value))
  }

  function unlockDateInput(event: React.ChangeEvent<HTMLInputElement>) {
    let unlockDate = event.target.value
    setUnlockDate(new Date(unlockDate).valueOf() / 1000)
    console.log(unlockDate);
  }

  function tokenInput(event: any, token: string | Token | null, reason: string) {
    console.log(token);
    console.log(event);
    console.log(reason);

    if (token != null && typeof token !== "string") {
      setSelectedToken(token)
      setToken(token.name)
      readOnChainData(token).then(res => {
        console.log(res)
        setAmount(res)
      }).catch((error: Error) => {
        console.error(error);
      });
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

  function penaltyFeeInput(event: any) {
    let fee = event.target.value
    setPenaltyFee(parseInt(fee))
    console.log(fee);
  }

  function clearInput() {
    setAmount(0)
    setSelectedToken(undefined)
    setToken("")
  }

  function depositToken() {
    if (selectedToken !== undefined) {
      const signer = provider.getSigner()
      const tokenLockerContract = new Contract(addresses.tokenLockerRopstenContractAddress, abis.tokenLocker.abi, signer);
      if (amount > 0) {
        tokenLockerContract.hodlDeposit(
          selectedToken.address,
          ethers.utils.parseUnits(String(amount)),
          unlockDate,
          penaltyFee).then(() => {
          console.log("Tokens deposited.")
          //TODO Implement success modal message
          clearInput()
        }).catch((error: Error) => {
          console.error(error);
        });
      }
    }
  }

  function approveToken() {
    if (selectedToken !== undefined) {
      const signer = provider.getSigner()
      const tokenContract = new Contract(selectedToken.address, abis.erc20, signer);
      if (amount > 0) {
        console.log(addresses.tokenLockerRopstenContractAddress)
        console.log(amount)
        tokenContract.approve(addresses.tokenLockerRopstenContractAddress, ethers.utils.parseUnits(String(amount))).then(() => {
          console.log("Tokens approved for spending.")
        }).catch((error: Error) => {
          console.error(error);
        });
      }
    }
  }

  return (
    <section className="hero section center-content">
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
          Lock <span className="text-color-primary">Token</span>
        </h1>
        <p className="mt-24 mb-32 reveal-from-bottom" data-reveal-delay="400">
          Pick an ERC20 token, choose the unlock date, set penalty fee and you are ready.
        </p>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="container-xs">
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <div>
                  <h5 className="mt-32">Unlock time</h5>

                  <form noValidate>
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2022-01-01"
                      className={classes.textField}
                      onChange={unlockDateInput}
                    />
                  </form>

                  <h5 className="mt-16">Penalty fee</h5>
                  <p>This fee is only applied if you try to withdraw before the unlock time you have set above.</p>
                  <Typography id="discrete-slider-custom" gutterBottom/>
                  <Slider
                    defaultValue={20}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    onChange={penaltyFeeInput}
                    valueLabelDisplay="off"
                    valueLabelFormat={valueText}
                    marks={marks}
                    min={10}
                    max={100}
                  />
                </div>

                <Autocomplete
                  id="token-selection"
                  className="mt-24 mb-24"
                  options={tokens}
                  getOptionLabel={(option) => option.symbol}
                  filterOptions={filterOptions}
                  noOptionsText={"For custom token, input full address"}
                  onInputChange={customTokenInput}
                  freeSolo={true}
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
                    <TextField {...params} label="Select token or paste address" value={token} variant="outlined"/>
                  }
                />
                <TextField value={amount} id="standard-basic" onChange={amountInput} type="number" variant="outlined"
                           label="Amount"/>
                <ButtonGroup className="mt-32">
                  {amount > 0 ? <DepositButton wide wideMobile onClick={approveToken}>Approve</DepositButton> : <div/>}

                  <DepositButton wide wideMobile onClick={depositToken}>Deposit</DepositButton>
                </ButtonGroup>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Deposit;
