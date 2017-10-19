/*var express = require('express');
var router = express.Router();


 //GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express李振营1qweqw' });
});

module.exports = router;*/
var http = require('http');

module.exports = function(app) {
    app.get('/index', function(req, res) {
    	var nav;
    	if(req.query.nav){
    		nav = req.query.nav;
    	}
    	nav = 0;
        res.render('index', { title: '网站主页' ,nav : nav, manifest: app.get("manifest"), config: app.get("config")});
    });
	

    app.get('/talks',function(req, res){
    	console.log("getdata!!");
    	//http.get('')
    	var nav = req.query.nav;
    	res.render('talks', { title: '前端杂谈',nav : nav, manifest: app.get("manifest")});
    	
    });

    app.get('/beautifulLife',function(req, res){
    	console.log("getdata!!");
    	//http.get('')
    	var nav = req.query.nav;
    	res.render('beautifulLife', { title: '生活娱乐',nav : nav, manifest: app.get("manifest")});
    });

    app.get('/myDiary',function(req, res){
    	console.log("getdata!!");
    	//http.get('')
    	var nav = req.query.nav;
    	res.render('myDiary', { title: '个人日志', nav : nav,manifest: app.get("manifest")});
    });

    app.get('/myResume',function(req, res){
    	console.log("getdata!!");
    	//http.get('')
    	var nav = req.query.nav;
    	res.render('myResume', { title: '个人简历', nav : nav,manifest: app.get("manifest")});
    });

};

