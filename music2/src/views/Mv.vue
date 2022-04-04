<!--mv详情页-->
<template>
	<div class="mv-container">
		<div class="mv-wrap">
			<h3>mv详情</h3>
			<!-- mv -->
			<div class="video-wrap">
				<video controls :src="url"></video>
			</div>
			<!-- mv信息 -->
			<div class="">
				<div class="topall">
					<div class="mv-header">
						<!-- 头像 -->
						<img :src="icon" alt="" />
					</div>
					<!-- 歌手名 -->
					<span>{{ mvInfo.artistName }}</span>
				</div>
				<div class="bottomall">
					<!-- 标题 -->
					<h2>{{ mvInfo.name }}</h2>
					<span class="">发布：2014-11-04</span>
					<!-- 播放次数 -->
					<span class="">播放：{{parseInt((mvInfo.playCount) / 10000) }}万次</span>
					<!-- 描述 -->
					<p class="">
						{{ mvInfo.desc }}
					</p>
				</div>
			</div>
			<!-- 全部评论 -->
			<div class="speakall">
				<!-- 发送评论 -->
				<div class="ipt1">
					<div class="ipt-name1">{{myName}}:</div>
					<textarea class="ipt-content1" maxlength="140" v-model="textContent" @input="textChange"></textarea>
					<div class="ipt-num1">{{textLength}}/140</div>
					<input type="button" class="ipt-pl1" value="评论" @click="onIpt" />
				</div>
				<!-- 精彩评论 -->
				<div class="playlist-comment">
					<p>
						精彩评论({{ hotcomment.length }})
					</p>
					<div class="playlist-comments">
						<!-- 评论 -->
						<div v-for="(item, index) in hotcomment" :key="index" class="itemsss">
							<div class="playlist-icon">
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
					<div class="comments-wrap">
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
							<div class="playlist-icon">
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
								<div class="cdate">2020-02-12 17:26:11</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 分页器 -->
			<el-pagination @current-change="Change" background layout="prev, pager, next" :total="total"
				:current-page="page" :page-size="5" :limit="limit">
			</el-pagination>
		</div>
		<div class="mv-recommend">
			<h3 class="h3">相关推荐</h3>
			<div class="mvs">
				<div class="mvs-items">
					<div class="item rightitems" v-for="(item, index) in simiMvs" :key="index" @click="toMV(item.id)">
						<div class="mvs-img">
							<img :src="item.cover" alt="" />
							<div class="mvs-num">
								<div class="iconfont icon-bofang play-icon"></div>
								<div class="num1">{{ item.playCount }}</div>
								<div class="num1 num11">{{ item.duration }}</div>
							</div>
						</div>
						<div class="mvs-info rightinfo">
							<div class="mvs-name">{{ item.name }}</div>
							<div class="mvs-singer">{{ item.artistName }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		MVUrlApi,
		SimiMVApi,
		MVDetailApi,
		SingerApi,
		MVCommentApi,
		MyCommentApi,
		SendCommentApi
	} from '../network/api.js'
	export default {
		data() {
			return {
				url: "",
				simiMvs: [],
				total: 20,
				page: 1,
				limit: 10,
				mvInfo: {},
				icon: '',
				hotcomment: [],
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
				myName: '未登录'

			}
		},
		created() {
			//加载登录名
			this.myName = this.$store.state.userName
			//获取我的评论
			this.myComment()
			//mv播放地址
			MVUrlApi({
				id: this.$route.query.id
			}).then(res => {
				if (res.code == 200) {
					this.url = res.data.url;
				} else {
					this.$message({
						message: 'mv地址请求失败！',
						type: 'error'
					})
				}
			})
			//相关mv
			SimiMVApi({
				mvid: this.$route.query.id
			}).then(res => {
				if (res.code == 200) {
					// 保存相关MV
					this.simiMvs = res.mvs;
					//播放时间和次数
					for (let i = 0; i < this.simiMvs.length; i++) {
						//播放时间
						let duration = this.simiMvs[i].duration;
						let m = parseInt(duration / 1000 / 60);
						if (m < 10) {
							m = '0' + m;
						}
						let s = parseInt((duration / 1000) % 60);
						if (s < 10) {
							s = '0' + s;
						}
						this.simiMvs[i].duration = `${m}:${s}`;
						//播放次数
						if (this.simiMvs[i].playCount > 100000) {
							this.simiMvs[i].playCount = parseInt(this.simiMvs[i].playCount / 10000) + '万';
						}
					}
				} else {
					this.$message({
						message: '获取相关MV失败！',
						type: 'error'
					})
				}
			})

			// 获取 mv的信息
			MVDetailApi({
				mvid: this.$route.query.id
			}).then(res => {
				if (res.code == 200) {
					this.mvInfo = res.data;
					for (let i = 0; i < this.mvInfo.length; i++) {
						//播放次数
						if (this.mvInfo[i].playCount > 100000) {
							this.mvInfo[i].playCount = parseInt(this.mvInfo[i].playCount / 10000) + '万';
						}
					}
					SingerApi({
						id: this.mvInfo.artists[0].id
					}).then(res => {
						if (res.code == 200) {
							// 歌手的封面信息
							this.icon = res.artist.picUrl
						} else {
							this.$message({
								message: '歌手信息获取失败！',
								type: 'error'
							})
						}
					})
				} else {
					this.$message({
						message: 'mv地址请求失败！',
						type: 'error'
					})
				}
			})

			//评论
			MVCommentApi({
				id: this.$route.query.id,
				limit: 10,
				offset: 0
			}).then(res => {
				if (res.code == 200) {
					this.hotcomment = res.hotComments;
					this.comments = res.comments;
					this.total = res.total
				} else {
					this.$message({
						message: '评论获取失败！',
						type: 'error'
					})
				}
			})
		},
		methods: {
			//发送评论接口
			discuss() {
				//发送评论
				SendCommentApi({
					content: this.textContent,
					name: this.myName,
					type: 0
				}).then(res => {
					if (res.status == 200) {
						this.myContent = res.data.createComment
					} else {
						this.$message({
							message: '评论获取失败！',
							type: 'error'
						})
					}
				})
			},
			myComment() {
				//获取我的评论
				MyCommentApi({
					type: 0	//0是Mv    1是歌单
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
				if (token == 0) {
					alert("请登录")
				} else {
					this.discuss()
					this.myComment()
				}
			},
			Change(val) {
				this.page = val;
				//重新调用接口显示数据
				MVCommentApi({
					id: this.$route.query.id,
					limit: 10,
					offset: (this.page - 1) * 10
				}).then(res => {
					if (res.code == 200) {
						this.hotcomment = res.hotComments;
						this.comments = res.comments;
						this.total = res.total
					} else {
						this.$message({
							message: '评论获取失败！',
							type: 'error'
						})
					}
				})
			},
			toMV(id) {
				this.$router.push('/mv?id=' + id);
			}
		},
	}
</script>

<style>
	.mv-container {
		margin: 20px;
		margin-left: 90px;
		display: flex;
	}

	.video-wrap video {
		background-color: #000000;
		width: 700px;
		height: 400px;
	}

	.mv-header img {
		width: 60px;
		background-color: rgb(98, 210, 238);
		border-radius: 50%;
		margin-top: 20px;
	}

	.topall {
		width: 700px;
	}

	.topall span {
		display: block;
		font-size: 15px;
		margin: -45px 0 0 80px;
		font-weight: bold;
	}

	.bottomall {
		margin-top: 50px;
		width: 700px;
	}

	.bottomall span {
		font-size: 12px;
		color: rgb(148, 144, 144);
		padding-right: 10px;
	}

	.bottomall p {
		font-size: 13px;
	}

	.speakall {
		width: 700px;
	}

	/* 发送评论 */
	.ipt-name1 {
		font-size: 14px;
		margin-top: 20px;
		border-top: 1px solid #8a8a8a;
		padding-top: 20px;
	}

	.ipt-content1 {
		resize: none;
		outline: none;
		margin-left: 40px;
		margin-top: 15px;
		width: 600px;
		height: 100px;
	}

	.ipt-num1 {
		font-size: 10px;
		color: #666666;
		position: absolute;
		margin-left: 590px;
		margin-top: -25px;
	}

	.ipt-pl1 {
		border: 0;
		line-height: 30px;
		width: 60px;
		border-radius: 15px;
		background-color: #5d6f96;
		color: #FFFFFF;
		margin-left: 585px;
		margin-top: 10px;
		cursor: pointer;
	}

	.h3 {
		margin-left: 30px;
	}

	.rightitems {
		padding-bottom: 50px;
	}

	.rightinfo {
		margin: -80px 0 0 220px;
	}

	.num11 {
		padding-top: 80px;
	}
</style>
