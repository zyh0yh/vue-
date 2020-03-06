import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    posCount:0,
    count:0
}
const mutations ={
    // 营业额
    posMoney(state,money){
       state.posCount += money;
    },
    // 订单量
    count(state){
        state.count++;
    }
}

export default new Vuex.Store({
    state,
    mutations
})