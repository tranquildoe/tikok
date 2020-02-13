
const button = document.getElementById('order-button');
const item_id =  document.querySelector("[data-item-id]").getAttribute("data-item-id")
const shop_id =  document.querySelector("[data-shop-id]").getAttribute("data-shop-id")

button.onclick = function (){
    axios.get(`/shopping/order-item/${shop_id}/${item_id}`)
    .then(dbRes => console.log(dbRes))
}