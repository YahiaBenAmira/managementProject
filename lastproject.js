var title = document.getElementById('title')
var price = document.getElementById('price')
var ads = document.getElementById('ads')
var taxes = document.getElementById('taxes')
var discount = document.getElementById('discount')
var total = document.getElementById('total')
var submit =document.getElementById('submit')
var quantity = document.getElementById('quantity')
var system = 'create' // starting with the creation
var waku ; // an empty variable to be used later on.
var username = document.getElementById('user')
var password = document.getElementById('pass')
let account = [];
var login = document.getElementById('log')

// Function total 
function getTotal() {
    if(price.value != ''){ // if the price value is not an empty string calculate the total.
        var result =( +price.value + +ads.value + +taxes.value ) - +discount.value // we used the + before the declaration to sum the value because it is defined as a string
        total.innerHTML = result // push the result to the innerhtml which is in this case the total.

    }
    else{
        total.innerHTML = '' // else keep it empty until we calculate.
    }
}

// creation of our product starts here.
var dataProduct;
if(localStorage.product != null){ // if the product inside the local storage is not null (null means the intentional absence of any object value)
  dataProduct=JSON.parse(localStorage.product) // change the data in the local storage from an object to a string.
}
else{
  dataProduct=[]; // keep an empty array.
}

// this is our submit button function
submit.onclick = function(){ 
    var newProd ={ // adding new product to our values provided
         title:title.value,
         price:price.value,
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         quantity:quantity.value, 
    }
    if(system === 'create'){ // if the system on creation mode meaning the button shows as create
      if(newProd.quantity > 1){ // the quantity of the item is more than 1 
        for(var i = 0 ; i<newProd.quantity; i++){ // looping on the newproduct count
          dataProduct.push(newProd) // push the object values  to an array as much as the count defined
        }
      }
      else{
        dataProduct.push(newProd)
      }
    }
      else{
        dataProduct[waku] = newProd; // this gives the value  index of the new product
        quantity.style.display = 'block'; // this will fill the entire line
      }
    
    
    // Save localStorage
    localStorage.setItem('product', JSON.stringify(dataProduct)) // sets the item in our local storage which is the product in this case and covert its type to a string

    clearData() // invoking the function clear data.
      
    showData() // invoking the function showdata after it's been cleared.

}


// Function clear data 

function clearData(){
    title.value = '';
    price.value = '';
    ads.value =  '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    quantity.value = ''; 
    
   
}


// this is our function showData
function showData(){
    var  table = '' // defining an variable with an empty string
    for( var i = 0 ; i < dataProduct.length ; i++ ){ // looping on the length of the product
        
        table +=`
        <tr>
        <td>${i}</td>
        <td><b>${dataProduct[i].title}</b></td>
        <td><b>${dataProduct[i].price}</b></td>
        <td><b>${dataProduct[i].ads}</b></td>
        <td><b>${dataProduct[i].taxes}</b></td>
        <td><b>${dataProduct[i].discount}</b></td>
        <td>${dataProduct[i].quantity}</b></td>
        <td><button onclick="updateData(${i})" id="update" >Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete" >Delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table
    var btnDelete = document.getElementById('deleteAll')
    if(dataProduct.length > 0 ){
      btnDelete.innerHTML = `<button onclick="deleteAll()">delete All</button>`
    }
    else{
      btnDelete.innerHTML = ''
    }
  }
showData()

// Function delete  

function deleteData(i){
  dataProduct.splice(i,1) // checking the the line with the index u want to delete and u splice it.
// Delete it from the localStorage
  localStorage.product = JSON.stringify(dataProduct) // changin the value pushed to a string in an object
  showData() // invoking the show data function to update the webb
}

// Function delete all  

function deleteAll(){
  localStorage.clear() // clearing the local storage so when you refresh all data have been erased.
  dataProduct.splice(0) // clearing the data that is shown for the user. 
  showData() // invoking the showdata function 
}

// Function update

function updateData(i){
  title.value = dataProduct[i].title; // updating the title
  price.value = dataProduct[i].price; // updating the price
  ads.value = dataProduct[i].ads; // updating the advertising price.
  taxes.value = dataProduct[i].taxes; // updating the taxes included
  discount.value = dataProduct[i].discount; // updating the discount
  getTotal() // invoking the getTotal function to update the result
  quantity.style.display = 'none'; // when updating an element we want the count to be reseted so the user dosen't get confused.
  submit.innerHTML = 'Update'; // switching the button Create to Update.
  system = 'update'; // changin from creation to update.
  waku = i ; // storing the indexses of each table row.
  
}
