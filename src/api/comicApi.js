import config from '@/config.json'

export default {
	async getComics () {
		return new Promise( resolve => {
			setTimeout(() => {
				resolve({data: config.comicList}) // todo kanskje egen for admin og egen for ComicList?
			}, 1000)
		})
	},

	async getComic (comicName) {
		return new Promise( resolve => {
			resolve({data: {"tag": "Furry", "name": "Dress to Undress", "keywords": ['asd', 'asdasdasd', 'asdasdasdasd', 'asad asda', 'xccxxc', 'xcxcxcxc ', 'xccx', 'xcxc', 'asdasdasd a', 'asd  a a ', 'asdasd ',"finnick", "chipmunk", "charizard", "footjob", "fisting"], "cat": "MM", "lastUpdateNewPageCount": 0, "updated": "2017-10-24T11:04:46.000Z", "numberOfPages": 21, "userRating": 7.881, "id": 343, "created": "2017-07-01T00:00:00.000Z", "finished": 0, "artist": "Seth-Iova", "yourRating": 0}})
		})
	},

	async getComicLinks (comicId) {
		return new Promise( resolve => {
			resolve({data: {'NextComic': 'einelleraen neste', 'PreviousComic': 'forrige'}})
		})
	},

	// bare sett de tingene som kan bli satt. Antar at ved success: true, s[ stemmer det sendte inn
	async updateComic (updatedComicData) {
		return new Promise(resolve => {
			resolve({data: {'success': true, 'message': 'asd'}})
		})
	},

	async addNewComic (comicData) {
		return new Promise(resolve => {
			resolve({data: {'success': true, 'message': 'asd'}})
		})
	}
}