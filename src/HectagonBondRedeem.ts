

import { loadOrCreateTransaction } from "./utils/Transactions"
import { BondRedeem } from '../generated/schema'
import { Transfer } from '../generated/GHECTA_BOND/ERC20'

// export function handleDeposit(event : Bond): void {
//   let ohmie = loadOrCreateOHMie(event.transaction.from)
//   let transaction = loadOrCreateTransaction(event.transaction, event.block)

//   let amount = toDecimal(event.params.amount, 18)
//   let deposit = new Deposit(transaction.id)
//   deposit.transaction = transaction.id
//   deposit.ohmie = ohmie.id
//   deposit.amount = amount
//   deposit.value = amount
//   deposit.token = event.params.id
//   deposit.timestamp = transaction.timestamp;
//   deposit.save()

//   // createDailyBondRecord(deposit.timestamp, token, deposit.amount, deposit.value)
//   // updateOhmieBalance(ohmie, transaction)
// }
// export function handleCreate(event : CreateMarket): void {
//   // let token = loadOrCreateToken(event.params.id)
//   let token = new Token(event.transaction.hash.toHex())
//   // if(event.params.quoteToken.toString() ERC20BUSD_CONTRACT) {
//   token.name = event.params.id.toString()
//   // }else {
//   //   token.name = "LP"
//   // }
//   token.quoteToken = event.params.quoteToken.toString()
//   token.save()
// }

export function handleBond(event: Transfer): void {

  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  // let ECR20contract = ERC20.bind(Address.fromString(GHECTA_CONTRACT))
  let bondRedeem = new BondRedeem(transaction.id)

  bondRedeem.timestamp = transaction.timestamp
  bondRedeem.user = event.params.to
  bondRedeem.from = transaction.to
  bondRedeem.amount = event.params.value

  bondRedeem.save()
}

