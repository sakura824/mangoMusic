<!--推荐歌单-->
<template>
  <div class="playlists-container">
    <!-- 精品歌单 -->
    <div class="top-card">
      <!-- 背景图 -->
      <div class="bgc">
      <img :src="topList.coverImgUrl" alt="">
      </div>
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="">
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{topList.name}}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{topList.description}}
        </div>
      </div>
    </div>
    <!-- tab标题 -->
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="itemll" :class="{active:tag=='全部'}" @click="tag='全部'">全部</span>
        <span class="itemll" :class="{active:tag=='欧美'}" @click="tag='欧美'">欧美</span>
        <span class="itemll" :class="{active:tag=='华语'}" @click="tag='华语'">华语</span>
        <span class="itemll" :class="{active:tag=='流行'}" @click="tag='流行'">流行</span>
        <span class="itemll" :class="{active:tag=='说唱'}" @click="tag='说唱'">说唱</span>
        <span class="itemll" :class="{active:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="itemll" :class="{active:tag=='民谣'}" @click="tag='民谣'">民谣</span>
        <span class="itemll" :class="{active:tag=='电子'}" @click="tag='电子'">电子</span>
        <span class="itemll" :class="{active:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="itemll" :class="{active:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="itemll" :class="{active:tag=='ACG'}" @click="tag='ACG'">ACG</span>
        <span class="itemll" :class="{active:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="itemll" :class="{active:tag=='治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item1" :class="{active:tag=='旅行'}" @click="tag='旅行'">旅行</span>
      </div>
  </div>
  <!-- 内容列表 -->
    <div class="content-list">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items-content">
        <div class="item-content" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)">
          <div class="img-content">
            <div class="play-num">播放量：{{item.playCount}}</div>
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="content-name">{{item.name}}</div>
        </div>
      </div>
    </div>
     <div class="page">
       <el-pagination
        background
        @current-change="Change"
        layout="prev, pager, next"
        :current-page="page"
        :total="total">
      </el-pagination>
    </div>  
  </div>
</template>

<script>
import {TopDataApi,ContentDataApi} from '../network/api.js'
  export default {
    data() {
      return {
        topList: {},
        list: [],
        tag:'全部',
        total:0,
        page:1
      }
    },
    //侦听器
    watch: {
      tag() {
        this.TopData()
        this.ContentData()
        //重新切换歌曲类型请求数据时
        this.page = 1
      }
    },
    created() {
      //精品数据
      this.TopData()
      //内容数据
      this.ContentData()
    
    },
    methods: {
      TopData() {
		TopDataApi({
            limit: 1,
          }).then(res => {
			if (res.code == 200) {
				this.topList = res.playlists[0]
			} else {
				this.$message({
					message: '精品数据请求数据失败！',
					type: 'error'
				})
			}
		})
      },
      ContentData() {
		ContentDataApi({
            limit: 12,
            offset: (this.page - 1)* 12,
            cat: this.tag
          }).then(res => {
			if (res.code == 200) {
				this.total = res.total
				this.list = res.playlists;
				// 播放次数
				for (let i = 0; i < this.list.length; i++) {
				    if (this.list[i].playCount > 10000) {
				        this.list[i].playCount =parseInt(this.list[i].playCount / 10000) + '万'
				    }
				}
			} else {
				this.$message({
					message: '数据请求数据失败！',
					type: 'error'
				})
			}
		})
      },
      Change(val) {
        //console.log(val);
        this.page = val;
        this.ContentData()
      },
      toPlaylist(id) {
          this.$router.push('/playlist?id=' + id);
      }
    },
  }
</script>

<style>
  .item-content:hover {
    background-color: rgb(237, 237, 237);
  }
.top-card {
  height: 200px;
  display: flex;
  margin: 20px;
  border-radius: 10px;
}
.bgc img {
  height: 200px;
  position: absolute;
  z-index: -1;
  display: flex;
  width: 1260px;
  margin-left: 10px;
  /* 设置背景图片模糊 */
  filter: blur(15px);
  transform: scale(1);
}
.icon-wrap {
  padding: 20px;
}
.icon-wrap img {
  height: 150px;
  border-radius: 10px;
}
.tag {
  border: 1px solid rgb(209, 188, 3);
  margin-top: 20px;
  font-size: 18px;
  border-radius: 10px;
  text-align: center;
  color: rgb(209, 188, 3);
  width: 100px;
  padding: 5px;
}
.title {
  border: none;
  margin-left: 0;
  padding-top: 5px;
  color: rgb(255, 255, 255);
}
.info {
  width: 1050px;
  font-size: 12px;
  color: #e3e3e3;
  word-break:break-all;
	display:-webkit-box;
	-webkit-line-clamp:6;
	-webkit-box-orient:vertical;
	overflow:hidden;
}
/* tab标题 */
.tab-bar {
  float: right;
}
.item1 {
  margin-right: 40px;
  font-size: 13px;
  cursor:pointer
}
.itemll {
  padding-right: 30px;
  font-size: 13px;
  cursor:pointer
}
/* 内容列表 */
.items-content {
  display: flex;
  /* 图片对齐 */
  justify-content: space-between;
  flex-wrap: wrap;
  
}
.item-content {
  position: relative;
  cursor:pointer;
}
.img-content img{
  width: 150px;
  border-radius: 15%;
  padding: 10px 20px;
}
.content-name {
  width: 150px;
  font-size: 14px;
  float: left;
  padding-left: 20px;
}
.play-num {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  font-size: 12px;
  padding: 5px;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: translateY(-100%);;
  transition: .5s; 
  margin-left: 20px;
  margin-top: 36px;
  display: none;
}
.img-content:hover .play-num{
      display: block;
}
.page {
  margin: 30px 0 0 400px;
}
.active {
  color: rgb(209, 52, 52);
}
</style>
