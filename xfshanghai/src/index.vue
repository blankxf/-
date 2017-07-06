<template>
  <div>
       
      <div class="header">
           <img src="./assets/xf.jpg" alt="">
           <h3>7月30号 许飞"一个梦想"音乐会报名</h3>
      </div>
     <div class="main">
      昵称：
      <mu-text-field hintText="请输入昵称" @blur="change(1)" :errorText="kong" v-model="name"/><br>
      微信：
      <mu-text-field hintText="请输入微信"  @blur="change(2)" :errorText="kong1" v-model="weixin"/><br>
      电话：
      <mu-text-field hintText="请输入联系电话" @blur="change(3)" :errorText="kong2" type="number" v-model="phone"/><br>
      人数：
      <mu-text-field hintText="请输入报名人数" @blur="change(4)" :errorText="kong3" type="number"  v-model="num"/><br>
      <mu-raised-button label="点击报名" class="demo-raised-button" @click="tijiao" secondary />
 
     </div>
 </div>
</template>
<script>
import axios from 'axios'

export default {

  data () {
    return {
       name:"",
       weixin:"",
       phone:"",
       num:1,
       id:'',
       kong:'',
       kong1:'',
       kong2:'',
       kong3:'',
       datas:[]

    }  
  },
  methods:{
    tijiao(position){    
      var addUrl=`${this.siteUrl}add?name=${this.name}&weixin=${this.weixin}&phone=${this.phone}&num=${this.num}`;
      if(this.name!=""&&this.weixin!=""&&this.phone!=""&&this.num!=""){
          axios.get(addUrl).then((data)=>{
                     
                  alert("报名成功")
                  window.location="#/xq"
                   
         },(err)=>{  

         })

      }else{
        alert("仔细瞅瞅还有哪项没填？")
      }     
    },
    change(n){
       switch(n){
        case 1:if(this.name==""){this.kong="昵称不能为空"}else{this.kong=""};break;
        case 2:if(this.weixin==""){this.kong1="微信不能为空"}else{this.kong1=""};break;
        case 3:if(this.phone==""){this.kong2="电话不能为空"}else{this.kong2=""};break;
        case 4:if(this.num==""){this.kong3="人数不能为空"}else{this.kong3=""};break;
       }
    }
  
  },
  mounted(){
     
  }, 
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style>
body{
  font-family: "微软雅黑"
}
   .header{
      width: 300px;
      height: 200px;
      margin: 10px auto;
      text-align: center;
   }
   .header img{
    width: 160px;
    height: 160px;
    border-radius: 80px;  
   }

   .main{
    text-align: center;
   }



</style>



