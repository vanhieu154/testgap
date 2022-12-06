const deliveryInfo=document.querySelector(".delivery");
const deliveryInfo2=document.querySelector(".delivery2");
if(deliveryInfo){
    deliveryInfo.addEventListener("click",function(){
        document.querySelector(".delivery-info2").style.display="block"
        document.querySelector(".delivery-info").style.display="none"
    })
}
if(deliveryInfo2){
    deliveryInfo2.addEventListener("click",function(){
        document.querySelector(".delivery-info2").style.display="none"
        document.querySelector(".success-order").style.display="block"
    })
}
function showCartDetail(){
    var cart='';
    var pay=0;
    var p=JSON.parse(sessionStorage.getItem("Cart"));
    for (let i = 0; i < p.length; i++) {
        pay = pay+ p[i].total;
        cart+='<div class="col row">';
        cart+='<div class="col-3 text-left">';
        cart+='<img src="./access/Img/sanpham/'+(p[i].Hinhanh[0])+'"class="w-100"  alt="">';
        cart+='<iconify-icon icon="material-symbols:lens" class="icon--soluong" style="color: #6b4932;" width="30px"></iconify-icon>';
        cart+='<span class="number--soluong">'+p[i].quantity+'</span>';
        cart+='</div>';
        cart+='<div class="col-5 font--sp text-left">'+p[i].TenSP+'</div>';
        cart+='<div class="col-4 color--gia">'+((p[i].Price-p[i].Price*p[i].Discount/100)*p[i].quantity)+'<u>đ</u></div>';
        cart+='</div>';
        cart+='<br>';
    }
    document.getElementById('cart__product-container').innerHTML=cart;
    document.getElementById('productPrice').innerHTML=pay;

}
function dP(Number) {
    var pay=0;
    var p=JSON.parse(sessionStorage.getItem("Cart"));
    for (let i = 0; i < p.length; i++) {
        pay = pay+ p[i].total;
    }
    document.getElementById('deliveryP').innerHTML=Number
    document.getElementById('totalPrice').innerHTML=pay+Number;
}
function showEwallet(Number){
    var pay=0;
    var p=JSON.parse(sessionStorage.getItem("Cart"));
    for (let i = 0; i < p.length; i++) {
        pay = pay+ p[i].total;
    }
    if(Number == 0){
        if (pay > 500000) {
            alert("Không được chọn trả tiền trực tiếp khi giá trên 500K xin khách hàng chọn phương thức khác");
        }
        document.querySelector(".icon__qr").style.display="none";
    }else if(Number == 2){
        document.querySelector(".icon__qr").style.display="flex";
    }else if(Number == 1){
        document.querySelector(".icon__qr").style.display="none";
    }
}
function OTPInput() {
    const inputs = document.querySelectorAll('#otp > *[id]');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('keydown', function(event) {
        if (event.key === "Backspace") {
          inputs[i].value = '';
          if (i !== 0)
            inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== '') {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) //0-9 only
          {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1)
              inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1)
              inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }
  OTPInput();