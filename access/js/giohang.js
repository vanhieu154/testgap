function showCartPage(){
    var p=JSON.parse(sessionStorage.getItem("Cart"))
    var cart=""; 
    var totalPrice='';
    if(sessionStorage.getItem("Cart") == null){
        cart+='<h2>Giỏ hàng của bạn đang trống</h2>'
    }else{
      var pay=0;
      for (let i = 0; i < p.length; i++) {
        pay=pay+p[i].total;
        cart+="<div class='row'>"
        cart+="<div class='col-2'>"
        cart+="<img class='w-100' src='./access/Img/sanpham/"+p[i].Hinhanh[0]+"' alt=''>"
        cart+="</div>"
        cart+="<div style='position: relative; text-align: left;' class='col-10'>"
        cart+="<div class='header__cart-item__delete'>"
        cart+="<i class='fa-solid fa-xmark remove__Item'></i>"
        cart+="</div>"
        cart+="<div class='header__cart-item__infor'>"
        cart+="<div class='header__cart-item__header'>"+p[i].TenSP+"</div>"
        cart+="<div class='header__cart-item__price-container row'>"
        cart+="<div class='col-7'>"
        cart+="<div class='header__cart-item__price'>"
        if(p[i].Discount>0){
          cart+="<span class='header__cart-item__price-current'>"+((p[i].Price-p[i].Price*p[i].Discount/100)*p[i].quantity)+"<u>đ</u></span>"
          cart+="<span class='header__cart-item__price-old'>("+((p[i].Price)*p[i].quantity)+"đ)</span>"
        }else{
          cart+="<span class='header__cart-item__price-current'>"+((p[i].Price)*p[i].quantity)+"<u>đ</u></span>"
        }
        cart+="</div>"
        cart+="<div class='header__cart-item__quantity'>"
        cart+="<span  class='cart-item-minus'><i class='fa-solid fa-minus'></i></span>"
        cart+="<input type='number' min='1' name='cart-item-amount' class='cart-item-amount' value='"+p[i].quantity+"'>"
        cart+="<span  class='cart-item-plus' ><i class='fa-solid fa-plus'></i></span>"
        cart+="</div>"
        cart+="</div>"
        cart+="<div class='col-5' style='align-items: center;display:flex;justify-content: flex-end'>"
        cart+="<span class='header__cart-item__price-finnal'>"+(p[i].Price-p[i].Price*p[i].Discount/100)*p[i].quantity+"<u>đ</u></span>"
        cart+="</div>"
        cart+="</div>"  
        cart+="</div>"
        cart+="</div>"
        cart+="<hr>"
        cart+="</div>"
      }
      totalPrice+='<span>'+pay+'<u>đ</u></span>';
    }
    document.getElementById("sosanpham").innerHTML='<span>'+p.length+' sản phẩm</span>'
    document.getElementById("cart__item__container").innerHTML=cart;
    document.getElementById("sotien").innerHTML=totalPrice;
    const plusP=document.querySelectorAll(".cart-item-plus");
    const amountP=document.querySelectorAll(".cart-item-amount");
    const minusP=document.querySelectorAll(".cart-item-minus");
    for (let i = 0; i < minusP.length; i++) {
      let amount=amountP[i].value;
      let render=(amount)=>{amountP[i].value=amount};
      minusP[i].onclick=function(){
        if(amount<2) {
          amount =1;
        }else{
          amount--;
        }
        render(amount); 
        // p[i].quantity=amount;
        // sessionStorage.setItem('Cart',JSON.stringify(p));
      }
      plusP[i].onclick=function(){
        if(amount>p[i].Soluong-1){
          amount=p[i].Soluong;
        }else{
        amount++;
        }
        render(amount);
        // p[i].quantity=amount;
        // sessionStorage.setItem('Cart',JSON.stringify(p));
      }
    }
    const rItem = document.querySelectorAll(".remove__Item");
    for (let i = 0; i < rItem.length; i++) {
      rItem[i].onclick=function(){
        p.splice(i,1);
        if(p=[]){
          sessionStorage.removeItem('Cart');
        }else{
        sessionStorage.setItem('Cart',JSON.stringify(p));
        }
      }
    }
}