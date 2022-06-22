

import { loadOrCreateTransaction } from "./utils/Transactions"
import { Swap as SwapSchema } from '../generated/schema'
import { BigInt, BigDecimal, store } from "@graphprotocol/graph-ts";
import { Swap } from '../generated/LP/LP'
import { toDecimal } from './utils/Decimals'

export function handleSwap(event: Swap): void {

    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params;
    let zero = BigInt.fromString("0")
    let price = BigDecimal.fromString("0")

    let swap = new SwapSchema(transaction.id);
    swap.amount0In = toDecimal(param.amount0In)
    swap.amount0Out = toDecimal(param.amount0Out)
    swap.amount1In = toDecimal(param.amount1In, 9)
    swap.amount1Out = toDecimal(param.amount1Out, 9)
    if (param.amount0Out.equals(zero)) {
        swap.price = toDecimal(param.amount0In.div(param.amount1Out), 9)
    } else {
        swap.price = toDecimal(param.amount0Out.div(param.amount1In), 9)
    }
    swap.to = param.to
    swap.timestamp = transaction.timestamp
    swap.save()

}