let routes = [
  {
    path: '/',
    name: 'layout',
    redirect: {name: 'index'}, 
    component: 'layout',
    children: [
      {
        meta: {title: '后台首页'},
        component: 'index/index'
      },
      {
        meta: {title: '商品列表'},
        component: 'shop/goods/list'
      },
      {
        meta: {title: '相册管理'},
        component: 'image/index'
      }
    ]
  },
  {
    meta: {title: '登录页'},
    component: 'login/index'
  },
  {
    path: '*',
    redirect: {name: 'index'}
  }
]

//获取路由信息方法
let getRoutes = function(){
  //自动生成路由
  createRoute(routes)
  return routes
}

function createRoute(arr){
  for(let i = 0; i < arr.length; i++){
    if(!arr[i].component) return
    //去除index
    let val = getValue(arr[i].component);
    //生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')

    //生成path
    arr[i].path = arr[i].path || `${val}`

    let componentFun = import(`../../views/${arr[i].component}`)
    arr[i].component = () => componentFun;
    if(arr[i].children && arr[i].children.length > 0){
      createRoute(arr[i].children)
    }
  }
}

function getValue(str){
  let index = str.lastIndexOf('/');
  let val = str.substring(index+1, str.length);
  if(val === 'index'){
    return str.substring(index, -1)
  }
  return str
}

export default getRoutes();