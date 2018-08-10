# teller-io [![npm version](https://badge.fury.io/js/teller-io.svg)](https://badge.fury.io/js/teller-io)

API wrapper lib for [Teller](https://teller.io)

## Installation

`npm install teller-io --save`

## Usage

`const teller = require('teller-io')`

### Generate Auth URL

Usage:

```
const appId = 'from application created here: https://teller.io/developer/applications'
const permissions = {
	full_account_number: true,
	balance: true,
	transaction_history: true,
	direct_debits: 'read',
	standing_orders: 'read',
	internal_transfers: false,
	payees: 'write',
	external_payments: true,
}

teller.generateAuthUrl({ appId, permissions })
```

Returns: String

### Extract data from Resulting Redirect URL

Usage:
```
const url = 'https://splitthis.app/?token=000-000-000&permissions=balance:true,direct_debits:read,external_payments:true,full_account_number:true,payees:write,standing_orders:read,transaction_history:true'

teller.parseRedirectUrl(url)
```
Returns: 
```
{
	token: String,
	permissions: {
		full_account_number: true,
		balance: true,
		transaction_history: true,
		direct_debits: 'read',
		standing_orders: 'read',
		internal_transfers: false,
		payees: 'write',
		external_payments: true,
	}
}
```

### Make Requests

Below all return a Promise which resolves to the result of the request, or rejects with an error.

`teller.getAccounts({ token })`

`teller.getAccount({ token, accountId })`


`teller.getTransactions({ accountId, token })`

`teller.getTransaction ({ accountId, transactionId, token })`


`teller.getDirectDebits({ accountId, token })`

`teller.getDirectDebit({ accountId, directDebitId, token })`


`teller.getStandingOrders({ accountId, token })`

`teller.getStandingOrder({ accountId, standingOrderId, token })`


`teller.getPayees({ accountId, token })`

`teller.getPayee({ accountId, payeeId, token })`

(wip)
`teller.externalPayment({ accountId, payeeId, bankCode, accountNumber, amount, token, key })`
