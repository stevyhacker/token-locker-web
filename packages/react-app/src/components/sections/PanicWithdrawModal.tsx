import React, {FC, useState} from "react"
import {Web3Provider} from "@ethersproject/providers";
import ActionButton from "../elements/ActionButton";
import ReactGA from "react-ga";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import Modal from "../elements/Modal";
import PanicWithdrawSuccessModal from "./PanicWithdrawSuccessModal";

interface Web3Props {
  provider: Web3Provider,
  tokenAddress: string | undefined
}

const PanicWithdrawModal: FC<Web3Props> = ({provider, tokenAddress}) => {

  const [successModalActive, setSuccessModalActive] = useState(false);

  const closeModal = (e: any) => {
    e.preventDefault();
    setSuccessModalActive(false);
  }

  function panicWithdrawToken() {
    ReactGA.event({
      category: 'User',
      action: 'Click Panic Withdraw Button'
    });
    if (tokenAddress !== undefined) {
      const signer = provider.getSigner()
      const tokenLockerContract = new Contract(addresses.tokenLockerMainContractAddress, abis.tokenLocker.abi, signer);
      tokenLockerContract.panicWithdraw(tokenAddress).then(() => {
        console.log("Tokens transferred back to your wallet successfully. ")
        setSuccessModalActive(true)
      }).catch((error: Error) => {
        console.error(error);
      });
    }
  }

  return (
    <section className="section center-content">
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16">
          Withdraw <span className="text-color-primary">Now</span>
        </h1>
        <p className="mt-32 mb-32">
          Your tokens have not reached your specified unlock date.
        </p>
        <p className="mt-16 mb-32">
          Are you sure you want to withdraw them at this moment?
        </p>
        <ActionButton wide wideMobile onClick={panicWithdrawToken}>Withdraw Now</ActionButton>
        <Modal
          id="success-modal"
          show={successModalActive}
          handleClose={closeModal}
          className
          closeHidden>
          <PanicWithdrawSuccessModal/>
        </Modal>
      </div>
    </section>
  )
}

export default PanicWithdrawModal
