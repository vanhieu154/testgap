// Setup End Date for Countdown (getTime == Time in Milleseconds)
let launchDate = new Date("Jan 28, 2023 12:00:00").getTime();

// Setup Timer to tick every 1 second
let timer = setInterval(tick, 1000);

function tick () {
  // Get current time
  let now = new Date().getTime();
  // Get the difference in time to get time left until reaches 0
  let t = launchDate - now;

  // Check if time is above 0
  if (t > 0) {
    // Setup Days, hours, seconds and minutes
    // Algorithm to calculate days...
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    // prefix any number below 10 with a "0" E.g. 1 = 01
    if (days < 10) { days = "0" + days; }
    
    // Algorithm to calculate hours
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) { hours = "0" + hours; }

    // Algorithm to calculate minutes
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    if (mins < 10) { mins = "0" + mins; }

    // Algorithm to calc seconds
    let secs = Math.floor((t % (1000 * 60)) / 1000);
    if (secs < 10) { secs = "0" + secs; }

    // Create Time String
    // let time = `${days} : ${hours} : ${mins} : ${secs}`;

    // Set time on document
    document.querySelectorAll('.countDown-time')[0].innerText = `${days}`;
    document.querySelectorAll('.countDown-time')[1].innerText = `${hours}`;
    document.querySelectorAll('.countDown-time')[2].innerText = `${mins}`;
    document.querySelectorAll('.countDown-time')[3].innerText = `${secs}`;
  }
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
                    html+="<div class='col-xl-2 col-lg-2 col-3 product' id='"+arrP[i].MaSP+"'>";
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
            let product=[];
            var j=0;
            for(p of data){
                if(p.Discount>0){
                    product[j]=p;
                    j++;   
                    // localStorage.setItem('product',product[j]);
                }
            }
            showProduct(product,0,product.length,"salesProduct");
        }
    )
    .catch(function(err){
        throw new Error(err.message);
    })
}