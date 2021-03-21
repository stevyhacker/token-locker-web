import React, {FC, useState} from 'react';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const Withdraw: FC<Web3Props> = ({provider}) => {

  const {loading, error, data} = useQuery(GET_TRANSFERS);
  const [selectedToken, setToken] = useState<Token>();
  const [amount, setAmount] = useState<number>(-1);
  const tokens: Token[] = tokenList.tokens;

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({transfers: data.transfers});
    }
  }, [loading, error, data]);

  const WithdrawButton = styled(Button)({
    background: 'linear-gradient(45deg, #429DDA 30%, #5773DD 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white'
  });

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

  async function readOnChainData(token: Token) {
    const tokenContract = new Contract(token.address, abis.erc20, provider);
    const signer = provider.getSigner()
    const tokenBalance = await tokenContract.balanceOf(signer.getAddress());
    return parseFloat(ethers.utils.formatUnits(tokenBalance));
  }

  function tokenInput(event: object, token: Token | null, reason: string) {
    console.log(token);
    if (token != null) {
      setToken(token)
      readOnChainData(token).then(res => {
        console.log(res)
        setAmount(res)
      })
    }
  }

  function withdrawToken() {
    if (selectedToken != undefined) {
      const signer = provider.getSigner()
      const tokenContract = new Contract(selectedToken.address, abis.erc20, signer);
      if (amount > 0) { //todo passing 0 as amount here just for demo
        tokenContract.approve("0x400Fc9C7F01Df3aa919659De434E0c584e68CB29", 0).then(() => {
        })
      }
    }
  }

  return (
    <section className="hero section center-content">
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
          Unlock <span className="text-color-primary">Token</span>
        </h1>
        <p className="mt-24 mb-32 reveal-from-bottom" data-reveal-delay="400">
          Select ERC20 token you have previously locked and click withdraw to get your tokens back.
        </p>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="container-xs">
              <div className="reveal-from-bottom" data-reveal-delay="600">

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

                {amount > 0 ? <Typography>Total locked: {amount}</Typography> : <div/>}
                {amount === 0 ? <p>You haven't locked any amount of this token.</p> : <div/>}

                <ButtonGroup className="mt-32">
                  <WithdrawButton wide wideMobile onClick={withdrawToken()}>Withdraw</WithdrawButton>
                </ButtonGroup>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Withdraw;
