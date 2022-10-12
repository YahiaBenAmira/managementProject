let dataProduct = [];
function each(coll, f) { 
    if (Array.isArray(coll)) { 
        for (var i = 0; i < coll.length; i++) { 
            f(coll[i], i); 
        } 
    } else { 
        for (var key in coll) { 
            f(coll[key], key); 
        } 
    } 
} 

function totally() {
    //each(e,function(element,index) {
        if($('#price').val() == '') {
            alert('please provide a valid price for the item.')

        }else if($('#price').val() !==  '') {
            var total = $('#price').val() * $('#quantity').val() + $('#tax')
            console.log(total)
            $('#tot').innerHtml = total;
            $('#tot').css('color:red')
        }
        return total;
    }

$('#add').click(function(){
    let newproduct = {
        title:$('.name').val(),
        price:$('#price').val(),
        quantity:$('#quantity').val(),
        tax:$('#tax').val(),
        //total:this.total
    
    }
    dataProduct.push(newproduct)
})
$('#tot').click(function(){
    return totally();
})