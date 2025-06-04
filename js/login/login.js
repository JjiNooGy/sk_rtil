"use strict";
var OSLLogin = function () {
	
	// Private functions
	var documentSetting = function () {
		var hiddenParamForm = $("#kt_hidden_param_form")[0];
		
		//requestScope에서 전달 받은 파라미터 값
		var joinCheck = hiddenParamForm.joinCheck.value;
		var loginType = hiddenParamForm.loginType.value;
		var loginYn = hiddenParamForm.loginYn.value;
		var isPrjYn = hiddenParamForm.isPrjYn.value;
		var logoutYn = hiddenParamForm.logoutYn.value;
		var message = hiddenParamForm.message.value;
		var sessionYn = hiddenParamForm.sessionYn.value;
		var iniYn  = hiddenParamForm.iniYn.value;  //초기화 여부
		var exprYn  = hiddenParamForm.exprYn.value; 	// 비밀번호 만료여부
		var paramUsrId = hiddenParamForm.paramUsrId.value;
		var paramEmail = hiddenParamForm.paramEmail.value;
		var paramUsrPw = hiddenParamForm.paramUsrPw.value;
		var licGrpId = hiddenParamForm.licGrpId.value;
		
		//사용자 ID,PW 객체 name 정보 있는지 여부에 따라 변경
		var usrIdElName = $("#usrIdElName").val();
		if(!$.osl.isNull(usrIdElName)) {
			$("#usrId").attr("name", usrIdElName);
		}
		var usrPwElName = $("#usrPwElName").val();
		if(!$.osl.isNull(usrPwElName)) {
			$("#usrPw").attr("name", usrPwElName);
		}
		
		var loginSessionYn = $("#loginSessionYn").val();
		
		//회원 가입 여부
		if(joinCheck == "Y"){
			$("#joinLink").removeClass("d-none");
			
			/* 레이어 팝업 띄우기 */
			$('#joinLink').click(function() {
				var options = {
						idKey: this.id,
						modalTitle: $.osl.lang("cmm3000.title.main.default"),
						autoHeight: false,
						modalSize: 'md',
						class:{
							body: " p-0",
							/*footer: " d-none"*/
						}
					};
				
				$.osl.layerPopupOpen('/cmm/cmm3000/cmm3000/selectCmm3000View.do', null, options);
			});
		}else{
			$("#joinLink").remove();
		}

		if(iniYn == 'Y'){
			var data = { "usrId" : paramUsrId  , "iniYn": "Y", "licGrpId": licGrpId};
			var options = {
					idKey: "iniPw",
					modalTitle: $.osl.lang("cmm4002.title.main.default"),
					autoHeight: false,
				};
			$.osl.layerPopupOpen('/cmm/cmm4000/cmm4000/selectCmm4002View.do', data , options);
		}
		
		// 비빌번호 만료가 되었을 경우 팝업 띄워서 비밀번호 변경하도록
		if(exprYn == "Y"){
			$.osl.alert($.osl.lang("login.message.exprYn"),{"type": "warning"}, function(result){
				var data = { "usrId" : paramUsrId , "exprYn" : exprYn , "licGrpId" : licGrpId};
				var options = {
						idKey: "exprPw",
						modalTitle: $.osl.lang("cmm4002.title.main.default"),
						autoHeight: false,
					};
				$.osl.layerPopupOpen('/cmm/cmm4000/cmm4000/selectCmm4002View.do', data , options);
			});
			return false;
		}	
		
		//세션이 만료된 경우 세션 만료 메시지 띄움.
		if(sessionYn == 'N'){
			$.osl.alert(message, {}, function(){
				//로그인 ID 대상
				if(loginType == "email"){
					$("#email").inputmask({
			            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
			            greedy: false,
			            definitions: {
			                '*': {
			                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
			                    cardinality: 1,
			                    casing: "lower"
			                }
			            }
			        });
					
					$('#email').focus();
				}else{
					$('#usrId').focus();	// 아이디 입력란 key focus
				}
			});
			//확인창 버튼에 포커스
			$("button.swal2-confirm.swal2-styled").focus();
		}
		
		/* 로그인 여부, 라이선스 활성화 여부, 프로젝트 존재여부가 N일 경우 실패 이유 얼럿 */
		if(loginYn == "N" || isPrjYn == "N"){
			$.osl.alert(message, {}, function(){
				//로그인 ID 대상
				if(loginType == "email"){
					$("#email").inputmask({
			            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
			            greedy: false,
			            definitions: {
			                '*': {
			                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
			                    cardinality: 1,
			                    casing: "lower"
			                }
			            }
			        });
					
					$('#email').focus();
				}else{
					$('#usrId').focus();	// 아이디 입력란 key focus
				}
			});
		}
		//로그아웃인 경우 alert창 안 띄우고 toast 메시지 처리
		if(logoutYn == 'Y'){
			$.osl.toastr(message);
		}
	
		if(loginSessionYn == 'Y'){
			$.osl.confirm(message,null,function(result) {
		        if (result.value) {
		        	$('#paramLoginSessionYn').val(loginSessionYn);
					$('#usrId').val(paramUsrId);
					$('#email').val(paramEmail);
					$('#usrPw').val(paramUsrPw);
					$('#kt_login_submit').click();
		        }
		    });
		}
		
		var formId = 'kt_login_form';
		$.osl.validate.setting(formId);
	};

	// Private Functions
	var handleLoginFormSubmit = function () {
		$('#kt_login_submit').click(function (e) {
			e.preventDefault();

			var btn = $(this);
			var form = $('#kt_login_form');
			
			//폼 유효 값 체크
			//TODO validation 플러그인이 없어서 유효성 검사 오류 (임시 주석 처리)
			/*if (!form.valid()) {
				return;
			}*/

			/*KTApp.progress(btn[0]);

			setTimeout(function () {
				KTApp.unprogress(btn[0]);
			}, 1000);*/
			
			//SSO 리턴 URL 없는경우 X
			if($.osl.isNull(document.kt_login_form.returnURL)) {
				document.kt_login_form.action = "/cmm/cmm4000/cmm4000/selectCmm4000LoginAction.do";
			}
			document.kt_login_form.submit();
		});

		//SSO 로그인 시도
		$('#kt_sso_login_submit').click(function (e) {
			e.preventDefault();
			
			document.kt_login_form.action = "/cmm/cmm4000/cmm4000/selectCmm4000SsoLoginAction.do";
			document.kt_login_form.submit();
		});

		/* 레이어 팝업 띄우기 */
		$('#pwFindLink').click(function() {
			var options = {
					idKey: this.id,
					modalTitle: $.osl.lang("cmm4001.title.main.default"),
					autoHeight: false,
				};
			
			$.osl.layerPopupOpen('/cmm/cmm4000/cmm4000/selectCmm4001View.do',null,options);
		});
	}
	
	return {
		  // public functions
		  init: function() {
		  	documentSetting();
		  	handleLoginFormSubmit();
		  }
	};
}();

//Initialization
$.osl.ready(function(){
	OSLLogin.init();
});
