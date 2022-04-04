<!--最新mv-->
<template>
  <div class="mvs-container">
    <div class="filter-wrap">
       <!-- 分类切换 地区 -->
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '全部' }"
              @click="area = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '内地' }"
              @click="area = '内地'"
            >
              内地
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '港台' }"
              @click="area = '港台'"
            >
              港台
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '欧美' }"
              @click="area = '欧美'"
            >
              欧美
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '日本' }"
              @click="area = '日本'"
            >
              日本
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: area == '韩国' }"
              @click="area = '韩国'"
            >
              韩国
            </span>
          </li>
        </ul>
      </div>
       <!-- 分类切换 类型 -->
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: type == '全部' }"
              @click="type = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: type == '官方版' }"
              @click="type = '官方版'"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: type == '原声' }"
              @click="type = '原声'"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: type == '现场版' }"
              @click="type = '现场版'"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: type == '网易出品' }"
              @click="type = '网易出品'"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
       <!-- 分类切换 排序 -->
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: order == '上升最快' }"
              @click="order = '上升最快'"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: order == '最热' }"
              @click="order = '最热'"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="titlea"
              :class="{ active1: order == '最新' }"
              @click="order = '最新'"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- MV -->
    <div class="mvs">
      <div class="mvs-items">
        <div class="item" v-for="(item, index) in Lists" :key="index" @click="toMV(item.id)">
          <div class="mvs-img">
            <img :src="item.cover" alt="" />
            <div class="mvs-num">
              <div class="iconfont icon-bofang play-icon"></div>
              <div class="num1">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="mvs-info">
            <div class="mvs-name">{{ item.name }}</div>
            <div class="mvs-singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="mvsChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="8"
        :limit="limit"
        class="pager"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {NewMVApi} from '../network/api.js'
export default {
  data() {
    return {
      // 总条数
        total: 20,
        // 页码
        page: 1,
        // 页容量
        limit: 15,
        // 地区
        area: '全部',
        // 类型
        type: '全部',
        // 排序
        order: '上升最快',
        // 查询的结果
        Lists: []
    }
  },
  watch: {
    area() {
      this.page = 1;
      this.palyMVs();
    },
    type() {
      this.page = 1;
      this.palyMVs();
    },
    order() {
      this.page = 1;
      this.palyMVs();
    }
  },
  created() {
    this.palyMVs()
  },
  methods: {
    palyMVs() {
		NewMVApi({
            area: this.area,
            type: this.type,
            order: this.order,
            // 数量
            limit: this.limit,
            // 偏移值 分页 (页码-1)*数量
            offset: (this.page - 1) * this.limit
          }).then(res => {
			if (res.code == 200) {
				this.Lists = res.data
				// 处理次数
				for (let i = 0; i < this.Lists.length; i++) {
				  if (this.Lists[i].playCount > 100000) {
				    this.Lists[i].playCount = parseInt(this.Lists[i].playCount/10000) + '万'
				  }
				}
				
				//接口有问题 先判断接口是否有count 不然分页器不显示页数
				if (res.count) {
				  this.total = res.count;
				}
			} else {
				this.$message({
					message: '最新MV请求数据失败！',
					type: 'error'
				})
			}
		})
    },
    mvsChange(val) {
      this.page = val;
      this.palyMVs();
    },
    toMV(id) {
    this.$router.push('/mv?id=' + id);
    }
  },
}
</script>

<style>
.filter-wrap {
  margin: 40px 0 0 100px;
}
.tabs-wrap {
  list-style-type: none;
  display: flex;
}
.filter-wrap li {
  cursor: pointer;
  margin-top: -34px;
  font-size: 12px;
  padding-left: 70px;
  color: rgb(143, 124, 124);
}
.section-type,.type-type,.order-type {
  font-weight: bold;
  font-size: 12px;
}
/* MV */
.mvs-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mvs-img img {
  width: 200px;
  height: 100px;
  border-radius: 12%;
  padding: 10px 20px;
}
.play-icon {
  position: absolute;
  color: rgb(255, 255, 255);
  margin: -112px 0 0 160px;
}
.num1 {
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 12px;
  margin: -112px 0 0 175px;
}
.mvs-name {
  width: 200px;
  font-size: 14px;
  margin: -5px 0 0 20px;
}
.mvs-singer {
  margin: 5px 0;
  font-size: 10px;
  color: rgb(133, 131, 128);
  padding-left: 20px;
}
.active1 {
  display: block;
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 20px;
  background-color: rgb(255, 235, 235);
  color: rgb(255, 0, 0);
}
.pager {
  margin: 10px 0 0 400px;
}
.item:hover {
  background-color: rgb(237, 237, 237);
}
</style>
