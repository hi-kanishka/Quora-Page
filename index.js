const express = require("express");
var methodOverride = require('method-override');
const app = express();
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
const port = 8080;
app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})
app.set("view engine" , "ejs");
const path  = require("path");
app.set("views",path.join(__dirname,"views"));//for view folder
app.use(express.static(path.join(__dirname,"public"))); // for public folder]
//parsing the data 
app.use(express.urlencoded({extended:true}));

//for generating id
const { v4: uuidv4 } = require('uuid');
//uuidv4(); //as we implement this unique id will be created
//posts data
let posts =[
    {
        id:uuidv4(),
        username : "kanishka_p_",
        content : "i am learning RESTful API"
    },
    {
        id:uuidv4(),
        username: "Anshika077",
        content : "REST are rules and RESTful API follow those rules"
    },
    {
        id:uuidv4(),
        username: "harshhh",
        content : "this is a quora post where we are writing RESTful API for the functionalities"
    }
]
//INDEX(main)ROUTE 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
//CREATE ROUTE
//i)Serve the form
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})
//ii)add new post to the form
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let{username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    //res.render(" ",{  })
})

//SHOW Route
app.get("/posts/:id",(req,res)=>{
    const {id} = req.params;
    let post = posts.find(arr_element=>id===arr_element.id);//it will return post with that id   
    res.render("show.ejs",{post});   
})
//UPDATE Route
app.get("/posts/:id/edit",(req,res)=>{
    const {id} = req.params;
    let post = posts.find(arr_element=>id===arr_element.id);
    res.render("edit.ejs",{post});

})
app.patch("/posts/:id",(req,res)=>{
    const {id} = req.params;   
    const newcontent = req.body.content;//this will give value of request body's  content parametr sent during patch
    let post = posts.find(arr_element=>id===arr_element.id);
    post.content = newcontent;
    res.redirect("/posts");  
})
//DESTROY Route
app.delete("/posts/:id",(req,res)=>{
    const {id} = req.params;
    posts = posts.filter(arr_element=>arr_element.id!==id);
    res.redirect("/posts");
})


