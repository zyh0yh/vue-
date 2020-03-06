<template>
  <div id="pos">
    <el-row>
      <el-col :span="6" class="pos-order">
        <el-tabs boder id="order-list"  style="margin-left:10px;">
          <el-tab-pane label="点餐">
            <el-table border :data="tableData">
              <el-table-column prop="name" label="商品名称" width="100">
              </el-table-column>
              <el-table-column prop="count" label="量" width="80">
              </el-table-column>
              <el-table-column prop="price" label="金额" width="80">
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="150" border>
                <template slot-scope="scoped">
                  <el-button
                    type="success"
                    size="small"
                    @click="addOrderList(scoped.row)"
                    >增加</el-button
                  >
                  <el-button
                    type="danger"
                    size="small"
                    @click="delGoods(scoped.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="mon-text">
              <p>
                <span>数量：{{ allCount }}</span
                >&nbsp;&nbsp;&nbsp;&nbsp;<span>金额: {{ allMoney }}元</span>
              </p>
            </div>
            <div class="btn">
              <el-button type="danger" plain @click="delTab">删除</el-button>
              <el-button type="warning" @click="posMoney(money)">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="18" class="goods-order" id="goodList">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li
                v-for="(item, index) in oftenGoods"
                :key="index"
                @click="addOrderList(item)"
              >
                <span>{{ item.name }}</span>
                <span class="o-price">￥{{ item.price }}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs class="goodstype">
            <el-tab-pane
              v-for="(goods, index) in type0Goods"
              :key="index"
              :label="goods.name"
            >
              <ul class="cookList">
                <li
                  v-for="(item, key) in goods.foods"
                  :key="key"
                  @click="addOrderList(item)"
                >
                  <span class="foodImg"
                    ><img :src="item.image" width="100%"
                  /></span>
                  <span class="foodName">{{ item.name }}</span
                  ><br />
                  <span class="foodPrice">￥{{ item.price }}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "pos",
  data: () => ({
    tableData: [],
    oftenGoods: [],
    type0Goods: [],
    typeName: [],
    // 总价格
    allMoney: 0,
    allCount: 0,
    guaGoods:[],
    money:0
  }),
  created() {
    // 获取数据
    axios
      .get("../../static/data.json")
      .then(res => {
        // console.log(res.data);
        // 食品
        this.oftenGoods = res.data.foods;
        // 食品分类
        this.type0Goods = res.data.goods;
        // console.log(this.oftenGoods);
        // console.log(this.type0Goods);
        for (let index in this.type0Goods) {
          // console.log(this.type0Goods[index].name);
          this.typeName.push(this.type0Goods[index]);
        }
        // console.log(this.typeName);
      })
      .catch(res => {
        console.log("erroe");
      });
  },
  mounted() {
    //do something after mounting vue instance
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
    document.getElementById("goodList").style.height = orderHeight + "px";
  },
  methods: {
    // 添加商品
    addOrderList: function(item) {
      //先判断是否存在订单中
      // 据判断结果编写逻辑
      // 总数量和总金额清零
      this.allMoney = 0;
      this.allCount = 0;
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name == item.name) {
          isHave = true;
        }
      }
      if (isHave) {
        // 改变列表中商品数量
        let arr = this.tableData.filter(o => o.name == item.name);
        arr[0].count++;
      } else {
        // 新添加商品信息,把新信息push进 商品数组内
        let newList = {
          name: item.name,
          price: item.price,
          count: 1
        };
        this.tableData.push(newList);
      }
      this.getAll();
    },
    delGoods: function(item) {
      this.tableData = this.tableData.filter(o => o.name != item.name);
      this.getAll();
    },
    getAll: function() {
      // 总数量和总金额清零
      this.allMoney = 0;
      this.allCount = 0;
      if (this.tableData) {
        // 计算总金额和数量
        this.tableData.forEach(el => {
          this.allCount += el.count;
          this.allMoney = this.allMoney + el.price * el.count;
        });
      }
    },
    // 删除商品
    delTab: function() {
      if (this.tableData) {
        this.tableData = [];
        this.getAll();
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
      }
    },
    // 结账功能
    posMoney: function(money) {
      if (this.allMoney != 0) {
        this.$confirm("结账金额：￥" + this.allMoney + "元", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            
            this.$message({
              type: "success",
              message: "结账成功!"
            });
            money += this.allMoney;
            this.$store.commit('posMoney',money);
            this.$store.commit('count');
            this.tableData = [];
            this.allMoney = 0;
            this.allCount = 0;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消结账"
            });
          });
      }else{
         this.$message({
              type: "warning",
              message: "不能空结!这是不对的！"
            });
      }
    }
  },
  // computed:{
  //   ...mapState(['money'])
  // }
};
</script>

<style scoped>
#order-list {
  border-right: 1px solid #d3dce6;
}
.el-table {
  overflow: scroll;
}
.btn {
  margin-top: 10px;
}
.goods-order {
  color: #fff;
  height: 100%;
  background-color: rgba(30, 32, 41, 0.2);
}
.title {
  height: 28px;
  border-bottom: 2px solid #d3dce6;
  border-left: 1px solid #d3dce6;
  padding: 10px;
  text-align: left;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
}
.often-goods {
  height: 49%;
}
.often-goods-list ul {
  padding: 10px;
  margin: 0;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  font-weight: bolder;
  padding: 10px;
  margin: 5px;
  background-color: lightyellow;
  border-radius: 3px;
  color: #555555;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
/* .goods-type{
     padding:5px;
   } */
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  overflow: hidden;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 30%;
}
.foodName {
  font-size: 10px;
  font-weight: bold;
  padding-left: 20px;
  color: brown;
}
.foodPrice {
  color: #58b7ff;
  font-size: 14px;
  font-weight: bolder;
  padding-left: 10px;
  padding-top: 10px;
}
.mon-text {
  color: #fff;
}
</style>
