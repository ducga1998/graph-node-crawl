

import { loadOrCreateTransaction } from "./utils/Transactions"
import { BondRedeem } from '../generated/schema'
import { Transfer } from '../generated/GHecta/GHecta'


export function handleRedeem(event: Transfer): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  // let ECR20contract = ERC20.bind(Address.fromString(GHECTA_CONTRACT))
  let bondRedeem = new BondRedeem(transaction.id)
  bondRedeem.timestamp = transaction.timestamp
  bondRedeem.user = event.params.to
  bondRedeem.from = transaction.to
  bondRedeem.amount = event.params.value

  bondRedeem.save()
}

