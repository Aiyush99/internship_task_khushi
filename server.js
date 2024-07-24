const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express();

const tempStorage = []

app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'))
app.set('view engine ' ,'ejs');

//app.use(express.static('public'));

app.get("/",(req,res) => {
    res.render('index.ejs')
})
function validateForm(data) {
   
    const {name,age,email,terms} = data
    if(!name || !email || !age || !terms) {
        return false;
    }
    if(isNaN(age) || age <=0) {
        return false
    }
    return true;
}

app.post('/submit',(req,res)=>{
    const formData = req.body;

    if(!validateForm(formData)) {
        return res.status(400).send("invalid data")
    }

    tempStorage.push(formData)
    console.log(`received data: name:${formData.name},email:${formData.email}`)

    res.render('response.ejs',{name:formData.name,email:formData.email})
})

const PORT = 4000;

app.listen(PORT,()=>{
    console.log("server running on port ",PORT)
})
