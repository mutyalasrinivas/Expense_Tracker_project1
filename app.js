
const express = require("express");
const fs= require('fs');
const path = require('path');
 const mysql=require('mysql2')
const bodyParser = require("body-parser");
 const cors = require("cors");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan =require('morgan');
const sequelize = require('./utils/database');
const User=require('./models/users');
const Expense = require('./models/expense')
const userRoutes=require('./routes/users')
const expenseRoutes=require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium');
const resetPasswordRoutes = require('./routes/resetpassword');
const Order = require("./models/orders");
const Forgotpassword = require('./models/forgotpassword');
const DownloadedFile =require('./models/downloadedfile');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);
const app = express();
dotenv.config();





app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',resetPasswordRoutes);

app.use((req,res)=>{
    console.log('url->',req.url);
    res.sendFile(path.join(__dirname,`frontend/${req.url}`));
})

app.use(helmet());
app.use(morgan('combined',{stream:accessLogStream}));

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(DownloadedFile);

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT|| 3000,()=>console.log("server running"))
})
.catch((err)=>{
    console.log("err------>>>>"+err);
})






 