 const deleteBtn = document.querySelector(".deletebtn")
 const dltbuttons = document.querySelectorAll(".delete-btn")
 const editbuttons = document.querySelectorAll(".edit-btn")
 const formEdit = document.querySelector("edit-form");
 const shopId = document.querySelector("[data-shop-id]").getAttribute("data-shop-id")
  const id = document.querySelector("[data-item-id]").getAttribute("data-item-id")
//  const ebuttons = document.querySelectorAll(".cancelbtn")
 import service from "./api.js";
 
var trucAdelete ;
var trucAedit;

dltbuttons.forEach(btn => {
  btn.onclick = function (event){
    document.getElementById('delete-modal').style.display='block'
    trucAdelete = event.target.closest(".block")
  }});

deleteBtn.onclick = function(event) {
  console.log(id);
  console.log(shopId);
  console.log(trucAdelete, trucAdelete.parentElement);
  service.get(`/myshop/delete-item/${shopId}/${id}`)
    .then(shop => {trucAdelete.parentElement.removeChild(trucAdelete);
      document.getElementById('delete-modal').style.display='none'})
    }

editbuttons.forEach(btn => {
  btn.onclick = function (event){
    document.getElementById('edit-modal').style.display='block'
    trucAedit = event.target.closest(".block")
  }});

  formEdit.onsubmit = function(event) {
    event.preventDefault();
      const newInfos = {
        description: description.value,
        price: price.value,
        name: name.value,
        category: category.value,
      };
      service.post(`/myshop/edit-item/${shopId}/${id}`, {newInfos}).then(res => {
        console.log(res);
        // (container.innerHTML = ""),
        //   (container.innerHTML = `<div>Address : ${res.data.address}</div>
        //   <div>Description : ${res.data.description}</div>
        //   <div>Phone : ${res.data.phone}</div>`);
      });
    };
    
// deleteBtn.onclick = function(event) {
//   const shopId = document.querySelector("[data-shop-id]").getAttribute("data-shop-id")
//   const id = document.querySelector("[data-item-id]").getAttribute("data-item-id")
//   console.log(id);
//   console.log(shopId);
//   console.log(trucAdelete, trucAdelete.parentElement);
//   service.get(`/myshop/delete-item/${shopId}/${id}`)
//     .then(shop => {trucAdelete.parentElement.removeChild(trucAdelete);
//       document.getElementById('delete-modal').style.display='none'})
//     }

