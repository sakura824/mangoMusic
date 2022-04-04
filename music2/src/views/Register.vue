<template>
  <div class="register">
          <div class="register-all">
              <div class="top-text">注册</div>
			  <div class="btns1">
			  	<i class="el-icon-arrow-left ico-back" @click="back()"></i>
			  </div>
              <div class="username">
                  <div class="name-text">用户名:</div>
                  <input v-model="username" type="text" class="ipt-user">
              </div>
              <div class="username">
                  <div class="name-text">密码:</div>
                  <input v-model="password" type="password" class="ipt-word">
              </div>
              <div class="btn-register" @click="Register">注册</div>
          </div>
          <div class="err" v-show="nameErr">
              <div class="text-err">{{msg}}</div>
          </div>
  </div>
</template>

<script>
import {RegisterApi} from '../network/api.js'
export default {
    data() {
        return {
            //输入的用户名
            username: '',
            //输入的密码
            password: '',
            //显示错误
            nameErr: false,
            //错误信息
            msg: '',
            //状态码
            status: null
        }
    },
    watch: {
        //监听状态码的改变
        status() {
            if(this.status == 202) {
                this.nameErr = true
                setTimeout(() => {
						this.nameErr = false;
                        this.$router.push('/login');
				},500)
                
            }
        }
    },
    methods: {
		back() {
			this.$router.back()
		},
        Register() {
            //判断账号密码有没有输错
            if(this.status == 400) {
                this.nameErr = true
                setTimeout(() => {
						this.nameErr = false;
				},1000)
            }
            //注册 先判断用户是否输入账号密码
            if(this.username == '' || this.password == '') {
                this.msg = '用户名或密码不能为空';
            }else {
				RegisterApi({
					username: this.username,
					password: this.password
				}).then(res => {
					this.msg = res.meta.msg;
					this.status = res.meta.status;
				})
            }
            
        }
    },
}
</script>

<style scoped>
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.register-all {
    width: 400px;
    background-color: rgb(252, 250, 250);
    border-radius: 25px;
    box-shadow: 0 0 10px rgb(201, 196, 196);
}
.top-text {
    font-size: 25px;
    text-align: center;
    font-weight: 600;
	margin-top: 20px;
}
.btns1 {
	position: absolute;
	margin: -32px 0 0 20px;
}
.ico-back {
	color: block;
	border-radius: 50%;
	padding: 10px;
	box-sizing: border-box;
	cursor: pointer;
}
.ico-back:hover {
	background-color: rgba(255, 0, 0, 0.3);
	border-radius: 50%;
}
.ico-back {
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
/* 注册按钮 */
.btn-register {
    width: 60px;
    line-height: 35px;
    background-color: rgb(236, 65, 65);
    text-align: center;
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    margin-top: -10px;
    margin-left: 170px;
	margin-bottom: 20px;
    cursor: pointer;
}
/* 显示错误 */
.err {
    background-color: rgb(216, 213, 213);
    color: #000;
    position: absolute;
    font-size: 20px;
    border-radius: 25px;
    width: 220px;
    height: 80px;
    opacity: 0.9;
    text-align: center;
    font-weight: bold;
}
.text-err {
    margin-top: 25px;
    margin-left: 5px;
}
</style>