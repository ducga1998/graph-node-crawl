import { Swap } from "../../generated/schema"
import { toDecimal } from "./Decimals"

export function loadAndCreateSwap(id: string): Swap {

    let swap = Swap.load(id)
    if (swap == null) {
        swap = new Swap(id)
    }
    swap.save()
    return swap as Swap
}