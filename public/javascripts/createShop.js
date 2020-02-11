import service from './api.js'
const inputs = document.getElementsByClassName("input-create");
const imageFile = document.getElementById("file-input");
const typeSelect = document.getElementById("type");
const description = document.getElementById("description");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const container = document.getElementById("first-container")
const button = document.getElementById("submit-button")
const formCreate = document.getElementById("form-create-shop");
const id = formCreate.getAttribute("data-shop-id")
button.onclick = function (event) {
    const shopInfos = {
        // image: inputs.value,
        type: typeSelect.value,
        description: description.value,
        address: address.value,
        phone: phone.value
     };
    axios.patch(`http://localhost:9720/myshop/createShop/${id}`,{shopInfos})
    .then (res => {console.log("Hello mtf")
        container.innerHTML = "",
        container.innerHTML = `<div>${res.data}</div>`
    })
    }
