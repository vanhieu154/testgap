// hiện header khi scoll lên
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-105px";
    document.getElementById("header").style.marginTop = "0px";
  }
  prevScrollpos = currentScrollPos;
}
const nav = document.querySelector('.navbar')
fetch('./header.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
})
const footer = document.querySelector('.footer')
fetch('./footer.html')
.then(res=>res.text())
.then(data=>{
    footer.innerHTML=data
})

//------------------------------nav-header----------------------
function showSubnav() {
  document.getElementById("showSubnav").classList.toggle("activate");
}
function showHeaderList() {
  document.getElementById("header__list-container").classList.toggle("activate");
}
function showCart(){
  var p=JSON.parse(sessionStorage.getItem("Cart"))
  document.getElementById("header__cart").classList.toggle("activate");
  var cart=""; 
  var totalPrice='';
  if(sessionStorage.getItem("Cart") == null ){
  cart += "<svg style='color: var(--background-color)' xmlns='http://www.w3.org/2000/svg' width='50' height='50' fill='currentColor' class='cart-icon bi bi-cart2' viewBox='0 0 16 16'>";
  cart += "<path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'/>";
  cart += "</svg>";
  cart += "<p>Hiện chưa có sản phẩm</p>"
  cart+="<hr style='border: 2px solid;border-radius: 45px;background-color: #c6c6c6;color: #c6c6c6; opacity: 1;'>"
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
      cart+="<i class='fa-solid fa-xmark'></i>"
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
      cart+="<span  class='header__cart-item-minus'><i class='fa-solid fa-minus'></i></span>"
      cart+="<input type='number' min='1' name='header__cart-item-amount' class='header__cart-item-amount' value='"+p[i].quantity+"'>"
      cart+="<span  class='header__cart-item-plus' ><i class='fa-solid fa-plus'></i></span>"
      cart+="</div>"
      cart+="</div>"
      cart+="<div class='col-5' style='align-items: center;display:flex;justify-content: flex-end'>"
      cart+="<span class='header__cart-item__price-finnal'>"+(p[i].Price-p[i].Price*p[i].Discount/100)*p[i].quantity+"<u>đ</u></span>"
      cart+="</div>"
      cart+="</div>"  
      cart+="</div>"
      cart+="</div>"
      cart+="</div>"
      cart+="<hr style='border: 2px solid;border-radius: 45px;background-color: #c6c6c6;color: #c6c6c6; opacity: 1;'>"
    }
    totalPrice+='<span>'+pay+'<u>đ</u></span>';
  }
  document.getElementById("home-product-item__price-current").innerHTML=totalPrice;
  document.getElementById("header__cart-container").innerHTML=cart;
  const plusP=document.querySelectorAll(".header__cart-item-plus");
  const amountP=document.querySelectorAll(".header__cart-item-amount");
  const minusP=document.querySelectorAll(".header__cart-item-minus");
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
  const rItem = document.querySelectorAll(".fa-xmark");
  for (let i = 0; i < rItem.length; i++) {
    rItem[i].onclick=function(){
      p.splice(i,1);
      if(p.length == 0){
        sessionStorage.removeItem('Cart');
      }else{
      sessionStorage.setItem('Cart',JSON.stringify(p));
      }
    }
  }
}
function showLogin() {
  document.getElementById("header__login-container").classList.toggle("activate");
  let html="";
  if(sessionStorage.getItem('checkLogin') == 1){
    html+='<div class="header__login2">';
    html+='<ul>';
    html+='<li><a class="header__login-item" href="./myaccount.html"> Tài khoản của tôi</a></li>';
    html+='<li><a class="header__login-item" href="./myaccount.html"> Đơn hàng</a></li>';
    html+='<li><a class="header__login-item" href="./myaccount.html"> Thông báo</a></li>';
    html+='<li><a class="header__login-item" href="./myaccount.html"> Kho voucher</a></li>';
    html+='<li><a class="header__login-item" onclick="dangxuat()" href="#"> Đăng xuất</a></li>';
    html+='</ul>';
    html+='</div>';
  }else{
    html+='<div class="header__login">';
    html+='<!-- <form > -->';
    html+='<h2>ĐĂNG NHẬP TÀI KHOẢN</h2>';
    html+='<p>Nhập tài khoản và mật khẩu của bạn</p>';
    html+='<div class="header__login__nor">';
    html+='<input type="text" placeholder="Tài khoản" id="user" malgength="128">';
    html+='</div>';
    html+='<div class="header__login__nor">';
    html+='<input type="password"  placeholder="Mật khẩu" id="password">';
    html+='</div>';
    html+='<!-- <div class="btn-wrap header__login__confirm"> -->';
    html+='<button class="btn-header"  onclick="login()">Đăng nhập</button>';
    html+='<!-- </div> -->';
    html+='<div class="header__or">';
    html+='<div class="line"></div>';
    html+='<span class="or">hoặc</span>';
    html+='<div class="line"></div>';
    html+='</div>';
    html+='<div class="btn-wrap">';
    html+='<button class="btn-header">';
    html+='<div class="socials-icon  ">';
    html+='<i class="fa-brands fa-facebook"></i>';
    html+='</div>';
    html+='<div class="fb"><a href="https://www.facebook.com.vn">Facebook</a></div>';
    html+='</button>';
    html+='<button class="btn-header">';
    html+='<div class="socials-icon">';
    html+='<i class="fa-brands fa-google"></i>';
    html+='</div>';
    html+='<div class="gg"><a href="https://www.google.com.vn">Google</a></div>';
    html+='</button>';
    html+='</div>';
    html+='<div class="header__login__footer">';
    html+='Khách hàng mới? <a class="create-account" href="./dangky.html">Tạo tài khoản</a>';
    html+='</div>';
    html+='<div class="header__login__footer">';
    html+='Quên mật khẩu? <a href="./quenmatkhau.html" class="restore-pass">Khôi phục mật khẩu</a>';
    html+='</div>';
    html+='<!-- </form> -->';
    html+='</div>';
  }
  document.getElementById('header__login-container').innerHTML=html;
}
window.onclick = function(event) {
  if (!event.target.matches('.fa-cart-shopping,.cart_container,.header__cart-item-plus,.header__cart-item-minus,.header__cart-item-amount,.fa-minus,.fa-plus')){
    var dropdowns = document.getElementsByClassName("header__cart");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("activate")) {
          openDropdown.classList.remove("activate");  
        } 
    }
  }

}
var CheckDangNhap=0;
function login(){
  if(document.getElementById("user").value==""){
    alert("ban chưa nhập tên đăng nhập");
    document.getElementById("user").focus();
  }
  else if(document.getElementById("password").value==""){
    alert("bạn chưa nhập mật khẩu");
    document.getElementById("password").focus();
  }
  else{
    CheckLogin();
  }
}
function user( phone, nameDK, pass, gender){
  this.phone =phone;
  this.nameDK =nameDK;
  this.pass = pass;
  this.gender=gender;
}
function CheckLogin(){
  var tmp = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):[];
  var loginAccount = sessionStorage.getItem('loginAccount') ? JSON.parse(sessionStorage.getItem('loginAccount')):[];
  if(tmp.length == 0) {
    alert("Tài khoản không tồn tại. Mời đăng kí tài khoản để tiếp tục mua hàng");
    document.getElementById("user").value ="";
    document.getElementById("password").value ="";
    return false; 
  }
  var NameDN = document.getElementById("user").value;
  var pass = document.getElementById("password").value;
  // console.log(NameDN);
  // console.log(tmp.length);
  for(i =0; i<tmp.length;i++){
   if(NameDN === tmp[i].nameDK && tmp[i].pass === pass)
   {
    // console.log(tmp[i].gender);
    var tmp1 = new user(tmp[i].phone,tmp[i].nameDK,tmp[i].pass,tmp[i].gender);
    loginAccount.push(tmp1)
    sessionStorage.setItem('loginAccount',JSON.stringify(loginAccount));
    sessionStorage.setItem('checkLogin',1);
    alert("Đăng nhập thành công");
    let dropdowns1 = document.getElementsByClassName('header__login-container');
    for (let i = 0; i < dropdowns1.length; i++) {
      var openDropdown1 = dropdowns1[i];
      if (openDropdown1.classList.contains("activate")) {
          openDropdown1.classList.remove("activate");  
      } 
    }
    break;
   }
   if(i == tmp.length-1)
   alert("Tài khoản không tồn tại. Mời đăng kí tài khoản để tiếp tục mua hàng");
   document.getElementById("user").value ="";
   document.getElementById("password").value ="";
  }
}
function dangxuat(){
  sessionStorage.removeItem('checkLogin');
  sessionStorage.removeItem('loginAccount');
  alert("Đăng xuất thành công");
  let dropdowns1 = document.getElementsByClassName('header__login-container');
  for (let i = 0; i < dropdowns1.length; i++) {
    var openDropdown1 = dropdowns1[i];
    if (openDropdown1.classList.contains("activate")) {
        openDropdown1.classList.remove("activate");  
    } 
  }
  window.location='./trangchu.html';
}
function toProductPage(a) {
  ma="";
  switch (a){
      case 0: 
          ma ='Quần'
          break;
      case 1: 
          ma ='Áo'
          break;
      case 2: 
          ma ='Phụ kiện'
          break;
      case 3: 
          ma ='Váy'
          break;
      }
  sessionStorage.setItem('category',ma);
  window.location='./trangsp.html';
}
function pSearch(){
  let pS=document.getElementById('search-bar__input').value;
  sessionStorage.setItem('pSearch',pS); 
}
function pSearch1(){
  let pS=document.getElementById('search-bar__input1').value;
  sessionStorage.setItem('pSearch',pS); 
  window.location='./trangsp.html';
}
function toGioHang(){
  if(sessionStorage.getItem('checkLogin')==1){
    window.location='./giohangtrong.html'
  }else{
    alert("Bạn chưa đăng nhập")
  }
}
function toThanhToan(){
  if(sessionStorage.getItem('checkLogin')==1){
    window.location='./thanhtoan.html'
  }else{
    alert("Bạn chưa đăng nhập")
  }
}