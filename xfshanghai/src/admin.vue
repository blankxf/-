<template>
  <div>
    <h1>后台管理 <a @click="loginOut">点击退出</a></h1>  

    <mu-table>
        <mu-tr>
            <mu-th tooltip="当前标题">当前标题</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
        <mu-tr>
            <mu-td>{{titles.title}}</mu-td>
            <mu-td><a :href="'#/xgtitle/'+titles._id">修改</a></mu-td>
        </mu-tr>
    </mu-table>

    <h1>报名详情</h1>
    <mu-table :showCheckbox="false">
        <mu-thead slot="header" >
          <mu-tr>
            <!-- <mu-th tooltip="序号">序号</mu-th> -->
            <mu-th tooltip="名称">昵称</mu-th>
            <mu-th tooltip="微信">微信</mu-th>
            <mu-th tooltip="手机">手机</mu-th>
            <mu-th tooltip="人数">人数</mu-th>
            <mu-th tooltip="状态">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in datas"  :key="index" :selected="item.selected">
            <!-- <mu-td>{{index + 1+ (newIndex-1)*10}}</mu-td> -->
            <mu-td>{{item.name}}</mu-td>
            <mu-td>{{item.weixin}}</mu-td>
            <mu-td>{{item.phone}}</mu-td>
            <mu-td>{{item.num}}</mu-td>
            <mu-td><a :href="'#/xg/'+item._id">修改</a> <br>
                   <a @click='remove(item._id)'>删除</a></mu-td>
          </mu-tr>
        </mu-tbody>

  
    </mu-table>
     <p v-show="datas.length==0">暂且无人报名...</p>
     <div class="button">
      <mu-raised-button v-show="datas.length!==0" label="删除全部" @click="open" secondary/>
      <mu-dialog :open="dialog" title="提示" >
        你确定删除全部报名信息吗？
        <mu-flat-button slot="actions" @click="quxiao" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
    </div>

    <mu-pagination :total="total" :current="current" @pageChange="handleClick">
  </mu-pagination>


   

 </div>
</template>
<script>
  import axios from 'axios';
  export default{
 
      data () {
        return {
          dialog: false,
          datas:{},
          zong:0,
          total: 70,
          current: 1,
          titles:{}

      
        }  
      }, 
      methods: {
      
          open () {
            this.dialog = true
          },
          quxiao(){
            this.dialog = false
          },
          close () {
            this.dialog = false;
              axios.get(`${this.siteUrl}removeall`).then((data)=>{
                   alert("全部删除成功");


             },(err)=>{
                   
             })

                 axios.get(this.siteUrl+'all').then((data)=>{
                   this.datas=data.data;
                 
                 },(err)=>{
                  
                 }) 
             //获取total
               this.total=10;


          },
               handleClick (newIndex) {
              this.newIndex=newIndex
              axios.get(`${this.siteUrl}all/?page=${newIndex}`).then((data)=>{
                       this.datas=data.data;                             
                    },(err)=>{

                })
        },
        remove(index){
  
         axios.get(`${this.siteUrl}remove?_id=${index}`).then((data)=>{
                   alert("删除成功")
             },(err)=>{
                   
          })

          axios.get(this.siteUrl+'all').then((data)=>{
           this.datas=data.data;
         
         },(err)=>{
          
         }) 
     //获取total
         axios.get(this.siteUrl+'myCount').then((data)=>{
                   this.total=data.data.length;                             
                    },(err)=>{

           })
    },

    loginOut(){
      window.localStorage.removeItem("pwd");
      window.location="#/login"
    }
  },
    mounted(){
         axios.get(this.siteUrl+'title').then((data)=>{
      
          this.titles=data.data[0];
         
         },(err)=>{
          
         }) 
             
         axios.get(this.siteUrl+'all').then((data)=>{
           this.datas=data.data;
          
         },(err)=>{
          
         }) 
     //获取total
         axios.get(this.siteUrl+'myCount').then((data)=>{
                       this.total=data.data.length;                             
                    },(err)=>{

                }) 

         if(window.localStorage.getItem('pwd')=='123456'){
     
                window.location="#/admin"
             
              }else{
      
                window.location="#/login"
        }  
      }



  }
</script>

<style>
   .button{
    margin-left: 70%;
   }
</style>

