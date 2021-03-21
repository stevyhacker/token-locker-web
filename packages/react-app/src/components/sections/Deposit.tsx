import React, {FC, useState} from 'react';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';
import {styled} from '@material-ui/core/styles';
import tokenList from "../../assets/tokens/coinGeckoTokenList.json";
import {Avatar, Typography} from "@material-ui/core";
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {ethers} from "ethers";
import {Contract} from '@ethersproject/contracts';
import {abis} from "@project/contracts";
import {Web3Provider} from "@ethersproject/providers";


interface Web3Props {
  provider: Web3Provider,
}

const Deposit: FC<Web3Props> = ({provider}) => {

  const {loading, error, data} = useQuery(GET_TRANSFERS);

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

  function valuetext(value: number) {
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
    stringify: (option: Token) => option.name
  });

  const tokens: Token[] = tokenList.tokens;

  async function readOnChainData(token: Token) {
    const tokenContract = new Contract(token.address, abis.erc20, provider);
    const signer = provider.getSigner()
    const tokenBalance = await tokenContract.balanceOf(signer.getAddress());
    return parseFloat(ethers.utils.formatUnits(tokenBalance));
  }

  const [amount, setAmount] = useState(0);

  function amountInput(event: any) {
    setAmount(event.target.value)
  }

  function unlockDateInput(event: any) {
    let unlockDate = event.target.value
    console.log(unlockDate);
  }

  function tokenInput(event: object, token: Token | null, reason: string) {
    console.log(token);
    if (token != null)
      readOnChainData(token).then(res => {
        console.log(res)
        setAmount(res)
      })
  }

  function penaltyFeeInput(event: any) {
    let fee = event.target.value
    console.log(fee);
  }

  function depositToken() {

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
                    valueLabelFormat={valuetext}
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
                  onChange={tokenInput}
                  renderOption={(option) => (
                    <React.Fragment>
                      <Avatar src={option.logoURI}
                              style={{marginRight: 8}}
                      />
                      {option.symbol} {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => <TextField {...params} label="Enter token" variant="outlined"/>}
                />

                <TextField value={amount} id="standard-basic" onChange={amountInput} type="number" variant="outlined"
                           label="Amount"/>
                <ButtonGroup className="mt-32">
                  {/*<Button disabled wide wideMobile>Approve</Button>*/}
                  <DepositButton wide wideMobile onClick={depositToken()}>Deposit</DepositButton>
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
