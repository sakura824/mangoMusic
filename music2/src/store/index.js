import Vue from 'vue'
import Vuex from 'vuex'
import util from '../network/utils.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicURL:1,
    userName: '请登录',
    token: '',
    songsDetail: [],
    lyric:[]
  },
  mutations: {
    //音乐url
    SONGS_URL(state,url) {
      state.musicURL = url
    },
    //歌曲详情
    SONGS_DETAIL(state,detail) {
      state.songsDetail = detail
    },
    //歌词
    SONGS_LYRICS(state,lyr) {
      const lineArr = lyr.split(/\n/);
      let lyricsObjArr = [];
      lineArr.forEach(item => {
        if (item === '') return
         const obj = {}
         const time = item.match(/\[\d{2}:\d{2}.\d{2,3}\]/)
       
         obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
         obj.time = time ? util.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
         obj.uid = Math.random().toString().slice(-6)
         if (obj.lyric === '') {
           console.log('这一行没有歌词')
         } else {
           lyricsObjArr.push(obj)
         }
       })
       
      state.lyric = lyricsObjArr
    }
  },
  actions: {
  },
  modules: {
  }
})
