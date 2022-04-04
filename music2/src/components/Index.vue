<template>
  <div class="index">
      <div class="index-left">
          <ul>
              <li>
                  <router-link to="/discovery"><span class="iconfont icon-yinlegedanyinfu"></span>发现音乐</router-link>
              </li>
              <li>
                  <router-link to="/playlists"><span class="iconfont icon-music"></span>推荐歌单</router-link>                  
              </li>
              <li>
                  <router-link to="/songs"><span class="iconfont icon-yinle"></span>最新音乐</router-link>
              </li>
              <li>
                  <router-link to="/mvs"><span class="iconfont icon-MV"></span>最新MV</router-link>
              </li>
          </ul> 
      </div>
      <div class="main">
         <router-view :key="key"></router-view>
      </div>
  </div>
</template>

<script>
export default {
    components: {
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data(){
        return {
        }
    },
    computed: {
        key() {
            return this.$route.path + Math.random();   //Math.random()  令系统随机选取大于等于 0.0 且小于 1.0 的伪随机 double 值
        }
    },
}
</script>

<style>
.index {
    /* height: 800px; */
    display: flex;
    position: relative;
}
.index-left {
    width: 200px;
    min-width: 200px;
    /* background-color: #ededed; */
    text-align: center;
    border-right: 1px solid #ededed;
}
.index-left ul {
    list-style-type: none;
    padding: 0;
 }
 .index-left li {
    cursor: pointer;
    letter-spacing: .3rem;
    height: 60px;
    line-height: 60px;
    display: flex;
}
.index-left li:hover {
    background-color: #ededed;
}
.index-left a {
    text-decoration: none;
    color: #333;
    display: block;
    height: 100%;
    font-size: 18px;
    padding-left: 30px; 
    text-align: left;  
}
/*点击变色*/
.router-link-active {
    color: #e74c3c !important;
}
.main {
    flex: 1;
    margin-bottom: 60px;
}
</style>