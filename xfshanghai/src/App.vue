<template>
  <div>
    <router-view></router-view>
   <br>   
   <br>   
   <br>      
  <mu-paper class="fixed">
     <mu-bottom-nav :value="bottomNav" @change="handleChange">
     <mu-bottom-nav-item value="首页" title="首页" icon="favorite" href="#/index"/>

      <mu-bottom-nav-item value="报名详情" title="报名详情" icon="info" href="#/xq"/>
    
     </mu-bottom-nav>
  </mu-paper>

 </div>
</template>

<script>

  export default{
 
      data () {
        return {        
          bottomNav: 'recents'      
        }  
      },

      methods:{
	     handleChange (val) {
	      this.bottomNav = val
	         }

	  },

     mounted(){
   
      }
  }
</script>

<style>
	
.fixed{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
</style>