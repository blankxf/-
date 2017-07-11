var express = require('express');
var router = express.Router();


var mongoose=require('mongoose');
var Bao=mongoose.model('Baos',{
    name:String,
    weixin:String,
    phone:Number,
    num:Number
})

var Title=mongoose.model('Title',{
     
     title:String
})



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
            console.log("page:",page);
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
                   console.log(data)
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
    // console.log(req.query)
    Title.update({_id:req.query._id},{$set:{title:req.query.title}}).then((data)=>{
            res.send('更改成功')
        },(err)=>{
        res.send('更改失败')
    })
})

module.exports = router;
