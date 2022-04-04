<template>
	<div class="top-container">
		<span class="iconfont icon-yinle_2"></span>
		<h2>芒果音乐</h2>
		<div class="btns">
			<i class="el-icon-arrow-left" @click="back()"></i>
		</div>
		<!-- 登录 -->
		<div class="middle-login">
			<!-- <router-link to="/login">{{username}}</router-link> -->
			<div class="user-name" @click="goLogin(username)">
				<!-- 未登录字样 -->
				<div class="user-text" v-show="showLogin">{{username}}</div>
				<!-- 登录成功的头像 -->
				<img v-show="showLogin == false" :src="headImgUrl">
				<!-- 登录以后的下拉框 -->
				<div class="user-info" v-show="showLogin == false">
					<ul>
						<li @click="goMyInfo">个人中心</li>
						<li @click="Exit">退出</li>
					</ul>
				</div>
			</div>
			<!-- <div class="quit" v-show="exit" @click="Exit">退出</div> -->

		</div>
		<div class="right-box">
			<div class="el-input el-input--small el-input--prefix">
				<!-- 搜索框 -->
				<input type="text" autocomplete="off" placeholder="搜索" class="el-input__inner" v-model="inputValue"
					@keyup.enter="toResult" @focus="goSeachHot" />
				<span class="el-input__prefix">
					<i class="el-input__icon el-icon-search"></i>
				</span>
			</div>
			<!-- 热搜榜 -->
			<div class="search-hot" v-show="isHot" ref="hot">
				<div>
					<div class="hot-title" @click="goHotContent">热搜榜</div>
					<ul>
						<li class="hot-item" v-for="(item,index) in hotData " :key="index"
							@click="goHotContent(item.searchWord)">
							<div class="hot-index">{{index + 1}}</div>
							<div class="hot-info">
								<div class="hot-top">
									<div class="hot-name">{{item.searchWord}}</div>
									<div class="hot-score">{{item.score}}</div>
									<img class="hot-icon" v-show="item.iconUrl && item.iconType!=5"
										:src="item.iconUrl" />
								</div>
								<div class="hot-content">{{item.content}}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		HotApi
	} from '../network/api.js'
	export default {
		name: 'top',
		data() {
			return {
				inputValue: '',
				//是否显示热搜榜
				isHot: false,
				//热搜榜数据
				hotData: [],
				//显示未登录还是登录头像
				showLogin: false,
				//请登录
				//username: this.$store.state.userName,
				//头像
				headImgUrl: require('/static/5.jpg')
			}
		},
		computed: {
			username() {
				return this.$store.state.userName
			},

		},
		watch: {
			username() {
				this.whetherLogin()
				console.log(this.$store.state.userName);
			},
		},
		created() {
			this.whetherLogin()
			// 热搜榜
			HotApi().then(res => {
				if (res.code == 200) {
					this.hotData = res.data;
				} else {
					this.$message({
						message: '热搜榜请求数据失败！',
						type: 'error'
					})
				}
			})
		},
		methods: {
			//判断是否为未登录状态
			whetherLogin() {
				if(localStorage.getItem('userName')) {
					this.showLogin = false
				} else {
					this.showLogin = true
				}
			},
			//点击登录
			goLogin(username) {
				if (username == '请登录') {
					this.$router.push('/login')
				}
			},
			back() {
				this.$router.go(-1);
			},
			toResult() {
				if (this.inputValue == "") {
					this.$message({
						message: '搜索内容不能为空！',
						type: 'warning'
					})
				} else {
					this.$router.push('/result?name=' + this.inputValue);
				}
			},
			//是否显示热搜榜
			goSeachHot() {
				this.isHot = !this.isHot
			},
			//点击热搜榜跳转对应页面
			goHotContent(name) {
				this.$router.push('/result?name=' + name);
				this.isHot = false
			},
			//跳转个人中心
			goMyInfo() {
				this.$router.push('/myinfo')
			},
			//退出登录
			Exit() {
				let that = this
				that.$confirm('是否退出登录', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					})
					.then((action) => {
						if(action == 'confirm') {
							//清除缓存
							localStorage.clear();
							that.$store.state.userName = '请登录';
							that.$message({
								type: 'success',
								message: '退出成功!',
							})
							that.$router.push('/login')
						}
						
					})
					.catch(() => {
						that.$message({
							type: 'warning',
							message: '已取消退出登录',
						})
					})
			}
		}
	}
</script>

<style>
	/*搜索下面的热搜栏*/
	.search-hot {
		width: 400px;
		height: 300px;
		/* border: 1px solid #333; */
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: #fff;
		position: absolute;
		top: 55px;
		right: 30px;
		z-index: 1;
		padding: 10px 10px;
		box-sizing: border-box;
		overflow: hidden;
		/*溢出隐藏后显示滚动条滚动*/
		overflow-y: scroll;
	}

	.hot-title {
		margin: 10px 0;
		font-weight: bold;
	}

	.hot-item {
		display: flex;
		align-items: center;
		padding: 5px;
	}

	.hot-item:hover {
		background-color: seashell;
	}

	.hot-index {
		font-size: 20px;
		color: rgb(236, 65, 65);
		margin-right: 15px;
	}

	.hot-info {
		flex: 1;
		font-size: 12px;
		color: slategray;
	}

	.hot-top {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}

	.hot-name {
		font-size: 16px;
		margin-right: 15px;
		color: #000;
	}

	.hot-icon {
		width: 30px;
		margin-left: 5px;
	}

	ul {
		list-style: none;
	}

	/* 左上角标题显示 */
	.top-container {
		display: flex;
		align-items: center;
		background-color: rgb(236, 65, 65);
		padding: 0 30px;
		top: 0;
		position: sticky;
		z-index: 9;
	}

	.top-container span {
		font-size: 28px;
		color: rgb(255, 255, 255);
		padding-top: 5px;
	}

	.top-container h2 {
		color: #fff;
		letter-spacing: .5rem;
		margin-right: 30px;
	}

	/* 返回前进图标 */
	.btns {
		margin-right: auto;
	}

	.btns i {
		color: #fff;
		border-radius: 50%;
		padding: 10px;
		box-sizing: border-box;
		cursor: pointer;
	}

	.btns i:hover {
		background-color: rgba(255, 255, 255, .3);
		border-radius: 50%;
	}

	/* 登录退出显示 */
	.middle-login {
		font-size: 14px;
		margin-right: 15px;
		color: rgb(46, 46, 46);
		display: flex;
	}

	/* 登录 */
	.user-text {
		cursor: pointer;
	}

	.user-text:hover {
		color: #FFFFFF;
		cursor: pointer;
	}

	.user-name img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.user-name {
		position: relative;
	}

	/* 触碰头像的展示框 */
	.user-info {
		display: none;
		position: absolute;
		left: -70%;
		top: 42px;
	}

	.user-info ul {
		list-style: none;
		margin: 15px 0px 0px 0px;
		padding: 0px;
		font-size: 16px;
		width: 120px;
		text-align: center;
		border-radius: 20px;
		background-color: #ffffff;
		cursor: pointer;
	}

	.user-info ul li {
		padding: 5px;
		margin-top: 5px;
	}

	.user-name:hover .user-info {
		display: block;
	}

	.user-info ul li:hover {
		border-radius: 20px;
		background-color: rgb(223, 223, 223);
	}

	.el-input__prefix {
		margin-top: -10px;
	}

	.el-input__icon {
		color: rgb(165, 158, 158);
		font-size: 18px;
	}
</style>
