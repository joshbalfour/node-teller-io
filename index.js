const makeJSONRequest = require('./makeJSONRequest')
const querystring = require('querystring')

const entrypoint = 'api.teller.io'
const keyId = 'certificate'

const permissionsToQuery = perms => Object.keys(perms).map(key => `${key}:${perms[key]}`).join(',')

const generateAuthUrl = ({ appId, permissions }) => `https://teller.io/auth/authorize?application_id=${appId}&permissions=${permissionsToQuery(permissions)}`

const makeTellerRequest = ({ path, method, token, form, key }) => {
	let body
	if (form) {
		body = JSON.stringify(form)
	}

	const options = {
		host: entrypoint,
		port: 443,
		path,
		body,
		method,
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		}
	}

	return makeJSONRequest(options, { key, keyId })
}

const parseRedirectUrl = uri => {
	const redirectUrl = new URL(uri)
	const searchParams = new URLSearchParams(redirectUrl.search)

	const token = searchParams.get('token')
	const permissionsQuery = searchParams.get('permissions')

	const permissions = {}
	permissionsQuery.split(',').forEach(val => {
		let [k, v] = val.split(':')
		if (v === 'true') {
			v = true
		}
		if (v === 'false') {
			v = false
		}
		permissions[k] = v
	})

	return {
		token,
		permissions,
	}
}

const getAccounts = ({ token }) => makeTellerRequest({
	path: '/accounts',
	method: 'get',
	token,
})
const getAccount = ({ token, accountId }) => makeTellerRequest({
	path: `/accounts/${accountId}`,
	method: 'get',
	token,
})


const getTransactions = ({ accountId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/transactions`,
	method: 'get',
	token,
})
const getTransaction = ({ accountId, transactionId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/transactions`,
	method: 'get',
	token,
})

const getDirectDebits = ({ accountId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/direct_debits`,
	method: 'get',
	token,
})
const getDirectDebit = ({ accountId, directDebitId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/direct_debits/${directDebitId}`,
	method: 'get',
	token,
})

const getStandingOrders = ({ accountId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/standing_orders`,
	method: 'get',
	token,
})
const getStandingOrder = ({ accountId, standingOrderId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/standing_orders/${standingOrderId}`,
	method: 'get',
	token,
})

const getPayees = ({ accountId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/payees`,
	method: 'get',
	token,
})
const getPayee = ({ accountId, payeeId, token }) => makeTellerRequest({
	path: `/accounts/${accountId}/payees/${payeeId}`,
	method: 'get',
	token,
})

const externalPayment = ({ accountId, payeeId, bankCode, accountNumber, amount, token, key }) => makeTellerRequest({
	path: `/accounts/${accountId}/payees/${payeeId}`,
	method: 'put',
	token,
	key,
	form: {
		bank_code: bankCode,
		account_number: accountNumber,
		amount,
	},
})

module.exports = {
	generateAuthUrl,
	parseRedirectUrl,

	makeTellerRequest,

	getAccounts,
	getAccount,

	getTransactions,
	getTransaction,

	getDirectDebits,
	getDirectDebit,

	getStandingOrders,
	getStandingOrder,

	getPayees,
	getPayee,

	externalPayment,
}