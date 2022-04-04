<!--搜索结果-->
<template>
<div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title11">{{$route.query.name}}</h2>
      <span class="sub-title">找到 {{count}} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex" @tab-click="changePager">
		<!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in songsList"
              :key="index"
              class="el-table-column"
              @dblclick="util.playMusic(item.id)"
            >
            
              <td>{{index + 1}}</td>
              <td>
                <div class="songss-wrap">
                  <div class="namess-wrap">
                    <!-- 歌名 -->
                    <span>{{ item.name }}</span>
                    <!-- mv的图标 -->
                    <span v-if="item.mvid != 0" class="iconfont icon-MV"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length != 0" class="twoname">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
	  <!-- 歌单 -->
      <el-tab-pane label="歌单" name="lists">
        <div class="result-items">
          <div
            v-for="(item, index) in playLists"
            :key="index"
            class="result-itemss"
            @click="toPlaylist(item.id)"
          >
          
            <div class="imgss-wrap">
              <div class="numss-wrap">
                播放量:{{ item.playCount }}
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-bofang result-bofang"></span>
            </div>
            <p class="namess">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
	  <!-- MV -->
      <el-tab-pane label="MV" name="mv">
        <div class="result-items">
          <div v-for="(item, index) in mv" :key="index" class="item-mv1" @click="toMV(item.id)">
            <div class="mvimg-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-bofang1 mvbofang1"></span>
              <div class="mvnum-wrap">
                <div class="iconfont icon-bofang mvbofang"></div>
                <!-- 播放次数 -->
                <div class="mvnum">{{ item.playCount }}</div>
              </div>
              <!-- 持续时间 -->
              <div class="mvtime">{{ item.duration }}</div>
            </div>
            <div class="mvinfo-wrap">
              <!-- mv名 -->
              <div class="mvname">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="mvsinger">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
	<div class="page1">
	   <el-pagination
	    background
	    @current-change="Change"
	    layout="prev, pager, next"
	    :current-page="page"
	    :total="count">
	  </el-pagination>
	</div>  
  </div>
</template>

<script>
import {SearchApi} from '../network/api.js'
export default {
    data() {
        return {
            activeIndex: 'songs',
            //歌曲
            songsList: [],
            //歌单
            playLists: [],
            //mv
            mv: [],
            count:0,
			page:1,
			//搜索类型
			type: 1,	//默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			//一页几个数据
			limit: 10,
			//页数
			offset: 20,
            
        }
    },
    watch: {
        activeIndex() {
            switch (this.activeIndex) {
                case 'songs':
                    this.type = 1
                    this.limit = 10
					this.offset = (this.page - 1)* 10
                    break
                case 'lists':
                    this.type = 1000
                    this.limit = 16
					this.offset = (this.page - 1)* 16
                    break
                case 'mv':
                    this.type = 1004
                    this.limit = 10
					this.offset = (this.page - 1)* 10
                    break
                default:
                    break;
            }
            this.getSearch()
        }
    },
    created() {
        this.getSearch()
    },
    methods: {
		//默认先显示歌曲数据
		//获取歌曲，歌单，mv
		getSearch() {
			SearchApi({
			    keywords: this.$route.query.name,
			    type: this.type,  
			    limit: this.limit,
				offset: this.offset
			    }).then(res => {
				if (res.code == 200) {
					if (this.type == 1) {
					    this.songsList = res.result.songs;
					    this.count = res.result.songCount
					    for (let i = 0; i < this.songsList.length; i++) {
					        //把总秒数获取到
					        let duration = this.songsList[i].duration;
					        let m = parseInt(duration / 1000 / 60);
					        if (m < 10) {
					        m = '0' + m;
					        }
					        let s = parseInt((duration / 1000) % 60);
					        if (s < 10) {
					        s = '0' + s;
					        }
					        this.songsList[i].duration = `${m}:${s}`;
					    }
					}else if (this.type == 1000) {
					    this.playLists = res.result.playlists
					    // 总数
					    this.count = res.result.playlistCount
					    // 处理 播放次数
					    for (let i = 0; i < this.playLists.length; i++) {
					        if (this.playLists[i].playCount > 100000) {
					            this.playLists[i].playCount =
					            parseInt(this.playLists[i].playCount / 10000) + '万'
					        }
					    }
					}else {
					    // 保存mv数据
					    this.mv = res.result.mvs
					    // 总数
					    this.count = res.result.mvCount
					    // 处理数据
					    for (let i = 0; i < this.mv.length; i++) {
					        // 时间
					        let min = parseInt(this.mv[i].duration / 1000 / 60)
					        let sec = parseInt((this.mv[i].duration / 1000) % 60)
					        if (min < 10) {
					            min = '0' + min
					        }
					        if (sec < 10) {
					            sec = '0' + sec
					        }
					        this.mv[i].duration = min + ':' + sec
								
					        // 播放次数
					        if (this.mv[i].playCount > 10000) {
					            this.mv[i].playCount =parseInt(this.mv[i].playCount / 10000) + '万'
					        }
					    }
					}  
				} else {
					this.$message({
						message: '搜索失败！',
						type: 'error'
					})
				}
			})
		},
        //跳转到歌单详情页 PlayList.vue
        toPlaylist(id) {
          this.$router.push('/playlist?id=' + id);
        },
        toMV(id) {
          this.$router.push('/mv?id=' + id);
        },
		Change(val) {
		  this.page = val;
		  this.offset = (this.page - 1)* this.limit
		  this.getSearch()
		},
		//  点击tabs的时候重置分页器从1开始 相当于刷新一下分页器,
		//  只是改变分页器数值不会点击加载数据所以需要刷新一下分页器
		changePager() {
			this.page = 1
		}
    },
}
</script>

<style>
.title11 {
    margin-left: 20px;
}
.sub-title {
    margin-left:20px;
    color: rgb(90, 87, 87);
    font-size: 13px;
}
/* 歌单 */
.result-items {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
	margin: 30px;
}
.imgss-wrap img {
    width: 150px;
	height: 150px;
    border-radius: 15%;
}
.numss-wrap {  
   position: absolute;
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
   margin-top: 26px;
   display: none;
}
.imgss-wrap:hover .numss-wrap {
    display: block;
}
.imgss-wrap span {
    font-size: 40px;
    position: absolute;
    color: rgb(238, 78, 78);
    margin-top: -50px;
    margin-left: 110px;
    display: none;
}
.imgss-wrap:hover .result-bofang {
    display: block;
}
.namess {
    margin-top: -2px;
    margin-left: 5px;
    font-size: 15px;
    width: 150px;
}
.twoname {
    display: block;
    color: rgb(151, 146, 146);
    font-size: 12px;
    margin-top: 5px;
}
/* MV */
.mvimg-wrap img{
    width: 200px;
    height: 100px;
    border-radius: 10px;
}
.mvimg-wrap span {
    font-size: 30px;
    position: absolute;
    margin-top: -65px;
    margin-left: 85px;
    color: rgb(255, 255, 255);
    display: none;
}
.mvimg-wrap:hover .mvbofang1 {
    display: block;
}
.mvnum-wrap {
    display: flex;
	font-size: 12px;
    margin-top: -100px;
    margin-left: 140px;
    color: rgb(255, 255, 255);
}
.mvtime {
    margin-top: 60px;
    margin-left: 150px;
    color: rgb(255, 255, 255);
	font-size: 12px;
	
}
.mvinfo-wrap {
    margin-top: 10px;
}
.mvname {
    font-size: 15px;
    width: 200px;
}
.mvsinger {
    font-size: 12px;
    padding-top: 2px;
    color: rgb(122, 117, 117);
}
.el-table td,.el-table tr {
  padding: 12px 0;
}
.el-table th {
  text-align: left;
}
.el-table-column:hover {
  background-color: rgb(237, 237, 237);
}
.page1 {
	text-align: center;
	margin-top: 20px;
}
.item-mv1 {
	position: relative;
	cursor:pointer;
	margin: 20px;
}
.item-mv1:hover {
	background-color: rgb(237, 237, 237);
}
</style>