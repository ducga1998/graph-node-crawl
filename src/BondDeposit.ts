

import { loadOrCreateTransaction } from "./utils/Transactions"
import { BondDeposit, Bond as BondInstance } from '../generated/schema'

import { Bond, CreateMarket } from '../generated/bondv2/bondv2'
import { bondv2 } from '../generated/bondv2/bondv2'
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BOND_DEPOSITORY_CONTRACT } from "./utils/Constants"
export function handleDeposit(event: Bond): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let bondDeposit = new BondDeposit(transaction.id)
    bondDeposit.amount = event.params.amount
    bondDeposit.bondId = event.params.id
    bondDeposit.timestamp = transaction.timestamp
    bondDeposit.price = event.params.price
    // let bondContract = bondv2.bind(Address.fromString(BOND_DEPOSITORY_CONTRACT))
    bondDeposit.save()
}

export function createBond(event: CreateMarket): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let bond = new BondInstance(event.params.id.toString())
    bond.baseToken = event.params.baseToken
    bond.initialPrice = event.params.initialPrice
    bond.quoteToken = event.params.quoteToken

    let bondContract = bondv2.bind(Address.fromString(BOND_DEPOSITORY_CONTRACT))
    // let market = bondContract.markets(event.params.id)
    let term = bondContract.terms(event.params.id)

    bond.fixedTerm = term.value0
    bond.controlVariable = term.value1

    bond.vesting = term.value2

    bond.conclusion = term.value3
    bond.maxDebt = term.value4



    bond.save()
}


