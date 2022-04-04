<!--发现音乐-->
<template>
  <div>
    <div class="mv">
      <h3 class="title1">推荐MV</h3>
      <div class="items3">
        <div class="item-mv" v-for="(item,index) in mvs" :key="index" @click="toMV(item.id)">
          <div class="img-wrap3">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-bofang1 tubiao"></span>
            <div class="num-wrap">
              <div class="iconfont icon-bofang"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="mv-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="mv-singer">{{ item.artistName }}</div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>
<script >
import {MVApi} from '../../network/api.js'
export default {
  data() {
    return {
      mvs: [],
    }
  },
  created() {
    // 最新mv
	MVApi().then(res => {
		if (res.code == 200) {
			this.mvs = res.result
		} else {
			this.$message({
				message: 'MV请求数据失败！',
				type: 'error'
			})
		}
	})
  },
  methods: {
    toMV(id) {
            this.$router.push('/mv?id=' + id);
    }
  }
}
</script>

<style>
	/* MV */
	.items3 {
	  display: flex;
	  /* 图片对齐 */
	  justify-content: space-between;
	  flex-wrap: wrap;
	}
	.item-mv {
	  cursor:pointer;
	}
	.item-mv:hover {
	  background-color: rgb(237, 237, 237);
	}
	.img-wrap3 img {
	  width: 200px;
	  height: 120px;
	  border-radius: 34px;
	  padding: 10px 20px;
	}
	.img-wrap3 span {
	  position: absolute;
	  color: rgb(255, 255, 255);
	  font-size: 40px;
	  margin-top: -90px;
	  margin-left: 100px;
	  display: none;
	}
	.img-wrap3:hover .tubiao {
	  display: block;
	}
	.num-wrap {
	  position: absolute;
	  margin: -124px 0 0 165px;
	  color: rgb(252, 252, 252);
	  font-size: 13px;
	  display: flex;
	}
	.mv-name {
	  width: 200px;
	  font-size: 14px;
	  padding-left: 20px;
	  margin-top: -5px;
	}
	.mv-singer {
	  margin-top: 5px;
	  font-size: 10px;
	  color: rgb(133, 131, 128);
	  padding-left: 20px;
	}
</style>
