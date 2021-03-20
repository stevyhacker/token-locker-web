import React, {useState} from 'react';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import useWeb3Modal from '../../hooks/useWeb3Modal';
import Modal from "../elements/Modal";
import Deposit from "./Deposit";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

function Hero(
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


  const [depositModalActive, setDepositModalActive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setDepositModalActive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setDepositModalActive(false);
  }

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
              Token <span className="text-color-primary">Locker</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Safely keep your tokens locked for a time period of your own choosing.
                <br/>
                <br/>
                Prevents you from making
                bad decisions and selling too early.
                <br/>
                It's free to use if you respect the unlock date for withdrawal that
                you have chosen.
                <br/>
                <br/>
                There is a penalty fee that you pick on deposit to protect yourself from trying to withdraw before the
                unlock date.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">

                <ButtonGroup>
                  <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal}
                                logoutOfWeb3Modal={logoutOfWeb3Modal}/>
                </ButtonGroup>

                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile aria-controls="video-modal"
                          onClick={openModal}>
                    Deposit
                  </Button>
                  <Button tag="a" color="dark" wideMobile onClick={openModal}>
                    Withdraw
                  </Button>
                </ButtonGroup>
              </div>
              <Modal
                id="video-modal"
                show={depositModalActive}
                handleClose={closeModal}>
                <Deposit/>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
