function showToast(msg) {
  var alert = document.getElementById("toast");
  if (alert == null){
    var toastHTML = '<div id="toast" style="z-index:1000;">' + msg + '</div>';
    document.body.insertAdjacentHTML('beforeEnd', toastHTML);
  } else{
    alert.innerHTML = msg;
    alert.style.opacity = .9;
  }
  intervalCounter = setInterval("hideToast()", 1500);
}

function hideToast() {
  var alert = document.getElementById("toast");
  alert.style.opacity = 0;
  clearInterval(intervalCounter);
}
