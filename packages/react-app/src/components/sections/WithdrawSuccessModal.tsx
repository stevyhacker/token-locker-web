import React from "react"

function WithdrawSuccessModal() {
  return (
    <div>
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
          Withdrawal <span className="text-color-primary">Successful</span>
        </h1>
        <p className="mt-24 mb-32 reveal-from-bottom" data-reveal-delay="400">
          Your tokens are successfully withdrawn from the Token Locker smart contract and transferred to your wallet.
        </p>
      </div>
    </div>
  )
}

export default WithdrawSuccessModal
