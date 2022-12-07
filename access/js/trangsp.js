
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
            showProduct(data,0,data.length,"total_product");   
            const typeCategorys = document.querySelectorAll(".type_category");
            for(let i=0; i<typeCategorys.length;i++){
                typeCategorys[i].onclick=function(){
                    let product=[];
                    let j=0;
                    var ma="";
                        switch (i){
                            case 0: 
                                ma ='Váy'
                                break;
                            case 1: 
                                ma ='Áo'
                                break;
                            case 2: 
                                ma ='Phụ kiện'
                                break;
                            case 3: 
                                ma ='Quần'
                                break;}
                    for(let p of data){
                        if(p.LoaiSP == ma){
                            product[j]=p;
                            j++
                        }}
                    showProduct(product,0,product.length,"total_product");  
                }
            }
            const btnCategory = document.getElementById("btn_list");
            btnCategory.onclick=function() {
                let product=[];
                var j=0;
                let all_brand_check = document.querySelectorAll('input[class="brand_category"]:checked');
                let all_price_check = document.querySelectorAll('input[class="price_category"]:checked');
                if(all_brand_check.length == 0){
                    for(let y = 0 ; y < all_price_check.length;y++){
                        let gia = all_price_check[y].value;
                        let s = 0;
                        for(let p of data){
                            s=p.Price-p.Discount*p.Price/100;
                            if (s>(gia-100000) && s<gia || s==gia) {
                                product[j]=p;
                                j++;  
                            }
                        }
                    }
                }else
                for(let x = 0; x < all_brand_check.length;  x++)
                {
                    let brand = all_brand_check[x].value;
                    for(let p of data ){
                        if(all_price_check.length==0){
                            if(p.Hang == brand){
                                product[j]=p;
                                j++;   
                            }   
                        }
                        if (p.Hang==brand) {
                            for(let y = 0 ; y<all_price_check.length;y++){
                                let gia=all_price_check[y].value;
                                let s = 0;
                                s=p.Price-p.Discount*p.Price/100;
                                if ( s > (gia-100000) && s < gia || s == gia ) {
                                    product[j]=p;
                                    j++;  
                                }
                            }
                        };
                    }
                }
                if(product.length == 0){
                    window.location='./404.html';
                    // document.getElementById("total_product").innerHTML="<h1 style='margin: auto;padding-top:50px;'>Không tìm thấy sản phẩm phù hợp</h1>";
                }else{
                    showProduct(product,0,product.length,"total_product"); 
                }  
            }
            const btnAllproduct =document.getElementById("all-product");
            btnAllproduct.onclick = function () {
                console.log(data);
                showProduct(data,0,data.length,"total_product");
            }
            if(sessionStorage.getItem('category') != null){
                let cate=sessionStorage.getItem('category');
                let product=[];
                let j=0;
                for(let p of data){
                    if(p.LoaiSP==cate){
                        product[j]=p;
                        j++;
                    }
                }
                sessionStorage.removeItem('category');
                showProduct(product,0,product.length,"total_product");  
            }
            if(sessionStorage.getItem('pSearch') != null){
                let pS = sessionStorage.getItem('pSearch');
                var arr=data;
                console.log(pS);
                let product=[];
                let j=0;
                for (i = 0; i < arr.length; i++){
                    if ((arr[i].TenSP).toLowerCase().search(pS.toLowerCase()) != -1) {
                        product[j] = arr[i];
                        j++;
                    }
                }
                console.log(product);
                if(product.length==0){
                    window.location='./404.html';
                    // document.getElementById("total_product").innerHTML="<h1 style='margin: auto;padding-top:50px;'>Không tìm thấy sản phẩm phù hợp</h1>";
                }
                sessionStorage.removeItem('pSearch');
                showProduct(product,0,product.length,"total_product")
            }
        }
    )
    .catch(function(err){
        throw new Error(err.message);
    })
}

