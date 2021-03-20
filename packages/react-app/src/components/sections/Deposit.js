import React, {useState} from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import useWeb3Modal from '../../hooks/useWeb3Modal';
import {addresses, abis} from "@project/contracts";
import {getDefaultProvider} from "@ethersproject/providers";
import {Contract} from "@ethersproject/contracts";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import {styled} from '@material-ui/core/styles';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

// async function readOnChainData() {
//   // Should replace with the end-user wallet, e.g. Metamask
//   const defaultProvider = getDefaultProvider();
//   // Create an instance of an ethers.js Contract
//   // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
//   const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
//   // A pre-defined address that owns some CEAERC20 tokens
//   const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
//   console.log({tokenBalance: tokenBalance.toString()});
// }

function Deposit(
  {
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...props
  }) {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const {loading, error, data} = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({transfers: data.transfers});
    }
  }, [loading, error, data]);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const DepositButton = styled(Button)({
    background: 'linear-gradient(45deg, #429DDA 30%, #5773DD 90%)',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 2px 2px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48
  });


  const classes = useStyles();

  function WalletButton({provider, loadWeb3Modal, logoutOfWeb3Modal}) {
    return (
      <Button
        onClick={() => {
          if (!provider) {
            loadWeb3Modal();
          } else {
            logoutOfWeb3Modal();
          }
        }}
      >
        {!provider ? "Connect Wallet" : "Disconnect Wallet"}
      </Button>
    );
  }

  return (
    <section
      {...props}
      className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Lock <span className="text-color-primary">Token</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Pick an ERC20 token, choose unlock date and set penalty fee and you are ready.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal}
                                logoutOfWeb3Modal={logoutOfWeb3Modal}/>
                </ButtonGroup>

                <div className={classes.root}>

                  <form className={classes.container} noValidate>
                    <TextField
                      id="datetime-local"
                      label="Unlock time"
                      type="datetime-local"
                      defaultValue="2022-01-01T00:00"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>

                  <h5 id="discrete-slider" className="mt-16">Penalty fee</h5>
                  <p>This fee is only applied if you try to withdraw before the unlock time you have set above.</p>

                  <Slider
                    defaultValue={20}
                    aria-labelledby="discrete-slider"
                    step={1}
                    valueLabelDisplay="auto"
                    marks
                    min={10}
                    max={100}
                  />
                </div>

                <TextField id="standard-basic" type="number" variant="outlined" label="Amount"/>

                <ButtonGroup className="mt-24">
                  <DepositButton wideMobile>Deposit</DepositButton>
                </ButtonGroup>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Deposit.propTypes = propTypes;
Deposit.defaultProps = defaultProps;

export default Deposit;
