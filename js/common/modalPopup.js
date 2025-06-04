/**
 * 	function 명 	: modal_popup
 *  function 설명	: 레이어 팝업을 호출한다.
 *  @param url			: 호출 URL
 *  @param data		: 1. json 형식 ex> {"key1" : "value1", "key2" : "value2"}
 *  			  2. form serialize 형식 ex> $("#formObj").serialize(); => id=jht&pw=jht
 *  @author 진주영
 *  @sinc 2019-05-08
 */
var modalCount = 0;

//모달창 닫기 이벤트 중복 방지
var modalCloseFlag = false;

//alert 중복 방지
var modalCloseAlert = false;

$(document).on('shown.bs.modal', '.modal', function () {
	//zIndex 계산
	//1040 -> 120
    var zIndex = 120 + (10 * modalCount);
	
	//최근 열린 모달 z-index 설정
    $(this).css('z-index', zIndex);
	
	//모달 애니메이션 동작
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
	
	//모달 포커싱
	$(this).focus();
	
	//모달 카운트 추가
    modalCount = modalCount + 1;
});

//멀티 모달창의경우 모달창 닫힐때 스크롤바 생기는 오류 수정
$(document).on('hidden.bs.modal', '.modal:not(.osl-evt__out-page)', function () {
	//draggable 소멸
	var draggie = $(this).data('draggabilly');
	if(!$.osl.isNull(draggie)){
		draggie.destroy();
	}
	
	//열린 모달창이 존재하는 경우
	if($('.modal:visible').length > 0){
		//모달창 오픈 상태로 변경
		$(document.body).addClass('modal-open');
	}
	
	try {
		OSLApp.allDestroy($(this).attr("id"));
	}catch (e) {
		// TODO: handle exception
	}
	
	//해당 모달창 제거
	$(this).remove();
	
	//모달 카운트
	modalCount = modalCount - 1;
	
	//메인 모달이 없는경우 그 외 모든 .modal 제거
	var mainModalCnt = $(".modal[id^=lpx]:not(.osl-evt__out-page)").length;
	if(mainModalCnt == 0){
		$(".modal:not([id], .osl-evt__out-page), .note-popover").remove();
	}
	
	//가이드 스택 제거
	$.osl.guide.guideStack.pop();
	
});


//모달창 닫는 경우 경고메시지 출력
$(document).on('hide.bs.modal', '.modal:not(.modal-guide)', function () {

	//섬머노트 이미지파일 첨부시 자동으로 닫히는 경우
	if($.osl.isNull(event)){
		modalCloseFlag = false;
		return true;
	}
	
	if(event){
		//중복 이벤트 중지
		event.cancelable = true;
		event.stopPropagation();
		event.preventDefault();
		event.returnValue = false;
	}
	
	//alert창, confirm창 떠 있는경우 이벤트 중지
	if($(document).find(".swal2-container.swal2-backdrop-show").length > 0){
		modalCloseAlert = true;
	}else{
		modalCloseAlert = false;
	}
	
	try {
		//열린 툴팁 모두 닫기
		OSLApp.fnCloseTooltips();
	}catch (e) {
		// TODO: handle exception
	}
	
	if(modalCloseAlert){
		return false;
	}
	
	//모달 object
	var that = this;
	
	//모달 창  닫는경우
	if(modalCloseFlag){
		modalCloseFlag = false;
		return true;
	}
	
	//브라우저 경로 받아오기
	var path = eventPath(event); 
	if($(that).data("backdrop")==true && path.length != 5 || event.keyCode == 27){
		modalCloseFlag = false;
		return true;
	}

	//alert flag
	modalCloseAlert = true;
	
	$.osl.confirm($.osl.lang("common.modal.closeAlert"),null,function(result) {
		modalCloseAlert = false;
	    if (result.value) {
	    	try {
	    		//모두 해제
	    		OSLApp.allDestroy($(that).attr("id"));
	    	}catch (e) {
	    		// TODO: handle exception
	    	}
	    	
	    	//모달창 닫기
	    	modalCloseFlag = true;
	    	
	    	//모달창 닫기 이벤트
	    	$(that).modal('hide');
	    }
	});
	
	//모달창 닫기 이벤트 중지
	return false;
});
/**
 * modal_popup - 모달창 오픈(팝업창 - 기존 레이어팝업)
 * @param url		: 모달창 내용 ajax url
 * @param data		: 모달창 ajax에 전달할 data
 * @param opts		: 모달창 옵션
 * @opt
 * 			modalSize		: 모달 창 크기 [fs, xl, lg, md, sm] - (fs: full screen)
 * 			fitScreen		: 모달 창 높이를 브라우저 높이에 맞게 조절 (max-width 1024 이하에서는 height 100% 적용)
 * 			backdrop		: 모달 창 영역 외에 클릭으로 모달 창 닫기 여부 [true - default, false - 배경 마스크 제거 및 백드롭 중지, "static" - 배경 마스크 출력 및 백드롭 중지]
 * 			keyboard		: 키보드 ESC 버튼으로 모달 창 닫기 여부
 * 			showLoading		: 모달 창 오픈시 로딩화면 여부
 * 			closeConfirm	: 모달 창 닫기 클릭 했을때 닫을건지 경고창 여부
 * 			idKeyDuple		: 같은 모달 창 중복 팝업 여부 (권장 하지 않음, 변수 중복 문제 등)
 * 			idKey			: 모달 창을 오픈한 객체(같은 모달 중복 팝업 방지) 
 * 			focus			: open modal auto focusing
 * 			autoHeight		: 브라우저 높이 조절 시 자동으로 모달 사이즈 맞춤
 * 			draggable		: 모달 창 이동 가능 여부 (F2키 누를 시 오픈된 모든 모달 창 위치 원래대로)
 * 			class			: header, body, footer에 추가 class 선언
 * 			ftScrollUse		: 퍼펙트 스크롤 적용 유무, false인경우 브라우저 기본 스크롤 적용 (기본 값 true)
 */
var modal_popup = function(url, data, opts, guideKey){
	var options;
	var opts = opts;
	
	//기본 옵션
	var defaultOptions = {
			modalSize: 'lg',
			fitScreen: true,
			backdrop: true,
			keyboard: true, 
			showLoading: true,
			closeConfirm: true,
			idKeyDuple: false,
			focus: false,
			autoHeight: true,
			draggable: true,
			ftScrollUse: true,
			'class': {
				/*
				 * header css 상세 부여
				 * header: {
				 * 		header: "",
				 * 		headerTitle: "",
				 * 		headerBtn: ""
				 * }
				 * */
				"header": "",
				"body": "",
				"footer": ""
			}
	};
	
	//options 적용
	options = $.extend(true, defaultOptions, opts, opts);
	
	//같은 모달 중복 방지 체크
	if(!options.idKeyDuple){
		var breakOut = false;
		if($(".modal[data-idkeyduple=false]").length > 0){
			$.each($(".modal[data-idkeyduple=false]"), function(idx, elem){
				if($(elem).data("idkey") == options.idKey ){
					$.osl.alert($.osl.lang("common.error.modalDuple"));
					breakOut = true;
					return false;
				}
			});
			if(breakOut){
				return false;
			}
		}
	}
	
	//중복 모달 구분 id
	var layerIndex = $(".modal").length;
	var layerBoxDivId = "lpx"+layerIndex;
	
	//모달 타입에 따른 class 지정 (default)
	var modalContentClass = '';
	//var modalSize = "modal-"+options.modalSize;
	var modalSize = "osl-md-"+options.modalSize;
	
	//모달 제목
	var modalTitle = '';
	if(options.hasOwnProperty("modalTitle")){
		modalTitle = $.osl.escapeHtml(options.modalTitle);
	}

	//모달 footer button 채우기
	var footerBtnStr = '';
	if(options.hasOwnProperty("footerBtn")){
		footerBtnStr = options.footerBtn.join("");
	}
	
	var classHeader = options.class.header;
	var classHeaderTitle = classHeaderBtn = "";
	
	//header css 분기(String, object)
	if(typeof options.class.header == "object"){
		if(options.class.header.hasOwnProperty("header")){
			classHeader = options.class.header.header;
		}
		if(options.class.header.hasOwnProperty("headerTitle")){
			classHeaderTitle = options.class.header.headerTitle;
		}
		if(options.class.header.hasOwnProperty("headerBtn")){
			classHeaderBtn = options.class.header.headerBtn;
		}
	}
	
	//modal size full screen
	var mainModalFrameCss = "";
	if(options.modalSize != null && options.modalSize == "fs"){
		mainModalFrameCss = "modal-fullscreen";
		//modal-fs는 없는 클래스이므로 제거
		modalSize = "";
	}
	
	//modal fit screen
	if(options.modalSize == "fs" && options.fitScreen){
		//완전히 딱 맞는 풀스크린을 원하는 경우
		modalContentClass = "";
	}else if(options.modalSize == "fs" && !options.fitScreen){
		//약간 작은 풀스크린을 원하는 경우
		//mainModalFrameCss = "osl-modal__screen--fit";
		mainModalFrameCss = "osl-md-fit";
		modalContentClass = "";
	}
	
	$("body").prepend(
		'<div class="modal" id="'+layerBoxDivId+'" role="dialog" tabIndex="-1" aria-labelledby="'+layerBoxDivId+'" aria-hidden="true" data-backdrop="'+options.backdrop+'" data-keyboard="'+options.keyboard+'" data-closeconfirm="'+options.closeConfirm+'" data-idkeyduple="'+options.idKeyDuple+'" data-idkey="'+options.idKey+'" data-focus="'+options.focus+'" data-draggable="'+options.draggable+'">'
			+'<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered osl-evt__modal-size-area '+mainModalFrameCss+' '+modalSize+'" role="document">'
				+'<div class="modal-content '+modalContentClass+'">'
					+'<div class="modal-header h-60px '+classHeader+'">'
						+'<h3 class="osl-evt__modal-title modal-title '+classHeaderTitle+'">'+modalTitle+'</h3>'
						+'<div class="btn btn-sm btn-icon '+classHeaderBtn+' close" data-bs-dismiss="modal" aria-label="Close">'
						+'	<span class="osl-blind">close</span>'
						+'</div>'
					+'</div>'
					+'<div class="modal-body '+options.class.body+'" id="'+layerBoxDivId+'Body">'
						
					+'</div>'
				+'</div>'
			+'</div>'
		+'</div>'
	);
	
	//draggable 활성화 체크
	if(options.draggable){
		var dragObj = new Draggabilly( '#'+layerBoxDivId+' .modal-dialog', {
			handle: '.modal-header'
		});
		$('#'+layerBoxDivId).data('draggabilly', dragObj);
		
		//modal-header에 css 추가
		$('#'+layerBoxDivId+' .modal-header').addClass("cursor-move");
		
		//헤더 클릭시 
		dragObj.on("pointerDown", function(){
			try{
				//현재 팝업에서 열려있는 select2 지우기
				$('#'+layerBoxDivId).find('select[data-control=select2]').select2('close');
			}catch (e) {
				//console.log(e);
			}
		});
	}
	
	//로딩 바
	var loadingShowVal = options.showLoading;
	
	//param에 모달 ID 전달
	if($.osl.isNull(data)){
		data = {};
	}
	
	data["modalId"] = layerBoxDivId;
	
	//AJAX 설정
	var ajaxObj = new $.osl.ajaxRequestAction(
			{"url":url,async:true, loadingShow: loadingShowVal}
			,data);
	//AJAX 전송 성공 함수
	ajaxObj.setFnSuccess(function(data, textStatus, xhr){
		$.osl.deferred= $.Deferred();
		
		//모달 창 오픈
		$("#"+layerBoxDivId).modal('show');
		
		//모달 창 내용 넣기
		$("#"+layerBoxDivId+" .modal-body").html(data);

		//모달 footer 이동
		var modalFooter = $("#"+layerBoxDivId+" .modal-body").find(".modal-footer");
		modalFooter.addClass(options.class.footer);
		
		if(modalFooter.length > 0){
			//modalFooter에 있는 span data-lang-cd 찾기
			var modalFooterSpan = modalFooter.find("span[data-lang-cd]");
			if(modalFooterSpan.length > 0){
				$.each(modalFooterSpan, function(idx, map){
					var dataLangCd = $(map).data("lang-cd");
					$(map).html($.osl.lang(dataLangCd));
				});
			}
			
			$("#"+layerBoxDivId+" .modal-body").after(modalFooter);
		}else{
			$("#"+layerBoxDivId+" .modal-body").after(
					'<div class="modal-footer '+options.class.footer+'">'
						+'<button type="button" class="btn btn-secondary btn-capsule" data-bs-dismiss="modal">'
							+ '<i class="osl-icon osl-md osl-icon-closed--black osl-me-4"></i>' +$.osl.lang("modal.close")
						+'</button>'
					+'</div>'
			);
		}
		
		//modal-header, modal-footer에 넣을 zIndex는 zIndex+5;
		var zIndex = parseInt($("#"+layerBoxDivId).css("z-index"));
		$("#"+layerBoxDivId).find(".modal-header, .modal-footer").css("z-index", zIndex+5);
		
		//fullSize일 때 자동 사이즈 조절 안하는경우
		if(options.modalSize == "fs" && !options.autoHeight){
			//모달 창 높이 고정시키기
			var height = $("#"+layerBoxDivId+" .modal-body").height();
			$("#"+layerBoxDivId+" .modal-body").attr("style", "height:"+height+"px !important;");
		}
		//fs 외 크기일 때, 자동 사이즈 조절 안하는경우
		else if(!options.autoHeight){ 
			$("#"+layerBoxDivId+" .modal-body").attr("style", "height:100vh !important;");
		}
		//스크린에 무조건 맞추는 경우
		else if(modalContentClass == "osl-modal__screen--fit"){
			//윈도우 크기
			var viewHeight = window.innerHeight;
			//헤더 크기
			var modalHeaderHeight = $("#"+layerBoxDivId+" .modal-header").innerHeight();
			//풋터 크기
			var modalFooterHeight = $("#"+layerBoxDivId+" .modal-footer").innerHeight();
			
			var height = viewHeight - modalHeaderHeight - modalFooterHeight;
			$("#"+layerBoxDivId+" .modal-body").attr("style", "height:"+height+"px !important;");
		}
		
		//input[type=number]에 touchSpin 적용
		$.osl.util.initInputNumbers();
		
		//callback 함수 적용
		if(options.hasOwnProperty("callback")){
			$.each(options.callback, function(idx, map){
				var targetId = map.targetId;
				var actionFn = map.actionFn;
				if(targetId != "modal.hide"){
					var targetElem = $("#"+targetId);
					
					if(targetElem.length > 0 && typeof actionFn == "function"){
						$(targetElem).click(function(){
							actionFn(this);
						});
					}
				}else{
					//모달 닫기 이벤트 클릭일 때
					var targetElems = $("#"+layerBoxDivId+" [data-bs-dismiss='modal']");
					if(targetElems.length > 0 && typeof actionFn == "function"){
						$(document).on('hide.bs.modal', "#"+layerBoxDivId+'.modal:not(.modal-guide)', function () {
							actionFn(this);
						});
					}
				}
			});
		}

		//modal 가이드 추가
		$.osl.guide.guideStack.push({open: true, target: $("#"+layerBoxDivId), key: guideKey});

		/*
		//modal form에 자동으로 tabindex 넣기
		var modalForm = $("#"+layerBoxDivId+" .modal-body form");
		if(modalForm.length > 0){
			$.each(modalForm, function(formIdx, form){
				var tagList = $(form).find("input[type!=hidden],select,textarea,button");
				var startTabIdx = 1;
				
				//입력 상자 목록
				$.each(tagList, function(idx, map){
					//첫번째 태그 focus
					if(idx == 0){
						$(map).focus();
					}
					$(map).attr("tabindex", startTabIdx);
					startTabIdx++;
					
					console.log(map);
				});
			});
		}
		*/
		//실행 완료 호출
		$.osl.deferred.resolve();
		return $.osl.deferred.promise();
	});
	
	//AJAX 전송 오류 함수
	ajaxObj.setFnError(function(xhr, status, err){
		if(xhr.status == '999'){
    		$.osl.alert($.osl.lang("common.error.sessionInvalid"));
    		document.location.href="/cmm/cmm4000/cmm4000/selectCmm4000View.do"
    		return;
    	}
		if(xhr.status == '404'){
			console.log(err);
			$.osl.alert($.osl.lang("common.error.popup"));
    		$.osl.showLoadingBar(false);
    		
    		//모달 창 즉시 닫기
    		modalCloseFlag = true;
    		$("#"+layerBoxDivId).modal("hide");
			//제거
			try{
				$("#"+layerBoxDivId).remove();
			}
			catch(e){
				//동작 없음
				console.log(e);
			}
    		return;
    	}
		if(xhr.status == '401'){
			$.osl.alert($.osl.lang("common.error.nonAuth"));
			$.osl.showLoadingBar(false);
    		
    		//모달 창 즉시 닫기
    		modalCloseFlag = true;
    		$("#"+layerBoxDivId).modal("hide");
			//제거
			try{
				$("#"+layerBoxDivId).remove();
			}
			catch(e){
				//동작 없음
				console.log(e);
			}
    		return;
    	}
	});
	
	//AJAX 전송
	ajaxObj.send();
	
	
	return layerBoxDivId;
}
/**
 * eventPath - 이벤트 동작시 path 받아오기
 * @param evt		: 이벤트 객체
 */
var eventPath = function(evt) {
	  
	var path = (evt.composedPath && evt.composedPath()) || evt.path;
    var target = evt.target;
    
    //경로가 NULL이 아닌 경우, IE가 아닌 경우
    if (path != null) {
    	// 사파리는 window를 가지고 있지 않다.
    	path = (path.indexOf(window) < 0) ? path.concat([window]) : path;
    	return path;
    }
    
    //재귀함수 멈추는 조건
    if (target === window) {
    	return [window];
    }
    
    //IE의 경우, 재귀함수로 마지막까지 연결 
    function getParents(node, memo) {
    	memo = memo || [];
    	//부모 노드
    	var parentNode = node.parentNode;

    	if (!parentNode) {
    		return memo;
    	} else {
    		return getParents(parentNode, memo.concat([parentNode]));
    	}
    }

    return [target]
    	.concat(getParents(target))
    	.concat([window]);
}

