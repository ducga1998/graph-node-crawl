

import { loadOrCreateTransaction } from "./utils/Transactions"
import { Cancel, Purchase, ChangeListing, Listing } from '../generated/schema'
import { ListingPriceChange } from '../generated/ChangePrice/Marketplace'
import { CancelledListing } from '../generated/Cancel/Marketplace'
import { NewListing } from '../generated/Listing/Marketplace'
import { PurchasedListing } from '../generated/PurchasedListing/Marketplace'

export function handleCancel(event: CancelledListing): void {

    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params
    let cancel = new Cancel(transaction.id)
    cancel.nftID = param.nftID
    cancel.seller = param.seller
    cancel.timestamp = transaction.timestamp
    cancel.save()

}
export function handlePurchased(event: PurchasedListing): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params
    let purchase = new Purchase(transaction.id)
    purchase.buyer = param.buyer
    purchase.currency = param.currency
    purchase.nftID = param.nftID
    purchase.price = param.price
    purchase.seller = param.seller
    purchase.timestamp = transaction.timestamp
    purchase.save()

}

export function handleListing(event: NewListing): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params
    let listing = new Listing(transaction.id)
    listing.currency = param.currency
    listing.nftID = param.nftID
    listing.price = param.price
    listing.seller = param.seller
    listing.timestamp = transaction.timestamp
    listing.save()
}
export function handleChangePrice(event: ListingPriceChange): void {
    let transaction = loadOrCreateTransaction(event.transaction, event.block)
    let param = event.params
    let changeListing = new ChangeListing(transaction.id)
    changeListing.currency = param.currency
    changeListing.nftID = param.nftID
    changeListing.price = param.price
    changeListing.seller = param.seller
    changeListing.timestamp = transaction.timestamp
    changeListing.save()


}