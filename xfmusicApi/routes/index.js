var express = require('express');
var fs = require('fs');
var router = express.Router();



var mongoose=require('mongoose');
var Bao=mongoose.model('Baos',{
    name:String,
    weixin:String,
    phone:Number,
    num:Number
})

var Title=mongoose.model('Title',{
     
     title:String,
     img:String
})



// var upload=multer({dest:'public'});




/* GET home page. */
router.get('/add', function(req, res, next) {
    // console.log(req.query)
     // 插入数据库
        Bao.create({name:req.query.name,weixin:req.query.weixin,phone:req.query.phone,num:req.query.num}).then((data)=>{
            res.send(data)
        },(err)=>{
            res.send('报名失败')
        })

});

//查找数据库
router.get('/all', function(req, res, next) {	   
           var page = req.query.page || 1; 
            // console.log("page:",page);
  //分页  
            Bao.find().skip((page-1)*10).limit(10).then((data)=>{
                   //console.log('------',data)
                    res.send(data)
                },(err)=>{
                    res.send('查找失败')
                })

});

//总条数
router.get('/myCount', function(req, res, next) {              
            Bao.find().then((data)=>{
                   //console.log('------',data)
                    res.send(data)
                },(err)=>{
                    res.send('查找失败')
                })

  
});

//查找标题
router.get('/title', function(req, res, next) {              
            Title.find().then((data)=>{
                   // console.log(data)
                    res.send(data)
                },(err)=>{
                    res.send('查找失败')
                })
 
});

router.get('/remove',function(req,res,next){
	// console.log(req.query)
	 Bao.remove({_id:req.query._id}).then((data)=>{
        if(data){
            res.send('删除成功')
        }else{
            res.send('删除失败')
        }
    },(err)=>{
        res.send('删除失败')
    })
    
})

router.get('/removeall',function(req,res,next){
    // console.log(req.query)
     Bao.remove({}).then((data)=>{
        if(data){
            res.send('删除成功')
        }else{
            res.send('删除失败')
        }
    },(err)=>{
        res.send('删除失败')
    })
    
})

// 通过id查找一条记录

router.get('/findOne',function(req,res,next){
   console.log(req.query._id)
     Bao.find({_id:req.query._id}).then((data)=>{
     
        res.send(data)
    },(err)=>{
        res.send('删除失败')
    })
})



//将更改数据插入到数据库，并返回数据给前端
router.get('/update',function(req,res,next) {
    // console.log(req.query)
    Bao.update({_id:req.query._id},{$set:{name:req.query.name,weixin:req.query.weixin,phone:req.query.phone,num:req.query.num}}).then((data)=>{
            res.send('更改成功')
        },(err)=>{
        res.send('更改失败')
    })
})

//将更改数据插入到数据库，并返回数据给前端
router.get('/updatetitle',function(req,res,next) {
    Title.update({_id:req.query._id},{$set:{title:req.query.title}}).then((data)=>{
            res.send('更改成功')
        },(err)=>{
        res.send('更改失败')
    })


})






// 上传图片
router.post("/xglogo",(req,res)=>{

    console.log(req.files);

    var file = req.files[0];
    
    var oldPath = "public/"+file.filename;
    var newPath = "public/1.jpg";
    fs.rename(oldPath,newPath,(err,data)=>{
        if(err){
            console.log("修改名称失败");
            res.send("上传成功 修改失败");
        }else {
            // console.log("修改成功");
            // res.write("上传成功");
            res.set('Content-Type','text/html');          
            // showMessage("修改成功了",res)                      
             res.render("errorMessage",{
                     urlPath:"http://runningh5.top/xfAdmin/index.html",
                     message:"修改成功"
                    })
            
        }
    })  

})



function showMessage(message,res){
    var result=`<script>alert('${message}');history.back()</script>`;
    res.send(result)
}

module.exports = router;
