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

function showWP(){
        var waitConfirm = sessionStorage.getItem("waitConfirm") ? JSON.parse(sessionStorage.getItem("waitConfirm")) : [];
        html="";
        if(waitConfirm.length==0){
            html+='<h2 style="text-align: center;">Bạn chưa có đơn hàng nào</h2>';
        }else{
            for (let i = 0; i < waitConfirm.length; i++) {
                var p=waitConfirm[i];
                var s=p.length-1;
                html+='<div class="row">';
                html+='<div class="col">';
                for (let a = 0; a < s; a++) {
                    console.log(p[a]);
                    html+='<p style="text-align: left;margin-left: 5%;">'+p[a].Hang+'</p>';
                    html+='</div>';
                    html+='<div class="col">';
                    html+='<p style="text-align: right;margin-right:20%">Chờ xác nhận</p>';
                    html+='</div>';
                    html+='</div>';
                    html+='<hr class="hr_style">';
                    html+='<div class="row" style="align-items: center">';
                    html+='<div class="col-2"> <img class="img-order" src="./access/Img/sanpham/'+p[a].Hinhanh[0]+'" alt=""></div>';
                    html+='<div class="col information" style="padding-left: 20px;">';
                    html+='<p>'+p[a].TenSP+'</p>';
                    html+='<p>Số lượng: '+p[a].quantity+'</p>';
                    html+='</div>';
                    html+='<div class="col price">';
                    if(p[a].Discount>0){
                        html+='<span style="color: red;font-size:20px">'+p[a].total+'<sup>đ</sup></span><del><span style="color: darkgray;">('+p[a].Price*p[a].quantity+')<sup>đ</sup></span></del>';
                    }else{
                        html+='<span style="color: red;font-size:20px">'+p[a].total+'<sup>đ</sup></span><del>';
                    }
                    html+='</div>';
                    html+='</div>';
                    html+='<hr class="hrr__style">';
                }
                if(p[s].discountNum>0){
                    html+='<div class="row">';
                    html+='<div class="col-6">Mã giảm giá áp dụng</div>';
                    html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discount+'</div>';
                    html+='<div class="col-6">Giá trị giảm</div>';
                    if(p[s].discountNum>1000){
                        html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discountNum+'<sup>đ</sup></div>';
                    }
                    html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discountNum+'%</div>';
                    html+='</div>';
                }
                html+='<div class="row total__bill">';
                html+='<p>Tổng số tiền: <span>'+p[s].price+'<sup>đ</sup></span></p>';
                html+='</div>';
                html+='<div class="row">';
                html+='<div class="col"></div>';
                html+='<div class="col"><button type="button" class="btn btn-view">Xem chi tiết đơn hàng</button></div>';
                html+='<div class="col"><button type="button" onclick="huyDon('+i+')" class="btn btn-view">Hủy đơn hàng</button></div>';
                html+='</div>';
            }
        }
        document.getElementById("wait-confirm-container").innerHTML=html;
        document.querySelector(".cho-xac-nhan").style.display="block"
        document.querySelector(".cho-lay-hang").style.display="none"
        document.querySelector(".dang-giao").style.display="none"
        document.querySelector(".da-giao").style.display="none"
        document.querySelector(".da-huy").style.display="none"
        document.querySelector(".chua-co-don-hang").style.display="none"
}
function huyDon(a){
    var waitConfirm = sessionStorage.getItem("waitConfirm") ? JSON.parse(sessionStorage.getItem("waitConfirm")) : [];
    var dissmissP = sessionStorage.getItem("dissmMissP") ? JSON.parse(sessionStorage.getItem("dissmMissP")) : [];
    for (let i = 0; i < waitConfirm.length; i++) {
        var p=waitConfirm[i];
        if(i == a){
            dissmissP[dissmissP.length]=p;
            waitConfirm.splice(i,1);
            sessionStorage.setItem('waitConfirm',JSON.stringify(waitConfirm));
            sessionStorage.setItem('dissmMissP',JSON.stringify(dissmissP));
            showWP();
        }
    }
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
function showDaHuy(){
    var dissmissP = sessionStorage.getItem("dissmMissP") ? JSON.parse(sessionStorage.getItem("dissmMissP")) : [];
    html="";
    if(dissmissP.length==0){
        html+='<h2 style="text-align: center;">Bạn chưa có đơn hủy nào</h2>';
    }else{
        for (let i = 0; i < dissmissP.length; i++) {
            var p=dissmissP[i];
            var s=p.length-1;
            html+='<div class="row">';
            html+='<div class="col">';
            for (let a = 0; a < s; a++) {
                console.log(p[a]);
                html+='<p style="text-align: left;margin-left: 5%;">'+p[a].Hang+'</p>';
                html+='</div>';
                html+='<div class="col">';
                html+='<p style="text-align: right;margin-right:20%">Đã Hủy</p>';
                html+='</div>';
                html+='</div>';
                html+='<hr class="hr_style">';
                html+='<div class="row" style="align-items: center">';
                html+='<div class="col-2"> <img class="img-order" src="./access/Img/sanpham/'+p[a].Hinhanh[0]+'" alt=""></div>';
                html+='<div class="col information" style="padding-left: 20px;">';
                html+='<p>'+p[a].TenSP+'</p>';
                html+='<p>Số lượng: '+p[a].quantity+'</p>';
                html+='</div>';
                html+='<div class="col price">';
                if(p[a].Discount>0){
                    html+='<span style="color: red;font-size:20px">'+p[a].total+'<sup>đ</sup></span><del><span style="color: darkgray;">('+p[a].Price*p[a].quantity+')<sup>đ</sup></span></del>';
                }else{
                    html+='<span style="color: red;font-size:20px">'+p[a].total+'<sup>đ</sup></span><del>';
                }
                html+='</div>';
                html+='</div>';
                html+='<hr class="hrr__style">';
            }
            if(p[s].discountNum>0){
                html+='<div class="row">';
                html+='<div class="col-6">Mã giảm giá áp dụng</div>';
                html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discount+'</div>';
                html+='<div class="col-6">Giá trị giảm</div>';
                if(p[s].discountNum>1000){
                    html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discountNum+'<sup>đ</sup></div>';
                }
                html+='<div class="col-6"  style="text-align: right; padding-right:20%">'+p[s].discountNum+'%</div>';
                html+='</div>';
            }
            html+='<div class="row total__bill">';
            html+='<p>Tổng số tiền: <span>'+p[s].price+'<sup>đ</sup></span></p>';
            html+='</div>';
            html+='<div class="row">';
            html+='<div class="col"></div>';
            html+='<div class="col"><button type="button" onclick="muaLai('+i+')" class="btn btn-view">Mua lại</button></div>';
            html+='<div class="col"><button type="button" class="btn btn-view">Chi tiết hủy đơn</button></div>';
            html+='</div>';
        }
    }
    document.getElementById("da_huy").innerHTML=html;
    document.querySelector(".cho-xac-nhan").style.display="none"
    document.querySelector(".cho-lay-hang").style.display="none"
    document.querySelector(".dang-giao").style.display="none"
    document.querySelector(".da-giao").style.display="none"
    document.querySelector(".da-huy").style.display="block"
    document.querySelector(".chua-co-don-hang").style.display="none"
}  
function muaLai(a){
    var waitConfirm = sessionStorage.getItem("waitConfirm") ? JSON.parse(sessionStorage.getItem("waitConfirm")) : [];
    var dissmissP = sessionStorage.getItem("dissmMissP") ? JSON.parse(sessionStorage.getItem("dissmMissP")) : [];
    for (let i = 0; i < dissmissP.length; i++) {
        var p=dissmissP[i];
        if(i == a){
            waitConfirm[waitConfirm.length]=p;
            dissmissP.splice(i,1);
            sessionStorage.setItem('waitConfirm',JSON.stringify(waitConfirm));
            sessionStorage.setItem('dissmMissP',JSON.stringify(dissmissP));
            showDaHuy();
        }
    }
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

