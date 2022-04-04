<!--最新音乐-->
<template>
	<div>
		<div class="news">
			<h3 class="title1">
				最新音乐
			</h3>
			<div class="items">
				<div class="item2" v-for="(item, index) in songs" :key="index">
					<div class="img-wrap2">
						<!-- 封面 -->
						<img :src="item.picUrl" alt="" />
						<span @click="util.playMusic(item.id)" class="iconfont icon-bofang1 zuixin"></span>
					</div>
					<div class="song-wrap">
						<!-- 歌名 -->
						<div class="song-name">{{ item.name }}</div>
						<!-- 歌手名 -->
						<div class="singer">{{ item.song.artists[0].name }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {NewSongApi} from '../../network/api.js'
	export default {
		data() {
			return {
				songs: []
			}
		},
		created() {
			NewSongApi().then(res => {
				if (res.code == 200) {
					this.songs = res.result
				} else {
					this.$message({
						message: '最新音乐请求数据失败！',
						type: 'error'
					})
				}
			})
		}
	}
</script>

<style>
	/* 最新音乐 */
	.item2 {
		width: 45%;
		margin-left: 50px;
		position: relative;
		display: flex;
		cursor: pointer;
	}

	.item2:hover {
		background-color: rgb(224, 218, 218);
	}

	.img-wrap2 img {
		width: 100px;
		border-radius: 15%;
	}

	.img-wrap2 span {
		position: absolute;
		color: rgb(236, 170, 170);
		font-size: 35px;
		margin-top: -70px;
		margin-left: 35px;
		display: none;
	}

	.img-wrap2:hover .zuixin {
		display: block;
	}

	.song-wrap {
		position: absolute;
		margin-left: 120px;
	}

	.song-name {
		font-size: 15px;
		margin-top: 10px;
		color: rgb(107, 94, 94);
	}

	.singer {
		margin-top: 20px;
		font-size: 10px;
		color: rgb(133, 131, 128);
	}
</style>
