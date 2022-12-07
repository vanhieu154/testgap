var pay=0;
var a=JSON.parse(sessionStorage.getItem("Cart"));
for (let i = 0; i < a.length; i++) {
  pay = pay+ a[i].total;
}
const deliveryInfo2=document.querySelector(".delivery2");
function tohowtopay() {
      var KT_SDT = document.getElementById("sdt").value
      if(document.getElementById('hoten').value==""){
        alert("Bạn chưa nhập họ và tên");
        document.getElementById('hoten').focus();
      } 
      else if(document.getElementById('email').value==""){
        alert("Bạn chưa nhập Email");
        document.getElementById('email').focus();
      }
      else if(document.getElementById('sdt').value==""){
        alert("Bạn chưa nhập số điện thoại");
        document.getElementById('sdt').focus();
      }
      else if(KT_SDT[0] != 0 || KT_SDT.length != 10){
        alert(" số điện thoại không hợp lệ mời kiểm tra lại");
        document.getElementById("txt_phone").focus();
        document.getElementById("txt_phone").select();
      }
      else if(document.getElementById('diachi').value==""){
        alert("Bạn chưa nhập địa chỉ");
        document.getElementById('diachi').focus();
      }
      else if(document.getElementById('city').value=="tinh/thanh"){
        alert("Bạn chưa chọn tỉnh/ thành");
        document.getElementById('city').focus();
      }
      else if(document.getElementById('district').value=="quan/huyen"){
        alert("Bạn chưa chọn quận /huyện");
        document.getElementById('district').focus();
      }  
      else{
        document.querySelector(".delivery-info").style.display="none";
        document.querySelector(".delivery-info2").style.display="block";
      }
  }

if(deliveryInfo2){
    deliveryInfo2.addEventListener("click",function(){
      const deliveryPrice= document.querySelectorAll('input[name="deliveryPrice"]:checked');
      const howtopay=document.querySelectorAll('input[name="howtopay"]:checked');
      if(deliveryPrice.length == 0){
        alert("Bạn chưa chọn phương thức giao hàng")
      } 
      else if(howtopay.length == 0){
        alert("Bạn chưa chọn cách thanh toán")
      } 
      else{
        var wC = sessionStorage.getItem("waitConfirm") ? JSON.parse(sessionStorage.getItem("waitConfirm")) : [];
        const paymentMethod = document.querySelectorAll('input[name="howtopay"]');
        var method=""
        for (let i = 0; i < paymentMethod.length; i++) {
          if(paymentMethod[i].checked == true){
            switch (i) {
              case 0:
                method="Thanh toán khi nhận hàng (COD)"
                break;
              case 1:
                method="Chuyển khoản qua ngân hàng"
                break;
              case 2:
                method="Ví điện tử"
                break;
            }
          } 
        }
        document.getElementById('confirmPhone').innerHTML= document.getElementById('sdt').value;
        document.getElementById('confirmCity').innerHTML= document.getElementById('city').value;
        document.getElementById('confirmDis').innerHTML= document.getElementById('district').value;
        document.getElementById('paymentMethod').innerHTML= method;
        if(tmp==null){
          tmp = new finnalPrice("Không áp dụng voucher",0,pay);
        }
        wC[wC.length]=a;
        wC[wC.length-1].push(tmp);
        sessionStorage.removeItem("Cart");
        document.querySelector(".delivery-info2").style.display="none"
        document.getElementById("priceCal").style.display="none"
        document.querySelector(".success-order").style.display="block"
        sessionStorage.setItem('waitConfirm',JSON.stringify(wC));
      }
    })
}
const goBack =document.getElementById('back');
if(goBack){
  goBack.addEventListener("click",function(){
    document.querySelector(".delivery-info2").style.display="none"
    document.querySelector(".delivery-info").style.display="block"
  })
}

function showCartDetail(){
    var cart='';
    var p=JSON.parse(sessionStorage.getItem("Cart"));
    for (let i = 0; i < p.length; i++) {
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
function finnalPrice(discount,discountNum,price){
  this.discount=discount;
  this.discountNum=discountNum;
  this.price=price;
}
var tmp;
function voucherDiscount(){
  var s=document.getElementById('magiamgia').value;
  fetch("./access/json/listvoucher.json")
    .then(function(response){
        if(!response.ok){
            throw new Error("có lỗi: (")
        }
        return response.json()
    })
    .then(    
      function(data){
        for(p of data){
          if(p.MaVoucher == s){
            let html="";
            html+='<div class="col-6">Mã giảm giá:</div>';
            html+='<div class="col-6 text-right" id="voucher">'+p.MaVoucher+'</div>';
            html+='<div class="col-6">Giá trị giảm:</div>';
            console.log(p.Giatrigiam);
            if(p.Giatrigiam < 1000){
              pay = pay- pay*p.Giatrigiam/100;
              html+='<div class="col-6 text-right color--gia" id="voucherNum">'+p.Giatrigiam+'%</div>';
            }else{
              pay = pay - p.Giatrigiam;
              html+='<div class="col-6 text-right color--gia">'+p.Giatrigiam+'<u>đ</u></div>';
            }
            document.getElementById('productPrice').innerHTML=pay;
            alert("Áp dụng mã giảm giá thành công");
            document.getElementById('discount-code').innerHTML=html;
            tmp = new finnalPrice(p.MaVoucher,p.Giatrigiam,pay)
          }
        }
      }
    )
    .catch(function(err){
        throw new Error(err.message);
    })
}
function dP(Number) {
  document.getElementById('deliveryP').innerHTML=Number
  document.getElementById('totalPrice').innerHTML=pay+Number;
}
function showEwallet(Number){
  if(Number == 0){
      if (pay > 500000) {
          alert("Không được chọn trả tiền trực tiếp khi giá trên 500K xin khách hàng chọn phương thức khác");
          document.querySelector('input[name="howtopay"]').checked=false;
      }
      document.querySelector(".icon__qr").style.display="none";
  }else if(Number == 2){
      document.querySelector(".icon__qr").style.display="flex";
  }else if(Number == 1){
      document.querySelector(".icon__qr").style.display="none";
  }
}