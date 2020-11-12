export default{
  state: {
    skus_type: 0,
    title: '',
    category: [],
    desc: '',
    unit: '',
    stock: 0,
    min_stock: 0,
    display_stock: 0,
    status: 0,
    express: '',
    
  },
  getters: {

  },
  mutations: {
    //修改state
    vModelState(state, {key,value}){
      state[key] = value
    }
  },
  actions: {

  }
}