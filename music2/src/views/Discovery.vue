<!--发现音乐-->
<template>
  <div>
    <!-- 轮播图 -->
	<Banner></Banner>
    <!-- 推荐歌单 -->
    <Recommend></Recommend>
    <!-- 最新音乐 -->
    <News></News>
    <!-- 推荐MV -->
    <MV></MV>
  </div>
</template>
<script >
import Banner from '../components/discoveryItems/Banner.vue'
import Recommend from '../components/discoveryItems/Recommend.vue'
import News from '../components/discoveryItems/News.vue'
import MV from '../components/discoveryItems/MvItems.vue'
export default {
	components: {
		Banner,
		Recommend,
		News,
		MV
	},
  data() {
    return {
    }
  }
}
</script>

<style>
</style>
