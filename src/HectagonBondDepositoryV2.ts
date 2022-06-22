
import {  Bond  , CreateMarket } from '../generated/HectagonBondDepositoryV2/HectagonBondDepositoryV2'
import { Deposit , Token} from '../generated/schema'
import { loadOrCreateTransaction } from "./utils/Transactions"
import { loadOrCreateOHMie, updateOhmieBalance } from "./utils/OHMie"
import { toDecimal } from "./utils/Decimals"


export function handleDeposit(event : Bond): void {
  let ohmie = loadOrCreateOHMie(event.transaction.from)
  let transaction = loadOrCreateTransaction(event.transaction, event.block)

  let amount = toDecimal(event.params.amount, 18)
  let deposit = new Deposit(transaction.id)
  deposit.transaction = transaction.id
  deposit.ohmie = ohmie.id
  deposit.amount = amount
  deposit.value = amount
  deposit.token = event.params.id
  deposit.timestamp = transaction.timestamp;
  deposit.save()

  // createDailyBondRecord(deposit.timestamp, token, deposit.amount, deposit.value)
  // updateOhmieBalance(ohmie, transaction)
}
export function handleCreate(event : CreateMarket): void {
  // let token = loadOrCreateToken(event.params.id)
  let token = new Token(event.transaction.hash.toHex())
  // if(event.params.quoteToken.toString() ERC20BUSD_CONTRACT) {
  token.name = event.params.id.toString()
  // }else {
  //   token.name = "LP"
  // }
  token.quoteToken = event.params.quoteToken.toString()
  token.save()
}

// export function handleRedeem(call: RedeemCall): void {
//   let ohmie = loadOrCreateOHMie(call.transaction.from)
//   let transaction = loadOrCreateTransaction(call.transaction, call.block)
//
//   let redemption = loadOrCreateRedemption(call.transaction.hash as Address)
//   redemption.transaction = transaction.id
//   redemption.ohmie = ohmie.id
//   redemption.token = loadOrCreateToken(DAIBOND_TOKEN).id;
//   redemption.timestamp = transaction.timestamp;
//   redemption.save()
//   updateOhmieBalance(ohmie, transaction)
// }