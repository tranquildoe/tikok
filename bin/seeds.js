const customerModel = require("../models/customer");
const orderModel = require("../models/order");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");

const someProductTemplates = [
    {name: "Bananes Jaunes",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Quelles sont belle smes bananes jaunes !",
    type: "Bananes",
    category: "vegetables",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581330687/tikok-Products/Bananes_jaunes_zeaetg.jpg"
  },
    {name: "Figues pommes",
    isTemplate: true,
    ref: "to defined",
    price: 0,
    quantity: 0,
    description : "Les meilleurs meilleures bananes du monde !",
    type: "Bananes",
    category: "fruits",
    likes :0,
    image: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581330687/tikok-Products/Bananes_jaunes_zeaetg.jpg"
  },

  

]


  mongoose
  .connect('mongodb://localhost:27017/tikok', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
tagModel.insertMany(someProductsTemplates)
.then(res => console.log("ok db inserted"))
.catch(err => console.log(err))