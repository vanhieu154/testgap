function user( phone, nameDK, pass,gender){
    this.phone =phone;
    this.nameDK =nameDK;
    this.pass = pass;
    this.gender=gender;
}
function dangky(){
  var KT_SDT = document.getElementById("txt_phone").value
  if(document.getElementById("txt_name_dk").value==""){
    alert("bạn chưa nhập tên đăng nhập");
    document.getElementById("txt_name_dk").focus();
  }
  else if(document.getElementById("txt_name_dk").value.length < 5) 
  {
    alert("tên đăng nhập không hợp lê. Mời nhập lại");
    document.getElementById("txt_name_dk").focus();
  }
  else if(document.getElementById("passDK").value==""){
    alert("bạn chưa nhập mật khẩu");
    document.getElementById("passDK").focus();
  }
  else if(document.getElementById("passDK").value.length < 3) 
  {
    alert("mật khẩu phải có độ dài hơn 3 kí tự. Mời nhập lại");
    document.getElementById("passDK").focus();
  }
  else if(document.getElementById("passDK2").value==""){
    alert("bạn chưa nhập lại mật khẩu");
    document.getElementById("passDK").focus();
  }
  else if(document.getElementById("passDK2").value != document.getElementById("passDK").value) 
  {
    alert("mật khẩu nhập lại chưa trùng khớp");
    document.getElementById("passDK2").focus();
  }
  else if(document.getElementById("txt_phone").value=="" ){
    alert("Bạn chưa nhập số điện thoại");
    document.getElementById("txt_phone").focus();
  }
  else if(KT_SDT[0] != 0 || KT_SDT.length != 10){
    alert(" số điện thoại không hợp lệ mời kiểm tra lại");
    document.getElementById("txt_phone").focus();
    document.getElementById("txt_phone").select();
  }
  else{
  check();
 }
}
function check(){
    var temp= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):[];
    var kt =document.getElementById('txt_name_dk').value;  
    var kt_sdt =document.getElementById("txt_phone").value;
    if( localStorage.getItem('user') == null){
        var tmp= new user(document.getElementById("txt_phone").value, document.getElementById("txt_name_dk").value,document.getElementById("passDK").value,document.querySelector('input[name="gender"]:checked').value);
        temp.push(tmp);
        localStorage.setItem('user',JSON.stringify(temp));
        console.log(localStorage.getItem('user',JSON.stringify(temp)));
        window.location ="./otp-dangky.html";
        return;
    }
    for(i =0; i<temp.length;i++){
      if(kt === String(temp[i].nameDK))
        {
            alert("Tên đăng nhập đã tồn tại. Mời nhập tên đăng nhập khác")
            document.getElementById("txt_name_dk").focus()
            document.getElementById("txt_name_dk").select()
                break;
        }
        else if(kt_sdt === String(temp[i].phone)){
          alert("Số điện thoại đã được đăng kí. Mời nhập số điện thoại khác")
           document.getElementById("txt_phone").focus()
           document.getElementById("txt_phone").select()
           break;
        }
        else if(i === temp.length-1){
          var tmp= new user(document.getElementById("txt_phone").value, document.getElementById("txt_name_dk").value,document.getElementById("passDK").value);
          temp.push(tmp);
          window.location ="./otp-dangky.html";
          break;
        }       
    }
    localStorage.setItem('user',JSON.stringify(temp))
}