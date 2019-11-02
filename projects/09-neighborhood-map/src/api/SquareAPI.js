/*
------------------------------------
NOTE ERROR CODE
code: 429,
errorDetail: "Quota exceeded"
------------------------------------
*/

class Helper {

	static url() {
		return 'https://api.foursquare.com/v2/'
	}

	static auth() {

		const keys = {
			client_id: 		'XO3FGIHPNFHEJYBRRUYV4F5B0EHHCEFLXP0CVAWSRET02323',
			client_secret: 	'H30D3CVIQ1SL5URO1NUST12WNX4TTJE41MECLIIEKXY0CJBT',
			v: 				'20180711'
		}

		return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&')
	}

	static getUrl(urlParams) {

		if (!urlParams) {return ''}
		return Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')

	}

	static headers() {
		return {
			Accept: 'application/json'
		}
	}

	static fetchParams(endPoint, method, urlParams) {

		let requestData = {
			method, headers: Helper.headers()
		}

		return fetch(
			`${Helper.url()}${endPoint}?${Helper.auth()}&${Helper.getUrl(urlParams)}`,requestData
		).then(res => res.json())
	}
}

export default class SquareAPI {

	static search(urlParams) {
		return Helper.fetchParams('/venues/search', 'GET', urlParams)
	}

	static getVenueDatails(VENUS_ID) {
		return Helper.fetchParams(`/venues/${VENUS_ID}`, 'GET')
	}

	static getVenuePhotos(VENUS_ID) {
		return Helper.fetchParams(`/venues/${VENUS_ID}/photos`, 'GET')
	}

}

