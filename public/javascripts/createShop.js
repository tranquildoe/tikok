import service from "./api.js";
const inputs = document.getElementsByClassName("input-create");
const imageFile = document.getElementById("file-input");
const typeSelect = document.getElementById("type");
const description = document.getElementById("description");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const container = document.getElementById("first-container");
const button = document.getElementById("submit-button");
const formCreate = document.getElementById("form-create-shop");
const id = formCreate.getAttribute("data-shop-id");

formCreate.onsubmit = function(event) {
event.preventDefault();
  const shopInfos = {
    // image: inputs.value,
    // type: typeSelect.value,
    description: description.value,
    address: address.value,
    phone: phone.value
  };
  axios.post(`/myshop/create-shop/${id}`, {shopInfos}).then(res => {
    console.log(res);
    (container.innerHTML = ""),
      (container.innerHTML = `<div>${res.data.address}</div>`);
  });
};
