import store from '../store/index.js';
import {PlaySongApi,SongDetail,SongLyrics} from './api.js'
export default {
	//处理时间
	dateFormat(time) {
		let date = new Date(time);
		let year = date.getFullYear();
		// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		//当前时间
		let nowDate = new Date();
		let nowYear = nowDate.getFullYear();
		let nowMonth = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
		let nowDay = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
		let nowHours = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
		let nowMinutes = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
		let nowSeconds = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
		if (parseInt((nowYear + nowMonth + nowDay) - (year + month + day)) == 0) {
			return hours + ":" + minutes;
		} else if (parseInt((nowYear + nowMonth + nowDay) - (year + month + day)) == 1) {
			return "昨天" + " " + hours + ":" + minutes;
		}
		return month + "-" + day
	},
	joinDate(time) {
		let date = new Date(time);
		let year = date.getFullYear();
		// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		return year + '-' + month + "-" + day
	},
	// 格式化歌词的时间
	formatLyricTime (time) {
		const regMin = /.*:/
		const regSec = /:.*\./
		const regMs = /\./
   
		const min = parseInt(time.match(regMin)[0].slice(0, 2))
		let sec = parseInt(time.match(regSec)[0].slice(1, 3))
		// const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
		if (min !== 0) {
		  sec += min * 60
		}
		return sec 
	},
   

	//播放音乐
	playMusic(id) {
		//播放歌曲
		PlaySongApi({
			id: id
		}).then(res => {
			store.commit("SONGS_URL",res.data[0].url)
		})
		//歌曲名称，图片，歌手
		SongDetail({
			ids: id
		}).then(res => {
			store.commit("SONGS_DETAIL",res.songs[0])
		})
		//歌词
		SongLyrics({
			id: id
		}).then(res => {
			store.commit("SONGS_LYRICS",res.lrc.lyric)
		})
	}
}
