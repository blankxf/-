<template>
  <div>
    <h1>后台管理 <a @click="loginOut">退出</a></h1>  
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

        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
        删除成功
      </mu-popup>
    </mu-table>

    <mu-pagination :total="total" :current="current" @pageChange="handleClick">
  </mu-pagination>
 </div>
</template>
<script>
  import axios from 'axios';
  export default{
 
      data () {
        return {
          topPopup: false,
          _id:'',
          datas:{},
          zong:0,
          total: 70,
          current: 1
      
        }  
      }, 
      methods: {
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
      window.location="/#login"
    }
  },
    mounted(){
             
         axios.get(this.siteUrl+'all').then((data)=>{
           this.datas=data.data;
          
         },(err)=>{
          
         }) 
     //获取total
         axios.get(this.siteUrl+'myCount').then((data)=>{
                       this.total=data.data.length;                             
                    },(err)=>{

                }) 
      }
  }
</script>

