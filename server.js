const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public_html'));

mongoose.set('strictQuery', true);
const connection_string = "mongodb+srv://doadmin:n29160F4T5fW7qJg@ostaa-b84e139c.mongo.ondigitalocean.com/admin?authSource=admin&tls=true";

mongoose.connect(connection_string, {useNewUrlParser:true});
mongoose.connections.concat('error', () =>{
  console.log('error');
})

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  stat: String
})

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  listings: [String],
  purchases: [String]
})


const Item = mongoose.model("Item", itemSchema);
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.end(mongoose.version);
})
app.post('/add/user', (req, res)=>{
  User.create({username: req.body.username, password: req.body.password});
})

app.get('/get/users', async (req, res)=>{
  const data = await User.find();
  res.json(data);
})

app.post('/add/item/:USERNAME', async (req, res)=>{
  const username = req.params.USERNAME;
  console.log('coming here');
  const newItem = new Item(req.body);
  newItem.save().then(()=>{
    console.log('new Item saved');
  });

  const user = await User.findOne({ username: username }).exec();
  user.listings.push(newItem.id);
  user.save();
  
})

app.get('/get/items', async (req, res)=>{
  const data = await Item.find();
  res.json(data);
})

app.get('/search/items/:KEYWORD', async (req, res)=>{
  const keyword = req.params.KEYWORD;
  const allItems = await Item.find({}).exec();
  const neededItems = [];
  for (i in allItems){
    if (allItems[i].description !=undefined && allItems[i].description.includes(keyword)){
      neededItems.push(allItems[i]);
    }
  }
  res.json(neededItems);
})

app.get('/search/users/:KEYWORD', async (req, res)=>{
  const keyword = req.params.KEYWORD;
  const allUsers = await User.find({}).exec();
  const neededUsers = [];
  for (i in allUsers){
    if (allUsers[i].username !=undefined && allUsers[i].username.includes(keyword)){
      neededUsers.push(allUsers[i]);
    }
  }
  res.json(neededUsers);
})

app.get('/get/listings/:USERNAME', async (req, res) =>{
    const username = req.params.USERNAME;
    const user = await User.findOne({username: username}).exec();
    const listings = [];
    for (i in user.listings){
      const item = await Item.findById(user.listings[i]);
      listings.push(item);
    }
    res.json(listings);
})

app.get('/get/purchases/:USERNAME', (req, res) =>{
  
})

app.listen(8080, ()=>{
  console.log('server is running');
})
