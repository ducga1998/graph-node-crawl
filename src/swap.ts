

import { loadOrCreateTransaction } from "./utils/Transactions"
import { Swap as SwapSchema } from '../generated/schema'
import { BigInt, BigDecimal, store } from "@graphprotocol/graph-ts";
import { Swap, Sync } from '../generated/LP/LP'
// import { Sync } from '../generated/Sync/Sync'
import { toDecimal } from './utils/Decimals'
import { loadAndCreateSwap } from "./utils/swap";

export function handleSwap(event: Swap): void {

    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params;
    let swap = loadAndCreateSwap(transaction.id)
    swap.amount0In = toDecimal(param.amount0In)
    swap.amount0Out = toDecimal(param.amount0Out)
    swap.amount1In = toDecimal(param.amount1In, 9)
    swap.amount1Out = toDecimal(param.amount1Out, 9)
    swap.to = param.to
    swap.timestamp = transaction.timestamp
    swap.save()


}
export function handleSync(event: Sync): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let swap = loadAndCreateSwap(transaction.id)
    let price = toDecimal(event.params.reserve0.div(event.params.reserve1), 9)
    swap.price = price
    swap.save()
}