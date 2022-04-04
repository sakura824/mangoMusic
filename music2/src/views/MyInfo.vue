<!--发现音乐-->
<template>
	<div>
		<!-- 昵称 -->
		<div class="nick-name">
			<div class="name-text">昵称:</div>
			<input class="ipt-nick-name" maxlength="20" type="text" :value="username" disabled />
		</div>
		<!-- 注册账号时间 -->
		<div class="nick-name">
			<div class="name-text">加入芒果音乐时间:</div>
			<div class="join-in">{{util.joinDate(startTime)}}</div>
		</div>
		<!-- 上传头像 -->
		<!-- <el-upload
	  class="avatar-uploader"
	  action="http://localhost:8888/"
	  :show-file-list="true"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload> -->
		<div class="btn-submit">保存</div>
	</div>
</template>
<script>
	export default {
		components: {

		},
		data() {
			return {
				imageUrl: '',
				username: '',
				startTime: null
			}
		},
		created() {
			this.username = localStorage.getItem('userName')
			this.startTime = localStorage.getItem('createdAt')
		},
		methods: {
			// handleAvatarSuccess(res, file) {
			// 	this.imageUrl = URL.createObjectURL(file.raw);
			// },
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// }
		}
	}
</script>

<style scoped>
	/* 昵称 */
	.nick-name {
		margin: 50px;
		display: flex;
		width: 30%;
		align-items: center;
	}

	.ipt-nick-name {
		margin-left: 10px;
		outline: none;
		background: none;
		border: 1px solid #a7a7a7;
		border-radius: 5px;
		padding: 5px;
	}

	.join-in {
		margin-left: 10px;
		font-size: 13px;
		color: #4f4f4f;
	}

	/* 上传头像 */
	.avatar-uploader {
		width: 100px;
		height: 100px;
		background-color: #ffffff;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		overflow: hidden;
		text-align: center;
		position: absolute;
		top: 15%;
		left: 35%;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		line-height: 100px;
		color: #8c939d;
	}

	.avatar {
		width: 178px;
		height: 178px;
	}

	/* 保存 */
	.btn-submit {
		width: 60px;
		line-height: 35px;
		background-color: rgb(236, 65, 65);
		text-align: center;
		color: #fff;
		border-radius: 10px;
		margin-top: -10px;
		cursor: pointer;
		margin-left: 180px;
	}
</style>
