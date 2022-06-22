import { Transfer } from '../generated/ECR20/ERC20'


import { loadOrCreateTransaction } from "./utils/Transactions"
import { Token } from '../generated/schema'
import { Address, BigDecimal, BigInt, log } from '@graphprotocol/graph-ts'
import { HECTA_ERC20_CONTRACT, MM_WALLET, STAKING_CONTRACT_V2 } from './utils/Constants'

import { ERC20 } from '../generated/ECR20/ERC20'
export function handleTransfer(event: Transfer): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let ECR20contract = ERC20.bind(Address.fromString(HECTA_ERC20_CONTRACT))
    Token.load(transaction.id)

    let totalBalance = BigInt.fromString("0")
    let token = new Token(transaction.id)

    for (let i = 0; i < MM_WALLET.length; i++) {

        let balance = ECR20contract.balanceOf(Address.fromString(MM_WALLET[i]))
        totalBalance = totalBalance.plus(balance)
    }
    token.from = event.params.from
    token.to = event.params.to
    token.value = totalBalance
    token.save();
}