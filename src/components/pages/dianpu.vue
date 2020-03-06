<template>
  <div class="dian">
    <el-container>
      <!-- 顶部title -->
      <el-header>
        <div class="img" style="float:left;padding:20px 0;">
          <img
            src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
            alt=""
            style="width:200px;height:200px;"
          />
        </div>
        <div class="text" style="float:left;padding:20px 0;">
          <li>
            <img
              src="@/assets/img/brand.png"
              alt=""
              style="vertical-align:middle"
            /><span
              style="font-size:20px;  font-weight: bolder;
  padding: 0 10px;"
              >粥品香坊（回龙观)</span
            >
          </li>
          <li>
            <h4 style="float:left;">{{ dpCon.description }}</h4>
          </li>
          <br />
          <li>
            <img
              src="@/assets/img/decrease.png"
              alt=""
              style="vertical-align:middle;width:30px;height:30px;float:left;"
            /><span
              style="font-size:16px; 
                  padding: 0 10px;"
              >在线支付满28减5</span
            >
          </li>
          <br />
          <li>
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="4.2"
            >
            </el-rate>
          </li>
        </div>
      </el-header>
      <!-- 内容开始 -->
      <!-- 营业额配上数据图 -->
      <!-- 订单量配上数据图 -->
      <el-main>
        <!-- <h2 style="color:red">
          营业额：￥{{ $store.state.posCount }}元||订单量：{{
            $store.state.count
          }}
        </h2> -->
        <el-row>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>销售额</span>
              </div>
              <div class="text item">
                  <h1>营业额</h1>
                  <span :class="posCount>=500 ? 'span-text' : 'span'">￥{{posCount}}元</span>
              </div>
              
            </el-card></el-col
          >
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>订单量</span>
              </div>
               <div class="text item">
                  <h1>订单量</h1>
                  <span :class="count>=20 ? 'span-text' : 'span'">{{count}}单</span>
              </div>
            </el-card></el-col
          >
        </el-row>
      </el-main>
      <!-- 内容结束 -->
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "dian",
  data() {
    return {
      dpCon: [],
      value: 4.2,

    };
  },
  created() {
    axios
      .get("../../static/data.json")
      .then(res => {
        // this.dpCon = res.data;
        // console.log(res.data.seller);
        this.dpCon = res.data.seller;
        console.log(this.dpCon);
      })
      .catch(res => {
        console.log("error");
      });
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    posCount() {
      return this.$store.state.posCount;
    }
  }
}
</script>
<style scoped>
.el-header,
.el-main {
  color: #fff;
}
.el-header {
  height: 240px !important;
}
.el-rate {
  float: left;
}
.left {
  margin: 0;
  width: 210px;
}
.right {
  width: auto;
  float: left;
  border: 1px solid #000000;
}
.el-card{
    color: #fff;
    background-color: rgba(50, 50, 41, 0.5) !important;
    border: none;
}
li {
  list-style: none;
  padding: 10px;
}
h4 {
  margin: 0;
  padding: 0;
}
.box-card {
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}
.box-card:hover {
  box-shadow: 0px 0px 5px 5px rgba(45, 45, 45, 0.6);
  transition: box-shadow 0.5s;
}
.box-card span {
  font-size: 16px;
  font-weight: bold;
}
.el-card .span-text{
    font-size: 28px;
    font-weight: bolder;
    color:#58b7ff;
}
.el-card .span{
     font-size: 28px;
    font-weight: bolder;
    color:red;
}
</style>
