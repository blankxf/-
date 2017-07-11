import Vue from "vue";
import Router from "vue-router";
import Index from './index.vue';
import Xg from './xg.vue';
import Xq from './xq.vue';
import Login from './login.vue';
import Admin from './admin.vue';
import Xgtitle from './xgtitle.vue';
Vue.use(Router);

var router=new Router({

	routes:[
        
       {path:"/",redirect:"/index"},  //默认显示商品页
	   {path:"/index",component:Index},
	   {path:"/xg/:_id",component:Xg},
	   {path:"/xq",component:Xq},
	   {path:"/login",component:Login},
	   {path:"/admin",component:Admin},
	   {path:"/xgtitle/:_id",component:Xgtitle}
	]
})
export default router;