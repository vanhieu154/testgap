function getUrlParams() {
    const params = new URLSearchParams (window.location.search);
    return params;
}
var maSp=getUrlParams().get("maSp");
// console.log(maSp);
// let product1=[];
let amountElement = document.getElementById('amount');
let amount=amountElement.value;
let render=(amount) =>{
    amountElement.value=amount;
}
function LoadJson(){
    fetch("./access/json/listproduct.json")
    .then(function(response){
        if(!response.ok){
            throw new Error("có lỗi: (")
        }
        return response.json()  
    })
    .then(
        function (data){
            let items="";
            let slider="";
            let productPrice="";
            for(let p of data){
                let html ="";
                let productDescription="";
                var priceDisount=0;
                priceDisount = p.Price-p.Discount*p.Price/100;
                if(p.MaSP == maSp){
                    console.log(maSp)
                    items="<div class='item'  data-bs-target='#carouselExampleDark' data-bs-slide-to='0' aria-current='true' aria-label='Slide 1' alt=''>";
                    items+="<img class='w-100' src='./access/Img/sanpham/"+p.Hinhanh[0]+"' />";
                    items+="</div>";

                    slider="<div class='carousel-item active' data-bs-interval='5000'>";
                    slider+="<img src='./access/Img/sanpham/"+p.Hinhanh[0]+"' class='d-block w-100' alt=''>";
                    slider+="</div>"
                    for (let a = 1; a < p.Hinhanh.length; a++) {
                        items+="<div class='item '  data-bs-target='#carouselExampleDark' data-bs-slide-to='"+a+"' aria-label='Slide "+(a+1)+"' alt=''>";
                        items+="<img class='w-100 ' src='./access/Img/sanpham/"+p.Hinhanh[a]+"' />"; 
                        items+="</div>";

                        slider+="<div class='carousel-item' data-bs-interval='5000'>";
                        slider+="<img src='./access/Img/sanpham/"+p.Hinhanh[a]+"' class='d-block w-100' alt=''>";
                        slider+="</div>";
                    }

                    if(p.Discount == 0){
                        productPrice="<span class='product__price-current'>"+p.Price+"đ</span>";
                    }else{
                        productPrice="<span class='product__discount' >-"+p.Discount+"%</span>";
                        productPrice+="<span class='product__price-current'>"+priceDisount+"đ</span>";
                        productPrice+="<span class='product__price-old'>"+p.Price+"đ</span>";
                    }
                    document.getElementById("product__price").innerHTML=productPrice;
                    for (let b = 0; b < Object.keys(p.Mota).length; b++) {
                        productDescription+="<p>"+p.Mota[b]+"</p>"
                        
                    }
                    var count=0;
                    for(let d of data){
                        if(d.Hang == p.Hang){
                            if(count<6){
                                count ++;
                                function showProduct(d) {
                                    var s = 0;
                                    s=d.Price-d.Discount*d.Price/100;
                                    let price ="";
                                    let discountTag="";
                                    if (d.Discount==0) {
                                        price+="<div class='home-product-item__price'>";
                                        price+="<span class='home-product-item__price-no-discount'>"+d.Price+"đ</span>";
                                        price+="</div>";
                                    }else{
                                        price+="<div class='home-product-item__price'>";
                                        price+="<span class='home-product-item__price-current'>"+s+"đ</span>";
                                        price+="<span class='home-product-item__price-old'>"+d.Price+"đ</span>";
                                        price+="</div>";
                                        
                                        discountTag+="<div class='home-product-item__sale-off'>";
                                        discountTag+="<div class='home-product-item__sale-off-percent'>"+d.Discount+"%</div>";
                                        discountTag+="<div class='home-product-item__sale-off-label'>GIẢM</div>";
                                        discountTag+="</div>";
                                    }
                                    
                                    html+="<div class='col-2 product' id='"+d.MaSP+"'>";
                                    html+="<button class='home-product-item w-100'  type='submit' name='maSp' id='"+d.MaSP+"' value='"+d.MaSP+"'>";
                                    html+="<div class='home-product-item__img' style='background-image:url(./access/Img/sanpham/"+d.Hinhanh[0]+")'></div>";
                                    html+="<h4 class='home-product-item__name'>"+d.TenSP+"</h4>";
                                    html+=price;
                                    html+="<div class='home-product-item__action'>";
                                    html+="<span class='home-product-item__like home-product-item__like--liked'>";
                                    html+="<i class='home-product-item__like-icon-emty fa-regular fa-heart'></i>";
                                    html+="<i class='home-product-item__like-icon-fil fa-solid fa-heart'></i>";
                                    html+="</span>";
                                    html+="</div>";
                                    html+="<div class='home-product-item__origin'>";
                                    html+="<div class='home-product-item__grand'>"+d.Hang+"</div>";
                                    html+="<div class='home-product-item__origin-name'>Nhật bản</div>";
                                    html+="</div>";
                                    html+="<div class='home-product-item__favor'>";
                                    html+="<i class='fa-solid fa-check'></i>";
                                    html+="<span>Yêu thích</span>";
                                    html+="</div>";
                                    html+=discountTag;
                                    html+="</button>";
                                    html+="</div>";
                                }
                                showProduct(d)
                            }else{
                                html+="";
                            }

                        }
                    }
                    document.getElementById("plusProduct").onclick=function(){
                        if(amount>p.Soluong-1){
                            amount=p.Soluong;
                        }else{
                        amount++;
                        }
                        render(amount);
                    }
                    document.getElementById("minusProduct").onclick=function(){
                        if(amount<2) {
                            amount =1;
                        }else{
                        amount--;
                        }
                        render(amount)
                    }
                    document.getElementById("product__size-size").innerHTML=p.Size;
                    document.getElementById("product-name").innerHTML=p.TenSP;
                    document.getElementById("product-brand").innerHTML=p.Hang;
                    document.getElementById("items").innerHTML=items;
                    document.getElementById("slider").innerHTML=slider;
                    document.getElementById("product__description-detail").innerHTML=productDescription;
                    document.getElementById("curent_product").innerHTML=p.TenSP;
                    document.getElementById("total_product").innerHTML=html;
                    
                    document.getElementById("product__btn-add").onclick=function(){
                        if(sessionStorage.getItem('checkLogin')==1){
                            var productQuantity=Number.parseInt(amount);
                            // console.log(productQuantity);
                            var addSP = sessionStorage.getItem("Cart") ? JSON.parse(sessionStorage.getItem("Cart")) : [];
                            price = Number.parseInt(p.Price);
                            for(p of data){
                                if(p.MaSP==maSp){
                                    addSP[addSP.length] = p;
                                    addSP[addSP.length-1].quantity = productQuantity;
                                    if(p.Discount>0){
                                        addSP[addSP.length-1].price = Number.parseInt(p.Price-p.Price*p.Discount/100);
                                    }else{
                                        addSP[addSP.length-1].price = Number.parseInt(p.Price);
                                    }
                                    addSP[addSP.length-1].total = addSP[addSP.length-1].price*productQuantity ;
                                }
                            }
                            for(i =0;i <addSP.length-1;i++){
                                for(j =i+1;j<addSP.length;j++){
                                    if(addSP[i].MaSP == addSP[j].MaSP)
                                        {
                                            addSP[i].quantity += addSP[j].quantity;
                                            addSP[i].total += addSP[j].total;
                                            addSP.splice(j,1);
                                        }
                                }
                            }
                            sessionStorage.setItem("Cart",JSON.stringify(addSP));
                            console.log(sessionStorage.getItem("Cart",JSON.stringify(addSP)));
                        }
                        else{
                            alert("Bạn chưa đăng nhập"); 
                        }

                    }
                }
            }
            }

        )
        .catch(function(err){
            throw new Error(err.message);
        })
        }   
// var x=60
// console.log(x);
// let minus=()=>{
//     x--;
// console.log(x);

// }
// setInterval(minus,1000);
let showDescription=()=>{
    document.getElementById("product__description-detail").classList.toggle("activate");
    document.getElementById("minus-icon-1").classList.toggle("deactivate");
    document.getElementById("plus-icon-1").classList.toggle("activate");
}
let showEvaluate=()=>{
    document.getElementById("product-evaluate").classList.toggle("activate");
    document.getElementById("minus-icon-2").classList.toggle("deactivate");
    document.getElementById("plus-icon-2").classList.toggle("activate");

}

