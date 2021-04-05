import React from "react"

function DepositSuccessModal() {
  return (
    <div>
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16">
          Deposit <span className="text-color-primary">Successful</span>
        </h1>
        <p className="mt-24 mb-32">
          Your tokens are successfully deposited in the Token Locker smart contract.
        </p>
        <p className="mt-24 mb-32">
          You can unlock and claim them at the specified date by clicking the Withdraw button.
        </p>
      </div>
    </div>
  )
}

export default DepositSuccessModal
