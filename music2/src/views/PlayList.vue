<!--歌单详情页-->
<template>
	<div class="playlist-container">
		<div class="playlist-top">
			<div class="playlist-img">
				<!-- 封面 -->
				<img :src="playlist.coverImgUrl" alt="" />
			</div>
			<div class="playlist-info">
				<!-- 名字 -->
				<div class="playlist-title">{{ playlist.name }}</div>
				<div class="playlist-author" v-if="playlist.creator">
					<!-- 头像 -->
					<img :src="playlist.creator.avatarUrl" alt="" />
					<span class="playlist-name">{{ playlist.creator.nickname }}</span>
					<span class="playlist-time">{{ playlist.createTime }} 创建</span>
				</div>
				<div class="playlist-tag">
					<span class="playlist-titles">标签:</span>
					<!-- 分类标签 -->
					<ul>
						<li v-for="(item, index) in playlist.tags" :key="index">
							{{item}}
						</li>
					</ul>
				</div>
				<div class="playlist-desc">
					<span class="playlist-titless">简介:</span>
					<!-- 简介 -->
					<span class="playlist-items">
						{{ playlist.description }}
					</span>
				</div>
			</div>
		</div>
		<el-tabs v-model="activeIndex">
			<el-tab-pane label="歌曲列表" name="1">
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
						<tr v-for="(item, index) in tracks" :key="index" class="el-table__row"
							@click="util.playMusic(item.id)">
							<td>{{index + 1}}</td>
							<td>
								<img class="imgsss" :src="item.al.picUrl" alt="">
							</td>
							<td>
								<div class="songss-wrap">
									<div class="namess-wrap">
										<!-- 歌名 -->
										<span>{{item.name}}</span>
										<!-- mv的图标 -->
										<span class="iconfont icon-MV" v-if="item.mv != 0"></span>
									</div>
									<!-- 二级标题 -->
									<!-- <span v-if="item.alias.length != 0" class="twoname">{{ item.alias[0] }}</span> -->
								</div>
							</td>
							<td>{{item.ar[0].name}}</td>
							<td>{{item.al.name}}</td>
							<td>{{item.dt}}</td>
						</tr>
					</tbody>
				</table>
			</el-tab-pane>
			<el-tab-pane label="评论" name="2">
				<!-- 发送评论 -->
				<div class="ipt">
					<div class="ipt-name">{{myName}}:</div>
					<textarea class="ipt-content" maxlength="140" v-model="textContent" @input="textChange"></textarea>
					<div class="ipt-num">{{textLength}}/140</div>
					<input type="button" class="ipt-pl" value="评论" @click="onIpt" />
				</div>
				<!-- 精彩评论 -->
				<div class="playlist-comment">
					<p>
						精彩评论({{ hotcount }})
					</p>
					<div class="playlist-comments">
						<!-- 评论 -->
						<div v-for="(item, index) in hotcomment" :key="index" class="itemsss">
							<div class="playlist-icon" v-if="item.user">
								<!-- 头像 -->
								<img :src="item.user.avatarUrl" alt="" />
							</div>
							<div class="playlist-content">
								<div class="contentsss">
									<!-- 昵称 -->
									<span class="cname">{{ item.user.nickname }}:</span>
									<span class="comment">{{ item.content }}</span>
								</div>
								<!-- 评论的回复 -->
								<div class="re-content" v-if="item.beReplied.length != 0">
									<!-- v-if="item.beReplied.length != 0" -->
									<span class="cname">{{ item.beReplied[0].user.nickname }}：</span>
									<span class="comment">{{ item.beReplied[0].content }}</span>
								</div>
								<div class="cdate">2020-02-12 17:26:11</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 最新评论 -->
				<div class="comment-wrap">
					<p>
						最新评论( {{total + myContentAll.length}} )
					</p>
					<!-- 我的评论 -->
					<div class="comments-wrap" v-show="isMyShow">
						<div class="itemsss" v-for="(item,index) in myContentAll" :key="index">
							<div class="playlist-icon">
								<img src="../assets/4.jpg" alt="" />
							</div>
							<div class="playlist-content">
								<div class="contentsss">
									<span class="cname">{{item.name}}：</span>
									<span class="comment">{{ item.content }}</span>
								</div>
								<div class="cdate">{{ util.dateFormat(item.createdAt) }}</div>
							</div>
						</div>
					</div>
					<!-- 最新评论 -->
					<div class="comments-wrap">
						<div class="itemsss" v-for="(item,index) in comments" :key="index">
							<div class="playlist-icon" v-if="item.user">
								<img :src="item.user.avatarUrl" alt="" />
							</div>
							<div class="playlist-content">
								<div class="contentsss">
		 						<span class="cname">{{item.user.nickname}}：</span>
									<span class="comment">{{ item.content }}</span>
								</div>
								<div class="re-content" v-if="item.beReplied.length!=0">
									<span class="cname">{{ item.beReplied[0].user.nickname }}：</span>
									<span class="comment">{{ item.beReplied[0].content }}</span>
								</div>
								<div class="cdate">{{item.timeStr}}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 分页器 -->
				<el-pagination @current-change="Change" background layout="prev, pager, next" :total="total"
					:current-page="page"></el-pagination>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {
		PlayListDetailApi,
		HotCommentApi,
		PlayListCommentApi,
		MyCommentApi,
		SendCommentApi,
	} from '../network/api.js'
	export default {
		data() {
			return {
				activeIndex: "1",
				//总条数
				total: 0,
				page: 1,
				//歌单详情
				playlist: [],
				//歌曲
				tracks: [],
				//热门评论
				hotcomment: [],
				//热门评论个数
				hotcount: 0,
				//最新评论
				comments: [],
				//发送评论内容
				textContent: '',
				//发送评论字数
				textLength: 0,
				//发送评论数据
				myContent: {},
				//查询到发送的所有数据
				myContentAll: [],
				//发送评论人名
				myName: '未登录',
				//是否显示我的评论    因为我的评论和获取到的其他评论不是一个接口所以查看不是第一页的评论时需要隐藏我的评论
				isMyShow: true
			}
		},
		created() {
			//加载登录名
			this.myName = this.$store.state.userName
			//歌单详情
			PlayListDetailApi({
				id: this.$route.query.id
			}).then(res => {
				if (res.code == 200) {
					this.playlist = res.playlist;
					this.tracks = res.playlist.tracks
					//console.log(this.tracks);
					for (let i = 0; i < this.tracks.length; i++) {
						//处理总秒数
						let dt = this.tracks[i].dt;
						let m = parseInt(dt / 1000 / 60);
						if (m < 10) {
							m = '0' + m;
						}
						let s = parseInt((dt / 1000) % 60);
						if (s < 10) {
							s = '0' + s;
						}
						this.tracks[i].dt = `${m}:${s}`;
					}
				} else {
					this.$message({
						message: '最新音乐请求数据失败！',
						type: 'error'
					})
				}
			})
			//热门评论
			HotCommentApi({
					id: this.$route.query.id,
					type: 2
				}).then(res => {
					this.hotcomment = res.hotComments;
					this.hotcount = res.total;
				})
			//歌单评论
			this.getComment()
			//获取我的评论
			this.myComment()
		},
		methods: {
			//获取评论
			getComment() {
				PlayListCommentApi({
						id: this.$route.query.id,
						limit: 10,
						offset: (this.page - 1) * 10
					}).then(res => {
						// 总个数
						this.total = res.total
						// 评论数据
						this.comments = res.comments
					})
			},
			//发送评论接口
			discuss() {
				//发送评论
				SendCommentApi({
					content: this.textContent,
					name: this.myName,
					type: 1
				}).then(res => {
					if (res.meta.status == 201) {
						this.myContent = res.data.createComment
						this.$message({
							message: '评论成功！',
							type: 'success'
						})
					} else {
						this.$message({
							message: '评论失败！',
							type: 'error'
						})
					}
				})
			},
			//获取我的评论
			myComment() {
				//获取我的评论
				MyCommentApi({
					type: 1	//0是Mv   1是歌单
				}).then(res => {
					if(res.data.findType == null) {
						this.$message({
							message: '暂无我的评论',
							type: 'warning'
						})
					} else {
						this.myContentAll = (res.data.findType).reverse()
					}
					
				})
			},
			//评论字数长度改变
			textChange() {
				this.textLength = this.textContent.length
			},
			//点击评论
			onIpt() {
				const token = this.$store.state.token
				if (!token) {
					alert("请登录")
				} else {
					this.discuss()
					this.myComment()
				}
			},
			Change(val) {
				this.getComment();
				//判断是否是第一页 不是第一页就隐藏我的评论
				this.page = val;
				if (this.page != 1) {
					this.isMyShow = false
				} else {
					this.isMyShow = true
				}
			}
		},
	}
</script>

<style>
	.playlist-container {
		margin: 30px 0 0 20px;
	}

	.playlist-img img {
		width: 150px;
		border-radius: 15px;
	}

	.playlist-info {
		margin-left: 20px;
	}

	.playlist-title {
		margin: -160px 0 0 180px;
		font-size: 18px;
	}

	.playlist-author img {
		margin: 30px 0 0 180px;
		width: 50px;
		border-radius: 50%;
	}

	.playlist-name {
		display: block;
		margin: -50px 0 0 240px;
	}

	.playlist-time {
		display: block;
		margin: 10px 0 0 235px;
		font-size: 13px;
	}

	.playlist-titles {
		margin: -170px 0 0 180px;
		font-size: 15px;
	}

	.playlist-tag {
		margin-top: 30px;
	}

	.playlist-tag ul {
		list-style-type: none;
		display: flex;
		margin-left: 180px;
	}

	.playlist-tag li {
		margin: -36px 0 0 5px;
		color: rgb(65, 62, 62);
	}

	.playlist-desc {
		margin: -20px 0 0 180px;
	}

	.playlist-items {
		font-size: 13px;
		color: rgb(78, 75, 75);
	}

	.imgsss {
		width: 50px;
		border-radius: 10%;
	}

	/* 评论 */
	/* 发送评论 */
	.ipt-name {
		font-size: 14px;
		margin-left: 35px;
	}

	.ipt-content {
		resize: none;
		outline: none;
		margin-left: 70px;
		margin-top: 15px;
		width: 800px;
		height: 100px;
	}

	.ipt-num {
		font-size: 10px;
		color: #666666;
		position: absolute;
		margin-left: 820px;
		margin-top: -25px;
	}

	.ipt-pl {
		border: 0;
		line-height: 30px;
		width: 60px;
		border-radius: 15px;
		background-color: #5d6f96;
		color: #FFFFFF;
		margin-left: 810px;
		margin-top: 10px;
		cursor: pointer;
	}

	/* 精彩评论 */
	.playlist-icon img {
		width: 50px;
		border-radius: 50%;
		background-color: rgb(247, 138, 210);
	}

	.contentsss {
		font-size: 13px;
		margin: -50px 0 0 60px;
	}

	.cname {
		color: rgb(80, 91, 245);
	}

	.re-content {
		font-size: 12px;
		margin: 10px 0 0 60px;
		background-color: rgb(231, 227, 227);
		line-height: 35px;
		border-radius: 10px;
		padding-left: 5px;
	}

	.cdate {
		font-size: 10px;
		margin: 5px 0 20px 60px;
		padding-bottom: 20px;
		border-bottom: 1px solid rgb(241, 228, 228);
		color: rgb(145, 142, 142);
	}

	/* 最新评论 */
</style>
