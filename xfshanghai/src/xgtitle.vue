<template>
  <div class="main">
      <h1>修改标题</h1>

      <mu-text-field label="请输入标题" labelFloat v-model="title" /><br>
   

      <div class="container">
            <mu-raised-button label="点击修改" class="demo-raised-button"  @click="xiugai" secondary/><br><br>
            <mu-raised-button label="返回" href="#/admin" class="demo-raised-button"  primary/>
    
      </div>
    
   
   

 </div>

</template>


<script>
  import axios from 'axios';
  export default{
 
      data () {
        return {
          _id:'',
          title:''
        }  
      },
      methods:{           
           xiugai(){
               axios.get(`${this.siteUrl}updatetitle?_id=${this.$route.params._id}&title=${this.title}`).then((data)=>{
                     alert("修改成功")
                     window.location="#/admin"           
                   },(err)=>{
                     console.log(err)
                   }) 
           },
           

      },
     mounted(){
     axios.get(this.siteUrl+'title').then((data)=>{
          console.log(data)
           this.title=data.data[0].title;
         
         },(err)=>{
          
         })   
  }
  }
</script>