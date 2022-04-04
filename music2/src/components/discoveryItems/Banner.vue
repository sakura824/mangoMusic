<template>
	<div>
		<!-- 轮播图 -->
		<el-carousel :interval="2000" type="card">
			<el-carousel-item v-for="(item, index) in banners" :key="index">
				<img :src="item.imageUrl" class="img-banner" />
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	import {BannerApi} from '../../network/api.js'
	export default {
		data() {
			return {
				banners: [],
			}
		},
		created() {
			//轮播图
			BannerApi().then(res => {
				if (res.code == 200) {
					this.banners = res.banners
				} else {
					this.$message({
						message: '轮播图请求数据失败！',
						type: 'error'
					})
				}
			})
		}
	}
</script>

<style>
	.img-banner {
		width: 100%;
		height: 100%;
	}
</style>
