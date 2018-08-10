# node-teller-io

API wrapper lib for [Teller](https://teller.io)

## Usage

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

generateAuthUrl({ appId, permissions })
```

Returns: String

### Extract data from Resulting Redirect URL

Usage:
```
const url = 'https://splitthis.app/?token=000-000-000&permissions=balance:true,direct_debits:read,external_payments:true,full_account_number:true,payees:write,standing_orders:read,transaction_history:true'

parseRedirectUrl(url)
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

`getAccounts({ token })`

`getAccount({ token, accountId })`


`getTransactions({ accountId, token })`

`getTransaction ({ accountId, transactionId, token })`


`getDirectDebits({ accountId, token })`

`getDirectDebit({ accountId, directDebitId, token })`


`getStandingOrders({ accountId, token })`

`getStandingOrder({ accountId, standingOrderId, token })`


`getPayees({ accountId, token })`

`getPayee({ accountId, payeeId, token })`

`externalPayment({ accountId, payeeId, bankCode, accountNumber, amount, token, key })`
