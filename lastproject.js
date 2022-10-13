var title = document.getElementById('title')
var price = document.getElementById('price')
var ads = document.getElementById('ads')
var taxes = document.getElementById('taxes')
var discount = document.getElementById('discount')
var submit =document.getElementById('submit')
var total = document.getElementById('total')
var category = document.getElementById('category')

// Function total 
function getTotal() {
    if(price.value != ''){
        var result =( +price.value + +ads.value + +taxes.value ) - +discount.value
        total.innerHTML = result
    }
    else{
        total.innerHTML = ''
    }
}

// Create product
var dataProduct;
if(localStorage.product != null){
  dataProduct=JSON.parse(localStorage.product)
}
else{
  dataProduct=[];
}


submit.onclick = function(){
    var newProd ={
         title:title.value,
         price:price.value,
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         category:category.value
    }
    dataProduct.push(newProd)
    // Save localStorage
    localStorage.setItem('product', JSON.stringify(dataProduct))

    clearData()
    showData()

}


//Clear data function

function clearData(){
    title.value = '';
    price.value = '';
    ads.value =  '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
   
}

// read 

function showData(){
    var  table = ''
    for( var i = 0 ; i < dataProduct.length ; i++ ){
        table += `
        <tr id="table"+i>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})"id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete" >delete</button></td>
        </tr>
        `
        
    }

    document.getElementById('tbody').innerHTML = table
}
showData()

// Delete function 

function deleteData(i){
  console.log(i)
  dataProduct.splice(i,1)
  //Delete it from the localStorage
  localStorage.product = JSON.stringify(dataProduct)
  showData()
}
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].dicount
    getTotal()
    count.style.display = 'none'
    submit.innerHTML = 'Update'


}