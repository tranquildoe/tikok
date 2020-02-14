import service from "./api.js";
const geocoder = new google.maps.Geocoder();
const map = new google.maps.Map(document.getElementById('map'));

const imageFile = document.getElementById("file-input");
const typeSelect = document.getElementById("type");
const description = document.getElementById("description");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const container = document.getElementById("first-container");
const button = document.getElementById("submit-button");
const formCreate = document.getElementById("form-create-shop");
const id = formCreate.getAttribute("data-shop-id");


imageFile.onchange = () => {
  if(imageFile.files[0]){
    const tmpUrl = URL.createObjectURL(imageFile.files[0]);
    console.log(tmpUrl)
    console.log(imageFile.files[0])
    document.querySelector(".image-container img").src = tmpUrl;
  }
}

formCreate.onsubmit = function(event) {
  event.preventDefault();
  const shopInfos = {
    image: imageFile.files[0],
    // type: typeSelect.value,
    description: description.value,
    address: address.value,
    phone: phone.value
  };
  const formData = new FormData();

  for (let prop in shopInfos) {
    formData.append(prop, shopInfos[prop]);
  }

  service.post(`/myshop/create-shop/${id}`, formData).then(res => {
    replaceInfos(container, res);
  });
};

function replaceInfos(container, res) {
  container.querySelector(
    ".address-container"
  ).innerHTML = `<div>Address : ${res.data.address}</div>`;
  container.querySelector(
    ".phone-container"
  ).innerHTML = `<div>Phone : ${res.data.phone}</div>`;
  container.querySelector(
    ".description-container"
  ).innerHTML = `<div>Phone : ${res.data.description}</div>`;
  // container.querySelector('.type-container').innerHTML = `<div>Type : ${res.data.type}</div>`
  container.querySelector(
    ".image-container"
  ).innerHTML = `<img alt="shop" src="${res.data.image}" width="300"></div>`;
  button.parentElement.removeChild(button);
}
