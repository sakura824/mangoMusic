<template>
      <!-- <audio :src='musicUrl' controls autoplay></audio> -->
	  <div class="audio_con">
	      <img :src="songsDetail.al.picUrl">
	      <div class="songs-detail">
	          <span :title="songsDetail.al.name"  @click="seachSongsName(songsDetail.name)">{{songsDetail.name}}</span>
	          <p style="color: #409EFF;cursor: pointer;font-size:15px" @click="seachSinger(songsDetail.ar[0].name)">{{songsDetail.ar[0].name}}</p>
	      </div>
	      <audio ref='audio' @timeupdate="timeUpdate" :src="musicUrl" controls autoplay class="myaudio" ></audio>
          <div class="lyric" v-for="(item,index) in songsLyric" :key="index">
              <p v-if="currentTime >= item.time && currentTime < songsLyric[index+1].time">{{item.lyric}}</p>
          </div>
	  </div>
</template>

<script>
export default {
    data() {
        return {
            //歌词
            nowLyric: "没有歌词",
            //当前播放秒数
            currentTime: null
        }
    },
    computed: {
        //歌曲url
        musicUrl() {
            return this.$store.state.musicURL
        },
        //歌曲详情
        songsDetail() {
            return this.$store.state.songsDetail
        },
        //歌词
        songsLyric() {
            return this.$store.state.lyric
        },
    },
    methods: {
        //歌名
        seachSongsName(songs) {
            this.$router.push('/result?name=' + songs);
        },
        //歌手
        seachSinger(singer) {
            this.$router.push('/result?name=' + singer);
        },
        //获取当前播放时间（秒数）
        timeUpdate(e) {
            this.currentTime = e.target.currentTime
        }
    },
}
</script>

<style>
.audio_con {
    height: 80px;
    width: 100%;
    text-align: center;
    background-color: #f1f3f4;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    bottom: 0;
    position: sticky;
}
/* 播放图片 */
.audio_con img {
    width:60px;
    height: 60px;
    margin:10px 0;
    margin-left: 20px;
    float: left;
    border-radius:50%;
    animation:rotate 15s linear infinite;
}
/* 绑定animation的rotate旋转方法 */
@-webkit-keyframes rotate{
  0%{
    transform: rotate(0)
  }
  50%{
    transform: rotate(180deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
/* 歌曲名称和歌手名 */
.songs-detail {
    float: left;
    height: 80px;
    text-align: center;
    margin:10px 0 10px 10px;
}
.songs-detail span {
    height: 20px;
    width: 200px;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}
/* audio */
.myaudio {
    /* position: absolute;
    margin-left: -30%; */
    width: 1100px;
}
/* 歌词 */
.lyric {
    position: absolute;
    height: 100px;
    font-size: 17px;
    top: 30%;
    left: 50%;
}
</style>