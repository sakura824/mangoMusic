<!--推荐歌单-->
<template>
  <div>
    <div class="recommend">
      <h3 class="title1">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc">{{ item.copywriter }} : {{item.playCount}}</div>
			<!-- <div class="count">{{item.playCount}}</div> -->
            <img :src="item.picUrl" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import {RecommendedApi} from '../../network/api.js'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    // 推荐歌单
	  RecommendedApi({
		  limit:12
	  }).then(res => {
		  if (res.code == 200) {
			this.list = res.result
			for(let i=0;i<this.list.length;i++) {
				if(this.list[i].playCount > 10000) {
					this.list[i].playCount = parseInt(this.list[i].playCount/10000) + '万'
				}
			}
		  } else {
		  	this.$message({
		  		message: '推荐歌单请求数据失败！',
		  		type: 'error'
		  	})
		  }
	  })
  },
  methods: {
    toPlaylist(id) {
          this.$router.push('/playlist?id=' + id);
    }
  }
}
</script>

<style>
	/* 推荐歌单 */
	.items {
	  display: flex;
	  /* 图片对齐 */
	  flex-wrap: wrap;
	}
	.item {
	  position: relative;
	  cursor:pointer;
	  margin-left: 20px;
	}
	.title1 {
	  margin-left: 20px;
	  padding-bottom: 5px;
	  border-bottom: 3px solid rgb(236, 65, 65);
	}
	.img-wrap img{
	  width: 150px;
	  border-radius: 15%;
	  padding: 10px 20px;
	}
	.name {
	  width: 150px;
	  font-size: 14px;
	  float: left;
	  padding-left: 20px;
	}
	.desc {
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 150px;
	  background-color: rgba(0, 0, 0, .5);
	  color: #fff;
	  font-size: 12px;
	  padding: 5px;
	  box-sizing: border-box;
	  border-top-left-radius: 16px;
	  border-top-right-radius: 16px;
	  transform: translateY(-100%);;
	  transition: .5s; 
	  margin: 38px 0 0 20px;
	  display: none;
	}
	.img-wrap:hover .desc{
	      display: block;
	}
</style>
