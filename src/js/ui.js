console.log("loading");

function filterArcoddian() {
  //필터아코디언
  var fltBtn = document.querySelectorAll(".filter-item");
  fltBtn.forEach(function (flt) {
    flt.addEventListener("click", function () {
      console.log("sadasd");
      let fltBtnPtn = flt.parentNode.querySelector(".filter-item");
      flt.classList.toggle("hide");
    });
  });
}
