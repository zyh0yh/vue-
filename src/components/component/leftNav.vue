<template>
  <div id="leftNav" class="left-nav">
    <ul>
      <router-link
        to="/" exact>
        <li>
          <i class="icon iconfont icon-pos"></i>
          <div>
            收银
          </div>
        </li></router-link
      >
      <router-link to="/dianpu">
        <li>
          <i class="icon iconfont icon-4"></i>
          <div>
            店铺
          </div>
        </li></router-link
      >
      <li>
        <i class="icon iconfont icon-hanbao1"></i>
        <div>
          商品
        </div>
      </li>
      <li>
        <i class="icon iconfont icon-VIP"></i>
        <div>
          会员
        </div>
      </li>
      <li>
        <i class="icon iconfont icon-shezhi"></i>
        <div>
          设置
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "leftNav",
  data: () => ({})
};
</script>
<style scoped>
.left-nav {
  color: #fff;
  font-size: 16px;
  height: 100%;
  background-color: rgba(50, 50, 41, 0.5);
  margin: 0;
  float: left;
  width: 3%;
}
.iconfont {
  font-size: 14px;
  margin: 0 auto;
}
.left-nav ul {
  padding: 0;
  margin: 0;
}
.left-nav li {
  list-style: none;
  text-align: center;
  /* padding: 10px; */
  padding: 30px 0;
  cursor: pointer;
}
.left-nav li:hover {
  background-color: #e59f71;
  transition: 0.5s;
}
.active{
  color: #e59f71;
}
a {
  color: #fff;
  text-decoration: none;
}
</style>
