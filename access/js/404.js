function LoadJson(){
    fetch("./access/json/listproduct.json")
    .then(function(response){
        if(!response.ok){
            throw new Error("có lỗi: (")
        }
        return response.json()
    })
    .then(
        function(data){
            function showProduct(arrP,start,end,place) {
                let html ="";
                for(i=start;i<end;i++){
                    if(i>=arrP.length) break;
                    var s = 0;
                    s=arrP[i].Price-arrP[i].Discount*arrP[i].Price/100;
                    let price ="";
                    let discountTag="";
                    if (arrP[i].Discount==0) {
                        price+="<div class='home-product-item__price'>";
                        price+="<span class='home-product-item__price-no-discount'>"+arrP[i].Price+"đ</span>";
                        price+="</div>";
                    }else{
                        price+="<div class='home-product-item__price'>";
                        price+="<span class='home-product-item__price-current'>"+s+"đ</span>";
                        price+="<span class='home-product-item__price-old'>"+arrP[i].Price+"đ</span>";
                        price+="</div>";
                        
                        discountTag+="<div class='home-product-item__sale-off'>";
                        discountTag+="<div class='home-product-item__sale-off-percent'>"+arrP[i].Discount+"%</div>";
                        discountTag+="<div class='home-product-item__sale-off-label'>GIẢM</div>";
                        discountTag+="</div>";
                    }
                    html+="<div class='col-xl-2 col-lg-3 col-4 product' id='"+arrP[i].MaSP+"'>";
                    html+="<button class='home-product-item w-100'  type='submit' name='maSp' id='"+arrP[i].MaSP+"' value='"+arrP[i].MaSP+"'>";
                    html+="<div class='home-product-item__img' style='background-image:url(./access/Img/sanpham/"+arrP[i].Hinhanh[0]+")'></div>";
                    html+="<h4 class='home-product-item__name'>"+arrP[i].TenSP+"</h4>";
                    html+=price;
                    html+="<div class='home-product-item__action'>";
                    html+="<span class='home-product-item__like home-product-item__like--liked'>";
                    html+="<i class='home-product-item__like-icon-emty fa-regular fa-heart'></i>";
                    html+="<i class='home-product-item__like-icon-fil fa-solid fa-heart'></i>";
                    html+="</span>";
                    html+="</div>";
                    html+="<div class='home-product-item__origin'>";
                    html+="<div class='home-product-item__grand'>"+arrP[i].Hang+"</div>";
                    html+="<div class='home-product-item__origin-name'>Nhật bản</div>";
                    html+="</div>";
                    html+="<div class='home-product-item__favor'>";
                    html+="<i class='fa-solid fa-check'></i>";
                    html+="<span>Yêu thích</span>";
                    html+="</div>";
                    html+=discountTag;
                    html+="</button>";
                    html+="</div>";
                    document.getElementById(place).innerHTML=html;
                }
            }    
            showProduct(data,data.length-6,data.length,"new_product");   
        }
    )
    .catch(function(err){
        throw new Error(err.message);
    })
}
function re_search() {
    let pS=document.getElementById('search').value;
    sessionStorage.setItem('pSearch',pS); 
    window.location='./trangsp.html';
}