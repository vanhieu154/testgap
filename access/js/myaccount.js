const butTon=document.querySelector(".btn")
if(butTon){
    butTon.addEventListener("click",function(){
        document.querySelector(".btn-content").classList.toggle(("activeB"))
    })
}
const hoso=document.querySelector(".hoso");
const diachi=document.querySelector(".diachi");
const matkhau=document.querySelector(".doi-mat-khau");
if(hoso){
    hoso.addEventListener("click",function(){
        document.querySelector(".myaccount-body-right-ho-so-cua-toi").style.display="block"
        document.querySelector(".address").style.display="none"
        document.querySelector(".body__container-doi-mat-khau").style.display="none"

    })
}
if(diachi){
    diachi.addEventListener("click",function(){
        document.querySelector(".myaccount-body-right-ho-so-cua-toi").style.display="none"
        document.querySelector(".address").style.display="block"
        document.querySelector(".body__container-doi-mat-khau").style.display="none"

    })
}
if(matkhau){
    matkhau.addEventListener("click",function(){
        document.querySelector(".myaccount-body-right-ho-so-cua-toi").style.display="none"
        document.querySelector(".address").style.display="none"
        document.querySelector(".body__container-doi-mat-khau").style.display="block"

    })
}
const choxacnhan=document.querySelector(".myaccount-body-right-top-confirm");
if(choxacnhan){
    choxacnhan.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="block"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="none"
    })
}
const cholayhang=document.querySelector(".myaccount-body-right-top-cho-lay-hang");
if(choxacnhan){
    cholayhang.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="none"
        document.querySelector(".cho-lay-hang").style.display="block"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="none"
    })
}
const danggiao=document.querySelector(".myaccount-body-right-top-dang-giao");
if(danggiao){
    danggiao.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="none"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="block"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="none"
    })
}   
const dagiao=document.querySelector(".myaccount-body-right-top-da-giao");
if(dagiao){
    dagiao.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="none"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="block"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="none"
    })
}   
const dahuy=document.querySelector(".myaccount-body-right-top-da-huy");
if(dahuy){
    dahuy.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="none"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="block"
        document.querySelector(".chua-co-don-hang").style.display="none"
    })
}  
const hoanhang=document.querySelector(".myaccount-body-right-top-tra-hang");
if(hoanhang){
    hoanhang.addEventListener("click",function(){
        document.querySelector(".cho-xac-nhan").style.display="none"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="block"
    })
} 
// 
const btnDonHang=document.querySelector(".btn__donhang");
if(btnDonHang){
    btnDonHang.addEventListener("click",function(){
        document.querySelector(".body__container--hosocuatoi").style.display="none"
        document.querySelector(".body__container--Order").style.display="block"
        document.querySelector(".body__container--thongbao").style.display="none"
        document.querySelector(".body__container--OrderDetail").style.display="none"
    })
}
const btnhsct=document.querySelector(".btn__myaccount");
if(btnhsct){
    btnhsct.addEventListener("click",function(){
        document.querySelector(".body__container--hosocuatoi").style.display="block"
        document.querySelector(".body__container--Order").style.display="none"
        document.querySelector(".body__container--thongbao").style.display="none"
        document.querySelector(".body__container--OrderDetail").style.display="none"
    })
}
const btnthongbao=document.querySelector(".btn__thongbao");
if(btnthongbao){
    btnthongbao.addEventListener("click",function(){
        document.querySelector(".body__container--hosocuatoi").style.display="none"
        document.querySelector(".body__container--Order").style.display="none"
        document.querySelector(".body__container--thongbao").style.display="block"
        document.querySelector(".body__container--OrderDetail").style.display="none"
    })
}
const view=document.querySelector(".btn-viewdetail");
if(view){
    view.addEventListener("click",function(){
        document.querySelector(".body__container--OrderDetail").style.display="block"
        document.querySelector(".body__container--thongbao").style.display="none"
    })
}
const trolai=document.querySelector(".return--orderdetail");
if(trolai){
    trolai.addEventListener("click",function(){
        document.querySelector(".body__container--OrderDetail").style.display="none"
        document.querySelector(".body__container--thongbao").style.display="block"
    })
}
//Địa chỉ
var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
  method: "GET", 
  responseType: "application/json", 
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if(this.value != ""){
      const result = data.filter(n => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}
function showTK(){
    var acc=JSON.parse(sessionStorage.getItem('loginAccount'));
    const gioitinh= document.querySelectorAll('input[name="gioitinh"]');
    for (let i = 0; i < gioitinh.length; i++) {
        if(gioitinh[i].value==acc[0].gender){
            gioitinh[i].setAttribute("checked", "checked");
        }
    }
    document.getElementById('accName').innerHTML=acc[0].nameDK;
    document.getElementById('tendangnhap').innerHTML=acc[0].nameDK;
    document.getElementById('phone').innerHTML=acc[0].phone;

}
showTK()