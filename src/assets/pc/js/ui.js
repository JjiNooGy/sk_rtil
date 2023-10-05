console.log("loading");

/******************************
///////lnb 제조사 필터
******************************/
function filterArcoddian() {
  var fltBtn = document.querySelectorAll(".filter-item");
  fltBtn.forEach(function (flt) {
    flt.addEventListener("click", function () {
      console.log("sadasd");
      let fltBtnPtn = flt.parentNode.querySelector(".filter-item");
      flt.classList.toggle("hide");
    });
  });
}

/******************************
///////Tab 1depth
******************************/
function tabContent2(evt, carStatus) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(carStatus).style.display = "block";
  evt.currentTarget.className += " active";
}

/******************************
///////Tab 2depth
******************************/
function tabInTab() {
  console.log("call tabSample");
  const tabItem = document.querySelectorAll(".tab_item_dpt1");
  const tabInner = document.querySelectorAll(".tab_inner_dpt1");

  tabItem.forEach((tab, idx) => {
    tab.addEventListener("click", function () {
      tabInner.forEach((inner) => {
        inner.classList.remove("active");
      });

      tabItem.forEach((item) => {
        item.classList.remove("active");
      });

      tabItem[idx].classList.add("active");
      tabInner[idx].classList.add("active");
    });
  });
}

/******************************
///////패밀리사이트 셀렉트박스 스크립트
******************************/
// 패밀리사이트 셀렉트박스 스크립트
// const familyElements = document.querySelectorAll(".FamilySite");

// function toggleSelectBox(familyBox) {
//   familyBox.classList.toggle("active");
// }

// familyElements.forEach((familyBoxElement) => {
//   familyBoxElement.addEventListener("click", function (e) {
//     const targetElement = e.target;
//     const isOptionElement = targetElement.classList.contains("option");

//     if (isOptionElement) {
//       selectOption(targetElement);
//     }

//     toggleSelectBox(familyBoxElement);
//   });
// });

// document.addEventListener("click", function (e) {
//   const targetElement = e.target;
//   const isSelect = targetElement.classList.contains("select") || targetElement.closest(".FamilySite");

//   if (isSelect) {
//     return;
//   }

//   const allFamilyElements = document.querySelectorAll(".FamilySite");

//   allFamilyElements.forEach((boxElement) => {
//     boxElement.classList.remove("active");
//   });
// });

/******************************
///////아코디언-qna-개별
******************************/
// 모바일 사업자정보 펼침 토글
function moreView() {
  let menu = document.querySelector(".info-detail");
  menu.classList.toggle("active");
}

//인풋박스 초기화버튼 커스터마이징
var btnClear = document.querySelectorAll(".btnClear");
btnClear.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.parentNode.querySelector("input").value = "";
  });
});

/******************************
///////아코디언-qna-개별
******************************/
// qna
var acc = document.getElementsByClassName("q-box");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.parentNode.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
/******************************
///////아코디언-qna-연동
******************************/
var acc = document.getElementsByClassName("accordion"); //아코디언클래스리스트를 가져온다.
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    //클릭이벤트를 추가한다.
    /* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */

    this.parentNode.classList.toggle("active"); //부모 노드의 클래스를 추가하거나 삭제함.

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling; //현재 아코디언의 다음노트를 가져온다. panel이 옴.
    if (panel.style.display === "block") {
      //출력모드가 블럭인지 none인지 체크한다.
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/******************************
///////아코디언
******************************/
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

/******************************
///////팝업스크립트
******************************/
var target = document.querySelectorAll(".open-pop");
var btnPopClose = document.querySelectorAll(".popup-wrap .pop-close");
var targetID;
// 팝업 열기
for (var i = 0; i < target.length; i++) {
  target[i].addEventListener("click", function () {
    targetID = this.getAttribute("data-rel");
    document.querySelector(targetID).style.display = "block";
  });
}

// 팝업 닫기
for (var j = 0; j < target.length; j++) {
  btnPopClose[j].addEventListener("click", function () {
    //    document.querySelector(targetID).style.display = 'none';
    this.parentNode.parentNode.parentNode.style.display = "none";
  });
}

/*
var target = document.querySelectorAll('.btn-open');
var btnPopClose = document.querySelectorAll('.pop_wrap .btn_close');
var targetID;

// 팝업 열기
for(var i = 0; i < target.length; i++){
  target[i].addEventListener('click', function(){
    targetID = this.getAttribute('data-rel');
    document.querySelector(targetID).style.display = 'block';
  });
}

// 팝업 닫기
for(var j = 0; j < target.length; j++){
  btnPopClose[j].addEventListener('click', function(){
    this.parentNode.parentNode.style.display = 'none';
  });
}
*/

/******************************
///////드롭다운
******************************/
const selectBoxElements = document.querySelectorAll(".dropdown-box");

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  //선택옵션 셀렉트 박스에 반영하기
  const selectBox = optionElement.closest(".dropdown-box");
  const selectedElement = selectBox.querySelector(".droped-value");
  selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach((selectBoxElement) => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    if (isOptionElement) {
      selectOption(targetElement);
    }

    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select") || targetElement.closest(".dropdown-box");

  if (isSelect) {
    return;
  }

  const allSelectBoxElements = document.querySelectorAll(".dropdown-box");

  allSelectBoxElements.forEach((boxElement) => {
    boxElement.classList.remove("active");
  });
});
