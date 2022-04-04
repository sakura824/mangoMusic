<!--最新音乐-->
<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in List" :key="index" class="el-table__row" @click="util.playMusic(item.id)">
          <td>{{ index + 1 }}</td>
          <td class="songs-img-content" >
            <div class="songs-img">
              <img :src="item.album.picUrl" alt="" />
              <span  class="iconfont icon-bofang1"></span>
            </div>
          </td>
          <td>
            <div class="songs-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-MV"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td class="songs-singer">{{ item.album.artists['0'].name }}</td>
          <td class="songs-title">{{ item.album.name }}</td>
          <td class="songs-time">{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {NewMusicApi} from '../network/api.js'
export default {
  data() {
    return {
      List:[],
      tag: '0',//全部 0， 华语 7， 欧美 96， 日本 8， 韩国 16
    }
  },
  watch: {
    tag() {
      this.newMusic()
    }
  },
  created() {
    this.newMusic()
  },
  methods: {
    newMusic() {
		NewMusicApi({
            type: this.tag
          }).then(res => {
			if (res.code == 200) {
				this.List = res.data;
				for (let i = 0; i < this.List.length; i++) {
				  //把总秒数获取到
				  let duration = this.List[i].duration;
				  let m = parseInt(duration / 1000 / 60);
				  if (m < 10) {
				    m = '0' + m;
				  }
				  let s = parseInt((duration / 1000) % 60);
				  if (s < 10) {
				    s = '0' + s;
				  }
				  this.List[i].duration = `${m}:${s}`;
				}
			} else {
				this.$message({
					message: '最新音乐请求数据失败！',
					type: 'error'
				})
			}
		})
    }
  },
}
</script>
<style>
.songs-container {
  margin: 25px;
}
.tab-bar {
  margin: 0 10px 10px 0 ;
}
.tab-bar span{
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}
.playlit-table {
  padding-right: 20px;
}
.songs-img {
  width: 90px;
}
.songs-img img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.songs-img span {
  display: none;
  position: absolute;
  padding-left: 23px;
  margin-top: -60px;
  font-size: 35px;
  color: rgb(224, 60, 60);

}
.songs-img:hover span {
  display: block;
}
.el-table__row {
  width: 90px;
}
.el-table__row:hover {
  background-color: rgb(237, 237, 237);
}
.el-table__row td {
  font-size: 13px;
}
.name-wrap span {
  padding-left: 5px;
}
.icon-MV {
  color: rgb(219, 50, 50);
}
.songs-img-content {
  width: 120px;
}
.songs-singer {
  width: 260px;
}
.songs-time {
  width: 100px;
}
.songs-title {
  width: 342px;
}
</style>
