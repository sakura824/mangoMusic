<template>
  <div class="login">
          <div class="login-all">
              <div class="top-text">登录</div>
              <div class="username">
                  <div class="name-text">用户名:</div>
                  <input v-model="username" type="text" class="ipt-user">
              </div>
              <div class="username">
                  <div class="name-text">密码:</div>
                  <input v-model="password" type="password" class="ipt-word">
              </div>
              <div class="login-register">
                  <div class="go-in" @click="Login">登录</div>
                  <div class="go-in" @click="Register">注册</div>
              </div>
          </div>
  </div>
</template>

<script>
import {LoginApi} from '../network/api.js'
export default {
    data() {
        return {
            //状态码
            status: null,
            //输入的用户名
            username: '',
            //输入的密码
            password: ''
        }
    },
    watch: {
        //监听状态码的改变
        status() {
            if(this.status == 200) {
                this.$router.push('/discovery');
            }
        }
    },
    methods: {
        //登录
        Login() {
			LoginApi({
                username: this.username,
                password: this.password
            }).then(res => {
				if(res.meta.status == 200) {
					//保存状态码
					this.status = res.meta.status;
					//保存用户名
					this.$store.state.userName = res.data.username;
					//保存token
					this.$store.state.token = res.data.token;
					localStorage.setItem('createdAt', res.data.createdAt);
					localStorage.setItem('token', res.data.token);
					localStorage.setItem('userName', res.data.username);
					localStorage.setItem('imgurl', res.data.imgurl);
					this.$message({
					  type: 'success',
					  message: '登录成功!',
					})
				} else {
					//保存错误登录的状态码
					this.status = res.meta.status;
					this.$message({
						type: 'error',
						message: res.meta.msg,
					})
				}
			})
        },
        Register() {
            this.$router.push('/register');
        }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.login-all {
    width: 400px;
    height: 250px;
    background-color: rgb(252, 250, 250);
    border-radius: 25px;
    box-shadow: 0 0 10px rgb(201, 196, 196);
}
.top-text {
    font-size: 25px;
    text-align: center;
    font-weight: 600;
}
.username {
    display: flex;
    font-size: 17px;
    font-weight: 600;
    margin: 44px; 
}
.ipt-user {
    margin-left: 30px;
}
.ipt-word {
    margin-left: 46px;
}
.login-register {
    display: flex;
    justify-content: space-between;
    margin: 0 80px;
}
.go-in {
    width: 60px;
    line-height: 35px;
    background-color: rgb(236, 65, 65);
    text-align: center;
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    margin-top: -10px;
    cursor: pointer;
}
</style>