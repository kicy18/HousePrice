function getbathvalue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
function getbhkvalue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function onClickedEstimatePrice(){
    console.log("estimated price button is clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getbhkvalue();
    var bath = getbathvalue();
    var location = document.getElementById("uiLocations")
    var estprice = document.getElementById("uiEstimatedPrice")

    //var url = "http://127.0.0.1:5000/predict_home_price"
    var url = "/api/predict_home_price"
    $.post(url,{
        total_sqft : parseFloat(sqft.value),
        bhk : bhk,
        bath : bath,
        location:location.value
    },function(data , status){
        console.log(data.estimated_price)
        estprice.innerHTML = "<h2>" + data.estimated_price.toString() +"Lakh</h2>";
        console.log(status)
    })


}
function onPageLoad(){
    console.log("document is Loading")

    //var url = "http://127.0.0.1:5000/get_location_name";
    var url = "/api/get_location_name"
    $.get(url , function(data , status){
        console.log("get response from get_location_name");
        if(data){
            var location = data.location;
            var uilocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in location){
                var opt = new Option(location[i]);
                $('#uiLocations').append(opt);
            }
        }
    })

}

window.onload = onPageLoad;