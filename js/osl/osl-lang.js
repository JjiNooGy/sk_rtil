
/**
 * function 명 : OSLCoreLangSetting function 설명 : core에서 사용되는 언어 데이터를 세팅한다.
 */
var OSLCoreLangSetting = function () {
	// 언어 세팅 데이터
	var lang = {};
	// 한국어
	lang["ko"] = {
		formValidate:{
			messages: {
				default : "유효값이 아닙니다.",
				required: "필수 값입니다.",
				email: "유효한 이메일 주소를 입력해주세요.",
				telno: "유효한 연락처를 입력해주세요.",
				url: "유효한 URL을 입력해주세요.",
				date: "유효한 날짜를 입력해주세요.",
				dateISO: "유효한 날짜를 입력해주세요. (ISO)",
				number: "유효한 번호를 입력해주세요.",
				digits: "숫자만 입력 가능합니다.",
				equalTo: "값을 다시 입력해주세요. (값이 동일하지 않음)",
				maxlength: "${1}자 이하로 입력해주세요.",
				minlength: "최소 ${1}자 이상 입력해주세요.",
				rangelength: "${1}에서 ${2}자 사이에 값을 입력해주세요.",
				range: "${1}에서 ${2}사이의 값을 입력해주세요.",
				max: "${1} 보다 작거나 같은 값을 입력해주세요..",
				min: "${1} 보다 크거나 같은 값을 입력해주세요..",
				step: "${1}의 배수를 입력해주세요.",
				regexstr: "입력 값이 형식에 맞지 않습니다.",
				notEmail : "이메일 형식이 아닙니다.",
				notTelno : "연락처 형식이 아닙니다.",
				notSpace : "(공백 제외하고 1자 이상 입력)",
				missRequired: "누락된 필수 값이 있습니다."
			}
		},
		itemValidate :{
			message :{
				select : "기본 항목 [ ${1} ]은(는) 검색/선택 필수입니다.",
				required :"기본 항목 [ ${1} ]은(는) 필수입니다.",
				check : "기본 항목 [ ${1} ] 체크는 필수입니다.",
				checkList :"기본 항목 [ ${1} ] 체크리스트는 생성 필수입니다.",
			}
		},
		tplValidate :{
			message :{
				select : "[ ${1} ]은(는) 연결된 값이 존재해야 합니다.<br/>(검색/선택 필수입니다.)",
				selectAlarmUsr : "알림 받을 사용자 항목 [ ${1} ]은(는) 연결된 값이 존재해야 합니다.<br/>(검색/선택 필수입니다.)",
				required :"[ ${1} ]은(는) 필수입니다.",
				check : "[ ${1} ] 체크는 필수입니다.",
				checkRange1 : "[ ${1} ] 체크는 ${2}개 되어야 합니다.",
				checkRange2 : "[ ${1} ] 체크는 ${2} ~ ${3}개 되어야 합니다.",
				userRange : "[ ${1} ]은(는) 최대 ${2}명 선택 가능합니다.",
				jamfCheckRequired : "[ ${1} ]은(는) 확인이 필수입니다.",
				jamfCheckFail : "확인 결과 유효하지 않는 정보입니다.<br/><br/>${1}",
				alertJamfCheck : "[ ${1} ]가 유효하지 않는 정보입니다.<br/>재입력 및 확인해주세요.",
				reCheck : "다시 한번 확인해주세요.",
			}
		},
		validateAlert :{
			message :{
				select : "[ ${1} ]은(는) 연결된 값이 존재해야 합니다.<br/>(검색/선택 필수입니다.)",
				notEnter : "입력되지 않은 필수 항목이 있습니다.",
				notRegexr : "입력 형식에 맞지 않는 항목이 있습니다.",
				notSpace : "(공백 제외하고 1자 이상 입력)",
				notInput : "입력된 값이 없습니다.",
			}
		},
		requestAlert :{
			message :{
				notInsertLgtEmp : "직접 신청이 불가능합니다.<br/>현업 담당자에게 요청하세요.",
				notInsertPartner : "협력사이므로 직접 신청이 불가능합니다.<br/>담당자에게 요청하세요.",
				notCurrEduInsert : "최근 교육 미이수로 요청이 불가능합니다.",
				notCurrEduUsrInsert : "최근 교육 미이수 사용자가 존재하여 요청이 불가능합니다.",
			}
		},
		//TODO 코드
		commonCode:{
			//템플릿 구분
			TPL00001 : {
				subCode01 : "정보자산",
				subCode02 : "보안정책",
				subCode03 : "기본항목",
				subCode04 : "보안사고",
				subCode05 : "자료관리",
			},
			//템플릿 알림 기간
			TPL00005 : {
				subCode01 : "3일 전",
				subCode02 : "7일 전",
				subCode03 : "10일 전",
				subCode04 : "30일 전",
			},
			//항목 정규식
			TPL00012 : {
				subCode01 : "텍스트",
				subCode02 : "텍스트(영문자만)",
				subCode03 : "텍스트(한글만)",
				subCode04 : "숫자",
				subCode05 : "이메일",
				subCode06 : "연락처(전화번호)",
				subCode07 : "연락처(휴대폰)",
				subCode08 : "주민등록번호",
				subCode09 : "IP4",
				subCode10 : "IP6",
				subCode11 : "IP4(UCloud 제외)",
				subCode12 : "Mac 주소",
			}
		},
		//공통 모달
		modal:{
			close: "닫기",
			complete : "완료",
			select : "선택",
			insert: "등록",
			update: "수정",
			save : "저장",
			search: "검색",
			reInsert : "재상신"
		},
		//공통 라벨
		label:{
			usr : "사용자",
			dept : "조직",
			name : "이름",
			telno:"연락처",
			email:"이메일",
			usrPosition:"직급",
			usrDuty:"직책",
			deptName:"부서",
			dept:"소속",
			yes : "예",
			no : "아니오",
			none : "없음",
			noData: "데이터 없음",
			check : "확인",
			uncheck : "미확인",
			connect : "연결",
			cancel : "취소",
			add : "추가",
			disConnect : "연결 해제",
			noConnect : "미연결",
			count:"건",
			insert:"등록",
			update:"수정",
			move:"이동",
			clear: "해제",
			item: "항목",
			input:"입력",
			regUsr:"등록자",
			detail:"상세",
			count : "건",
			reqType:{ //보안 티켓 처리 유형
				reqStay : "접수 대기",
				reqIn : "처리 중",
				reqOut : "접수 반려",
				reqDone : "최종완료",
				reqOutApprove : "결재 반려 종료",
				reqOutProgress : "중간 종료",
				temporarySave : "임시 저장",
			},
			reqChgPrj : { //프로젝트 이관 카드
				prjMoveInfo : "이관 정보",
				preInfo:"이관 전",
				chgInfo:"이관 후",
				reason : "이관 사유",
				chgUsrInfo : "이관자 정보",
			},
			dshRefresh:"${1} 후 자동 갱신",
			select2 : "선택 또는 입력",
			chargerNm : "담당자",
			ord : "순번",
			apply : "적용",
			charger :{
				all : "전체",
				authGrp : "권한 그룹",
				dept : "조직",
				usr : "사용자",
			},
			extraCnt : "${1} 외 ${2} 건",
			extraUsr : "${1} 외 ${2} 명",
		},
		//공통 메시지
		message:{
			none : "없음",
			noData : "데이터가 없습니다.",
			lastPage: "마지막 페이지입니다.",
			overFile : "최대 파일 개수/용량이 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
			alert : {
				selectOne : "${1}개의 데이터가 선택되었습니다. 하나의 데이터를 선택하세요.",
				okConfirm : "확인되었습니다.",
			},
			notReadData : "조회할 수 없는 데이터입니다.",
		},
		//공통 버튼
		button:{
			complete : "완료",
			close: "닫기",
			move: "이동",
			copy: "복사",
			check: "확인",
			submit:"확인",
			select :"조회",
			insert: "등록",
			detail: "상세",
			update: "수정",
			delete: "삭제",
			search : "검색",
			add : "추가",
			assign : "배정",
			remove: "제거",
			except: "제외",
			save : "저장",
			signApr: "결재 승인",
			signRjt : "결재 반려",
			apr: "승인",
			rjt : "반려",
			start : "시작",
			end : "종료",
			endLog : "종료",
			yes : "예",
			no : "아니오",
			connect : "연결",
			disConnect : "연결 해제",
			request:"요청",
			reset: "초기화",
			deleteReset : "삭제 초기화",
			allDelete : "전체 삭제",
			compact : "전체 정렬",
			success : "성공",
			fail :"실패",
			allOpenFolding : "전체 펼치기",
			allCloseFolding : "전체 접기",
		},
		//공통 툴팁
		tooltip:{
			collapse: "접기/펼치기",
			reset: "초기화",
			assign : "배정",
			except : "제외",
			allEleOpen:"전체 펼치기",
			allEleClose:"전체 접기",
		},
		portlet:{
			tools: {
				toggle: {
					collapse: 'Collapse',
					expand: 'Expand'
				},
				reload: 'Refresh',
				remove: 'Remove',
				fullscreen: {
					on: '풀 스크린',
					off: '풀 스크린 해제'
				}
			}
		},
		process:{
			menu:{
				update: "수정",
				delete: "삭제",
				detail: "상세정보",
				fnDatas : "기능 목록",
			}
		},
		//공통 트리
		tree:{
			placeholder: {
				search : "입력 후 엔터 키를 입력해주세요",
			},
			button:{
				select : "조회",
				insert : "등록",
				add : "추가",
				update : "수정",
				delete : "삭제",
				move: "이동",
				copy: "복사",
				search: "검색",
				detail: "상세",
			},
			tooltip:{
				allNodeOpen:"전체 펼치기",
				allNodeClose:"전체 접기",
				selNodeOpen:"선택 펼치기",
				selNodeClose:"선택 접기"
			},
			contextmenu:{
				allNodeOpen:"전체 펼치기",
				allNodeClose:"전체 접기",
				selNodeOpen:"선택 펼치기",
				selNodeClose:"선택 접기"
			},
			message:{
				alert:{
					handler:"트리 메뉴 제어 중 오류가 발생했습니다.",
					noData: "검색 결과가 없습니다.",
				},
				toastr:{
					handler:"트리 메뉴 제어 중 오류가 발생했습니다.",
				},
				content:{
					noData: "검색 결과가 없습니다.",
					noObject: "${1} 트리 객체가 없습니다.",
				},
				
			},
		},
		sign : {
			label :{
				draft : "기안",
				signOrder : "결재 순번",
				currentSignOrd : "결재 차례",
				signAgree : "합의 결재",
				signDone : "결재 완료",
				signAll : "전결",
				confrontation : "대결",
				finalSignAgree : "최종 합의",
				finalSign : "최종 결재",
				referrer : "참조",
				ord : "순번",
				ords : "${1}/${2}",
				revertRes : "회수",
				signApprove : "승인",
				signReject : "반려",
				now : "현재",
				absenceList : "대결자 목록",
				signer: "결재자",
			},
			lineLabel :{
				draft : "기안",
				signOrder : "결재<br/>순번",
				currentSignOrd : "결재<br/>차례",
				signAgree : "합의<br/>결재",
				signDone : "결재<br/>완료",
				signAll : "전결",
				confrontation : "대결",
				finalSignAgree : "최종<br/>합의",
				finalSign : "최종<br/>결재",
				referrer : "참조",
			}
		},
		file:{
			fileCnt:"${1}개의 파일",
			error:{
				downloadWait: "파일 데이터를 세팅 중입니다.<br/>다시 시도해주세요.",
				fileReadonly: "업로드가 불가능합니다.",
				notEnoughFileInfo : "다운로드에 필요한 정보가 부족합니다.",
			},
			message:{
				notMove : "다운로드 준비 중입니다.<br/>페이지를 이동하지 말아주십시오.",
				resetFile :"파일이 초기화되었습니다.",
			}
		},
		//데이터 테이블 작업 중이므로 현재 제거하지 말기
		new_datatable:{
			"decimal" : "",
			"emptyTable" : "조회된 데이터가 없습니다.",
			"info" : "현재  _START_ - _END_ / _TOTAL_ 건",
			"infoEmpty" : "0건",
			"infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",
			"infoPostFix" : "",
			"thousands" : ",",
			"lengthMenu" : "_MENU_",
			"processing" : "처리중...",
			"search" : "검색 : ",
			"zeroRecords" : "검색된 데이터가 없습니다.",
			"paginate" : {
				"first" : "<<",
				"last" : ">>",
				"next" : ">",
				"previous" : "<"
			},
			"aria" : {
				"sortAscending" : " :  오름차순 정렬",
				"sortDescending" : " :  내림차순 정렬"
			}
		},
		//공통 데이터 테이블
		datatable:{
			button:{
				access : "접근",
				select: "조회",
				detail : "상세",
				insert: "등록",
				insertReq: "보안 티켓 추가",
				requestReq:"보안 티켓 요청",
				update: "수정",
				delete: "삭제",
				add : "추가",
				assign : "배정",
				remove: "제거",
				except: "제외",
				redo: "복구",
				disposal: "폐기",
				recordDelete: "완전 삭제",
				trash: "폐기 목록",
				prev: "돌아가기",
				card: "카드형",
				copy : "복사",
				grid: "그리드형",
				more : "더보기",
				download : "다운로드",
				upload : "업로드",
				excel: "엑셀",
				print: "출력",
				signApr: "결재 승인",
				signRjt : "결재 반려",
				requestAccept: "접수",
				apr: "승인",
				rjt : "반려",
				process: "업무처리",
				start : "시작",
				end : "종료",
				xtnList : "연장/회수 목록",
				connect : "연결",
				disConnect : "연결 해제",
				extend : "연장 신청",
				endExtend : "연장 종료",
				terminate : "해지 신청",
				reset: "초기화",
				log: "로그 가져오기",
			},
			tooltip:{
				access : "접근",
				
				select: "데이터 조회",
				selectReq : "보안 티켓 조회",
				selectSlgSev : "이상징후 서버 조회",
				selectSev : "서버 조회",
				selectSlgLog : "이상징후 조회",
				
				detail : "상세",
				detailReq : "보안 티켓 상세",
				detailWork : "작업 상세",
				
				insert: "데이터 추가",
				insertReq : "보안 티켓 추가",
				requestReq:	"보안 티켓 요청",
				
				update: "데이터 수정",
				updateReq : "보안 티켓 수정",
				updateSlgSev : "이상징후 서버 수정",
				updateSlgLog : "이상징후 수정",
				
				delete: "데이터 삭제",
				deleteReq : "보안 티켓 삭제",
				deleteSlgLog : "이상징후 삭제",
				
				add : "추가",
				assign : "배정",
				remove: "제거",
				except: "제외",
				
				grid: "그리드형 보기",
				card: "카드형 보기",
				copy : "복사",
				more : "더보기",
				download:"다운로드",
				upload :"업로드",
				excel: "엑셀 다운로드",
				print: "출력",
				signApr: "결재 승인",
				signRjt : "결재 반려",
				requestAccept : "접수",
				requestAcceptReq : "보안 티켓 접수",
				apr: "승인",
				rjt : "반려",
				
				process: "업무처리",
				processReq: "업무처리",
				
				extend : "연장 신청",
				endExtend : "연장 종료",
				terminate : "해지 신청",
				
				start : "시작",
				end : "종료",
				workEnd : "작업 종료",
				xtnList : "연장/회수 목록",
				connect : "연결",
				disConnect : "연결 해제",
				reset : "초기화",
			},
			action:{
				functionNm: "기능 버튼",
				update:{
					nonSelect: "수정하려는 데이터를 선택해주세요.",
					manySelect: "1건의 데이터만 선택해주세요.<br/> ${1}건의 데이터가 선택되었습니다."
				},
				delete:{
					nonSelect:"삭제하려는 데이터를 선택해주세요.",
					confirm: "${1}건의 데이터를 삭제하시겠습니까?"
				},
				dblClick:{
					nonSelect:"데이터를 선택해주세요.",
					manySelect: "1건의 데이터만 선택해주세요.<br/> ${1}건의 데이터가 선택되었습니다."
				}
			},
			message :{
				nonSelect: "선택된 데이터가 없습니다.",
				manySelect: "1건의 데이터만 선택해주세요.<br/> ${1}건의 데이터가 선택되었습니다."
			},
			translate:{
				records:{
					processing: "데이터 조회 중 입니다.",
					nonSelect: "선택된 데이터가 없습니다.",
					noRecords: "선택된 데이터가 없습니다.",
				},
				toolbar:{
					pagination:{
						items:{
							first: "처음",
							prev: "이전",
							next: "다음",
							last: "마지막",
							more: "더 보기",
							input: "페이지 번호",
							select: "목록 크기",
							info: "현재 {{start}} - {{end}} / {{total}} 건"
						}
					}
				}
			},
			search:{
				title: "검색",
				placeholder: "검색어를 입력해주세요",
				allTitle: "전체"
			},
			sort:{
				fieldNotMatch: "잘못된 정렬 데이터입니다."
			},
		},
		//공통 date
		date:{
			datepicker:{
				days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
				daysShort: ["일", "월", "화", "수", "목", "금", "토"],
				daysMin: ["일", "월", "화", "수", "목", "금", "토"],
				months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				today: "오늘",
				monthsTitle: "일자 선택",
				clear: "다시 선택",
				weekStart: 0,
				format: "yyyy-mm-dd",
				apply : "적용",
				cancle : "취소",
			},
			moment:{
				months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				monthsParseExact : true,
				weekdays : ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
				weekdaysShort : ["일", "월", "화", "수", "목", "금", "토"],
				weekdaysMin : ["일", "월", "화", "수", "목", "금", "토"],
				weekdaysParseExact : true,
				longDateFormat : {
					LT : 'HH:mm',
					LTS : 'HH:mm:ss',
					L : 'YYYY-MM-DD',
					LL : 'YYYY MMMM D',
					LLL : 'YYYY MMMM D HH:mm',
					LLLL : 'YYYY MMMM D dddd HH:mm'
				},
				calendar : {
					sameDay : '오늘',
					nextDay : '다음',
					nextWeek : '다음 주',
					lastDay : '어제',
					lastWeek : '마지막 주',
					sameElse : ''
				},
				relativeTime : {
					future : 'dans %s',
					past : 'il y a %s',
					s : '초',
					ss : '%d 초',
					m : '분',
					mm : '%d 분',
					h : '시',
					hh : '%d 시',
					d : '일',
					dd : '%d 일',
					w : '주',
					ww : '%d 주',
					M : '월',
					MM : '%d 월',
					y : '년',
					yy : '%d 년',
					am : "오전",
					pm : "오후",
				},
				dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
				week : {
					dow : 0,
					doy : 4  // The week that contains Jan 4th is the first
								// week of the year.
				}
			},
			agoTime:{
				suffixAgo: "전",
				justNow: "방금",
				s : "${1}초",
				m : "${1}분",
				h : "${1}시간",
				d : "${1}일",
				M : "${1}개월",
				y : "${1}년",
			},
			range:{
				year: "연간",
				quarter: "분기",
				monthly : "월간",
				weekly : "주간",
				date : "기간 선택",
				month: "월",
				week: "주",
				day: "일"
			}
		},
		//이력 - osl-common-card.js
		history: {
			messageTitle01 : "<b>${1}</b>되었습니다.",
			messageTitle03v01 : "결재가 <b>${1}</b>되었습니다.",
			messageTitle03v02 : "<b>[${1}]</b>이/가 결재를 <b>${2}</b>하였습니다.",
			messageTitle04v01v01 : "<b>[${1}]</b>의 소명이 등록되었습니다.",
			messageTitle04v01v02 : "<b>[${1}]</b>의 이의제기가 등록되었습니다.",
			messageTitle04v01v03 : "<b>[${1}]</b>의 소명이 등록되었습니다.",
			messageTitle04v02v01 : "<b>[${1}]</b>의 소명이 완료되었습니다.",
			messageTitle04v02v02 : "<b>[${1}]</b>의 이의제기가 완료되었습니다.",
			messageTitle04v02v03 : "<b>[${1}]</b>의 소명이 완료되었습니다.",
			//HIS00001
			target01 :"티켓",
			target02 :"양식",
			target03 :"정보자산",
			target04 :"소명",
			target05 :"이상징후",
			target06 :"권한설정",
			target07 :"특수권한",
			//HIS00002
			subTarget01 : "변경",
			subTarget02 : "수정",
			subTarget03 : "결재",
			subTarget04 : "연결",
			subTarget05 : "삭제",
			//HIS00003 - 기본 타이틀
			comSub01 :"입력",
			comSub02 :"수정",
			comSub03 :"추가",
			comSub04 :"삭제",
			comSub05 :"연결",
			comSub06 :"해제",
			comSub07 :"연장",
			comSub08 :"해지",
			comSub09 :"요청",
			comSub10 :"회수",
			comSub11 :"만료",
			comSub12 :"승인",
			comSub13 :"반려",
			comSub14 :"제외",
			comSub15 :"중지",
			comSub16 :"기안",
			comSub17 :"종료",
			comSub18 :"답변",
			comSub19 :"제시",
			comSub20 :"프로세스",
			comSub21 :"단계",
			comSub22 :"담당자",
			comSub23 :"결재선",
			comSub24 :"요청자",
			comSub25 :"소명",
			comSub26 :"처리",
			comSub27 :"성공",
			comSub28 :"실패",
			comSub29 :"수락",
			comSub30 :"거부",
			comSub31 :"위험도",
			change : {
				comSub01Sign : "결재선 등록", //사전 결재선일 때 발생
				//HIS00003
				comSub22 :"담당자 변경",
				comSub23 :"결재선 변경",
				//HIS00001
				target01:{
					//HIS00003
					comSub09 :"적용 요청",
					comSub12 :"접수 승인",
					comSub13 :"접수 반려",
					comSub17 :"종료",
					comSub20 :"프로세스 이관",
					comSub21 :"단계 변경",
					comSub26 :"처리 완료",
					comSub27 :"적용 성공",
					comSub28 :"적용 실패",
				},
				//HIS00001
				target04:{
					comSub09: "소명 요청",
					comSub10: "소명 회수",
					comSub11: "소명 만료",
					comSub13: "소명 반려",
					comSub14: "소명 건너뛰기",
					comSub22: "요청자 변경",
					comSub24: "대상자 변경",
					comSub25: "소명 답변",
					comSub26: "소명 완료",
					comSub29: "예외처리 승인",
					comSub30: "예외처리 미승인",
					comSub31 :"위험도 변경",
					sckEpt : {
						comSub09: "이의제기 요청",
						comSub11: "이의제기 만료",
						comSub25: "이의제기 답변",
						comSub26: "이의제기 완료",
					},
					eptProSt: {
						eptProSt01 : "대기",
						eptProSt04 : "종결",
						eptProSt05 : "위험도 상",
						eptProSt06 : "위험도 중",
						eptProSt07 : "위험도 하",
					},
					message : {
						eptProSt : "위험도 처리 상태가<br/><b>${1}</b>에서 <b>${2}</b>(으)로 변경되었습니다.",
						eptTarget : "대상자가<br/><b>${1}</b>에서 <b>${2}</b>(으)로 변경되었습니다.",
						eptTargetLeader : "소명 대상자 팀장이<br/><b>${1}</b>에서 <b>${2}</b>(으)로 변경되었습니다.",
					}
				},
				//HIS00001 - 특수권한
				target07:{
					comSub22 : "처리자 변경",
					comSub24 : "권한 부여 대상자 변경",
				},
				label :{
					chargerRange : "담당 범위",
					prevSignLine : "이전 결재선",
					nextSignLine : "변경 결재선",
					prevCharge : "이전 처리자",
					nextCharge :"변경 처리자",
				},
			},
			update : {
				label : {
					prev : "변경 전",
					next : "변경 후",
					
				},
			},
			sign : {
				//HIS00003
				comSub10 :"회수",
				comSub12 :"승인",
				comSub13 :"반려",
				comSub16 :"기안",
				label :{
					comment : "사유",
					detailSignLine : "결재선 상세 보기",
				}
			},
			link : {
				
			},
			delete : {
				
			},
			badge:{
				title:{
					current: "현재",
				},
			},
			label :{
				regDtm : "등록 일시",
				modifyDtm : "수정 일시",
				reg : "등록됨",
				modify : "수정됨",
				atchFile:"첨부파일",
				eptUsr:"대상자",
				leader:"팀장",
			},
		},
		//common 언어팩
		common:{
			logout:{
				confirm:"로그아웃 하시겠습니까?",
				button:"로그 아웃"
			},
			user:{
				pwChange:"",
				nonExistent : "등록되지 않은 사용자입니다.",
				validate:{
					usrId: "아이디를 입력해주세요.",
					usrPw: "비밀번호를 입력해주세요.",
					usrPwIndexOfUsrId: "비밀번호에는 사용자 아이디를 포함할 수 없습니다.",
					usrPwContinue: "비밀번호는 같은 문자를 3번 이상 연속해서<br/> 사용하실 수 없습니다.",
					usrPwContinueMatch: "비밀번호는 연속된 문자열(123, abc 등)을<br/> ${1}자 이상 사용 할 수 없습니다.",
				},
				myPage:{
					title:"개인정보 수정",
					error:"사용자 정보가 없으므로 개인정보 수정 화면으로 이동할 수 없습니다."
				},
				auth:{
					saveMsg: "${1}명의 사용자가 배정되었습니다.",
					saveDupleMsg: "이미 배정된 ${1}명의 사용자 제외",
					saveAllDupleMsg: "이미 배정중인 사용자입니다. (${1}명)",
					allUsrInsert:"${1}건의 사용자를 배정하시겠습니까?",
					allUsrInDelete:"${1}건의 사용자를 배정 제외하시겠습니까?"
				},
			},
			history : {
				updateMsg : "${1}이/가 수정되었습니다.",
				changeMsg : "${1}이/가 변경되었습니다.",
				customMsg : "${1}이/가 ${2}되었습니다.",
			},
			error:{
				sessionInvalid:"세션이 만료되어 로그인 페이지로 이동합니다.",
				nonAuth:"해당 요청의 권한이 없습니다.",
				popup:"팝업 페이지에서 오류가 발생했습니다.",
				modalDuple: "해당 기능 팝업은 중복으로 동작 할 수 없습니다.",
			},
			menu:{
				top: "최상위",
				upper: "상위",
				name: "메뉴 명",
			},
			name:{
				prjGrp: "그룹 명",
				prj: "프로젝트 명",
				authGrp: "권한 그룹 명",
				all: "전체",
				select: "선택"
			},
			alert:{
				title: "알림",
				cancel: "취소",
				deny: "거절",
			},
			modal:{
				closeAlert: "팝업 창을 닫으시겠습니까?"
			},
			alarm :{
				type:{
					prjGrp : "프로젝트 그룹 명 : ",
					prj : "프로젝트 명 : ",
					authGrp : "권한 그룹 명 : ",
					user : "사용자 명 : ${1}<br/>사용자 이메일 : ${2}",
				},
				newAlarm : "${1}건의 새로운 알림",
			},
			fnData : {
				flowRevisionCd : "리비전 저장 유무"
				,flowDplCd : "배포계획 저장"
				,flowWorkCd : "작업"
				,flowAuthCd : "허용 역할 제한"
				,flowExpCd : "소명 단계"
				,flowOpinionCd : "의견 제시"
				,flowSignCd : "결재"
				,flowSignStopCd : "결재 반려 시 종료"
				,flowMiddleEndCd : "중간 종료"
				,flowDoneCd : "최종 완료 단계"
				,flowTplEndArmcCd : "신청서 기간 만료 알림"
				,flowSmrExcldCd : "처리중 통계 제외"
			}
		},
		// login.js에서 사용
		login:{
			message:{
				exprYn : "비밀번호 사용기간이 만료되었습니다.<br/>비밀번호를 변경해주세요.",
			}
		},
		// widget.js에서 사용
		widget:{
			common : {
				button : {
					insert : "위젯 추가",
					update : "위젯 수정",
					delete : "위젯 삭제",
					fixed : "설정 반영",
					cancle : "취소",
					save : "저장",
					close : "닫기",
					/* 기존
					 update : "위젯 수정",
					 delete : "위젯 삭제",
					 */
				},
				tooltip : {
					refresh : "새로고침",
					insert : "위젯 추가",
					update : "위젯 수정",
					delete : "위젯 삭제",
					fixed : "설정 반영",
					cancle : "취소",
					save : "저장",
					close : "닫기",
					/* 기존
					refresh : "새로고침",
					fullScreen : "풀스크린 적용&해제",
					widgetOpenClose : "위젯 접기&펼치기",
					update : "위젯 데이터 수정",
					delete : "위젯 제거",
					*/
				},
			},
			//위젯 별 선언
			//일정(캘린더)
			cld:{
				tooltip : {
					holiday : "휴일",
					project: "프로젝트 일정",
					usrCld : "개인 일정",
				}
			}
			//2024.06.24 이전 언어팩
			// 위젯 타입 별 카드 UI내 사용할 언어팩 선언
			/*
			//알림
			arm:{
				alarmList : {
					title : {
						main : {
							default : "알림 목록",
						},
					},
					datatable:{
						field:{
							armTitle : "제목",
							armContent : "내용",
							sendDtm : "받은 날짜",
							checkCd : "확인 유무"
						}
					}
				}
			},
			//게시판
			bad:{
				singleBoard:{
					title : {
						main : {
							default : "단일 게시판 조회",
						},
					},
					label:{
						deleteBadge: "삭제",
						noticeBadge: "공지",
						hit : "조회수",
					},
					datatable:{
						tooltip:{
							select : "게시글 조회",
							insert : "게시글 추가",
							update : "게시글 수정",
							delete : "게시글 삭제",
							dblClick : "게시글 상세보기",
						},
						field:{
							badTitle : "제목",
							badHit : "조회수",
							badFileCnt : "첨부파일 수",
							badUsrId :"작성자",
							badWtdtm : "작성일",
							tagNm:"태그",
							badContent: "내용",
							badNtcCheck : "공지 유무",
						}
					},
					message :{
						notUsedBoard : "현재 게시판으로 사용되지 앟아 위젯 사용이 불가능합니다.",
						notAuthority : {
							basic : "해당 게시글에 대한 권한이 없습니다.",
							insertMessage : "게시글 등록 권한이 없습니다.",
							selectMessage : "해당 게시글에 대한 읽기 권한이 없습니다.",
							updateMessage : "해당 게시글에 대한 수정 권한이 없습니다.",
							deleteMessage : "해당 게시글에 대한 삭제 권한이 없습니다.",
						},
						delMessage : "이미 삭제된 게시글입니다.",
						delMessages : "이미 삭제된 게시글이 존재합니다.",
						delReason : "사용자(${1}) 직접 삭제",
					}
				}
			},
			//보안 티켓
			req: {
				//접수 대기 목록
				newRequest : {
					title : {
						main : {
							default : "접수 대기 목록",
						},
					},
					datatable : {
						button : {
							reqInsert : "신규 요구사항 등록",
						},
						tooltip : {
							reqAccept : "요구사항 접수",
							reqInsert : "신규 요구사항 등록",
						},
						message : {
							alert : {
								notUsr : "없는 사용자입니다.",
							},
						},
					},
				},
				// 요구사항 요청 목록
				userRequest : {
					title : {
						main : {
							default : "보안 티켓 요청 목록",
						},
					},
					datatable : {
						button : {
							insert : "신규 요구사항 등록",
						},
						tooltip : {
							insert : "신규 요구사항 등록",
						},
						field : {
							prjGrpNm : "프로젝트 그룹명",
						},
					},
				},
				//그룹 보안 티켓 목록 위젯
				grpRequestList:{
					title : {
						main : {
							default : "그룹 보안 티켓 목록",
						},
					},
					datatable:{
						title:{
							prjNm:"프로젝트 명",
							reqGrpNm:"그룹 보안 티켓 명",
							reqGrpLinkCnt:"연결 보안 티켓 수",
							reqGrpUsrNm:"요청자 명",
							reqGrpUsrEmail:"요청자 e-mail",
							reqGrpUsrDeptNm:"요청자 조직 명",
							reqGrpUsrNum:"요청자 연락처",
							reqGrpChargerNm:"담당자 명",
							regDtmDay:"등록일",
						},
						tooltip:{
							update:"그룹 보안 티켓 수정",
							dblClick:"그룹 보안 티켓 상세",
							delete:"그룹 보안 티켓 삭제",
						},
						field:{
							reqGrpChargerEmail:"그룹 보안 티켓 담당자 이메일",
							reqGrpChagerNum:"그룹 보안 티켓 담당자 연락처",
							reqGrpkey:"그룹 보안 티켓 Key",
							useCd:"사용 유무",
						},
						contextmenu:{
							reqGrpDetail:"그룹 보안 티켓 상세",
							reqGrpUpdate:"그룹 보안 티켓 수정",
							reqGrpDelete:"그룹 보안 티켓 삭제",
						}
					}
				},
				// 담당 그룹 보안 티켓 목록 위젯
				usrGrpRequest:{
					title : {
						main : {
							default : "담당 그룹 보안 티켓 목록",
						},
					},
					datatable:{
						tooltip:{
							update:"그룹 보안 티켓 수정",
							dblClick:"그룹 보안 티켓 상세",
						},
						field:{
							reqGrpUsrNm:"그룹 보안 티켓 요청자 명",
							reqGrpUsrEmail:"그룹 보안 티켓 요청자 Email",
							reqGrpUsrDeptNm:"그룹 보안 티켓 요청자 조직명",
							reqGrpUsrNum:"그룹 보안 티켓 요청자 연락처",
							reqGrpChargerNm:"그룹 보안 티켓 담당자 명",
							reqGrpChargerEmail:"그룹 보안 티켓 담당자 Email",
							reqGrpChargerNum:"그룹 보안 티켓 담당자 연락처",
							regDtmDay:"등록일",
							reqGrpKey:"그룹 보안 티켓 key",
							useCd:"사용 유무",
							reqEndRatio:"처리율",
							reqOngoingCnt:"처리중",
							reqEndCnt:"최종 완료",
							reqWaitCnt:"접수 대기",
							reqGrpLinkCnt:"연결 보안 티켓 수",
							reqGrpNm:"그룹 보안 티켓 명",
						},
						contextmenu:{
							reqGrpDetail:"그룹 보안 티켓 상세",
							reqGrpUpdate:"그룹 보안 티켓 수정",
						}
					}
				},
				// 담당 보안 티켓 목록
				chargerReq:{
					title : {
						main : {
							default : "담당 보안 티켓 목록",
						},
					},
					datatable:{
						field:{
							prjNm : "프로젝트 명",
							reqOrd : "순번",
							reqProTypeNm : "처리 유형",
							reqNm : "요청 제목",
							reqDtm : "요청일",
							reqUsrNm :"요청자",
							regDtmDay : "등록일",
							reqgUsrEmail :"요청자 e-mail",
							reqUsrDeptNm : "요청자 조직",
							reqUsrNum : "요청자 연락처",
							reqKey : "보안 티켓 Key",
							prjGrpNm : "프로젝트 그룹 명",
						}
					}
				},
				// 참조 보안 티켓 목록
				reqSignRef :{
					title : {
						main : {
							default : "요구사항 결재 참조 목록",
						},
					},
					label : {
						all: "전체",
						unCheck: "미확인",
						check: "확인완료",
					},
					datatable: {
						button: {
							process: "업무처리",
							detail: "상세"
						},
						tooltip:{
							process: "보안 티켓 업무처리",
							detail: "보안 티켓 상세보기"
						},
						contextmenu:{
							detail: "상세보기",
							process: "업무처리"
						}
					},
					message: {
						alert: {
							selectData: "선택된 보안 티켓이 없습니다.",
							selectOnlyOne : "${1}개가 선택되었습니다.<br/>1개의 보안 티켓만 선택하세요"
						},
						noRes: "결재 의견 없음"
					}
				},
				// 보안 티켓 결재 요청 목록
				reqSignReq: {
					title : {
						main : {
							default : "보안 티켓 결재 요청 목록",
						},
					},
					label:{
						noSignRes: "결재 의견 없음"
					},
					datatable:{
						button:{
							reclaim: "결재 회수"
						},
						tooltip:{
							reclaimSign: "보안 티켓 결재 회수",
							dblClick: "업무처리",
							detail: "상세정보",
							signInfo: "결재선 정보"
						},
						contextmenu:{
							detail: "상세보기",
							process: "업무처리",
							signLineInfo: "결재선 정보",
							signCancel: "결재 회수"
						}
					},
					message:{
						alert:{
							selectOne: "선택된 보안 티켓이 없습니다.",
							selectOnlyOne : "${1}건의 보안 티켓이 선택되었습니다.<br/>1건의 보안 티켓만 선택해주세요.",
							notDraft: "기안 상태의 결재만 회수할 수 있습니다.",
						},
						confirm:{
							signReclaim:"결재 회수 하시겠습니까?"
						}
					},
				},
				// 보안 티켓 결재 목록
				signRequest:{
					title : {
						main : {
							default : "보안 티켓 결재 목록",
						},
					},
					label:{
						signRes: "결재 의견 없음"
					},
					datatable:{
						button:{
							dblClick: "업무 처리",
							signApr: "결재 승인",
							signRet: "결재 반려"
						},
						tooltip:{
							dblClick: "보안 티켓 업무처리",
							signApr: "보안 티켓 결재 승인",
							signRjt: "보안 티켓 결재 반려",
							detail: "보안 티켓 상세정보",
							signLine: "결재선 정보"
						},
						contextmenu:{
							detail: "상세보기",
							process: "업무처리",
							signLineInfo: "결재선 정보",
							signApr: "결재 승인",
							signRjt: "결재 반려"
						}
					},
					message:{
						alert:{
							selectOne:"선택된 보안 티켓이 없습니다.",
							selectOnlyOne: "${1}건의 보안 티켓이 선택되었습니다.<br/>1건의 보안 티켓만 선택해주세요.",
							notSignType: "결재 대기 중인 보안 티켓만 결재 가능합니다.",
							notSignOrd: "결재 순서가 아닙니다.",
							notEnterRjtRes: "결재 반려 사유를 입력해주세요."
						},
						confirm:{
							signApr: "결재 승인하시겠습니까?",
							signRjt: "결재 반려하시겠습니까?"
						}
					}
				},
				// 담당 작업 목록
				requestWork: {
					title : {
						main : {
							default : "작업 목록",
						},
					},
					datatable:{
						button:{
							workEnd: "종료"
						},
						tooltip:{
							workEnd: "작업 종료",
							detail: "작업 상세정보"
						},
						contextmenu:{
							detail: "상세보기",
							workEnd: "작업 종료"
						}
					},
					message:{
						alert:{
							selectData: "선택된 작업이 없습니다.",
							notEndWork: "진행중인 작업만 종료할 수 있습니다.",
							notCharger: "담당자로 지정된 작업만 종료할 수 있습니다."
						},
					}
				},
			},
			//프로젝트
			prj:{
				// 산출물 참조 목록
				docSignRef:{
					title :{
						main : {
							default : "산출물 파일 결재 참조 목록",
						},
					},
					label : {
						all: "전체",
						unCheck: "미확인",
						check: "확인완료"
					},
					datatable: {
						button: {
							detail: "상세"
						},
						tooltip:{
							detail: "산출물 상세보기"
						},
						contextmenu:{
							detail: "상세보기"
						}
					},
					message: {
						alert: {
							selectData: "선택된 산출물 파일이 없습니다.",
							selectOnlyOne : "${1}개가 선택되었습니다.<br/>1개의 산출물 파일만 선택하세요"
						},
						noRes: "결재 의견 없음"
					}
				},
				// 산출물 파일 결재 요청 목록
				docFileSignReq:{
					title :{
						main : {
							default : "산출물 파일 결재 요청 목록",
						},
					},
					datatable:{
						button:{
							reclaim: "결재 회수"
						},
						tooltip:{
							reclaimSign: "산출물 파일 결재 회수",
							dblClick: "산출물 상세정보",
							signInfo: "결재선 정보"
						},
						contextmenu:{
							detail: "상세보기",
							signLineInfo: "결재선 정보",
							signCancel: "결재 회수"
						}
					},
					message:{
						alert:{
							nonSelect: "선택된 산출물 파일이 없습니다.",
							notDraft: "기안 상태의 결재만 회수할 수 있습니다."
						},
						confirm:{
							signCancel: "결재를 회수하시겠습니까?"
						},
						noRes: "결재 의견 없음"
					}
				},
				// 산출물 파일 결재 목록
				signDocFile: {
					title :{
						main : {
							default : "산출물 파일 결재 목록",
						},
					},
					datatable:{
						button:{
							signApr:"결재 승인",
							signRjt:"결재 반려"
						},
						tooltip:{
							signApr:"산출물 파일 결재 승인",
							signRjt:"산출물 파일 결재 반려",
							dblClick: "산출물 상세정보",
							signInfo: "결재선 정보"
						},
						contextmenu:{
							detail: "상세보기",
							signLineInfo: "결재선 정보",
							signApr: "결재 승인",
							signRjt: "결재 반려"
						}
					},
					message:{
						alert:{
							nonSelect: "선택된 산출물 파일이 없습니다.",
							notSignType: "결재 대기 중인 산출물 파일만 결재 가능합니다.",
							notSignOrd: "결재 순서가 아닙니다.",
							notEnterRjtRes: "결재 반려 사유를 입력해주세요."
						},
						confirm:{
							signApr: "결재 승인하시겠습니까?",
							signRjt: "결재 반려하시겠습니까?"
						},
						noRes:"결재 의견 없음"
					}
				},
				// 프로세스별 작업 흐름 목록
				processFlowList:{
					title :{
						main : {
							default : "프로세스별 작업 흐름 목록",
						},
						reqList : "보안 티켓 목록",
					},
					label:{
						flowCharger : "담당",
						flowAllCharger : "전체",
						req : "보안 티켓",
						startTask : "업무 처리 가능",
						readOnly : "읽기 전용",
						tasking : "작업 진행 중",
						taskEnd : "작업 종료 가능",
						signDoing : "결재 중",
						overCnt: "초과",
						aroundCnt: "임박",
						possibleCnt:"여유",
						failCnt:"실패",
						successCnt:"적기",
					},
					tooltip:{
						nullFlowHide : "빈 단계 숨기기",
						openClose : "위젯 접기 & 펼치기",
						flowInfo :{
							start : "시작 단계",
							sign : "결재",
							signStop : "결재 반려 시 종료 유무",
							revision : "리비전 저장 유무",
							dpl : "배포계획 저장 유무",
							middleEnd : "중간 종료",
							task : "작업",
							done : "최종 완료 단계",
							flowAuth : "허용 역할"
						},
						requestProcessing :"업무 처리",
						detail : "상세 정보"
					},
					datatable:{
						label :{
							processCnt : "프로세스 개수:",
						},
						tooltip:{
							select : "보안 티켓 조회",
							close : "보안 티켓 목록 닫기",
						},
						field:{
							prjNm : "프로젝트 명",
							reqOrd : "보안 티켓 순번",
							reqProTypeNm : "처리 유형",
							reqNm : "보안 티켓 명",
							reqDtm : "요청일",
							reqUsrNm : "요청자",
							reqChargerNm : "담당자",
							reqUsrEmail : "요청자 e-mail",
							reqUsrNum : "요청자 연락처",
							prjGrpNm : "프로젝트 그룹 명",
							reqGrpNm : "그룹 보안 티켓 명",
							reqGrpNo : "그룹 보안 티켓 번호"
						},
						contextmenu:{
							reqDetail : "보안 티켓 상세"
						}
					},
					message:{
						notProcessing : "처리 중인 보안 티켓만 업무 처리가 가능합니다.",
					}
				},
				// 최근 등록된 산출물 목록
				recentDocList: {
					title : {
						main : {
							default : "최근 등록 산출물 목록",
						},
					},
					datatable:{
						button:{
							dblClick:"상세",
						},
						tooltip:{
							dblClick: "산출물 상세정보",
						},
						contextmenu:{
							detail: "상세보기"
						}
					}
				},
				// 최근 확정된 산출물 목록
				recentConfDocList: {
					title : {
						main : {
							default : "최근 확정 산출물 목록",
						},
					},
					datatable:{
						button:{
							dblClick:"상세",
						},
						tooltip:{
							dblClick: "산출물 상세정보",
						},
						contextmenu:{
							detail: "상세보기"
						}
					}
				},
				// 산출물 제출 예정일 대비 미제출 건수
				docDtmOver: {
					title : {
						main : {
							default : "산출물 제출 예정일 대비 미제출 건수",
						},
					},
					label: {
						unregistered: "미등록",
						noSubmit: "미제출",
						total: "총"
					},
					datatable:{
						button:{
							dblClick:"상세",
						},
						tooltip:{
							dblClick: "산출물 상세정보",
						},
						contextmenu:{
							detail: "상세보기"
						}
					}
				}
			},
			// 차트
			cht : {
				//조직별 요구사항 처리율
				grpReqThroughput : {
					title : {
						main : {
							default : "조직별 요구사항 처리율",
						},
					},
					field : {
						acceptReq : "",
						processingReq : "",
						acceptRejectReq : "",
						doneReq : "",
						signRejectReq : "",
						middleDoneReq : "",
					},
				},
				//조직별 요구사항 수
				grpReqCnt : {
					title : {
						main : {
							default : "조직별 요구사항 수",
						},
					},
					field : {
						reqCnt : "",
					},
				},
				//권한그룹별 요구사항 처리율
				authGrpReqThroughput : {
					title : {
						main : {
							default : "권한그룹별 요구사항 처리율",
						},
					},
					field : {
						acceptReq : "",
						processingReq : "",
						acceptRejectReq : "",
						doneReq : "",
						signRejectReq : "",
						middleDoneReq : "",
					},
				},
				//권한그룹별 요구사항 수
				authGrpReqCnt : {
					title : {
						main : {
							default : "권한그룹별 요구사항 수",
						},
					},
					field : {
						reqCnt : "",
					},
				},
				//프로세스별 요구사항 처리율
				processReqThroughput : {
					title : {
						main : {
							default : "프로세스별 요구사항 처리율",
						},
					},
					field : {
						acceptReq : "",
						processingReq : "",
						acceptRejectReq : "",
						doneReq : "",
						signRejectReq : "",
						middleDoneReq : "",
					},
				},
			},
			//프로세스
			prs:{
				fnData : {
					flowRevisionCd : "리비전 저장 유무"
					,flowDplCd : "배포계획 저장"
					,flowWorkCd : "작업"
					,flowAuthCd : "허용 역할 제한"
					,flowExpCd : "소명 단계"
					,flowOpinionCd : "의견 제시"
					,flowSignCd : "결재"
					,flowSignStopCd : "결재 반려 시 종료"
					,flowMiddleEndCd : "중간 종료"
					,flowDoneCd : "최종 완료 단계"
				}
			},
			//시스템
			stm:{
				// 시스템 정보
				systemInfo : {
					title:{
						main : {
							default : "시스템 정보",
						},
						serverInfo:"서버 정보",
						diskInfo:"디스크 정보",
						cpuInfo:"CPU 정보",
						memInfo:"메모리 정보",
					},
					label:{
						serverTime:"서버 시간",
						os : "OS",
						hostNm :"Host Name",
						ipvFour : "Ipv4",
						ipvSix : "Ipv6",
						totalStor:"전체 용량: ",
						usableStor:"사용 가능 용량: ",
						assignMem:"할당 메모리",
						usableMem: "사용 가능 메모리",
						memUseRatio: "메모리 사용률",
						hipMem:"힙 메모리",
						nonHipMem:"논 힙 메모리",
						cpuUseRatio:"CPU 사용률",
						cpuProcessor: "CPU 논리 프로세서",
					}
				}
			},
			*/
		},
		//osl-template.js 언어팩
		template:{
			setting : {
				label : {
					itemOptionVal : "표출 내용",
					itemNm : "표출 명",
					itemEssentialCd : "필수 유무",
					validation:"유효성 검사",
					cmmCodeSelect : "공통코드 선택",
					itemModifyCd : "수정 가능",
					alarmUseCd:"알림 기능 연결",
					alreadyAlarm : "미리 알림",
					timeLimitUseCd:"기간 제한 설정 여부",
					connectionUseCd:"선행지식처리를 위한 옵션 여부",
					multiSelCd : "다중 선택 여부",
					maxDaterangeSelect : "최대 기간 지정",
					minVal : "최솟 값",
					maxVal : "최댓 값",
					optionAddNDel : "옵션 갯수",
					selectedMaxUser : "최대 사용자 수",
					/*
					//TODO 임시 - 11번가 제안작업
					jiraFieldCd : "JIRA Custom Field 연결",
					jiraFieldType : "JIRA Custom Field",
					*/
					searchCd : "검색 항목 지정",
					searchSelect : "검색 항목 분류 선택",
					itemItlckCd : "연동 항목 여부",
				},
				tooltip : {
					itemNm : "항목 명을 입력하세요.",
					textPrint :"표출 내용 반영",
				},
				button : {
					textPrint :"반영",
				}
			},
			item :{
				label : {
					onlyTextPrintArea : "단순 텍스트 표출 영역",
					itemModifyCd : "수정 가능",
					itemTypeNm01: "단순 텍스트",
					itemTypeNm02: "텍스트 박스",
					itemTypeNm03: "텍스트 영역",
					itemTypeNm04: "날짜",
					itemTypeNm05: "일시",
					itemTypeNm06: "기간",
					itemTypeNm07: "숫자",
					itemTypeNm08: "체크리스트",
					itemTypeNm09: "사용자",
					itemTypeNm10: "기관 내/외",
					itemTypeNm11: "소속/부서",
					itemTypeNm12: "공통코드",
					itemTypeNm13: "첨부파일",
					itemTypeNm14: "알림 설정",
					itemTypeNm14Sub: "알림 기간",
					itemTypeNm15: "정보자산",
					itemTypeNm16: "디바이스(jamf)",
					fileFormStr01 : "파일을 여기에 놓고 붙여넣기 또는 ",
					fileFormStr02 : "&nbsp;찾아보기",
					serviceUsrItem : "권한 부여 대상자",
				},
				placeholder : {
					deptNm : "조직명",
					deptNmSearch : "조직명(검색 시 마지막 > 이후로 검색)",
					itemNm : "항목명을 입력하세요.",
					cimRuteNm : "정보자산명",
					optNm : "옵션명",
				},
				tooltip : {
					settingAlarm:"알림 기능이 설정된 기간입니다.",
					alarmUsr:"알림 받을 사용자입니다.",
					alarmUsrInOut:"알림 받을 사용자의 기관 내/외 선택입니다."
				},
				message : {
					serviceDateRange : "서비스 사용 기간 지정을 위한 항목입니다.",
					showSelCfg : "선택한 정보자산 태그가 표출됩니다.",
					alarmServiceNotChange : "현재 양식에서는 알림 항목 설정은 서비스 항목 기간에 대해서만 변경할 수 있습니다.",
					selectOptCount : "(${1})개를 선택해야 합니다.",
					selectOptCountRange : "(최소 ${1}개에서 최대 ${2}개 선택이 가능합니다.",
				}
			},
			message :{
				alert : {
					onlyUsedMultiSelCfg: "현재 정보자산은 다중 선택으로만 사용할 수 있습니다.",
					requiredError : "필수 옵션을 입력하세요.",
					requiredOneOpt : "필수 옵션은 1개만 선택 가능합니다.",
					unSelectedRequired : "기존 선택된 필수 옵션은 모두 해제됩니다.",
					overMinValOptCount : "선택 최솟 값은 옵션의 갯수를 초과할 수 없습니다.",
					overMaxValOptCount : "선택 최댓 값은 옵션의 갯수를 초과할 수 없습니다.",
					overMinValMaxVal : "선택 최솟 값은 최댓 값을 초과할 수 없습니다.",
					underMaxValMinVal : "최댓 값은 최솟 값보다 작을 수 없습니다.<br/>최솟 값으로 변경됩니다.",
					selectOptCount : "(${1})개를 선택해야 합니다.",
					selectOptCountRange : "(최소 ${1}개에서 최대 ${2}개 선택이 가능합니다.",
					minOptionNotDel : "${1}개 옵션은 필수입니다.<br/>삭제할 수 없습니다.",
					changeRequiredMinVal : "최소 선택 수가 지정되어 해당 항목이 필수로 변경됩니다",
					clearRequiredOptMinVal :"항목 필수가 해제되어 다중 선택 최솟 값은 0이 됩니다.",
					error : {
						createAreaCheck : "항목 별 설정을 위한 옵션 세팅을 할 수 없습니다.<br/>항목 생성 영역을 확인해주세요.",
						drawAreaCheck : "항목 별 설정을 위한 옵션 세팅을 할 수 없습니다.<br/>그리기 항목 생성 영역을 확인해주세요.",
					},
					selectMaxCount : "최대 ${1}개까지만 선택이 가능합니다.",
					notUsrId : "사용자 정보가 없습니다.",
					notSelectCim : "선택된 정보자산이 없습니다.",
					sameSelectCim : "동일한 정보자산이 존재합니다.",
					notInsertCim : "등록된 정보자산이 아닙니다.",
					
					/*osl-tempalte.js에서는 사용하지 않지만, 활용하여 다른 곳에서 공통적으로 사용되는 메시지도 여기에 추가*/
					validateCheckItem : "필수 항목 입력/체크 또는 유효성이 맞지 않는 항목이 있습니다.<br/>입력한 값을 확인해주세요.",
					itemSettingPlz : "설정이 누락된 항목이 있습니다.<br/>항목을 설정하세요.",
				},
				confirm : {
					getItemOptionVal : "표출 내용은 필수로 입력되어야 합니다.<br/>반영되어 있는 내용을 다시 가져오시겠습니까?",
					assignAlarm:"이미 알람기간이 연결된 기간이 존재합니다. 변경하시겠습니까?",
					/*osl-tempalte.js에서는 사용하지 않지만, 활용하여 다른 곳에서 공통적으로 사용되는 메시지도 여기에 추가*/
					changeAlarmUseCd:"해당 요소 삭제시 알림연결이 해제됩니다.",
				}
			}
		},
		//osl-guide.js 언어팩
		guide:{
			title : {
				guideContentInsert : "가이드 내용 등록",
			},
			label : {
				guideItemKey : "가이드 대상 요소 key",
				top : "Top",
				left : "Left",
				arrowStart : "Arrow Start",
				arrowEnd : "Arrow End",
				curveYn : "곡선 유무",
				guideTitle : "가이드 제목",
				detailAdd : "상세 내용 추가",
				movementHelpTool : "도움말 상자 이동 설정",
				guideDataJson : "페이지 가이드 데이터 JSON",
				pageId : "페이지 ID",
			},
			placeholder : {
				guideItemKey : "가이드 대상 요소 key",
				zeroPx : "00 px",
				guideTitle : "title",
				detailTitle : "상세 제목",
				detailContent : "상세 내용",
				pageId : "페이지 ID",
			},
			button : {
				copyJson : "JSON 복사",
				prev : "이전",
				guideBoxAdd : "가이드 상자 추가",
			},
			message : {
				alert : {
					dontHelpTool : "현재 도움말 기능을 사용 할 수 없습니다. <br/>작업중인 기능을 종료하고 다시 시도해주세요.",
					error : "도움말 내용을 불러오는 도중 오류가 발생했습니다.",
					pageNoContent : "현재 페이지의 도움말 내용이 없습니다.",
					guideItemKey : "가이드 대상 요소 key는 필수 값입니다.",
					problemGuideData : "가이드 데이터에 문제가 있습니다.",
				},
				confirm : {
					areadyHelpPageId : "이미 도움말 데이터가 존재하는 페이지ID입니다.<br/>현재 데이터를 초기화하시겠습니까?<br/>확인을 누르면 입력된 페이지ID에 해당하는 도움말 데이터를 불러옵니다.<br/>취소를 누르면 현재 입력된 데이터를 유지합니다.",
					
				},
				content : {
					stopMovementHelpTool : "도움말 상자 이동 설정을 중지하려면 아래 버튼을 클릭하세요.",
				},
				toastr : {
					engKey : "대상 Key는 영문으로 시작해야합니다.",
					resetData : "데이터를 초기화했습니다.",
					restoreData : "이전 데이터로 복구했습니다.",
					copyJsonData : "JSON 데이터를 복사했습니다.",
				},
			},
			select2 : {
				left : "좌측 (Left)",
				top : "상단 (Top)",
				bottom : "하단 (Bottom)",
				right : "우측 (Right)",
				center : "중앙 (Center)",
				true : "사용",
				false : "미 사용",
			}
		},
		/* 페이지 언어 구조 */
		/*
		 페이지명: {
			title: {
				main: { //모달 팝업 타이들, 메뉴 타이틀
					default: "기본 타이틀 제목",
					insert: 등록 팝업 명,
					update: 수정 팝업 명
					..등등
				},
				추가 title: 해당 페이지 html 내 추가 title,
				..등등
			},
			tab: {
				tab버튼관련내용
			},
			label: {},
			tags: {},
			content: {},
			placeholder: {},
			regex: {
				regexalert 문구
			},
			button: {
				데이터 테이블 관련 외 선언되는 모든 버튼
			},
			tooltip: {
				datatable 외의 해당 페이지 모든 tooltip
			},
			datetable(또는 treetable, chart로 작성 필요에 따라 datatable 대신 데이터 테이블 명칭 착성(exarm1000Table)): {
				title: "액션 버튼 타이틀",
				label: {},
				button: {
					액션버튼
				},
				tooltip: {
					액션버튼툴팁
				},
				field: {
					추가검색필드
				},
				contextmenu: {}
			},
			message: {
				출력되는메시지
			},
		}
		*/
		// top(메뉴)
		top:{
			title:{
				main:{
					default : "상단 영역",
				},
				reqMy : "담당 티켓",
				myPage : "마이페이지",
				myWork : "담당 작업",
				opinion : "의견 제시",
				userSetting : "사용자 설정",
				rcntAccess5 : "최근 5개 메뉴",
				responsibleReq : "담당 보안 티켓",
				alarm : "알림",
				selPrjAuthGrp : "프로젝트 및 권한 그룹 선택",
				todo :{
					sign: "결재 처리 목록",
					reqEpt: "소명 제출 목록",
					reqEptChk: "소명 검토 목록",
					sckEptChk: "이의 검토 목록",
					acdReq: "사고 처리 목록",
					spcAuth : "권한 적정성 점검 목록",
					qnaAnswer :"답변 대기 문의 목록",
					reqApply : "적용대기 신청서 목록",
					opnAnswer : "의견 미답변 신청서 목록",
					workReq : "작업 목록",
				}
			},
			tab:{
				reqRequest : "요청 티켓",
				reqStay : "접수 대기",
				secPolicy : "보안정책",
				anomaly : "이상징후",
				sign : "결재",
				others : "기타",
			},
			label:{
				header : "HEADER",
				topMenuType : "상단 메뉴 타입",
				topEtcFn : "상단 추가 기능 바",
				datatable: "Datatable",
				datatableType : "데이터테이블 타입",
				etc : "Etc",
				mainPageSetting : "메인 페이지 설정",
				mainPrjSetting : "메인 프로젝트 설정",
				incmplCnt : "미완료 수",
				unansrCnt : "미답변 수",
				rcntSearch : "최근 검색 내역",
			},
			placeholder : {
				mainPrjNm : "메인 프로젝트 명"
			},
			button:{
				search : "검색",
				changePotal : "관리 포탈 OPEN"
			},
			tooltip:{
				favorit : "즐겨찾기",
				etcFn : "추가 기능 바",
				myPage : "마이페이지",
				message : "메시지",
				alarm : "알림",
				personalSetting : "개인 설정",
				responsibleReq : "담당 보안 티켓",
				lang : "언어 변경",
				korean : "한국어",
				english : "English",
				personalInfo : "개인 정보",
				selPrjAuthGrp : "프로젝트 및 권한 그룹 선택",
				selPrjGrp : "프로젝트 그룹 선택",
				selPrj : "프로젝트 선택",
				selAuthGrp : "권한 그룹 선택",
				logout : "로그아웃",
				topMenuType : "[상단 메뉴 타입]<br/>전체 펼침: 대 메뉴 하위 메뉴 전체 펼침 표시<br/>계층 펼침: 대 메뉴 부터 하위 메뉴를 계층적으로 표시",
				topEtcFn : "상단 추가 기능바 항상 보이기/선택 보이기",
				datatableType : "데이터테이블 초기 UI 선택",
				mainPageSetting : "프로젝트 및 권한 그룹 전환 시 메인 페이지 선택",
				mainPrjSetting : "메인 프로젝트 선택",
				reqRequest : "요청 티켓",
				reqStay : "접수 대기",
				secPolicy : "보안정책",
				anomaly : "이상징후",
				sign : "결재",
				others : "기타",
			},
			menu :{
				favorit : "즐겨찾기",
				menu : "메뉴",
				prjGrp : "프로젝트 그룹",
				prj: "프로젝트",
				authGrp : "권한 그룹",
				korean : "한국어",
				english : "English",
			},
			message:{
				content:{
					//No result found
					noResult : "조회된 결과가 없습니다.",
					//Please try again with a different query
					tryAgain : "다시 시도하십시오."
				},
				alarm :{
					//권한이 없음
					notAuthority :{
						accept : '접수 권한이 없습니다.',
					}
				}
			}
		},
		quickmenu:{
			label:{
				nmId : "이름 / ID",
				licGrp : "라이선스그룹",
				stdWorkHours : "기준근무시간",
			},
			button:{
				updateInfo : "정보수정",
			},
			message:{
				title:{
					noti : "알림창",
				}
			}
		},
		// osl-core
		core:{
			label:{
				processingPop : "업무 처리",
				detailPop : "상세 보기",
				targetUsrCnt : "대상자 수 : ",
				spcAuthTagetUsrCnt : "권한 부여 대상자 수 : ",
				chgDeptUsrCnt : "사용자 정보 변경 건 : ",
				retireUsrCnt : "사직원 정보 건 : ",
				chgDeptYn : "사용자 정보 변경",
				retireYn : "사직원 정보"
			},
		},
		//select2
		select2:{
			placeholder:{
				selInput : "선택 또는 입력",
			},
			message:{
				content:{
					noResults : "조회된 데이터가 없습니다.",
				},
				noResults : "조회된 데이터가 없습니다.",
			}
		},
		//모바일 접근 페이지
		mobileAccess:{
			title:{
				default: "이 페이지는 모바일 기기를 지원하지 않는 메뉴입니다."
			}
		},
		//왼쪽 사이드 바
		aside:{
			placeholder:{
				menuSearch : "메뉴 검색",
			}
		},
		// 메시지 목록 팝업
		arm1000:{
			title:{
				main:{
					default : "MESSAGE",
				},
				getUsrGrp : "받는 사람 목록",
				get : "받은 메시지",
				send: "보낸 메시지",
				alone: "나에게 보낸 메시지"
			},
			tab:{
				get : "받은 메시지",
				send : "보낸 메시지",
				alone : "나에게 보낸 메시지"
			},
			tooltip:{
				get : "받은 메시지",
				send : "보낸 메시지",
				alone : "나에게 보낸 메시지",
			},
			arm1000ArmTable : {
				title : "삭제 / 상세 / 답장",
				button : {
					insert : "쓰기", 
					reInsert : "답장",
					check : "읽음",
				},
				tooltip : {
					select : "메시지 조회",
					insert : "메시지 보내기",
					reInsert : "메시지 답장",
					check : "메시지 읽음 처리",
					delete : "메시지 삭제",
					detail :"메시지 상세 조회",
					other : "그 외"
				},
				field : {
					sendUsrId : "보낸 사람 ID",
					sendUsrEmail : "보낸 사람 e-mail",
					usrNm : "받는 사람",
					usrId : "받는 사람 ID",
					usrEmail :"받는 사람 e-mail",
					content : "내용"
				},
				contextmenu:{
					detail :"메시지 상세 조회",
					reInsert : "메시지 답장",
					check : "메시지 읽음 처리",
					delete : "메시지 삭제",
				}
			},
			message : {
				alert:{
					selectArm : "답장할 메시지를 선택하세요.",
					selectOne : "1개의 메시지만 선택하세요.<br/>${1}개의 메시지가 선택되었습니다.",
				},
			},
		},
		// 메시지 쓰기 팝업
		arm1001:{
			title :{
				main:{
					default : "메시지 쓰기",
					reInsert :"메시지 답장",
				}
			},
			label : {
				to : "받는 사람",
				title : "제목",
				content : "내용",
				attachments : "파일 첨부",
				tag : "태그",
				request : "보안티켓",
			},
			placeholder :{
				title : "제목",
				content : "내용",
				select2 : "선택 또는 검색",
			},
			button : {
				send : "보내기"
			},
			message :{
				alert:{
					inputToUser : "받는 사람을 입력하세요.",
				},
				confirm:{
					send : "메시지를 보내시겠습니까?",
				},
			},
		},
		// 메시지 상세 팝업
		arm1002 : {
			title:{
				main:{
					default : "메시지 상세",
				}
			},
			label : {
				title : "제목",
				content : "내용",
				attachments : "첨부 파일",
			},
			button : {
				reInsert : "답장"
			},
		},
		// 관리자 - 프로젝트 사용자 관리
		adm1000 : {
			title : {
				main : "프로젝트 사용자 관리",
				prjList : "프로젝트 목록",
				prjUsrList : "프로젝트 사용자 목록"
			},
			prjDatatable :{
				title :  "선택 / 상세",
				tooltip : {
					click : "선택",
					dblClick : "상세보기",
					select : "프로젝트 목록 조회",
				},
				contextmenu:{
					projectDetail: "프로젝트 상세정보"
				}
			},
			usrDatatable : {
				title : "수정 / 삭제 / 상세",
				tooltip :{
					select : "프로젝트 사용자 조회",
					insert : "프로젝트 사용자 추가",
					update : "프로젝트 사용자 수정",
					delete : "프로젝트 사용자 삭제",
					updateUser : "수정",
					deleteUser : "삭제",
					detailUser : "상세보기",
				},
				contextmenu:{
					userDetail: "사용자 상세 정보",
					userUpdate: "사용자 정보 수정",
					userDelete: "사용자 정보 삭제"
				}
			},
		},
		//취약점 현황
		atv1000 : {
			title : {
				sdmsByTerm : "기간별 취약점 현황",
				sdmsByDept : "조직별 취약점 현황",
				svcSdmsByBumunCnt : "부문별 서비스 점검 건수", 
				svcSdmsByBumun : "부문별 서비스 점검 현황", 
				comEvaIdx : "종합평가 지수",
				sdmsByBumun : "부문별 취약점 현황",
				sdmsByTeam : "팀별 취약점 현황",
				pfmIdxByMonth : "월별 성과지표 (총 조치 건수, 완료, 미조치)"
			},
			label : {
				actnCnt : "조치 건수",
				notActnCnt : "미조치 취약점",
				allCnt : "취약점 합계"
			},
			message:{
				alert : {
					maxOneYear : "최대 1년까지만 조회 가능합니다.",
					max12Month : "최대 12개월까지만 조회 가능합니다.<br/><br/>예시<br/>2020-01-01 ~ 2020-12-31 (12개월)<br/>2020-06-15 ~ 2021-06-14 (13개월)<br/>",
				}
			},
		},
		//문의 응답 현황 목록
		atv2000 : {
			title:{
				main:{
					default : "문의 응답 현황",
				},
				deptQnaSituation : "부서별 문의 현황",
				deptQnaAnswer : "부서별 답변 현황",
			},
			atv2000QnaTable : {
				tooltip : {
					select : "조회",
					excel : "엑셀 다운로드",
				},
			},
			atv2000QnaAnswerTable : {
				tooltip : {
					select : "조회",
					excel : "엑셀 다운로드",
				},
			},
			button : {
				deptQnaSituation : "부서별 문의 현황",
				deptQnaAnswer : "부서별 답변 현황",
			},
		},
		//문의 응답 현황 목록
		atv2001 : {
			title:{
				main:{
					default : "문의 응답 현황",
				},
				deptQnaResponse : "[${1}] 문의 응답 현황",
				responseQnaList : "[응답] 문의글 목록",
				noResponseQnaList : "[미응답] 문의글 목록",
			},
			message : {
				alert : {
					cantUsrDetail : "문의글 작성자 또는 문의 답변자만 상세정보를 조회할 수 있습니다.",
				},
			}
		},
		//문의 응답 상세 팝업
		atv2002 : {
			title : {
				main : {
					detail : "문의 답변 상세",	
				},
				qnaAnswer : "문의 답변",
				qnaTypNm : "선택 유형 : ${1}",
			},
			message : {
				confirm: {},
				deleted : "삭제된 코멘트입니다.",
			},
			label : {
				reqUsrNm : "작성자 명",
				regUsrEmail : "작성자 e-mail",
				regUsrDeptNm : "작성자 조직",
				regDt : "작성 일자",
				qnaNm : "문의 제목",
				qnaDesc : "문의 내용",
				attachments : "파일 첨부",
			},
			tooltip : {
				currentTotal : "답변 건수 / 총 답변 건수",
				chargeView : "클릭 시 담당자 목록이 표출됩니다."
			}
		},
		//카테고리별 응답 현황
		atv2100 : {
			title:{
				main:{
					default : "카테고리 응답 현황",
				}
			},
			atv2100QnaTable : {
				tooltip : {
					select : "조회",
					excel : "엑셀 다운로드",
				},
			},
			button : {
				deptQnaSituation : "부서별 문의 현황",
				deptQnaAnswer : "부서별 답변 현황",
			},
		},
		//세부 카테고리별 응답 현황
		atv2101 : {
			title:{
				main:{
					default : "세부 카테고리 별 문의 현황",
				},
				qnaSituation : "문의 기준 현황",
				addQnaSituation : "추가문의 기준 현황",
				subQnaTitle : "${1} 세부 카테고리별 현황",
			},
			atv2101QnaTable : {
				tooltip : {
					select : "조회",
					excel : "엑셀 다운로드",
				},
			},
			atv2101AddQnaTable : {
				tooltip : {
					select : "조회",
					excel : "엑셀 다운로드",
				},
			},
			buttion : {
				qnaSituation : "문의 기준 현황",
				addQnaSituation : "추가문의 기준 현황",
			},
		},
		//문의 요청 목록
		atv2200 : {
			message : {
				alert : {
					cantUpdate : "${1}가 아닌 문의글은 수정이 불가합니다.",
					cantDelete : "문의 상태가 접수대기 또는 작성자가 아닌 문의글은 삭제가 불가합니다.",
					cantUsrDetail : "문의글 작성자 또는 문의 답변자만 상세정보를 조회할 수 있습니다.",
				},
				toastr : {
					cantDelete : "삭제 불가한 ${1}건 제외 후 삭제되었습니다.",
				},
			},
			atv2200QnaReqTable : {
				tooltip : {
					select : "문의 요청 조회",
					insert : "문의 요청 등록",
					update : "문의 요청 수정",
					delete : "문의 요청 삭제",
					detail : "문의 요청 상세",
				}
			}
		},
		//문의 요청 등록/수정 팝업
		atv2201 : {
			title: {
				main : {
					insert : "문의 요청 등록",
					update : "문의 요청 수정",
				},
				qnaCategory : "Q. 문의 카테고리를 선택하세요.",
				qnaTypNm : "선택 유형 : ${1}",	
				preQnaReqChk : "유사 답변사례 확인",
			},
			button : {
				qnaTyeChoice :  "선택",
				selPreQna  : "유사문의 확인",
				selPreQnaClose  : "유사문의 닫기",
				qnaTypRollBack: "카테고리 재선택",
			},
			placeholder : {
				qnaNm : "문의 제목을 입력하세요.",
				usrNm : "작성자 명",
				email : "작성자 e-mai",
			},
			message : {
				alert : {
					cantQnaTyp : "카테고리를 선택해주세요.",
					noQnaTypUsrId : "카테고리 담당자가 존재하지 않습니다.",
				},
				confirm: {
					insert : "문의글을 등록하시겠습니까?",
					update : "문의글을 수정하시겠습니까?",
					qnaTypRollBackMsg : "입력된 정보는 모두 초기화됩니다.<br/>그래도 카테고리를 변경하시겠습니까?",
					resetFile : "파일 정보가 최초 상태로 변경됩니다.<br/>기존 파일 목록으로 초기화 하시겠습니까?",
				},
				privateQnaCantConfirm : "비공개 카테고리의 문의글은 확인 할 수 없습니다.",
			},
			label : {
				reqUsrNm : "작성자 명",
				regUsrEmail : "작성자 e-mail",
				regUsrDeptNm : "작성자 조직",
				regDt : "작성 일자",
				qnaNm : "문의 제목",
				qnaDesc : "문의 내용",
				attachments : "파일 첨부",
			}
		},
		//문의 요청 상세 팝업
		atv2202 : {
			title: {
				main : {
					defualt : "문의 요청 상세정보"	
				},
				qnaAnswer : "문의 답변",
				qnaTypNm : "선택 유형 : ${1}",
			},
			button : {
				comment : "코멘트",
				addQna : "추가 문의",
				answerFile  :"첨부파일"
			},
			placeholder : {
				inputQnaDesc : "Shift + Enter로 줄바꿈을 할 수 있습니다.",
			},
			message : {
				alert : {
					notContentInsert : "작성된 내용이 없습니다.",
					cantAddAnswerMsg : "변경된 코멘트 내용이 없습니다.",
					cantUpdateAddAnswerMsg : "수정중인 추가문의 내용이 존재합니다.",
				},
				confirm: {
					resetAnswerMsg : "입력된 정보는 모두 초기화됩니다.<br/>그래도 취소하시겠습니까?",
					inserMsg : "등록하시겠습니까?",
					updateComentMsg : "답변 수정하시겠습니까?",
				},
			},
			label : {
				reqUsrNm : "작성자 명",
				regUsrEmail : "작성자 e-mail",
				regUsrDeptNm : "작성자 조직",
				regDt : "작성 일자",
				qnaNm : "문의 제목",
				qnaDesc : "문의 내용",
				attachments : "파일 첨부",
			},
			tooltip : {
				currentTotal : "답변 건수 / 총 답변 건수",
				chargeView : "클릭 시 담당자 목록이 표출됩니다.",
				answerFile : "첨부파일 등록",
			},
			content : {
				noInsertAnswer : "등록된 답변이 없습니다.",
			},
		},
		//문의 답변 목록
		atv2300 : {
			title : {
				main : {
					default :  "문의 답변",
					detail : "문의 답변 상세",
				}
			},
			message : {
				alert : {
					cantUsrDetail : "문의글 작성자 또는 문의 답변자만 상세정보를 조회할 수 있습니다.",
				},
				toastr : {},
			},
			atv2300QnaTable : {
				tooltip : {
					select : "문의 답변 조회",
					qnaAnswer : "문의 답변",
					detail : "문의 요청 상세",
				},
				button : {
					qnaAnswer : "문의 답변",
				},
				message : {
					alert : {
						qnaReqChk : "문의 답변할 목록을 선택해주세요.",
						oneQnaReqChk : "단건만 선택 가능합니다.",
						noQnaAuswerCharge : "문의 답변 대상자가 아닙니다.",
					}
				}
			}
		},
		//문의 답변 팝업
		atv2301 : {
			title : {
				main : {},
				qnaAnswer : "문의 답변",
				qnaTypNm : "선택 유형 : ${1}",
			},
			message : {
				alert : {
					notAnswerInsert : "입력된 답변내용이 없습니다.",
					cantQnaTransferMsg : "이관할 카테고리와 현재 카테고리와 동일합니다.",
					noQnaTypUsrId : "선택된 카테고리 유형의 담당자가 존재하지 않습니다.",
					cantUpdateComentMsg : "수정중인 답변이 존재합니다.",
					cantComentMsg : "변경된 내용이 없습니다.",
					cantChargeMsg : "답변 담당자가 존재하지 않습니다.",
				},
				confirm: {
					insertCharge : "답변자를 등록하시겠습니까?",
					deleteCharge : "추가 답변자를 제거하시겠습니까?",
					inserMsg : "답변 등록하시겠습니까?",
					qnaTypTransferMsg : "카테고리 이관 시 문의글 담당자가 변경되고, 팝업이 닫힙니다.<br/>그래도 이관하시겠습니까?",
					updateComentMsg : "답변 수정하시겠습니까?",
					resetComentMsg : "입력된 정보는 모두 초기화됩니다.<br/>그래도 취소하시겠습니까?",
				},
			},
			label : {
				reqUsrNm : "작성자 명",
				regUsrEmail : "작성자 e-mail",
				regUsrDeptNm : "작성자 조직",
				regDt : "작성 일자",
				qnaNm : "문의 제목",
				qnaDesc : "문의 내용",
				attachments : "파일 첨부",
			},
			button : {
				chargeAdd : "담당자 추가",
				qnaTypTransfer : "카테고리 이관",
				answerFile : "첨부파일",
			},
			placeholder : {
				inputQnaDesc : "Shift + Enter로 줄바꿈을 할 수 있습니다.",
			},
			tooltip : {
				currentTotal : "답변 건수 / 총 답변 건수",
				chargeView : "클릭 시 담당자 목록이 표출됩니다.",
				answerFile : "첨부파일",
			},
			content : {
				noInsertAnswer : "등록된 답변이 없습니다.",
				addCharge : "추가 답변자",
			},
		},
		//문의 답변 상세 팝업
		atv2302 : {
			title : {
				main : {},
				qnaAnswer : "문의 답변",
				qnaTypNm : "선택 유형 : ${1}",
			},
			message : {
				confirm: {},
				deleted : "삭제된 코멘트입니다.",
			},
			label : {
				reqUsrNm : "작성자 명",
				regUsrEmail : "작성자 e-mail",
				regUsrDeptNm : "작성자 조직",
				regDt : "작성 일자",
				qnaNm : "문의 제목",
				qnaDesc : "문의 내용",
				attachments : "파일 첨부",
			},
			tooltip : {
				currentTotal : "답변 건수 / 총 답변 건수",
				chargeView : "클릭 시 담당자 목록이 표출됩니다."
			},
			content : {
				noInsertAnswer : "등록된 답변이 없습니다.",
			},
		},
		//문의 담당자 목록 
		atv2400 : {
			title : {
				main : {
					default : "문의 담당자 관리"
				},
				subQnaList:"세부 카테고리 목록",
			},
			button:{
				insert : "담당자 지정",
				delete : "담당자 삭제",
			},
			tooltip:{
				select : "문의 담당자 조회",
				insert : "담당자 지정",
				delete : "담당자 삭제",
			},
			message : {
				alert : {
					qnaKategorieChk : "카테고리를 선택해주세요.",
					oneQnaKategorieChk : "단건만 선택 가능합니다.",
					notQnaKategorieCharge : "담당자가 존재하지 않습니다.",
				},
				confirm : {
					qnaChargeChk : "담당자로 지정하시겠습니까?",
					delQnaChargeChk : "담당자를 삭제하시겠습니까?",
				},
				toastr : {
					cantDelete : "삭제 불가한 ${1}건 제외 후 삭제되었습니다.",
				}
			},
		},
		//과제 현황 관리
		atv4000 : {
			title : {
				main : {
					default : "과제현황 관리",
				}
			},
			atv4000MajTskTable : {
				tooltip : {
					select : "대과제 목록 조회",
					insert : "대과제 등록",
					update: "대과제 수정",
					delete : "대과제 삭제",
					detail : "대과제 목록 상세",
					excel : "엑셀 다운로드"
				},
				contextmenu : {
					detail : "대과제 목록 상세",
					update: "대과제 수정",
					delete: "대과제 삭제",
				},
				message : {
					confirm : {
						delete : "대과제 삭제 시 연결된 소과제 목록도 함께 삭제됩니다.<br/>그래도 삭제하시겠습니까?",
					},
				},
			},
			atv4000MinTskTable : {
				tooltip : {
					select : "소과제 목록 조회",
					insert : "소과제 등록",
					update: "소과제 수정",
					delete: "소과제 삭제",
					detail : "소과제 목록 상세",
					excel : "엑셀 다운로드",
					chargerView : "클릭 시 담당자 목록이 표출됩니다.",
				},
				contextmenu : {
					detail : "소과제 목록 상세",
					update: "소과제 수정",
					delete: "소과제 삭제",
				},
				message : {
					content : {
						selMajTskclick : "대과제 목록을 선택해주세요.",
					},
					confirm : {
						delete : "선택한 소과제 목록을 삭제하시겠습니까?",
					},
					alert : {
						cantUpdate : "메뉴관리자 또는 소과제 담당자가 아니면 수정이 불가합니다.",
						cantDelete : "메뉴관리자 또는 소과제 담당자가 아니면 삭제가 불가합니다.",
						clickMajTsk : "대과제를 선택해주세요.",
					},
					toastr : {
					cantDelete : "삭제 불가한 소과제 목록 ${1}건 제외 후 삭제되었습니다.",
					},
				}
			},
		},
		//과제 등록/수정 팝업
		atv4001 : {
			title : {
				main : {
					insert : "대과제 등록",
					update : "대과제 수정",
				}
			},
			placeholder : {
				majTskNm : "대과제 명",
			},
			label : {
				majTskNm : "대과제 명",
				majTskDesc : "대과제 내용",
				majDtm : "대과제 기간",
				attachments : "첨부 파일",
			},
			message : {
				confirm : {
					insert : "대과제를 등록하시겠습니까?",
					update : "대과제를 수정하시겠습니까?",
					resetFile : "파일 정보가 최초 상태로 변경됩니다.<br/>기존 파일 목록으로 초기화 하시겠습니까?",
				}
			}
		},
		//과제 상세 팝업
		atv4002 : {
			title : {
				main : {
					default : "대과제 상세",
				}
			},
			label : {
				majTskNm : "대과제 명",
				majTskDesc : "대과제 내용",
				majDtm : "대과제 기간",
				attachments : "첨부 파일",
			}
		},
		//소과제 등록/수정 팝업
		atv4003 : {
			title : {
				main : {
					insert : "소과제 등록",
					update : "소과제 수정",
				}
			},
			placeholder : {
				minTskNm : "소과제 명",
				dept : "부서 검색 시 검색 결과가 1건일 경우 자동세팅됩니다.",
				selectList: "입력 후 엔터 키를 입력해주세요.",
			},
			label : {
				minTskNm : "소과제 명",
				minTskDesc : "소과제 내용",
				minDtm : "소과제 기간",
				prgStsCd : "소과제 진행 상태",
				attachments : "첨부 파일",
				minTskChargeList : "소과제 담당자",
				dept : "부서"
			},
			message : {
				confirm : {
					insert : "소과제를 등록하시겠습니까?",
					update : "소과제를 수정하시겠습니까?",
					resetFile : "파일 정보가 최초 상태로 변경됩니다.<br/>기존 파일 목록으로 초기화 하시겠습니까?",
					resetCharge : "소과제 담당자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
				},
				alert : {
					noDeptId : "존재하는 조직이 없습니다.",
					reset : "소과제 담당자 목록이 초기화 되었습니다.",
				}
			},
			button : {
				deptSearch : "부서 검색",
				add : "소과제 담당자 지정",
			},
			tooltip : {
				reset : "소과제 담당자 초기화",
			}
		},
		//소과제 상세 팝업
		atv4004 : {
			title : {
				main : {
					default : "소과제 상세",
				}
			},
			label : {
				minTskNm : "소과제 명",
				minTskDesc : "소과제 내용",
				minDtm : "소과제 기간",
				prgStsCd : "소과제 진행 상태",
				attachments : "첨부 파일",
				minTskChargeList : "소과제 담당자",
				dept : "부서"
			},
		},
		//보안지수 현황
		atv5000:{
			title:{
				ifpData : "정보보호 지수 데이터",
				ifpSmpData : "정보보호 지수 샘플 데이터",
			},
			atv5000Table:{
				tooltip:{
					select : "정보보호 지수 데이터 조회",
					excel : "정보보호 지수 엑셀 다운로드",
				},
			},
		},
		//보안지수 관리
		atv5100:{
			title:{
				ifpData : "정보보호 지수 데이터",
			},
			atv5100Table:{
				tooltip:{
					select : "정보보호 지수 데이터 조회",
					sample : "샘플 데이터 조회",
					insert : "정보보호 지수 데이터 등록",
				},
			},
		},
		//자료 정보 관리
		atv6100 : {
			title:{
				main:{
					default : "자료 정보 관리",
				}
			},
			atv6100DtaTable : {
				tooltip : {
					select : "자료정보 조회",
					update: "자료정보 수정",
					insert : "자료정보 등록",
					delete : "자료정보 삭제",
					fileDownload : "자료정보 파일 다운로드",
				},
				contextmenu:{
					detail : "자료정보 상세",
					update : "자료정보 수정",
					delete : "자료정보 삭제",
				}
			},
			message:{
				alert : {
					noData : "${1} 데이터가 없습니다.",
				},
			},
		},
		// 게시글 관리(게시글 목록) : 시스템 게시판 관리 - 관리
		bad1001:{
			title:{
				main:{
					default : "[ ${1} ] 게시글 관리"
				},
				normal:"[일반]",
				gallery:"[갤러리]",
				movie:"[영상]",
				storage:"[자료실]",
			},
			label:{
				delete: "삭제",
				notice: "공지",
				hit : "조회수",
			},
			bad1001BadTable:{
				title: "수정 / 삭제 / 상세",
				tooltip:{
					select:"게시글 조회",
					insert:"게시글 등록",
					update:"게시글 수정",
					delete:"게시글 삭제",
					detail:"게시글 상세",
				},
				field:{
					tagNm:"태그",
					badContent: "내용",
					badNtcCheck : "공지 유무",
					delCd:"삭제 유무",
					cmtContent:"댓글 내용",
				},
				contextmenu:{
					detail : "게시글 상세",
					update : "게시글 수정",
					delete : "게시글 삭제",
				}
			},
			message : {
				alert:{
					notAuthBasic : "해당 게시글에 대한 권한이 없습니다.",
					notAuthInsert : "게시글 등록 권한이 없습니다.",
					notAuthSelect : "해당 게시글에 대한 읽기 권한이 없습니다.",
					notAuthUpdate : "해당 게시글에 대한 수정 권한이 없습니다.",
					notAuthDelete : "해당 게시글에 대한 삭제 권한이 없습니다.",
					selectBadInfoCnt : "1건의 게시글을 선택하세요.<br/>${1}건의 게시글이 선택되었습니다." ,
					deleted: "이미 삭제된 게시글입니다.",
					deletedExist : "이미 삭제된 게시글이 존재합니다.",
				},
				confirm:{
					delete: "게시글을 삭제하시겠습니까?",
				},
				content:{
					delReason : "사용자(${1}) 직접 삭제",
				},
			},
		},
		// 게시글 상세 팝업
		bad1002:{
			title:{
				main :{
					default : "[ ${1} ] 상세 ",
					//TODO badNum 이 있을 경우(파라미터 2개)의 타이틀 예시 없음, 변경 필요
					hasBadNum : "[ ${1} ] 상세 ${2}",
				},
				comment:"댓글",
			},
			label:{
				content:"내용",
				writeDate : "작성일시",
				attachments : "파일 첨부",
				thumbnail : "썸네일",
				tag: "태그",
				delReason: "삭제 사유",
				delete: "삭제",
				notice: "공지",
				hit : "조회수",
			},
			button:{
				restore : "복원",
			},
			tooltip:{
				update : "게시글 수정",
				delete : "게시글 삭제",
				restore : "게시글 복원",
			},
			bad1002CmtTable:{
				title : "삭제",
				tooltip:{
					select : "댓글 조회",
					delete : "댓글 삭제",
				},
				contextmenu : {
					delete : "댓글 삭제",
				}
			},
			message : {
				alert:{
					notAuthUpdate : "해당 게시글에 대한 수정 권한이 없습니다.",
					notAuthDelBad : "해당 게시글에 대한 삭제 권한이 없습니다.",
					notAuthDelCmt : "해당 댓글에 대한 삭제 권한이 없습니다.",
					notAuthRestore : "해당 게시글에 대한 복원 권한이 없습니다.",
					delCmtMine : "본인이 작성한 댓글만 삭제 가능합니다.",
				},
				confirm:{
					deleteBad: "게시글을 삭제하시겠습니까?",
					restore: "삭제된 게시글을 복구하시겠습니까?",
					deleteCmt : "댓글을 삭제하시겠습니까?",
					insertCmt : "댓글을 등록하시겠습니까?",
				},
				content:{
					delReason : "사용자(${1}) 직접 삭제",
				},
			},
		},
		// 게시글 등록/수정 팝업
		bad1003:{
			title :{
				main :{
					default : "[ ${1} ] 게시글 등록",
					update : "[ ${1} ] 게시글 수정"
				},
			},
			label:{
				title:"제목",
				content:"내용",
				noticeCheck:"공지사항 사용",
				noticeDate:"공지 기간",
				noticeDateIgnore:"상시 공지",
				noticePopup:"공지 팝업",
				secretCheck:"비밀글 사용",
				password:"PW",
				passwordCheck:"PW 확인",
				commentCheck:"댓글 허용",
				attachments : "파일 첨부",
				tag : "태그",
				thumbnail : "썸네일",
			},
			placeholder:{
				badTitle : "제목",
				badContent : "내용",
				password : "알파벳과 숫자 조합 4-12자 이내",
				nullPassword : "공백인 경우 기존 비밀번호 사용",
			},
			regex:{
				password : "알파벳과 숫자 조합 4-12자 이내",
			},
			message:{
				alert:{
					resetFile : "파일 정보가 최초 상태로 변경됩니다.<br/>기존 파일 목록으로 초기화 하시겠습니까?",
					fileCnt : "첨부파일 가능한 개수는 ${1}개입니다.",
					thumbnailfileCnt : "썸네일 파일은 ${1}개를 필수로 첨부해야합니다.",
					unableSave : "글 작성자 또는 게시판 담당자만 ${1}할 수 있습니다.",
					insert : "등록",
					update : "수정",
				},
				confirm:{
					insert: "글 작성을 완료하시겠습니까?",
					update: "글 수정을 완료하시겠습니까?",
				},
				toastr:{
					fileOption : "해당 게시판 유형은 첨부파일이 필수입니다.",
					password : "비밀글에 사용할 비밀번호를 입력해주세요.",
					tagMatching : "태그값이 중복됩니다.",
				},
				content:{
					thumbnail : "클릭하여 썸네일을 지정하세요.",
					ntcPopup : "* 금일 시작 공지를 우선 표출, 이후 등록일 순으로 최대 5개까지 추가 공지를 표출 가능합니다.",
				},
			},
		},
		// 삭제 사유 팝업
		bad1004:{
			title:{
				main : {
					default: "삭제 사유",
					cmtDelReason : "댓글 삭제 사유",
					oneBad : "[${1}] 게시글",
					manyBad : "[${1}] 게시글 외 ${2} 건",
				}
			},
			label:{
				delType : "삭제 유형",
				delReason: "삭제 사유"
			},
		},
		// 영상 썸네일 선택 팝업
		bad1005:{
			title :{
				main:{
					default : "썸네일 지정",
				},
			},
			message : {
				content:{
					notice : "썸네일로 표출할 Time을 지정 후 저장 버튼을 클릭해야합니다.",
				}
			},
		},
		//공지팝업
		bad1006:{
			button :{
				skipOneday :"오늘 하루 그만보기"
			},
			message : {
				confirm:{
					closeAllNoticePopup : "모든 공지팝업을 닫으시겠습니까?",
				}
			},
		},
		// 회원가입
		cmm3000:{
			title :{
				main:{
					default : "회원가입",
				},
				first : "약관 동의",
				second : "정보 입력",
				finish : "완료 화면",
			},
			label:{
				usrId : "아이디",
				usrPw : "비밀번호",
				usrPwChk : "비밀번호 확인",
				usrNm : "이름",
				telno : "전화번호",
				email : "메일",
				authNum : "인증번호",
				chkAll :"개인정보 수집 및 이용, OSL 이용약관에 모두 동의합니다.",
				chkAlone: "개인정보 수집 및 이용에 대한 안내",
				chkOSL: "OSL 이용약관 동의",
			},
			placeholder:{
				usrId : "아이디",
				usrPw : "비밀번호",
				usrPwChk : "비밀번호 확인",
				usrNm : "이름",
				telno : "전화번호",
				email : "메일",
				authNum : "인증번호",
			},
			button:{
				authNumCall : "인증번호 요청",
				authNum : "인증번호 확인",
				prev : "이전",
				next : "다음",
				submit : "닫기",
				accept :"약관 동의",
				join : "가입 완료"
			},			
			message :{
				successAuth : "정상 인증되었습니다.",
				validError:{
					usrId : "5~20자의 영문 소문자, 대문자, 숫자와 특수문자(_),(-)만 사용 가능합니다.",
					usrPw : "비밀번호는 5자 이상 영문 대소문자, 숫자, 특수문자를 조합해야합니다.",
					telno : "하이픈(-)없이 숫자만 입력하세요.",
					finish : {
						oneline :"회원가입이 완료되었습니다.",
						twoline : "로그인 후 이용해주세요."
					},
					useYId : "사용 가능한 아이디입니다.",
					useNId : "${1}는 사용중인 아이디입니다.",
					useYEmail : "사용 가능한 이메일입니다.",
					useNEmail : "${1}는 사용중인 이메일입니다.",
					
				},
				alert : {
					inAuthNum : "인증번호를 입력하세요.",
					diffEmail :"인증번호를 요청한 메일주소와 다릅니다.<br/>인증번호를 요청한 이메일 주소를 입력하세요.",
					notAuthNum : "인증번호가 틀렸습니다.",
					finish : "회원가입이 완료되었습니다.",
					inEmail :"이메일을 입력하세요.",
				},
				timer :{
					valid : "유효시간 : ${1} 분 ${2} 초",
					reSend : "(재발급 대기 시간 : ${1} 초)"
				},
				content:{
					fin:{
						oneLine : "회원가입이 완료되었습니다.",
						twoLine : "로그인 후 이용해주세요."
					}
				}
			},
		},
		// 최초 라이선스 발급 후 프로젝트 생성
		cmm3001:{
			title:{
				main:{
					default : "신규 프로젝트 그룹 및 프로젝트 생성",
				},
				newPrjGrp : "1. 신규 프로젝트 그룹 생성",
				newPrj :"2. 신규 프로젝트 생성"
			},
			label:{
				prjGrpNm :"프로젝트 그룹 명",
				prjGrpRange : "프로젝트 그룹 기간",
				useCd :"사용 유무",
				ord : "정렬 순서",
				prjGrpDesc : "프로젝트 그룹 설명",
				prjNm :"프로젝트 명",
				prjRange :"프로젝트 기간",
				prjType :"프로젝트 유형",
				prjDevType :"프로젝트 개발 방법론",
				prjReqAccep :"접수기능 사용 유무",
				prjAcrm :"프로젝트 약어",
				prjBgColor :"프로젝트 배경색",
				prjColor :"프로젝트 글씨색",
				prjDesc : "프로젝트 설명",
				reqList : "요청 기본 항목",
				newItem : "신규 항목 추가",
				basicItem :"기본 항목 불러오기",
				takeList :"접수 기본 항목",
				prjList : "프로젝트 기본 항목",
				template : "기본 항목 양식"
			},
			placeholder:{
				prjGrpNm :"프로젝트 그룹 명",
				prjGrpRange : "프로젝트 그룹 기간",
				useCd :"사용 유무",
				ord : "정렬 순서",
				prjGrpDesc : "프로젝트 그룹 설명",
				prjNm :"프로젝트 명",
				prjRange :"프로젝트 기간",
				prjAcrm :"프로젝트 약어",
				prjBgColor :"프로젝트 배경색",
				prjColor :"프로젝트 글씨색",
				prjDesc : "프로젝트 설명",
				
			},
			button :{
				submit :"생성"
			},
			message:{
				confirm:{
					newPrjGrp :"프로젝트 그룹을 생성하시겠습니까?",
					newPrj : "프로젝트를 생성하시겠습니까?",
				},
				content:{
					isPrjAcrmY : "${1} 는(은) 사용할 수 없는 약어입니다.",
					isPrjAcrmN : "사용 가능한 약어입니다.",
				},
			},
		},
		// 아이디, 패스워드 찾기 팝업
		cmm4001:{
			title :{
				main:{
					default : "아이디 / 비밀번호 찾기",
				}
			},
			tab:{
				findId: "아이디 찾기",
				findPw : "비밀번호 찾기",
			},
			label:{
				findId: "아이디 찾기",
				findPw : "비밀번호 찾기",
				id: "아이디",
				name : "이름",
				email : "메일",
				authNum : "인증번호"
			},
			placeholder:{
				findId: "아이디 찾기",
				findPw : "비밀번호 찾기",
				id: "아이디",
				name : "이름",
				email : "메일",
				authNum : "인증번호",
			},
			regex : {
				name : "한글 또는 영문으로 30자 이내",
				email : "이메일 양식으로 작성",
				id : "영문, 숫자, 특수문자(-,_)으로 5~20자 이내",
			},
			button :{
				authNumCall : "인증번호 요청",
				authNum : "인증번호",
				findId : "아이디 찾기",
				findPw :"비밀번호 찾기"
			},
			message : {
				alert:{
					nmChk : "이름을 확인하세요.",
					emailChk : "이메일을 확인하세요.",
					dbChk : "일치하는 사용자 정보가 없습니다.",
					inAuthNum : "인증번호를 입력하세요.",
					authNumChk : "인증번호를 확인하세요.",
					idChk : "아이디를 확인하세요",
				},
				content:{
					checkEmail : "본인 확인 이메일 주소와 입력한 이메일 주소가 같아야 인증번호를 받을 수 있습니다.",
					timer :{
						valid : "유효시간 : ${1} 분 ${2} 초",
						reSend : "(재발급 대기 시간 : ${1} 초)"
					}
				},
			},
		},
		// 비밀번호 변경 팝업
		cmm4002:{
			title :{
				main:{
					default : "비밀번호 변경"
				}
			},
			label:{
				nowPw : "현재 비밀번호",
				newPw : "새 비밀번호",
				newPwCheck : "새 비밀번호 확인",
			},
			placeholder:{
				nowPw : "현재 비밀번호",
				newPw : "새 비밀번호",
				newPwCheck : "새 비밀번호 확인",
			},
			regex : {
				password : "영문 ,숫자,특수문자(!@#$%&*?) 필수 포함"
			},
			button:{
				changePw : "비밀번호 변경"
			},
			message:{
				alert:{
					beforeUsed : "1년 이내에 사용한 비밀번호입니다.<br/>다른 비밀번호를 입력하세요.",
					login : "변경된 비밀번호로 로그인하세요.",
					pwChk : "현재 비밀번호가 잘못되었습니다.<br/>정확한 현재 비밀번호를 입력하세요."
				},
				toastr:{
					changePw : "비밀번호가 변경되었습니다.",
				},
				content:{
					passInitMsg : "비밀번호가 초기화되었습니다.",
					shortCutOneLine : "10분 이내 비밀번호를 변경하지 않으면 로그인이 불가능합니다.",
					shortCutTwoLine : "1. 현재 팝업에서 비밀번호 변경",
					shortCutThreeLine :"2. 마이페이지에서 비밀번호 변경",
				}
			}
		},
		// 찾은 아이디 목록 팝업
		cmm4003:{
			title :{
				main:{
					default : "아이디 찾기"
				}
			},
			button:{
				login : "로그인 하기"
			},
			message:{
				content:{
					findId:"님의 정보와 일치하는 아이디입니다."
				}
			},
		},
		// 통합 검색
		cmm5000:{
			title: {
				main : "통합 검색"
			},
			label: {
				all: "통합",
				prj1000: "프로젝트 그룹",
				prj1100: "프로젝트",
				prs1000: "프로세스",
				prs1100: "작업흐름",
				req1000: "보안정책", //보안 티켓
				req1001: "보안정책 작업", //보안 티켓 작업
				usr1000: "사용자",
				dpm1000: "조직",
				comtnfile: "첨부 파일",
			},
			tags:{
				acronym : "약어",
				period : "기간",
				scdDuration : "예정 기간",
				actPeriod : "실제 기간",
				requiredDoc : "필수 산출물 수",
				confirmedDoc : "승인 산출물 수",
				deadline : "마감일",
				planProRate : "계획 진척률",
				prfmProRate : "실적 진척률",
				aprProRate : "승인 진척률",
				reqGrpNo : "그룹 보안 티켓 번호",
				state: "상태",
				no : "번호",
				dplType : "방법",
				dplDate: "배포일",
				dplUsr:"배포자",
				regDtm : "등록일"
			},
			placeholder:{
				search : "검색어를 입력해 주세요."
			},
			message:{
				alert:{
					inputSrch : "검색어를 입력해 주세요.",
				},
				loading:{
					waitSearch: "검색 결과를 기다리는 중입니다. <br/>잠시만 기다려주세요."
				},
				content : {
					schResult: "${1} : 총 ${2}건의 검색결과가 있습니다."
				}
			}
		},
		// 개인설정 - 프로젝트 선택 화면
		cmm6000:{
			title : {
				main:{
					default : "프로젝트 검색",
				},
				mainPrjSetting:"메인 프로젝트 설정",
				chgPrj:"이관 프로젝트 선택",
			},
			cmm6000PrjTable:{
				title : "선택",
				field:{
					prjNm:"프로젝트 명",
				},
				button :{
					search : "검색",
					click:"선택",
				},
				tooltip :{
					click : "선택",
					chgPrj: "프로젝트 이관",
				},
			}
		},
		//TODO 사용여부
		// 산출물 배정 팝업
		cmm6001: {
			title : {
				main:{
					default : "산출물 배정",
					docLink : "산출물 연결",
					doc : "산출물",
					need : "필수 제출",
					nonNeed  : "필수 미제출",
					confirm : "제출 확정"
				},
				assignDocList : "산출물 목록",
				atchFile : "확정 파일",
				waitAtchFile : "확정 대기 파일",
			},
			label :{
				confirm : "확정",
				confirmDate :"확정 일자 : ${1}",
				draft:"기안",
				signApproval:"결재 승인",
				signDone : "확정",
				signStandBy:"결재 대기",
				signReject:"결재 반려",
				signRevert : "결재 회수",
				reason : "반려 사유 : ",
				canceller : " / 반려자 : ",
				fileDownload : "파일 다운로드",
				uploadDate : "업로드 일자 : ${1}",
			},
			button : {
				all : "전체",
				assDoc : "배정 산출물",
				nonAssDoc : "미 배정 산출물",
				assignment : "배정하기",
				fileHis : "파일 이력",
			},
			tooltip:{
				fileHis : "파일 이력",
			},
			treetable:{
				button :{
					insertFile : "등록",
					downAtchFile : "확정 파일 다운로드",
					downAll : "전체 다운로드",
					signLineInfo : "결재선 정보",
				},
				tooltip :{
					selectDocList : "산출물 목록 조회",
					uploadAtchFile : "확정 파일 등록",
					downAtchFile : "확정 파일 전체 다운로드",
					uploadWiatFile : "확정 대기 파일 등록",
					downAll : "확정 대기 파일 전체 다운로드",
					signLineInfo : "결재선 정보",
				}
			},
			message : {
				signReson :"결재 회수 처리",
				fileExtChk : "확장자가 [ ${1} ] 인 파일은 첨부가 불가능합니다.",
				assignDoc : "이미 배정된 산출물을 제외한 나머지 산출물을 배정하시겠습니까?",
				treeSelect: "트리에서 산출물을 선택해주세요.",
				notHaveConfFile : "등록된 파일이 존재하지 않습니다.",
				lackDownloadInfo : "다운로드에 필요한 정보가 부족합니다.",
				chgConfFile : "확정된 파일을 확정 대기 파일로 바꾸시겠습니까? 바꾼 후에는 결재 정보가 사라지고 처음부터 결재를 받아야 합니다.",
				notChgWaitSignFile : "결재 대기 중인 파일은 변경할 수 없습니다.",
				deleteFormFile:"산출물 파일을 삭제 하시겠습니까?",
			}
		},
		// 6002 전체 프로젝트 목록
		// 프로세스 선택 화면
		cmm6003:{
			title : {
				main:{
					default : "프로세스 검색",
				},
				allPrjList:"전체 프로젝트 목록",
			},
			placeholder:{
				flowNmSearchInput:"단계명을 입력해주세요.",
			},
			button:{
				select:"선택",
				prev:"이전",
				next:"다음",
			},
			tooltip:{
				zoomReset:"확대 초기화",
				zoomIn:"확대",
				zoomOut:"축소",
				prsList : "프로세스 목록 보기",
			},
			cmm6003ProcessTree:{
				label:{
					disposal:"폐기",
					undecided:"미확정",
					decided:"확정"
				}
			},
			message:{
				alert:{
					selectProcess:"프로세스를 선택해주세요.",
					selNoneFlow: "단계를 선택 하세요.",
					isNotConfrim:"확정된 프로세스를 선택해주세요.",
					searchEmpty: "검색하려는 단계명을 입력하세요.",
				},
			}
		},
		//양식 선택 화면
		cmm6004:{
			title :{
				main: {
					default : "양식 선택"
				},
				tplList : "양식 목록",
				tplItems : "양식 구성",
			},
			button :{
				select : "선택",
			},
			message :{
				selectTemplate: "양식을 선택해 주세요.",
				dontSelect:"디렉토리/구분선은 선택할 수 없습니다.",
				alreadyProcess:"지정된 프로세스(${1})가 존재합니다.",
				notLinkProcess:"지정된 프로세스가 없습니다.",
				alert:{
					emptyTplSelect:"항목이 없는 신청서는 선택할 수 없습니다."
				}
			}
		},
		//소명 제출 현황 팝업
		cmm6100:{
			title :{
				main:{
					default : "소명 제출 현황 목록",
				}
			},
			cmm6100Table:{
				label:{
					request : "요청",
					waiting : "승인 대기",
					complete : "완료",
					expire : "만료",
					reject : "반려",
					withdraw: "회수",
					exceptHigh: "상",
					exceptMiddle: "중",
					exceptLow: "하",
					waitExcept: "대기",
					noExcept: "종결",
				},
				tooltip:{
					select : "소명 목록 조회",
				},
			},	
		},
		//이의제기 제출 현황 팝업
		cmm6101:{
			title :{
				main:{
					default : "이의제기 제출 현황 목록",
				}
			},
			cmm6101Table:{
				label:{
					request : "요청",
					waiting : "승인 대기",
					complete : "완료",
					expire : "만료",
					reject : "반려",
					withdraw: "회수",
					exceptHigh: "상",
					exceptMiddle: "중",
					exceptLow: "하",
					waitExcept: "대기",
					noExcept: "종결",
				},
				tooltip:{
					select : "소명 목록 조회",
				},
			},	
		},
		//문의 현황 팝업
		cmm6102:{
			title :{
				main:{
					default : "문의 현황",
				}
			},
			cmm6102Table:{
				tooltip:{
					select : "문의글 목록 조회",
				},
			}
		},
		// 보안사고 신고 현황 팝업
		cmm6103:{
			title:{
				main:{
					default : "보안사고 신고 현황",
				},
			},
			cmm6103Table:{
				tooltip:{
					select : "보안사고 신고 현황 조회",
				},
			},
		},
		// 보안 티켓 접수처리 화면
		//보안 티켓 -> 보안정책 신청서
		cmm6200:{
			title:{
				main: {
					default : "보안정책 신청서 접수 처리",
					acdt : "보안사고 신고 접수 처리",
				},
				acceptWaiting : "접수 대기 목록",
				inputItem : "접수 내용 입력",
			},
			label:{
				reqListDesc : "선택 보안 티켓 목록 확인",
				regUser : {
					usrNm :"작성자명",
					email :"작성자 e-mail",
					deptNm : "작성자 소속",
					tel :"작성자 연락처",
				},
				reqUser : {
					usrNm :"요청자명",
					email :"요청자 e-mail",
					deptNm : "요청자 소속",
					tel :"요청자 연락처",
				},
				reqInfo :{
					prj :"프로젝트",
					reqDtm :"요청일",
					reqGrpNm :"그룹 보안 티켓 제목",
					reqNm : "제목",
					reqAcdType : "사고 유형",
				},
				inputInfo : {
					process : "프로세스 배정",
					charger :"담당자",
					chargerDesc : "* 보안 티켓의 담당자를 선택해주세요.",
					basicCharger : "기본 담당자 선택",
					basicChargerDesc : "* 이미 배정된 담당자가 우선 배정됩니다.",
					basicChargerProcessDesc : "* 프로세스 기본 담당자가 배정됩니다.",
					opinion : "접수 의견",
					rjtReason : "접수 반려 사유",
				},
				selectProcess : "프로세스를 선택해주세요.",
				tplConnectionProcess:"프로세스 고정",
				startScheduledDtm:"업무 시작 예정일",
				endScheduledDtm:"업무 종료 예정일",
			},
			placeholder :{
				prj :"프로젝트",
				reqDtm :"요청일",
				reqNm : "제목",
				reqAcdType : "사고 유형",
				regUsrNm :"작성자명",
				regUsrDeptNm : "작성자 소속",
				//regUsrEmail :"작성자 e-mail",
				//regUsrNum :"작성자 연락처",
				reqUsrNm :"요청자명",
				reqUsrDeptNm : "요청자 소속",
				//reqUsrEmail :"요청자 e-mail",
				//reqUsrNum :"요청자 연락처",
				chargerNm :"담당자명",
				processNm : "연결된 프로세스가 없습니다.",
				searchCharger : "입력 후 검색 버튼 클릭 또는 엔터",
			},
			button:{
				reject : "접수 반려",
				prev :"이전",
				approve :"접수 승인",
				next :"다음",
				requestAccept : "접수",
				add : "추가"
			},
			message:{
				alert:{
					notAcceptReqList : "접수 가능한 티켓이 없습니다.",
					noReq : "처리 가능한 티켓이 없습니다.<br/>입력 데이터를 확인해주세요.",
					reqCover : "보안 티켓을 선택해주세요.",
					dontAcceptSelData : "접수 가능한 요구사항이 선택되지 않았습니다.",
					reqExcept : "${1}건의 접수대기가 아닌 요구사항을 제외했습니다.",
					noMove : "이전/다음으로 이동할 수 없습니다.",
					fixedProccess : "지정된 프로세스가 존재합니다.<br/>변경할 수 없습니다.",
				},
				confirm:{
					failContinue : "현재 입력한 내용은 보관되지 않습니다.<br/>계속 진행하시겠습니까?",
					notInputContinue : "접수 정보가 미입력된 티켓이 있습니다.<br/>계속 진행하시겠습니까?",
				},
				toastr:{
					successCnt:"전체 ${1}건 중 성공 ${2}건되었습니다.<br/>접수 승인 : ${3}건<br/>접수 반려 : ${4}건",
				},
				content:{
					reqCover : "보안 티켓을 선택해주세요.",
				},
				rjt : "선택 보안 티켓을 접수 반려 처리하시겠습니까?",
				selectOneProcess : "1개의 프로세스를 선택해주세요.",
				done : "선택 보안 티켓을 접수 승인 처리하시겠습니까?",
				fixedProcessAccept:"*지정된 프로세스로 이관됩니다.",
			},
			seacrh: {
				selectList: {
					option : {
						  A : "전체"
						, auth : "권한그룹"
						, dept : "조직"
						, usr : "사용자"
					},
				},
			}
		},
		// 보안 티켓 업무처리 팝업
		cmm6201:{
			title :{
				main : {
					default : "보안정책 신청서 업무 처리", //보안 티켓 -> 보안정책 신청서
					acdt : "보안사고 신고 업무 처리",
				},
				reqUsrInfo : "요청자 정보",
				chargerInfo : "담당자 정보",
				signLineInfo : "결재선 정보",
				taskDateInfo : "업무 일정 입력",
				selectCharger : "담당자 선택",
				defaultFlowItem : "단계 기본 항목 입력",
				reqOpinion : "의견 제시",
				flowList : "단계 목록",
				cfgList : "정보자산 목록",
				nextFlowInfo : "다음 단계를 선택하세요",
				eptTitle : "소명 목록",
				middleEndReason : "중간 종료 사유",
				xtnTitle : "연장/회수 목록"
			},
			tab : {
				reqInfo : "작성 내용", //티켓 정보->작성 내용
				inputInfo : "정보 입력",
				linkData : "연결 데이터",
				signAndChargerInfo : "결재 및 담당자 지정",
				signAndChargerInfo2 : "결재 및 담당자 정보",
				nextFlowInfo : "다음 단계 선택",
				ticketHistory : "변경 이력",
				basicInfo : "기본 정보",
				takeOverInfo : "접수 내용",
				xtnInfo: "연장/회수 정보"
			},
			label:{
				reqOrd : "티켓 순번",
				reqDtm :"요청일",
				reqNm : "제목",
				reqClsType : "분류",
				reqProType :"처리 유형",
				reqAcdType : "사고 유형",
				processNm : "프로세스",
				flowNm :"단계",
				applyCd : "적용 여부",
				applyTxt : "적용 실패 사유",
				regUsrNm : "작성자",
				charger : "담당자",
				chargerNm: "현재 담당자",
				nextChargerNm: "(다음)담당자",
				handsOnWorkerNm: "실무자",
				basicCharger : "기본 담당자 선택",
				nextFlowDesc : "다음 단계 정보",
				prjGrpNm :"프로젝트 그룹명",
				prjNm :"프로젝트명",
				reqId :"보안 티켓 ID",
				reqKey : "티켓 키",
				regDtm : "작성일",
				flowInputForm : "단계 처리 내용 입력",
				startTaskDtm : "업무 시작 일시",
				endTaskDtm : '업무 종료 일시',
				startScheduledDtm : "업무 시작 예정 일자",
				endScheduledDtm : "업무 종료 예정 일자",
				simpleTicketInfo : "간이 정보",
				reqInfoAndAcceptInfo : "내용", //2025-02-10 간이 정보 영역에 티켓 정보 및 접수 내용으로 대체
				workList : "작업 목록",
				opinionShare : "의견 공유",
				comment : "Comment",
				replyPer : "답변률",
				replyUsr : "답변 대상자",
				replyCnt : "답변 개수",
				sign : "결재",
				signHistory : "결재 이력",
				applyTxt : "적용 실패 사유",
				
				showSignHistory : "결재 이력 보이기",
				nextFlowNm : "다음 단계",
				attachments :"첨부 파일 목록",
				opinion :"접수 의견",
				reqUser :{
					default : "요청자",
					usrNm :"요청자명",
					email :"요청자 e-mail",
					deptNm : "요청자 소속",
					tel :"요청자 연락처",
				},
				selectReqCharger : "* 보안 티켓의 담당자를 선택해주세요.",
				defaultCharger : "프로세스 기본 담당자",
				flowInfo :{
					start : "시작 단계",
					sign : "결재",
					signStop : "결재 반려 시 종료 유무",
					middleEnd : "중간 종료",
					task : "작업",
					exp : "소명",
					done : "최종 완료 단계",
					flowAuth : "허용 역할"
				},
				
				draft: "결재 요청",
				draftRes : "결재 요청 처리",
				signApprove : "결재 승인",
				signApproveRes : "결재 승인 처리",
				revert : "결재 회수",
				revertRes : "결재 회수 처리",
				signReject : "결재 반려",
				wait : "결재 대기",
				waiting :"결재 대기 중 ( ${1} / ${2} )",
				signRequired :"결재 필수",
				acceptApprove :"접수 승인 처리",
				currentApproverInfo : "현재 결재자 정보",
				signOrder :"결재 순번",
				finalSign : "최종 결재",
				finalSignAgree : "최종 합의",
				currentSignOrd : "결재 차례",
				signDone : "결재 완료",
				referrer : "참조",
				revert : "결재 회수 처리",
				prevFlow :"이전 작업 흐름",
				readOnly :"읽기 전용",
				startTask :"업무 처리 가능",
				changerCharger : "담당자 변경",
				atchFileList : "첨부파일 목록",
				usrInfoChange : "사용자 정보 변경",
				xtnReqCnt : "연장 ${1}번",
				xtnTerminate : "해지",
				nowTxt : "현재",
				nowReq : "현재 보안 티켓",
				tgtReq : "보안 티켓 [${1}]",
				signAgree: "합의 결재",
				nowTxt : "현재",
				
			},
			placeholder :{
				chargerNm : "담당자명",
				searchCharger : "입력 후 검색 버튼 클릭 또는 엔터",
			},
			button: {
				searchBtn : "검색",
				detail : "상세",
				revert : "결재 회수",
				approve : "결재 승인",
				signReject :"결재 반려",
				signLineChange :"결재선 변경",
				currentSave :"저장(현재 단계 유지)",
				prev :"이전",
				next : "다음",
				save : "저장",
				complete :"처리 완료",
				signFlowBtn : "결재선 지정",
				signResetBtn : "결재선 초기화",
				newItem : "신규 항목 추가",
				openItem : "기본 항목 불러오기",
				chgCharger: "담당자 이관",
				middleEnd : "중간 종료",
				getReqTicket:"가져오기",
				chargerTransfer:"담당자 이관",
				handOnWorkerTransfer:"실무자 이관",
				reqApply : "정책 적용",
				addNextCharger : "다음 처리자 추가",
			},
			tooltip :{
				opinion :{
					select : "의견 조회",
					insert : "의견 추가",
					totalView : "전체 보기",
					replyMySelf : "답변 대상만 조회",
					replyCount : "답변 갯수",
				},
				signFlowBtn : "결재선 지정",
				signResetBtn : "결재선 초기화",
				usrPosition : "사용자 정의 위치로 보기",
				verticalPosition : "세로형 위치로 보기",
				zoomReset : "확대 초기화",
				zoomIn : "확대",
				zoomOut : "축소",
				save : "저장",
				complete :"처리 완료",
				revert : "결재 회수",
				approve : "결재 승인",
				signReject : "결재 반려",
				signLineChange : "결재선 변경",
				replyUsrPer : "답변 대상자에 대한 답변률",
				noReplyUsr : "답변 대상자 없음",
				delReply : "삭제된 의견",
				writeUsr : "작성자",
				middleEnd : "중간 종료",
				signAndChargerInfo : "결재 및 담당자 지정",
				simpleItemArea : "간이 정보는 필수 항목만 보여집니다.",
				getReqTicket:"가져오기",
				chargerTransfer: "담당자 이관",
				handsOnWorkerTransfer: "담당자 이관",
				reqApply : "정책 적용",
				addNextCharger : "다음 처리자 추가",
			},
			cmm6201OpnTable :{
				button :{
					select : "조회하기",
					insert : "추가하기",
					all : "전체보기",
					reply :"답변 대상만 보기",
				},
				dropdown :{
					"reply" :"답변",
					"update" :"수정",
					"delete" :"삭제",
				},
				tooltip :{
					select : "의견 & 코멘트 모두 조회",
					insert : "의견 추가",
					all : "모든 의견 & 코멘트 조회",
					reply :"답변 해야할 의견 목록 조회",
				},
			},
			cmm6201CimTable : {
				label : {
					required : "필수",
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				button :{
					select : "소명 조회",
					insert : "소명 요청",
					detail : "소명 상세",
				},
				tooltip:{
					select : "소명 조회",
					insert : "소명 요청",
					detail : "소명 상세",
				},
				contextmenu : {
					searchDetail : "상세 조회",
				},
			},
			chargerDatatable :{
				title : "담당자 선택",
				button :{
					select : "기본 담당자 조회",
					dblClick :"담당자 지정"
				},
				tooltip :{
					select : "기본 담당자 조회",
					dblClick :"담당자 지정"
				},
				field:{
					usrId : "사용자 ID",
				}
			},
			cmm6201TaskTable :{
				title : {
					workProAuthTable : "수정 / 삭제 / 상세 / 복사",
					workReadOnlyTable :"상세 / 종료",
				},
				badge :{
					start : "시작",
					end : "종료",
				},
				button :{
					copy : "복사",
					workEnd : "종료",
				},
				tooltip :{
					select : "작업 목록 조회",
					insert : "작업 등록",
					update : "작업 수정",
					copy : "작업 복사",
					workEnd : "작업 종료",
					delete: "작업 제거",
					detail : "상세 보기",
				}
			},
			flowDatatable:{
				title : "",
				button:{
					reset : "초기화",
					zoomIn : "확대",
					zoomOut :"축소",
				},
				tooltip:{
					reset : "확대 초기화",
					zoomIn : "확대",
					zoomOut :"축소",
					insert : "의견 등록",
					reply : "의견제시",
					update : "의견 수정",
					delete : "의견 삭제",
				},
				contextmenu : {
					title : {
						opnReply : "의견 등록",
						opnUpdate : "의견 수정",
						opnDelete : "의견 삭제",
						workDetail : "작업 상세",
						workStop : "작업 종료",
						workUpdate : "작업 수정",
						workDelete : "작업 삭제",
					},
				},
			},
			message: {
				alert: {
					tplClsType02: {
						approve : "보안 티켓의 결재 승인 처리되었습니다.",
						rjt : "보안 티켓이 결재 반려 처리되었습니다.",
						revert : "보안 티켓이 결재 회수 처리되었습니다.",
					},
					tplClsType04: {
						approve : "보안사고 신고 티켓의 결재 승인 처리되었습니다.",
						rjt : "보안사고 신고 티켓이 결재 반려 처리되었습니다.",
						revert : "보안사고 신고 티켓이 결재 회수 처리되었습니다.",
					},
					reqUpdAvail : "작업 지시자만 수정 가능합니다.",
					selectFlow : "단계를 선택해주세요.",
					notUpdateEndWork: "종료된 작업은 수정할 수 없습니다.",
					notDeleteEndWork: "종료된 작업은 삭제할 수 없습니다.",
					notEndWork: "종료된 작업은 종료할 수 없습니다.",
					selectData: "선택된 작업이 없습니다.",
					selectCopyData : "복사는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
					notCharger: "담당자인 작업만 종료 가능합니다.",
					cantNextStep: "진행중인 작업 및 소명이 있는 경우 다음 단계로 이동할 수 없습니다.",
					revisionSave : "${1}개의 리비전이 선택되었습니다.",
					revisionDupleMsg: "이미 선택된 ${1}개의 리비전 제외",
					revisionAllDupleMsg: "이미 선택된 리비전입니다. (${1}개)",
					selectReqRemoveLink : "연결 해제할 보안 티켓을 선택하세요. 현재 선택된 보안 티켓이 없습니다.",
					prevRemoveLink :"${1}이 선행 보안 티켓에서 배정 제외 되었습니다.",
					nextRemoveLink :"${1}이 선행 보안 티켓에서 배정 제외 되었습니다.",
					signLineRequired : "결재선 등록이 필요합니다.",
					taskDateRequired :"최종 완료 단계에서<br/>업무 시작 일시, 업무 종료 일시는 필수 항목입니다.",
					done :"업무 처리가 완료되었습니다.",
					currentSave : "저장되었습니다.",
					stop: "중간 종료되었습니다.",
					notProcessing : "처리 중인 보안 티켓만 업무 처리가 가능합니다.",
					chgCharger: "담당자가 변경되었습니다.",
					onlyMyWorkDelete : "자신의 작업 지시 내용만 삭제 가능합니다.",
					notOpinionInsert : "결재중일 땐 의견 등록이 불가능합니다.",
					notReplyInsert : "결재중일 땐 의견 답변이 불가능합니다.",
					notReplyUpdate : "결재중일 땐 의견 수정이 불가능합니다.",
					notReplyDelete : "결재중일 땐 의견 삭제 불가능합니다.",
					onlyWriterUpdate : "작성자만 수정 가능합니다.",
					onlyWriterDelete : "작성자만 삭제 가능합니다.",
					dontBeforeFlowUpdate : "지난 단계의 의견은 수정할 수 없습니다.",
					dontBeforeFlowDelete : "지난 단계의 의견은 삭제할 수 없습니다.",
					notContentInsert : "등록될 내용이 없습니다.",
					dontSettingInfo : "정보를 세팅할 수 없습니다.",
					notEndNotNext : "작업이 모두 완료되지 않아<br/>다음 단계로 진행할 수 없습니다.",
					notReqNotNext : "소명이 모두 완료되지 않아<br/>다음 단계로 진행할 수 없습니다.",
					notReplyNotNext : "의견 답변이 모두 완료되지 않아<br/>다음 단계로 진행할 수 없습니다.",
					notRequireNotNext : "필수 항목 중 누락된 항목이 있습니다.<br/>다음 단계 선택이 불가능합니다.",
					TransterUsrSame : "이관하고자 하는 사용자와 현재 처리자와 동일합니다.",
					chgAcdTypeChargerInfo : "실무자 정보가 수정된 사고유형의 담당자로<br/>변경되었습니다.",
					saveChgAcdTypeCharger : "저장 하시겠습니까?<br/><br/>변경된 실무자 목록으로 담당자 정보가<br/>변경됩니다.",
				},
				confirm: {
					tplClsType02: {
						acceptSign: "보안 티켓을 결재 승인 처리하시겠습니까?",
						rejectSign: "보안 티켓을 결재 반려 처리하시겠습니까?",
						acceptAllSign : "보안 티켓을 전결 처리하시겠습니까?",
					},
					tplClsType04: {
						acceptSign: "보안사고 신고 티켓을 결재 승인 처리하시겠습니까?",
						rejectSign: "보안사고 신고 티켓을 결재 반려 처리하시겠습니까?",
						acceptAllSign : "보안사고 신고 티켓을 전결 처리하시겠습니까?",
					},
					currentSave : "저장 하시겠습니까?<br/>저장 시 다음 단계 담당자는 저장되지 않습니다.",
					cancelSign: "진행중인 결재를 회수 하시겠습니까?<br/>현재 진행중인 결재는 회수 처리 됩니다.",
					delegateSign : "현재 결재자의 대결 권한을 가지고있습니다.",
					changeCharger : "기존에 설정된 담당자가 변경됩니다.<br/>계속 하시겠습니까?",
					done : "입력된 내용으로 업무 처리를 진행하시겠습니까?",
					chgCharger: "담당자를 변경하시겠습니까?",
					delCimLink: "정보자산 연결을 해제하지겠습니까?",
					middleEnd : "중간 종료를 하시겠습니까?",
					chargerTransfer : "선택 담당 목록 기준으로 담당을 이관하시겠습니까?",
					reqApplyTitle : "정책 적용",
					selectReqApplyType : "적용 여부를 선택하세요.",
				},
				linked :{
					row01:"현재 티켓과 연결되어 있는 정보들을 확인할 수 있습니다.",
					row02:"연결 데이터의 등록, 수정 및 삭제는 현재 업무처리 단계에서 기능을 제공해야만 사용이 가능합니다.",
					row03:"(* 기능에 대한 권한이 없는 경우 단계 기능이 제공되더라도 불가능합니다.)",
				},
				xtn: {
					row01:"현재 티켓과 연결된 연장/회수 정보를 확인할 수 있습니다."
				},
				content : {
					noData : "데이터가 없습니다.<br/>티켓 정보를 확인하세요.",
					receiptNotCharger: "접수 시 배정된 담당자가 없습니다.",
					notWorkList : "작업 정보가 없습니다.",
					auth: "접근 권한이 없습니다.",
					delContent : "삭제된 내용입니다.",
				},
				notSignLineInfo : "결재선 정보가 없습니다.",
				signAuthCd : "결재자 허용역할 사용 단계입니다.<br/>새 결재선을 지정해주세요.",
				selectFinalFlow : "최종 완료 단계를 선택하셨습니다.<br/>해당 보안 티켓의 업무 처리가 종료됩니다.<br/><br/>",
				currentFlow : "같은 단계 진행 시<br/>입력 항목 정보만 저장됩니다.<br/><br/>",
				goSignLine : "지정된 결재선으로 결재 처리가 진행됩니다.<br/><br/>",
				delContent : "삭제된 내용입니다.",
				noData : "필수 데이터가 없습니다.<br/>티켓 정보를 확인하세요.",
			},
			search : {
				selectList : {
					option: {
						A : "전체",
						auth : "권한그룹",
						dept : "조직",
						usr  : "사용자",
					},
				},
			}
		},
		// 보안 티켓 외부 정보 화면
		cmm6202:{
			title:{
				main:{
					default : "보안 티켓 상세",
				},
				reqUser : "요청자 정보",
				splHis : "보안 티켓 간이 이력",
				splReqInfo : "보안 티켓 간이 정보",
				workTitle : "작업 목록",
				reqInfo : "티켓 정보",
				flwChgHis : "단계 변경 이력",
				workTitle : "작업 목록",
				fileList : "파일 목록",
				eptTitle : "소명 목록",
				cfgList : "정보자산 목록",
				prevReqInfo : "작성자 정보",
				applyInfo : "신청 내용",
			},
			tab : {
				reqInfo : "티켓 정보",
				linkData : "연결 데이터",
				selFlowInfo : "선택 단계 정보",
				signAndChargerInfo : "결재 및 담당자 지정",
				allHistory : "전체 이력",
				basicInfo : "기본 정보",
				takeOverInfo : "접수 정보",
				processFlowList : "프로세스 단계 목록",
				ticketHistory : "변경 이력",
			},
			label:{
				tabNm:{
					reqInfo : "보안 티켓 정보",
					reqLinkInfo : "보안 티켓 연결 정보",
					flwChgHis : "단계 변경 이력",
					reqUpdHis: "보안 티켓 수정 이력",
					workDetail : "작업 내용",
				},
				reqUser : {
					default : "요청자",
					usrNm : "요청자 명",
					email : "요청자 e-mail",
					deptNm : "요청자 소속",
					tel : "요청자 연락처",
				},
				regDtm : "생성 일시",
				reqDtm : "요청 일자",
				reqKey : "보안 티켓 Key",
				reqOrd : "보안 티켓 순번",
				reqClsType : "분류",
				reqProType : "처리 유형",
				processNm : "프로세스 명",
				flowNm : "단계 명",
				reqNm : "요청 제목",
				simpleTicketInfo : "간이 정보",
				reqSignHisShowFlag : "결재 정보 표출",
				startTaskDtm : "업무 시작 일시",
				endTaskDtm : '업무 종료 일시',
				startScheduledDtm : "업무 시작 예정 일자",
				endScheduledDtm : "업무 종료 예정 일자",
				flowInputForm : "단계 입력 폼",
				workList : "작업 목록",
				opinionShare : "의견 공유",
				done : "최종 완료",
				chargerNm: "담당자 명",
				changeCharger : "담당자 변경",
				fixCharger : "담당자 지정",
				acceptRjt : "접수 반려",
				update : "수정",
				change : "변경",
				sign : "결재",
				signOrder :"결재 순번",
				finalSign : "최종 결재",
				currentSignOrd : "결재 차례",
				signDone : "결재 완료",
				referrer : "참조",
				notSignLineInfo : "결재선 정보가 없습니다.",
				signHistory : "결재 이력",
				acceptApprove : "접수 승인",
				opinion : "접수 의견",
				rjtReason : "반려 의견",
				signLineInfo : "결재선 정보",
				signAuth :{
					approver : "검토자",
					approve : "결재",
					subApprove : "대결",
					allApprove : "전결",
					request : "기안",
					requester : "기안자",
				},
				final : "최종",
				replyPer : "답변률",
				replyCnt : "답변 개수",
				atchFileList : "첨부파일 목록",
				beforeChange : "변경 전",
				afterChange : "변경 후",
				receptionist : "접수자",
				charger : "담당자",
				nowTxt : "현재",
				req :{
					regUsrNm : "작성자 명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					prj : "프로젝트",
					reqDtm : "요청 일자",
					reqKey :"보안 티켓 Key",
					reqOrd :"보안 티켓 순번",
					reqProTypeNm :"처리 유형",
					processNm :"프로세스 명",
					flowNm : "단계 명",
					reqNm : "요청 제목",
					reqAcceptTxt : "반려 사유",
				},
			},
			search : {
				selectList : {
					option: {
						A : "전체",
						auth : "권한그룹",
						dept : "조직",
						usr  : "사용자",
					},
				},
			},
			button : {
				processFlowList : "프로세스 단계 목록",
				processFlowListView : "프로세스 단계 목록 보기",
				detail : "상세",
				refresh : "새로 고침",
				prev :"이전",
				next : "다음",
			},
			tootip: {
				zoomReset : "확대 초기화",
				zoomIn : "확대",
				zoomOut : "축소",
				writeUsr : "작성자",
				replyUsrPer : "답변 대상자에 대한 답변률",
				noReplyUsr : "답변 대상자 없음",
				delReply : "삭제된 의견",
				simpleItemArea : "간이 정보는 필수 항목만 보여집니다.",
			},
			cmm6202CimTable : {
				label : {
					required : "필수",
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				tooltip:{
					select : "소명 조회",
					insert : "소명 요청",
					detail : "소명 상세",
				},
				contextmenu : {
					searchDetail : "상세 조회",
				},
				
			},
			cmm6202TaskTable :{
				title : {
					workProAuthTable : "수정 / 삭제 / 상세 / 복사",
					workReadOnlyTable :"상세 / 종료",
				},
				badge :{
					start : "시작",
					end : "종료",
				},
				button :{
					copy : "복사",
					workEnd : "종료",
				},
				tooltip :{
					detail : "상세 보기",
				}
			},
			workDatatable : {
				title : "상세",
				button : {
					detail : "상세"
				},
				tooltip :{
					select : "작업 목록 조회",
				},
			},
			message : {
				alert: {
					dontSettingInfo : "정보를 세팅할 수 없습니다.",
				},
				content : {
					notWorkList : "작업 정보가 없습니다.",
					noData : "필수 데이터가 없습니다.<br/>티켓 정보를 확인하세요.",
					auth: "접근 권한이 없습니다.",
					delContent : "삭제된 내용입니다.",
					notProcess : "배정된 프로세스 없음",
				},
			},
		},
		// 보안 티켓 상세 이력 화면(팝업)
		cmm6203:{
			title:{
				main: {
					default : "보안정책 신청서 상세", //보안 티켓 -> 보안정책 신청서
					acdt : "보안사고 신고 상세",
				},
				cfgList : "정보자산 목록",
				eptTitle : "소명 목록",
				reqUsrInfo : "요청자 정보",
				chargerInfo : "담당자 정보",
				signLineInfo : "결재선 정보",
				taskDateInfo : "업무 일정 입력",
				selectCharger : "담당자 선택",
				defaultFlowItem : "단계 기본 항목 입력",
				reqOpinion : "의견 제시",
				flowList : "단계 목록",
				cfgList : "정보자산 목록",
				eptTitle : "소명 목록",
				middleEndReason : "중간 종료 사유",
			},
			tab : {
				reqInfo : "작성 내용", //티켓 정보->작성 내용
				linkData : "연결 데이터",
				selFlowInfo : "선택 단계 정보",
				signAndChargerInfo : "결재 및 담당자 정보",
				allHistory : "전체 이력",
				basicInfo : "기본 정보",
				processFlowList : "프로세스 단계 목록",
				ticketHistory : "변경 이력",
			},
			label:{
				reqOrd : "티켓 순번",
				reqDtm :"요청일",
				reqNm : "제목",
				reqClsType : "분류",
				reqProType :"처리 유형",
				reqAcdType : "사고 유형",
				processNm : "프로세스",
				flowNm :"단계",
				applyCd : "적용 여부",
				applyTxt : "적용 실패 사유",
				regUsrNm : "작성자",
				charger : "담당자",
				chargerNm: "실무자",
				nextChargerNm: "(다음)담당자",
				handsOnWorkerNm: "실무자",
				basicCharger : "기본 담당자 선택",
				nextFlowDesc : "다음 단계 정보",
				prjGrpNm :"프로젝트 그룹명",
				prjNm :"프로젝트명",
				reqId :"보안 티켓 ID",
				reqKey : "티켓 키",
				regDtm : "작성일",
				flowInputForm : "단계 처리 내용 입력",
				startTaskDtm : "업무 시작 일시",
				endTaskDtm : '업무 종료 일시',
				startScheduledDtm : "업무 시작 예정 일자",
				endScheduledDtm : "업무 종료 예정 일자",
				simpleTicketInfo : "간이 정보",
				reqInfoAndAcceptInfo : "내용", //2025-02-10 간이 정보 영역에 티켓 정보 및 접수 내용으로 대체
				workList : "작업 목록",
				opinionShare : "의견 공유",
				comment : "Comment",
				replyPer : "답변률",
				replyUsr : "답변 대상자",
				replyCnt : "답변 개수",
				sign : "결재",
				signHistory : "결재 이력",
				applyTxt : "적용 실패 사유",
				
				showSignHistory : "결재 이력 보이기",
				nextFlowNm : "다음 단계",
				attachments :"첨부 파일 목록",
				opinion :"접수 의견",
				reqUser :{
					default : "요청자",
					usrNm :"요청자명",
					email :"요청자 e-mail",
					deptNm : "요청자 소속",
					tel :"요청자 연락처",
				},
				draft: "결재 요청",
				draftRes : "결재 요청 처리",
				signApprove : "결재 승인",
				signApproveRes : "결재 승인 처리",
				revert : "결재 회수",
				revertRes : "결재 회수 처리",
				signReject : "결재 반려",
				wait : "결재 대기",
				waiting :"결재 대기 중 ( ${1} / ${2} )",
				signRequired :"결재 필수",
				acceptApprove :"접수 승인 처리",
				currentApproverInfo : "현재 결재자 정보",
				signOrder :"결재 순번",
				finalSign : "최종 결재",
				finalSignAgree : "최종 합의",
				currentSignOrd : "결재 차례",
				signDone : "결재 완료",
				referrer : "참조",
				revert : "결재 회수 처리",
				prevFlow :"이전 작업 흐름",
				readOnly :"읽기 전용",
				receptionist : "접수자",
				atchFileList : "첨부파일 목록",
				usrInfoChange : "사용자 정보 변경",
				xtnReqCnt : "연장 ${1}번",
				xtnTerminate : "해지",
				nowTxt : "현재",
				nowReq : "현재 보안 티켓",
				tgtReq : "보안 티켓 [${1}]",
			},
			search : {
				selectList : {
					option: {
						A : "전체",
						auth : "권한그룹",
						dept : "조직",
						usr  : "사용자",
					},
				},
			},
			placeholder :{
				comment : "Shift + Enter로 줄바꿈을 할 수 있습니다.",
				searchCharger : "입력 후 검색 버튼 클릭 또는 엔터",
			},
			button : {
				prev :"이전",
				next : "다음",
				processFlowList : "프로세스 단계 목록",
				processFlowListView : "프로세스 단계 목록 보기",
				detail : "상세",
			},
			tooltip :{
				opinion :{
					select : "의견 조회",
					insert : "의견 추가",
					totalView : "전체 보기",
					replyMySelf : "답변 대상만 조회",
					replyCount : "답변 갯수",
				},
				replyUsrPer : "답변 대상자에 대한 답변률",
				noReplyUsr : "답변 대상자 없음",
				delReply : "삭제된 의견",
				writeUsr : "작성자",
				middleEnd : "중간 종료",
				simpleItemArea : "간이 정보는 필수 항목만 보여집니다.",
			},
			cmm6203OpnTable :{
				button :{
					select : "조회하기",
					insert : "추가하기",
					all : "전체보기",
					reply :"답변 대상만 보기",
				},
				dropdown :{
					"reply" :"답변",
					"update" :"수정",
					"delete" :"삭제",
				},
				tooltip :{
					select : "의견 & 코멘트 모두 조회",
					insert : "의견 추가",
					all : "모든 의견 & 코멘트 조회",
					reply :"답변 해야할 의견 목록 조회",
				},
			},
			cmm6203CimTable : {
				label : {
					required : "필수",
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				button :{
					select : "소명 조회",
					insert : "소명 요청",
					detail : "소명 상세",
				},
				tooltip:{
					select : "소명 조회",
					insert : "소명 요청",
					detail : "소명 상세"
				},
				contextmenu : {
					searchDetail : "상세 조회",
				},
			},
			cmm6203TaskTable :{
				title : {
					workProAuthTable : "수정 / 삭제 / 상세 / 복사",
					workReadOnlyTable :"상세 / 종료",
				},
				badge :{
					start : "시작",
					end : "종료",
				},
				button :{
					copy : "복사",
					workEnd : "종료",
				},
				tooltip :{
					select : "작업 목록 조회",
					insert : "작업 등록",
					update : "작업 수정",
					copy : "작업 복사",
					workEnd : "작업 종료",
					delete: "작업 제거",
					detail : "상세 보기",
				}
			},
			datatable : {
				title : "상세",
				button : {
					detail : "상세"
				},
				tooltip :{
					select : "작업 목록 조회",
					detail : "상세 보기",
					insert : "의견 등록",
					reply : "의견 제시",
					update : "의견 수정",
					delete : "의견 삭제",
				},
				contextmenu : {
					title : {
						opnReply : "의견 등록",
						opnUpdate : "의견 수정",
						opnDelete : "의견 삭제",
						workDetail : "작업 상세",
						workStop : "작업 종료",
						workUpdate : "작업 수정",
						workDelete : "작업 삭제",
					},
				},
			},
			message : {
				alert: {
					dontSettingInfo : "정보를 세팅할 수 없습니다.",
					endTicketOpinionInsert : "처리 완료된 티켓만 의견 등록 가능합니다.",
					notContentInsert : "등록될 내용이 없습니다.",
					notOpinionInsert : "결재중일 땐 의견 등록이 불가능합니다.",
					notReplyInsert : "결재중일 땐 의견 답변이 불가능합니다.",
					notReplyUpdate : "결재중일 땐 의견 수정이 불가능합니다.",
					notReplyDelete : "결재중일 땐 의견 삭제 불가능합니다.",
					onlyWriterUpdate : "작성자만 수정 가능합니다.",
					onlyWriterDelete : "작성자만 삭제 가능합니다.",
					dontBeforeFlowUpdate : "지난 단계의 의견은 수정할 수 없습니다.",
					dontBeforeFlowDelete : "지난 단계의 의견은 삭제할 수 없습니다.",
					notAuthority : {
						copy : "보안정책 신청서 복사 권한이 없습니다.",
						reSend : "보안정책 신청서 재상신 권한이 없습니다.",
					}
				},
				content : {
					noData : "데이터가 없습니다.<br/>티켓 정보를 확인하세요.",
					receiptNotCharger: "접수 시 배정된 담당자가 없습니다.",
					notWorkList : "작업 정보가 없습니다.",
					auth: "접근 권한이 없습니다.",
					delContent : "삭제된 내용입니다.",
				},
			},
		},
		// 작업 등록, 수정, 복사 팝업
		cmm6204:{
			title: {
				main: {
					default : "작업 등록",
					update : "작업 수정",
					copy : "작업 복사",
				}
			},
			label: {
				chargerList: "담당자 지정",
				workAdmStDtm: "작업 시작 예정 일시",
				workAdmEdDtm: "작업 종료 예정 일시",
				workAdmContent: "작업 지시 내용",
				attachments: "파일 첨부"
			},
			button: {
				chargerList: "담당자 추가",
				insertBtn: "추가하기",
				updateBtn: "수정하기",
				copyBtn: "복사하기",
				complete : "완료",
				deleteResetBtn: "Delete Reset",
			},
			message :{
				alert:{
					noCharger : "담당자를 지정해주세요.",
					insertFail: "작업 생성에 실패했습니다.",
					updateFail: "작업 수정에 실패했습니다.",
				},
				toastr:{
					insertSuccess: "작업이 성공적으로 생성되었습니다.",
					updateSuccess: "작업이 성공적으로 수정되었습니다.",
				},
				confirm:{
					insertStr: "작업을 생성하시겠습니까?",
					updateStr: "작업 내용을 수정하시겠습니까?",
					copyStr: "작업을 복사하시겠습니까?",
				},
			}
		},
		// 작업 종료 등록 팝업
		cmm6205:{
			title: {
				main:{
					default : "작업 종료",
				}
			},
			label: {
				chargerList: "담당자 목록",
				workAdmStDtm: "작업 시작 예정 일시",
				workAdmEdDtm: "작업 종료 예정 일시",
				workAdmContent: "작업 지시 내용",
				workStDtm: "작업 시작 일시",
				workEdDtm: "작업 종료 일시",
				workContent: "작업 내용",
				attachments: "파일 첨부"
			},
			button: {
				deleteResetBtn: "삭제 초기화",
				endBtn: "종료하기"
			},
			message: {
				confirm:{
					endStr: "작업을 종료하시겠습니까?<br/>종료 후에는 수정, 삭제가 불가능합니다."
				}
			}
		},
		// 보안 티켓 목록/티켓 연결 팝업
		cmm6206:{
			title: {
				main : {
					default : "보안 티켓 목록",
					req : "Request List",
					reqType : "${1} 보안 티켓 목록",
					select : "티켓 연결",
				}
			},
			label : {
				usrInfoChange : "사용자 정보 변경",
			},
			button:{
				complete :"완료",
				save : "저장",
				select : "선택",
				yes : "예",
				no : "아니오"
			},
			datatable:{
				title:{
					linkTitle : "연결 / 해제",
					selectTitle : "선택"
				},
				button :{
					reqDetail : "티켓 상세",
					reqAccept : "티켓 접수",
					reqUpdate : "티켓 수정",
					reqDelete : "티켓 삭제",
					reqProcessing : "티켓 처리",
					signApr : "결재 승인",
					signRjt : "결재 반려",
					workEnd : "작업 종료",
					opnRpl : "답변",
					reqAdd : "티켓 추가",
					reqRemove : "티켓 제거",
					getLog : "로그 가져오기",
					logDetail : "로그 상세",
					eptDetail : "소명 상세",
				},
				tooltip :{
					select : "티켓 조회",
					reqDetail : "티켓 상세",
					reqAccept : "티켓 접수",
					reqUpdate : "티켓 수정",
					reqDelete : "티켓 삭제",
					reqProcessing : "티켓 처리",
					signApr : "결재 승인",
					signRjt : "결재 반려",
					workEnd : "작업 종료",
					opnRpl : "답변",
					reqAdd : "티켓 추가",
					reqRemove : "티켓 제거",
					getLog : "로그 가져오기",
					logDetail : "로그 상세",
					eptDetail : "소명 상세",
				},
				field :{
					reqGrpNm :"그룹 보안 티켓명",
					reqGrpNo : "그룹 보안 티켓 번호"
				},
				contextmenu : {
					reqDetail : "티켓 상세",
					reqAccept : "티켓 접수",
					reqUpdate : "티켓 수정",
					reqDelete : "티켓 삭제",
					reqProcessing : "티켓 처리",
					signApr : "결재 승인",
					signRjt : "결재 반려",
					workEnd : "작업 종료",
					opnRpl : "답변",
					reqAdd : "티켓 추가",
					reqRemove : "티켓 제거",
					logUpdate : "로그 수정",
					logDelete : "로그 삭제",
				},
			},
			message :{
				alert :{
					linkCheck : "연결할 보안 티켓을 선택하세요. 현재 선택된 보안 티켓이 없습니다.",
					dontLinkCheck : "연결 해제할 보안 티켓을 선택하세요. 현재 선택된 보안 티켓이 없습니다.",
					save : "저장되지 않은 정보는 적용되지 않습니다.<br/>계속 진행하시겠습니까?",
					saveAlert : "저장되지 않은 정보는 적용되지 않습니다.",
					notAuthority : {
						listMessage : "권한이 없는 항목이 있습니다.",
						acceptMessage : "보안 티켓 접수 권한이 없습니다.",
						processMessage : "보안 티켓 처리 권한이 없습니다.",
						workMessage : "작업 종료 권한이 없습니다. 담당자인 작업만 종료 가능합니다.",
						replyMessage : "작업 종료 권한이 없습니다. 담당자인 작업만 종료 가능합니다.",
					},
					selectData : "보안 티켓을 선택해주세요.",
					selectDatas : "${1}건의 보안 티켓이 선택되었습니다.<br/>1건의 보안 티켓만 선택해주세요.",
					notUpdate : "임시 저장 상태의 보안 티켓만 수정 가능합니다.",
					notUpdateOutInsert : "외부 사용자가 등록한 보안 티켓은 수정할 수 없습니다.",
					delete : "임시 저장 상태의 보안 티켓만 삭제 가능합니다.",
					canAcceptOneKindProcess : "지정된 프로세스가 동일한 보안 티켓만 다중접수가 가능합니다.",
					canAcceptOneKindTpl : "동일한 분류의 보안 티켓만 다중접수가 가능합니다.",
					notSelect : "접수 가능한 보안 티켓이 선택되지 않았습니다.",
					removeReq : "${1} 건의 접수 대기가 아닌 보안 티켓을 제외했습니다.",
					notProcessing : "처리중인 보안 티켓만 업무처리가 가능합니다.",
					notEndWork : "종료된 작업은 종료할 수 없습니다.",
					dontLinkCheck : "연결 해제할 보안 티켓을 선택하세요. 현재 선택된 보안 티켓이 없습니다.",
					linkCheck : "연결할 보안 티켓을 선택하세요. 현재 선택된 보안 티켓이 없습니다.",
				},
			}
		},
		//TODO 부재
		// 보안 티켓 분류 선택 화면
		cmm6207:{
			
		},
		// 중간 종료 사유 화면
		cmm6208:{
			title:{
				main:{
					default : "중간 종료",
					middleEnd : "중간 종료",
				},
			},
			label:{
				reason : {
					middleEnd : "중간 종료 사유",
				},
			},
			button:{
				writeCmp : "작성 완료",
			},
			message:{
				diffDept : "사용자의 조직 정보가 변경되었습니다. (${1} > ${2})",
				diffUse : "사용중인 사용자가 아닙니다.",
				diffDel : "삭제된 사용자입니다.",
				diffBlock : "차단된 사용자입니다.",
			},
		},
		// 반려 사유 등록 팝업 - 사용 여부 체크
		cmm6209:{
			title : {
				main : {
					//reqRjt : "접수 반려",
					default : "접수 반려",
				}
			},
			label : {
				reason : "반려 사유",
			},
			button :{
				insert : "반려 사유 등록",
			},
			message : {
				confirm:{
					insertReason : "반려 사유를 등록하시겠습니까?",
				}
			}
		},
		// 작업 상세 팝업
		cmm6210:{
			title: {
				main:{
					default : "작업 상세 보기"
				},
			},
			label: {
				chargerList: "담당자 목록",
				workAdmStDtm: "작업 시작 예정 일시",
				workAdmEdDtm: "작업 종료 예정 일시",
				workAdmContent: "작업 지시 내용",
				attachments: "파일 첨부",
				workEndCharger: "작업 종료자",
				workStDtm: "작업 시작 일시",
				workEdDtm: "작업 종료 일시",
				workContent: "작업 내용",
			}
		},
		// 프로젝트 이관 정보 입력 팝업
		cmm6211:{
			title:{
				main:{
					default : "프로젝트 이관 정보 입력",
				},
				reqList:"보안 티켓 목록",
				chgDesc:"이관 사유",
				basicInfo:"이관 프로젝트 요청 기본항목 정보",
			},
			label:{
				fullInput:"전체 입력",
				chgDesc:"이관 사유",
			},
			message:{
				alert:{
					writeChgDesc:"${1}의 이관사유",
					inputBasicItem:"${1}의 ${2}",
					notWrite:"미입력 항목",
					write:"다음 항목을 입력 후 이관을 진행해 주세요.",
				},
				content:{
					fullInputStatus:"전체 입력 상태입니다.",
					selectReq:"전체 입력 혹은 보안 티켓을 선택해 주세요.",
				},
				notEnough:"필수입력값이 입력되지 않은 보안 티켓이 존재합니다.",
			},
		},
		// 보안 티켓 연장/회수 목록 팝업
		cmm6212 : {
			title:{
				main:{
					default : "연장/회수 목록"
				}
			},
			label:{
				xtn:{
					"01" : "[연장] ",
					"02" : "[해지] ",
				},
				selectReqList : "선택 보안 티켓 목록",
			},
			datatable:{
				button:{
					extend : "연장 신청",
					endExtend : "연장 종료",
					terminate : "해지 신청",
					sendExtendArm : "기간 임박 알림 전송",
					sendTermianteArm : "해지 신청 알림 전송",
				},
				tooltip:{
					select :"연장/회수 보안 티켓 조회",
					extend : "연장 신청",
					endExtend : "연장 종료",
					terminate : "해지 신청",
					detail : "보안 티켓 상세 조회",
					excel:"엑셀 다운로드",
					sendExtendArm : "기간 임박 알림 전송",
					sendTermianteArm : "해지 신청 알림 전송",
				},
				field :{
					prjGrpNm : "프로젝트 그룹 명",
					xtnTypeCd : "연장/회수 구분",
				},
				contextmenu:{
					reqDetail : "보안 티켓 상세 조회",
					reqExtend : "연장 신청",
					reqExtendEnd : "연장 종료",
					reqTerminate : "해지 신청",
				}
			},
			button:{
				searchAll : "전체",
				searchSelect : "선택",
			},
			tooltip:{
				searchRange : "조회 범위 선택",
			},
			message :{
				xtnAlert : {
					"01" : "연장 신청할 수 있는 보안 티켓이 없습니다.",
					"02" : "해지 신청할 수 있는 보안 티켓이 없습니다.",
					"03" : "연장 종료 신청할 수 있는 보안 티켓이 없습니다.",
				},
				xtnConfirm : {
					"01" : "다음 보안 티켓을 연장 신청하시겠습니까?",
					"02" : "다음 보안 티켓을 해지 신청하시겠습니까?",
					"03" : "다음 보안 티켓을 연장종료 신청하시겠습니까?",
				},
				alert:{
					noTerminateArm : "해지 신청 알림을 전송할 보안 티켓이 없습니다.",
					alreadyXtn : "이미 연장 요청된 신청서입니다."
				},
				confirm:{
					checkExtensionList : "연장 신청된 내용을 확인하시겠습니까?",
					sendExtendArm : "보안 티켓 기간 임박 알림을 전송하시겠습니까?",
					sendTerminateArm : "선택한 보안 티켓의 요청자에게<br/>해지 신청 알림을 전송하시겠습니까?",
				},
			}
		},
		//보안 대시보드 보안 티켓 목록
		cmm6213 : {
			label:{
				extend : "연장",
				terminate : "해지",
				end : "만료",
				usrInfoChange : "사용자 정보 변경",
			},
			datatable:{
				button:{
					requestAccept: "접수",
					process :"업무 처리",
					extend : "연장 신청",
					endExtend : "연장 종료",
					terminate : "해지 신청",
					apr : "승인",
					rjt : "반려",
					detail : "상세",
				},
				tooltip:{
					requestAccept: "보안 티켓 접수",
					process :"업무 처리",
					extend : "연장 신청",
					endExtend : "연장 종료",
					terminate : "해지 신청",
					apr : "결재 승인",
					rjt : "결재 반려",
					detail : "보안 티켓 상세",
				},
				field:{
					armTypeNm : "연장/회수",
					signDrfUsrNm : "결재 요청자",
					reqProTypeNm : "처리 유형",
					reqDtm : "요청일",
					regDtm : "등록일",
					reqUsrNm : "요청자 명",
					reqChargerNm : "담당자 명",
					reqKey : "보안 티켓 Key",
				},
				contextmenu:{
					reqAccept : "보안 티켓 접수 처리",
					reqProgress : "보안 티켓 업무 처리",
					reqExtend : "보안 티켓 연장 신청",
					reqExtendEnd : "보안 티켓 연장 종료",
					reqTerminate : "보안 티켓 해지 신청",
					reqSignApprove : "결재 승인",
					reqSignReject : "결재 반려",
					reqDetail : "보안 티켓 상세",
				}
			},
			message :{
				selectData : "보안 티켓을 선택해주세요.",
				selectOne: "1개의 보안 티켓을 선택하세요.",
				selectDatas : "${1}건의 보안 티켓이 선택되었습니다.<br/>1건의 보안 티켓만 선택해주세요.",
				selectTooManyData : "상세 조회는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
				notSelect : "접수 가능한 보안 티켓이 선택되지 않았습니다.",
				removeReq :"${1} 건의 접수 대기가 아닌 보안 티켓을 제외했습니다.",
				notProcessing : "처리중인 보안 티켓만 업무처리가 가능합니다.",
				notSignType : "결재 대기 상태가 아닌 항목이 있습니다.",
				notSignOrd : "결재 순서가 아닌 항목이 있습니다.",
				signApr : "결재 승인하시겠습니까?",
				signSuccess : "결재 성공",
				signFail : "결재 실패",
				canAcceptOneKindProcess:"지정된 프로세스가 동일한 보안 티켓만 다중접수가 가능합니다.",
			}
		},
		//외부 신청서 등록 화면
		cmm6214:{
			
		},
		//외부 소명 등록 화면
		cmm6215:{
			title :{
				main : {
					default : "외부 소명 등록",
					deatil : "외부 소명 상세",
				},
				linkReq : "연결 티켓",
			},
			label:{
				eptReqUsr : "소명 요청자",
				usrDeptNm : "부서/소속",
				eptTargetUsr : "소명 대상자",
				eptSignLine : "결재선",
				eptRangeDtm : "소명 기한",
				eptReqNm : "소명 요청 명",
				eptReqDesc : "소명 요청 내용",
				eptReqFileList : "소명 요청 첨부파일",
				eptWrtDtm : "소명 작성일시",
				eptHistory : "소명 이력",
				eptDesc : "소명 내용",
				eptFileList : "소명 첨부파일",
				usrInfoChange : "사용자 정보 변경",
			},
			button:{
				complete :"소명 완료",
				refresh : "새로고침",
			},
			datatable : {
				tooltip:{
					select : "연결 티켓 조회",
				},
				contextmenu : {
					reqDetail : "티켓 상세",
				},
			},
			message:{
				
			}
		},
		//의견제시 작성 화면
		cmm6216 : {
			title : {
				main : {
					default : "의견 등록",
					update : "의견 수정",
				},
			},
			label : {
				replyUsr : "답변 대상자",
				content : "내용",
				attachments : "파일 첨부",
			},
			button : {
				insert : "작성 완료",
				update : "수정 완료",
				addReplyUsr : "답변 대상자 추가",
				reset : "초기화",
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder:{
				selectList: "입력 후 엔터 키를 입력해주세요.",
				content : "내용",
			},
			tooltip:{
				reset: "답변 대상자 초기화",
			},
			message : {
				alert : {
					dontSelectReplyUsr : "답변 대상자를 지정할 수없습니다",
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
				},
				confirm : {
					resetCharge : "답변 대상자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
					insert : "답변 등록하시겠습니까?",
				},
			},
		},
		//의견 답변 작성 화면
		cmm6217 : {
			title : {
				main : {
					default : "의견 제시",
				},
				opinion : "의견",
				reply : "답변",
				
			},
			label : {
				content : "내용",
				attachments : "파일 첨부",
			},
			placeholder:{
				content : "내용",
			},
			button :{
				insert : "작성 완료",
				update : "수정 완료",
			},
			message :{
				alert :{
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
				}
			}
		},
		//보안티켓 태그 선택 팝업
		cmm6218 : {
			title : {
				main : {
					default : "태그 목록 정보",
				},
			},
			datatable : {
				tooltip:{
					select : "티켓 조회",
				},
			},
		},
		//담당 범위 목록 화면
		cmm6219 : {
			title : {
				main : {
					default : "담당자 목록",
				},
				chargerList : "담당 범위 목록",
			},
		},
		// 권한 그룹 선택 화면
		cmm6300:{
			
		},
		// 담당자 정보 화면
		cmm6400:{
			title:{
				main:{
					default : "사용자 정보",
				}
			},
			label:{
				email :"이메일",
				duty :"직책",
				telno : "연락처",
				position :"직급",
				dept : "부서",
				currEduFinOk : "교육 이수",
				currEduFinNo : "교육 미이수",
			},
			button:{
				sendMsg : "메시지 전송",
			}
		},
		// 사용자 검색/선택 팝업
		cmm6401:{
			title :{
				main : {
					default : "사용자 검색",
				},
				selectDplUsr:"배포자 선택"
			},
			datatable :{
				title :"선택",
				button : {
					click :"선택",
				},
				tooltip :{
					click : "사용자 선택",
				},
				field: {
					/* 외부 search bar 검색, 데이터테이블과 일치시키기 */
					usrNm : "사용자명",
					eduOn : "이수",
					eduOff : "미이수",
				},
			},
			message :{
				toastr :{
					serviceUsrList : "권한 부여 대상자",
					currEduFinSuccess :"최근 교육 이수자만 반환됩니다."
				},
			}
		},
		// 그 외 담당자 목록 팝업
		cmm6402:{
			title :{
				main:{
					default : "담당자 목록",
					participants :"참여자 목록",
					chargerList : "담당자 목록",
					workChargerList : "작업 담당자 목록",
					boardChargerList : "[ ${1} ] 담당자 목록",
					getUsrGrp : "받는 사람 목록",
					riskList : "권한부여 대상자 목록",
					qnaAnswerChargerList : "답변자 목록",
				}
			},
			label:{
				authList : "권한 그룹 목록",
				userList : "사용자 목록",
			},
			button :{
				userInfo : "사용자 정보",
				sendMessage : "메시지 전송"
			},
			tooltip:{
				otherUsr : "그 외 담당자 +${1}"
			},
			badge : {
				answer : "답변",
				unAnswered : "미답변",
			}
		},
		//기관 내 조직 및 사용자 선택 화면
		cmm6403:{
			title:{
				main:{
					default : "사용자 선택",
					selDeptUsr : "조직/사용자 선택",
					selDept : "조직 선택",
					selUsr: "사용자 선택",
				},
				deptList : "조직 목록",
				usrList : "사용자 목록",
				selectList : "선택 목록",
				selectOne : "선택 정보",
			},
			label:{
				onlyDeptUsr : "선택 조직만 보기",
			},
			tooltip:{
				onlyDeptUsr : "선택 조직만 보기",
			},
			treetable :{
				button : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					select : "조직 목록 조회",
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
			},
			datatable :{
				button : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder:{
				selectList: "입력 후 엔터 키를 입력해주세요",
			},
			message :{
				content: {
					noSubDept : "조직 선택 시 하위 조직은 선택되지 않습니다.",
				},
				mask:{
					selDept : "조직을 선택해 주세요.",
				}
			}
		},
		//기관 내외 사용자 태그화를 위한 검색 팝업
		cmm6404:{
			title:{
				main:{
					default : "기관 내외 사용자 검색"
				},
				selectList : "선택 목록",
				usrList : "사용자 목록",
				deptList : "조직 목록",
				unregisteredUsr : "미등록 사용자",
			},
			label:{
				onlyDeptUsr : "선택 조직만 보기",
			},
			tooltip:{
				onlyDeptUsr : "선택 조직만 보기",
			},
			treetable :{
				button : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					select : "조직 목록 조회",
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
			},
			datatable :{
				button : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder:{
				selectList: "입력 후 엔터 키를 입력해주세요",
			},
			message :{
				content: {
					noSubDept : "조직 선택 시 하위 조직은 선택되지 않습니다.",
					delDplInfo : "<div class='osl-line-height-2rem fs-4'>중복된 이메일을 가진 사용자 정보와<br/>선택한 조직에 배정된 사용자 정보가<br/>선택 목록에서 제외되었습니다.</div><div class='mt-5 mb-2 fs-6'>중복 사용자명: ${1}</div><div class='fs-6'>중복 이메일: ${2}</div>",
					delDplMailInfo : "<div class='osl-line-height-2rem fs-4'>중복된 이메일을 가진 미등록 사용자 정보가<br/>선택 목록에서 제외되었습니다.</div><div class='mt-5 mb-2 fs-6'>중복 이메일: ${1}</div>",
				},
				mask:{
					selDept : "조직을 선택해 주세요.",
				}
			}
		},
		//담당 선택 팝업
		cmm6405:{
			title:{
				main:{
					default : "담당 등록"
					,update : "담당 수정"
					,select : "조회 범위 선택"
					,signRoleCharger : "결재자 허용 역할 등록"
					,chargerRole : "담당자 허용 역할 등록"
					,defaultCharger : "단계 기본 담당자 등록"
					,chargerTransfer :"담당자 이관 등록"
					,alarmTargetList : "알림 수신 대상자"
					,smrAcsTargetList : "통계 열람 대상자"
				}
				,authGrpList : "권한 그룹 목록"
				,deptList : "조직 목록"
				,userList : "사용자 "
				,selChargerList : "선택 담당 목록"
				,selListOnly : "선택 목록만 보기"
				,selDeptOnly : "선택 조직만 보기"
				,selList : "선택 목록"
			}
			,button:{
				allCheck: "전체 선택"
				,allClear: "전체 해제"
				,reset: "초기화"
				,deleteAll: "전체 삭제"
			}
			,tooltip:{
				selListOnly: "선택 목록만 보기"
				,selDeptOnly: "선택 조직만 보기"
			}
			,authGrpList:{
				tooltip:{
					select : "권한 그룹 목록 조회"
				}
			}
			,deptTree:{
				button:{
					tooltip:{
						select : "조직 조회"
					}
				}
			}
			,userDatatable:{
				tooltip:{
					select : "사용자 목록 조회"
				}
				,button:{
				}
			}
			,selChargerList:{
				tooltip:{
					reset : "선택 담당 목록 초기화"
					,deleteAll : "선택 담당 목록 전체 삭제"
					,select : "선택 담당 목록 조회"
				}
				,search:{
					A: "전체"
					,authGrp: "권한"
					,dept: "조직"
					,usr: "사용자"
				}
			}
			,message:{
				authGrp : "권한 그룹"
				,dept : "조직"
				,usr : "사용자"
				,selDept : "조직을 선택해주세요."
				,resetSelChargerCnf : "선택 담당 목록이 최초 상태로 변경됩니다.<br/>선택 담당 목록을 초기화 하시겠습니까?"
				,delAllSelChargerCnf : "선택 담당 목록을 전체 삭제 하시겠습니까?"
				,selChargerAlert : "담당을 선택해주세요."
				,chgSelCharger : "선택한 담당 정보가 있습니다. 변경하시겠습니까?"
				,notSelSubDept : "조직 선택 시 하위조직은 선택되지 않습니다."
			}
		},
		// 조직 검색 팝업
		cmm6500:{
			title :{
				main : {
					default : "조직 검색",
				},
				groupList : "조직 목록",
				groupInfo : "조직 정보",
			},
			label :{
				topGrpId : "상위 조직 ID",
				topGrpNm : "상위 조직 명",
				grpId : "조직 ID",
				grpNm :"조직 명",
				ord : "순번",
				usedType :"사용 유무",
				ect : "비고",
			},
			placeholder :{
				topGrpId : "상위 조직 ID",
				topGrpNm : "상위 조직 명",
				grpId : "조직 ID",
				grpNm :"조직 명",
				ord : "순번",
				usedType :"사용 유무",
				ect : "비고",
			},
			button :{
				select : "조직 선택",
			},
			message : {
				selectDept : "왼쪽 트리에서 조직을 선택하세요.",
			}
		},
		//조직 검색 팝업(소속부서 + 겸임 부서)
		cmm6501:{
			title :{
				main : {
					default : "조직 검색",
				},
				groupList : "조직 목록",
			},
			button :{
				select : "조직 선택",
			},
			message : {
				selectDept : "트리에서 조직을 선택하세요.",
			}
		},
		// 결재선 지정 팝업
		cmm6600:{
			title :{
				main:{
					default : "결재선 지정",
				},
				usrList : "사용자 목록",
				deptList : "조직 목록",
				signLineInfo : "결재선 정보" 
			},
			label : {
				signAuth : "결재 권한",
				approve : "결재",
				agree : "합의",
				subApprove : "대결",
				allApprove : "전결",
				request : "기안",
				final : "최종",
				approver : "검토자",
				reference : "참조",
				referrer: "참조자",
				onlyDeptUsr : "선택 조직만 보기",
				addTarget : "대상 추가",
				team : "팀장",
				damdang : "담당",
				bumun : "부문장",
				finalSignAgree : "최종 합의",
				signAgree: "합의 결재",
			},
			button :{
				saveSignLine : "결재선 저장",
			},
			tooltip:{
				onlyDeptUsr : "선택 조직만 보기",
				signAuth : "결재 권한",
				approve : "결재",
				agree : "합의",
				subApprove : "대결",
				allApprove : "전결",
				reference : "참조",
				addTarget : "대상 추가",
				team : "팀장",
				damdang : "담당",
				bumun : "부문장",
			},
			treetable :{
				label:{
					absent : "부재",
					blocked : "차단",
				},
				button : {
					upMove : "위로",
					downMove : "아래로",
					insert:"추가",
					exclude:"제거",
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					select : "조직 목록 조회",
					up : "위로",
					down : "아래로",
					addUsr : "선택 담당자 결재선 등록",
					delUsr : "선택 담당자 결재선 제외",
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				contextmenu : {
					addAssignment  : "배정",
					removeAssignment  : "배정 해제",
				},
			},
			datatable :{
				button : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
				tooltip : {
					allCheck : "전체 선택",
					allUnCheck : "전체 해제",
				},
			},
			message : {
				alert : {
					notRgsSignUsr : "등록된 결재자가 없습니다.",
					treeSelect : "선택된 사용자가 없습니다.",
					notSelSignUsr : "선택된 결재자가 없습니다.",
					notDlgSignUsr : "전결 결재자를 제외하고 이동시켜 주세요.",
					signExcCharger : "결재 허용 역할 목록에 포함하지 않은 담당자가 있습니다." ,
				},
				confirm : {
					saveString : "결재선 정보를 저장 하시겠습니까?",
					usrInsert : "선택 사용자를 등록하시겠습니까?",
					usrDelete : "${1}건의 사용자를 제외하시겠습니까?",
				},
				toastr : {
					noSelect : "삭제할 결재선을 선택해주세요.",
					allUsrInsert:"${1} 명의 사용자가 배정되었습니다.",
					cantInsert :"배정불가한 ${1}건 제외 후 배정되었습니다.",
					alreadyInsert : "이미 배정된 ${1} 명의 사용자 제외",
					cantInsertSign :"배정할 수 없는 결재자 입니다. (${1}건)",
					dupleUsr : "이미 배정중인 사용자 입니다. (${1}명)",
					cantOrDuple : "이미 배정중이거나 배정할 수 없는 사용자 입니다. (${1}명)",
				},
				mask:{
					selDept : "조직을 선택해 주세요.",
				}
			},
		},
		// 결재선 정보 팝업
		cmm6601:{
			title :{
				main:{
					default : "[${1}] 결재선 정보",
					detail : "결재선 상세 보기",
				},
				signLineInfo : "결재선 정보",
				signRes : "결재 의견",
			},
			label : {
				revertSign : "결재 회수 처리",
				waiting : "결재 대기",
				approveSign : "결재 승인",
				request : "기안",
				wait : "대기",
				revert : "결재 회수",
				approve : "승인",
				subApprove : "대결",
				allApprove : "전결",
				signAgree : "합의",
				final :"최종",
				requester : "기안자",
				approver : "검토자",
				referrer : "참조",
				ord : "순번"
			},
			button:{
				signCancel : "결재 회수"
			},
			message : {
				signSuccess : "결재 성공",
				signFail : "결재 실패",
				signCancel : "진행중인 결재를 취소 하시겠습니까?<br/>현재 진행중인 결재는 회수 처리 됩니다.",
				cannotUpdate : "결재 대기 파일이 존재할 경우 결재선을 수정할 수 없습니다."
			}
		},
		// 결재 반려 사유(결재 의견) 표출 팝업
		cmm6602:{
			title:{
				main:{
					default : "결재 반려 사유",
					signRjtRes : "결재 반려 사유",
					signAprRes : "결재 의견",
					signCancelRes : "결재 회수 의견"
				}
			},
			label : {
				signApr : "결재 의견",
				signRjt : "반려 사유",
				signRes : "결재 사유",
				signCancel : "회수 사유",
			},
			button : {
				save : "작성 완료",
				signApr : "결재 승인",
				signRjt : "결재 반려",
				signCancel : "결재 회수",
			},
			message : {
				notSignOrd : "결재 순서가 아닙니다.",
				notEnterAprRes : "결재 사유를 입력해주세요.",
				notEnterRjtRes : "반려 사유를 입력해주세요.",
				saveAprRes : "결재 승인하시겠습니까?",
				saveRjtRes : "결재 반려 처리하시겠습니까?",
				alert: {
					insertSignRjt: "결재 반려 사유를 입력해주세요.",
					insertSignCancel: "결재 회수 사유를 입력해주세요.",
					insertSignApr: "결재 승인 사유를 입력해주세요.",
				}
			}
		},
		//개인 결재선 선택 팝업
		cmm6603:{
			title:{
				main:{
					default : "개인 결재선 선택",
				}
			},
			button : {
				save : "선택",
			},
			message : {
				alert: {
					selData : "결재선을 선택해주세요.",
				}
			}
		},
		//(나의 할일)소명 제출
		cmm6700:{
			title :{
				main:{
					default : "적용대기 신청서 목록",
				}
			},
			cmm6700Table:{
				button:{
					process : "업무처리",
				},
				tooltip:{
					select : "신청서 조회",
					process : "업무처리",
				}
			},
		},
		//(나의 할일)결재 처리 목록
		cmm6701: {
			title:{
				main:{
					default : "결재 승인 관리"
				}
			},
			cmm6701SignTable:{
				button:{
					process : "업무처리",
					signApr : "승인",
					signRjt : "반려",
				},
				tooltip:{
					select : "결재 조회",
					process : "결재 처리",
					detail : "상세",
					signApr : "결재 승인",
					signRjt : "결재 반려"
				},
				contextmenu:{
					detail: "상세 정보",
					process: "결재 처리",
					signApr: "결재 승인",
					signRjt: "결재 반려"
				}
			},
			button: {
				signApr : "승인",
				signAllApr : "전결"
			},
			message:{
				alert:{
					selectOne: "1개의 데이터를 선택하세요.",
					selectOnlyOne: "${1}개가 선택되었습니다.<br/>1개의 데이터만 선택하세요.",
					notSignType : "결재 대기 상태가 아닌 항목이 있습니다.",
					notAuthority : "접근 권한이 없습니다.",
					notSignOrd : "결재 순서가 아닌 항목이 있습니다.",
					notEnterAprRes : "결재 사유를 입력해주세요.",
					notEnterRjtRes : "반려 사유를 입력해주세요.",
					signFail : "결재 실패",
				},
				confirm:{
					signApr : "결재 승인하시겠습니까?",
					signRjt : "결재 반려를 완료하시겠습니까?",
					signAllApr : "전결 처리하시겠습니까?",
					signInAllApr : "전결 권한을 가지고 있는 결재 건이 있습니다.<br/>전결 권한을 가지고 있는 결재 건에 대해 전결처리 하시겠습니까?",
					delegateSign : "대결 권한을 가지고 있는 결재 건이 있습니다.",
				},
				toastr:{
					signSuccess : "결재 성공",
				},
				content:{
					nonStr:{
						signRes: "결재 의견 없음"
					},
				}
			}
		},
		//(나의 할일)소명 제출
		cmm6702:{
			title :{
				main:{
					default : "소명 제출",
				}
			},
			cmm6702Table:{
				label:{
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				button:{
					update : "제출"
				},
				tooltip:{
					select : "소명 목록 조회",
					update : "소명 제출",
					detail : "소명 상세 조회",
				},
				contextmenu:{
					detail: "상세 조회",
					update: "소명 제출",
				},
			},
			message :{
				alert:{
					waiting : "소명 결재가 진행 중입니다.",
					complete : "이미 완료된 소명입니다.",
					expire : "소명 기한이 만료된 소명입니다.",
					reject : "반려된 소명입니다.",
					withdraw : "회수된 소명입니다.",
					notAdd : "소명을 등록할 수 없습니다.",
					notEptSt : "소명을 등록할 수 없습니다.",
				}
			}
		},
		//(나의 할일) 소명 검토
		cmm6703:{
			title :{
				main:{
					default : "소명 검토",
				}
			},
			cmm6703Table:{
				label:{
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				button:{
					detail : "검토"
				},
				tooltip:{
					select : "소명 목록 조회",
					detail : "소명 검토",
				},
				contextmenu:{
					detail: "소명 검토",
				},
			},
			message :{
				alert:{
					waiting : "소명 결재가 진행 중입니다.",
					complete : "이미 완료된 소명입니다.",
					expire : "소명 기한이 만료된 소명입니다.",
					reject : "반려된 소명입니다.",
					withdraw : "회수된 소명입니다.",
					notAdd : "소명을 등록할 수 없습니다.",
				}
			}
		},
		//(나의 할일) 특수 권한 적정성 점검 대상 목록
		cmm6704:{
			title :{
				main:{
					default : "권한 적정성 점검 목록",
				}
			},
			cmm6704Table:{
				tooltip:{
					select : "특수권한 목록 조회",
					detail : "특수권한 목록 상세",
				},
			}
		},
		//(나의 할일) 문의 답변 대기 목록
		cmm6705:{
			title :{
				main:{
					default : "답변 대기 문의 목록",
				}
			},
			cmm6705Table:{
				button:{
					qnaAnswerBtn : "문의 답변"
				},
				tooltip:{
					select : "문의글 목록 조회",
					detail : "문의글 상세 조회",
					qnaAnswer  : "문의 답변",
				},
			}
		},
		//(나의 할일) 작업 목록
		cmm6706:{
			title :{
				main:{
					default : "작업 목록",
				}
			},
			cmm6706Table:{
				button:{
					workEnd : "작업 종료"
				},
				tooltip:{
					select : "신청서 목록 조회",
					workEnd  : "작업 종료",
				},
				message : {
					alert : {
						selectData : "선택된 작업 목록이 없습니다.",
					}
				}
			}
		},
		//(나의 할일) 의견 답변 목록
		cmm6707:{
			title :{
				main:{
					default : "미답변 목록",
				}
			},
			cmm6707Table:{
				tooltip:{
					select : "보안 티켓 조회",
					opnAnswer : "의견 답변",
				},
			}
		},
		//(나의 할일) 이의 검토
		cmm6708:{
			title :{
				main:{
					default : "이의 검토",
				}
			},
			cmm6708Table:{
				label:{
					waiting : "이의제기 승인 대기",
				},
				button:{
					dblClick : "검토"
				},
				tooltip:{
					select : "이의제기 처리 목록 조회",
					dblClick : "이의제기 검토",
				},
				contextmenu:{
					dblClick: "이의제기 검토",
				},
			},
		},
		//사유 팝업
		cmm6800:{
			title:{
				main:{
					default : "사유",
					reqApply : "적용 실패 사유",
					skip : "건너뛰기 사유",
					selDangerLvl : "위험도 처리 사유",
					appr : "승인 사유",
					notAppr : "미승인 사유",
					chgReason : "변경 사유",
					updateAnswer: "답변 수정",
				}
			},
			label:{
				desc:"사유",
				fileList : "첨부파일",
				//문의 대응 관리에서 사용하는 label
				answerDesc : "답변 내용",
			},
		},
		//첨부파일 목록 팝업
		cmm6900:{
			title:{
				main:{
					default : "첨부파일 목록",
				}
			},
			label:{
				fileList : "첨부파일",
			}
		},
		// 시스템 엑셀 다운로드
		cmm9001:{
			title:{
				main:{
					default : "엑셀 다운로드"
				},
			},
			label:{
				dataCnt:"데이터 수",
				firstIndex:"시작 행",
				lastIndex:"종료 행",
				fileName:"저장할 파일 명",
				notSpecialChar  : "(특수 문자 사용 불가)",
			},
			placeholder:{
				fileName : "저장할 파일 명",
				allDateDownload : "전체 기간으로 엑셀 다운로드",
			},
			button :{
				fileDownload : "파일 다운로드",
			},
			message:{
				alert:{
					isNullRow:"행이 입력되지 않았습니다.",
					isNullFileName:"파일이름이 입력되지 않았습니다.",
					firstOverLast:"시작행은 종료행보다 클 수 없습니다.",
					noData:"조회된 데이터가 없습니다.",
					overTotalCnt:"전체 데이터 수 이상입니다.",
					lowStartCnt:"조회된 페이지 행수 이하로 선택할 수 없습니다.",
					overEndCnt:"시작행이 종료행보다 클 수 없습니다.",
				}
			}
		},
		//이상징후 목록 팝업
		cmm6A00:{
			title:{
				main:{
					default : "이상징후 목록",
				},
			},
			datatable:{
				button : {
					insert : "요구사항 요청"
				},
				tooltip : {
					insert : "보안 요구사항 요청",
					select : "보안 요구사항 조회",
					update : "보안 요구사항 수정",
					delete : "보안 요구사항 삭제",
				},
			},
			message: {
				alert : {
					selSlgLog : "보안 티켓을 연결할 이상징후를 선택해주세요.",
					selOneSlgLog : "보안 티켓을 연결할 이상징후를 한 건만 선택해주세요.",
					noDelReqCon : "이상징후에 연결된 보안 티켓이 있는 경우 이상징후를 삭제할 수 없습니다.",
					selUnconLog : "이상징후에 연결된 보안 티켓이 이미 존재합니다.",
				},
				confirm:{
					delete : "이상징후 삭제 시 이상징후 서버에 연결된 알림이 종료처리 됩니다. 삭제하시겠습니까?",
				}
			}
		},
		//이메일 인증번호 전송 팝업
		cmm6B00:{
			title :{
				main:{
					default : "이메일 인증",
				},
			},
			label:{
				email : "이메일",
				authNum : "인증번호",
			},
			button:{
				authNumCall : "인증번호 요청",
				authNum : "인증번호 확인",
			},
			message :{
				successAuth:"정상 인증되었습니다.",
				alert : {
					inAuthNum : "인증번호를 입력하세요.",
					checkAuthNum : "인증번호를 확인하세요.",
					notAuthNum : "인증번호가 틀렸습니다.",
					inEmail :"이메일을 입력하세요.",
					areadyAuthNum : "이미 인증번호가 전송되었습니다.<br/>재발급 대기 시간이 지난 후 다시 요청해주세요.",
				},
				timer :{
					valid : "유효시간 : ${1} 분 ${2} 초",
					reSend : "(재발급 대기 시간 : ${1} 초)"
				}
			},
		},
		// 비밀번호 입력 팝업
		cmm6B01:{
			title :{
				main : {
					default: "비밀번호 확인",
				}
			},
			placeholder:{
				password : "알파벳, 숫자 사용 4-12자 이내",
			},
			regex:{
				password : "알파벳, 숫자 사용 4-12자 이내",
			},
			message:{
				text: "잠긴 보안 티켓입니다.<br/>비밀번호를 입력하세요.",
				passwordMiss : "비밀번호가 틀렸습니다.<br/>다시 입력하세요.",
			}
		},

		// 프로젝트 그룹 생성 관리
		prj1000:{
			title:{
				main:{
					default : "보안사업 그룹 생성 관리",
				}
			},
			label:{
				user : "참여 인원",
				projectCnt : "등록 보안사업",
				reqTypeCnt : "처리 유형 별 보안 티켓",
				request:{
					reqAll : "전체",
					reqStay : "접수 대기",
					reqIn : "처리 중",
					reqOut : "접수 반려",
					reqDone : "완료",
					reqOutApprove : "결재 반려 종료",
					reqOutProgress : "중간 종료",
				},
			},
			datatable:{
				tooltip:{
					trash : "보안사업 그룹 폐기 목록",
					prev : "보안사업 그룹 목록으로 이동",
					select : "보안사업 그룹 목록 조회",
					insert : "보안사업 그룹 등록",
					update : "보안사업 그룹 수정",
					disposal :"보안사업 그룹 폐기",
					redo : "보안사업 그룹 복구",
					recordDelete : "보안사업 그룹 완전 삭제",
					dblClick : "보안사업 그룹 상세 정보",
					createProject: "신규 보안사업 추가",
				},
				contextmenu: {
					prjGrpDetail: "보안사업 그룹 상세 정보",
					prjGrpUpdate: "보안사업 그룹 수정",
					prjGrpDelete : "보안사업 그룹 폐기",
					prjGrpRestore : "보안사업 그룹 복구",
					prjGrpFullDelete : "보안사업 그룹 완전 삭제",
					createProject: "신규 보안사업 추가",
				}
			},
			//TODO 이승연 아래 삭제 가능 체크
			button:{
				modify: "수정",
				trashMove: "휴지통 이동(삭제)",
				createProject: "신규 보안사업 추가",
				projectDetail: "상세 정보",
				recordDelete: "완전 삭제",
				projectRedo: "보안사업 그룹 복구"
			},
			message:{
				prjGrpRedo: "${1}건의 보안사업 그룹을 복구하시겠습니까?",
				prjGrpDelete: "${1}건의 보안사업 그룹을 완전 삭제하시겠습니까?<br/>삭제된 보안사업 그룹은 복구 할 수 없습니다.",
				prjGrpAllDelete : "승인된 보안사업 그룹이 모두 삭제되면 로그인에 문제가 발생할 수 있습니다.<br>라이선스 내의 모든 보안사업 그룹이 삭제되면 라이선스의 첫 번째 작성자가 새 보안사업 그룹을 만들어야 합니다.<br> ${1} 보안사업 그룹을 삭제하시겠습니까?",
			},
		},
		// 보안사업 그룹 생성/수정 팝업
		prj1001:{
			title:{
				main:{
					default : "신규 보안사업 그룹 생성",
					update : "보안사업 그룹 수정",
				},
				prjGrpChargerList : "보안사업 그룹 담당 목록",
				userList : "담당 대상 목록",
			},
			label:{
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				useCd : "사용 유무",
				order : "정렬 순서",
				prjGrpDesc : "보안사업 그룹 설명",
			},
			placeholder:{
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				order : "정렬 순서",
				prjGrpDesc : "보안사업 그룹 설명",
			},
			button:{
				complete: "완료",
				insertComplete : "등록 완료",
				updateComplete : "수정 완료",
			},
			assDatatable:{
				title:"제외",
				button:{
					reset : "초기화",
					remove : "배정 제외",
				},
				tooltip:{
					reset : "사용자 배정 목록 초기화",
					remove : "선택 사용자 배정 제외",
					dblClick : "담당자 배정 제외",
					assAllDelete:"배정 목록 전체 삭제",
				},
				field:{
					usrId : "사용자 ID"
				},
				contextmenu: {
					userInfo: "사용자 정보",
					userDelete: "사용자 배정 제외",
				}
			},
			nonDatatable:{
				title:"배정",
				button:{
					add : "배정 등록"
				},
				tooltip:{
					select : "담당 대상 미 배정 목록 조회",
					add : "선택 사용자 배정 등록",
					dblClick : "담당자 등록",
				},
				field:{
					usrId : "사용자 ID"
				},
				contextmenu: {
					userInfo: "사용자 정보",
					userInsert: "사용자 배정",
				}
			},
			message:{
				insert:{
					saveString: "신규 보안사업 그룹을 생성하시겠습니까?<br/>그룹 생성자는 보안사업 그룹 담당자에<br/>기본 배정됩니다.",
					saveMsg: "${1}명의 사용자가 배정되었습니다.",
					saveDupleMsg: "이미 배정된 ${1}명의 사용자 제외",
					saveAllDupleMsg: "이미 배정중인 사용자입니다. (${1}명)"
				},
				update:{
					saveString: "보안사업 그룹을 수정하시겠습니까?<br/>그룹 수정자는 보안사업 그룹 담당자에<br/>기본 배정됩니다.",
				},
				notRemoveUser : "생성자는 담당자 목록에서 제외 할 수 없습니다.",
				
			},
		},
		// 보안사업 그룹 상세정보 팝업
		prj1002:{
			title: {
				main:{
					default : "보안사업 그룹 상세정보",
				},
				prjGrpInfo : "보안사업 그룹 정보",
				prjCharger : "담당자 목록",
				prjList : "배정된 보안사업 목록",
				detailPrj : "보안사업 상세 정보",
			},
			label:{
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				useCd : "사용 유무",
				order : "정렬 순서",
				prjGrpDesc : "보안사업 그룹 설명",
			},
			placeholder : {
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				order : "정렬 순서",
				prjGrpDesc : "보안사업 그룹 설명",
			},
			chargerDatatable:{
				tooltip :{
					select : "사용자 배정 목록 조회",
				},
				field:{
					usrId :"사용자 ID",
				},
				contextmenu:{
					userInfo: "사용자 정보"
				}
			},
			prjDatatable:{
				tooltip:{
					select :"보안사업 목록 조회"
				},
				contextmenu: {
					prjDetail : "보안사업 상세 정보"
				}
			},
		},
		// 보안사업 생성관리
		prj1100:{
			title:{
				main:{
					default : "보안사업 생성 관리",
				},
				prjGrpInfo : "보안사업 그룹 정보",
				detailPrj : "보안사업 상세 정보",
			},
			label:{
				range : "기간",
				charger : "담당자",
				reqTypeCnt : "처리 유형 별 보안 티켓",
				request:{
					reqAll : "전체",
					reqStay : "접수 대기",
					reqIn : "처리 중",
					reqOut : "접수 반려",
					reqDone : "완료",
					reqOutApprove : "결재 반려 종료",
					reqOutProgress : "중간 종료",
				},
				dev : "개발",
				ops : "운영",
				com : "공통"
			},
			//TODO 이승연 - 삭제 가능 체크
			button:{
				modify: "수정",
				trashMove: "휴지통 이동(삭제)",
				projectDetail: "상세 정보",
				recordDelete: "완전 삭제",
				projectRedo: "보안사업 복구"
			},
			datatable:{
				tooltip:{
					trash : "보안사업 폐기 목록 이동",
					prev : "보안사업 목록으로 이동",
					select : "보안사업 목록 조회",
					insert : "보안사업 등록",
					update : "보안사업 수정",
					delete: "보안사업 삭제",
					disposal :"보안사업 폐기",
					redo : "보안사업 복구",
					recordDelete : "보안사업 완전 삭제",
					dblClick : "보안사업 상세 정보",
				},
				contextmenu:{
					projectDetail: "보안사업 상세 정보",
					projectUpdate: "보안사업 수정",
					projectDelete: "보안사업 폐기",
					prjRestore: "보안사업 복구",
					prjFullDelete: "보안사업 완전 삭제"
				}
			},
			message:{
				prjRedo: "${1}건의 보안사업을 복구하시겠습니까?",
				prjDelete: "${1}건의 보안사업을 완전 삭제하시겠습니까?<br/>삭제된 보안사업는 복구 할 수 없습니다.",
				prjGrpAllDelete : "승인된 보안사업 그룹이 모두 삭제되면 로그인에 문제가 발생할 수 있습니다.<br>라이선스 내의 모든 보안사업 그룹이 삭제되면 라이선스의 첫 번째 작성자가 새 보안사업 그룹을 만들어야 합니다.<br> ${1} 보안사업 그룹을 삭제하시겠습니까?",
			},
		},
		// 보안사업 생성 팝업
		prj1101:{
			title :{
				main :{
					default : "신규 보안사업 생성",
					update :"보안사업 수정",
				},
				prjGrpInfo : "보안사업 그룹 정보",
				reqItem : "요청 기본 항목",
				accessItem : "접수 기본 항목",
				prjItem : "보안사업 기본 항목",
				prjChargerList : "보안사업 담당 목록",
				userList : "담당 대상 목록",
				itemList : "기본 항목 양식",
			},
			label:{
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				prjNm : "보안사업 명",
				prjRange : "보안사업 기간",
				prjType : "보안사업 유형",
				prjMod : "보안사업 개발 방법론",
				fnAccess : "접수기능 사용 유무",
				prjAcrm : "보안사업 약어",
				prjBgColor : "보안사업 배경색",
				prjColor : "보안사업 글씨색",
				useCd : "사용 유무",
				order : "정렬 순서",
				prjGrpDesc : "보안사업 그룹 설명",
			},
			placeholder:{
				prjNm : "보안사업 명",
				prjAcrm : "보안사업 약어",
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				prjRange : "보안사업 기간",
				prjBgColor : "보안사업 배경색",
				prjColor : "보안사업 글씨색",
				ord : "정렬 순서",
				prjDesc : "보안사업 그룹 설명",
			},
			regex :{
				prjAcrm : "영문 대문자 또는 영문 대문자, 숫자 조합으로 3~10자만 허용",
			},
			button:{
				complete : "완료",
				insertComplete : "등록 완료",
				updateComplete : "수정 완료",
				insertItem : "신규 항목 추가",
				selectItem : "기본 항목 불러오기",
			},
			assDatatable:{
				title:"제외",
				button:{
					reset : "초기화",
					remove : "배정 제외",
				},
				tooltip:{
					reset : "담당자 배정 목록 초기화",
					remove : "선택 담당자 배정 제외",
					dblClick : "담당자 배정 제외",
				},
				field:{
					usrId : "사용자 ID"
				},
				contextmenu: {
					userInfo: "사용자 정보",
					userDelete: "사용자 배정 제외",
				}
			},
			nonDatatable:{
				title:"배정",
				button:{
					add : "배정 등록"
				},
				tooltip:{
					select : "담당 대상 목록 조회",
					add : "선택 담당자 배정 등록",
					dblClick : "담당자 등록",
				},
				field:{
					usrId : "사용자 ID"
				},
				contextmenu: {
					userInfo: "사용자 정보",
					userInsert: "사용자 배정",
				}
			},
			message:{
				isPrjAcrmY : "${1} 는(은) 사용할 수 없는 약어입니다.",
				isPrjAcrmN : "사용 가능한 약어입니다.",
				insert:{
					saveString: "신규 보안사업을 생성하시겠습니까?<br/>생성자는 보안사업 담당자에<br/>기본 배정됩니다. ",
					saveMsg: "${1}명의 사용자가 배정되었습니다.",
					saveDupleMsg: "이미 배정된 ${1}명의 사용자 제외",
					saveAllDupleMsg: "이미 배정중인 사용자입니다. (${1}명)",
					waitMsg : "보안사업을 생성 중입니다.<br/>잠시만 기다려주세요.",
				},
				update:{
					saveString: "보안사업을 수정하시겠습니까?<br/>수정자는 보안사업 담당자에<br/>기본 배정됩니다.",
				},
			}
		},
		// 보안사업 상세 정보 팝업
		prj1102:{
			title: {
				main:{
					default : "보안사업 상세 정보",
				},
				prjInfo : "보안사업 정보",
				prjCharger : "담당자 목록",
				prjRequest : "보안 티켓 목록",
			},
			label:{
				prjGrpNm : "보안사업 그룹 명",
				prjGrpRange : "보안사업 그룹 기간",
				prjNm : "보안사업 명",
				prjRange : "보안사업 기간",
				prjType : "보안사업 유형",
				prjMod : "보안사업 개발 방법론",
				fnAccess : "접수기능 사용 유무",
				prjAcrm : "보안사업 약어",
				prjBgColor : "보안사업 배경색",
				prjColor : "보안사업 글씨색",
				useCd : "사용 유무",
				order : "정렬 순서",
				prjDesc : "보안사업 설명",
			},
			chargerDatatable:{
				tooltip:{
					select : "사용자 배정 목록 조회",
				},
				field:{
					usrId : "사용자 ID"
				},
				contextmenu:{
					userInfo: "사용자 정보"
				}
			},
			reqDatatable:{
				tooltip:{
					select : "보안사업 보안 티켓 목록 조회",
				},
				contextmenu:{
					reqDetail: "보안 티켓 상세정보"
				}
			},
		},
		// 프로젝트 - 프로세스 설정 마법사
		prj1200:{
			title:{
				main:{
					default : "프로세스 설정 마법사",
				},
				processList : "프로세스 목록",
			},
			label:{
				confirmation: "확정",
				undetermined: "미확정",
				disposal: "폐기",
			},
			placeholder : {
				flowNmSearchInput : "단계명을 입력해주세요."
			},
			button:{
				prev :"이전",
				next : "다음",
				save : "저장",
				dontSave : "저장 안함"
			},
			tooltip:{
				zoomReset: "확대 초기화",
				zoomIn: "확대",
				zoomOut: "축소",
				insertFlow: "단계 생성",
				updateFlow: "단계 수정",
				deleteFlow: "단계 삭제",
				reload: "데이터 원복",
				save: "데이터 저장",
				processListView: "프로세스 목록 보기",
			},
			datatable:{
				button:{
					insert: "생성"
				},
				tooltip:{
					select : "프로세스 조회",
					insert : "프로세스 생성",
					update : "선택 프로세스 수정",
					delete : "선택 프로세스 삭제",
				},
				contextmenu: {
					processUpdate: "프로레스 수정",
					processDelete: "프로세스 삭제"
				},
				pagination : "현재 ${1} - ${2} / ${3} 건",
			},
			message:{
				linkLimitLoop: "작업 흐름(단계)는 반복 진행될 수 없습니다.<br/> A -> B -> A 불가",
				selNoneProcess: "프로세스를 선택 하세요.",
				selNoneFlow: "단계를 선택 하세요.",
				saveCancel: "저장이 취소되었습니다.",
				saveBefore: "변경된 데이터가 있습니다.<br/> 저장하지 않고 진행하시겠습니까?",
				processSave: "시작 단계: ${1}<br/><br/>프로세스 데이터를 저장하시겠습니까?",
				proConfSave: "시작 단계: ${1}<br/><br/>단계 정보 및 연결 정보를 수정하면 현재 프로세스에 이관되어있는 보안 티켓 데이터에 큰 영향이 있을 수 있습니다.<br/>프로세스 데이터를 저장하시겠습니까?",
				manyStartFlow: "${1}개의 시작 단계가 발견되었습니다.",
				manyEndFlow: "${1}개의 종료 단계가 발견되었습니다.",
				flowLinkCheck: "<br/>단계 연결 데이터를 확인하세요.",
				deleteFlow: "${1} 단계를 삭제하시겠습니까?<br/>업무 처리에 문제가 발생 할 수 있습니다.",
				deleteReqCheck: "${1}건의 진행 중인 보안 티켓이 있습니다.<br/>보안 티켓의 단계 진행을 완료해야 삭제가 가능합니다.",
				searchEmpty: "검색하려는 단계 명을 입력하세요.",
				processConfirmCdChg: "${1} 프로세스 상태를 변경하시겠습니까?",
				processNoneUse: "<br/>업무 처리에 영향이 있을 수 있습니다.",
				flowDoneLinkChk: "마지막 단계는 최종완료 단계에 연결되어야합니다.",
				flowSizeChk: "단계가 생성되지 않았습니다.",
				flowDoneDelErr: "최종 완료 단계는 삭제가 불가능합니다.",
				flowDoneUpdateErr: "최종 완료 단계는 수정이 불가능합니다.",
				selProcess: "프로세스를 선택해주세요.",
				noChangeConfirmPro: "확정된 프로세스의 단계 데이터는 변경할 수 없습니다.",
				selectProcessDel : "선택 프로세스를 삭제하시겠습니까?",
				alreadyDisposal : "이미 폐기된 프로세스입니다.",
				processDisposal : "선택 프로세스를 폐기하시겠습니까?",
				processLock: "선택 프로세스가 잠금됩니다.<br/><b>이미 잠금 상태의 프로세스인 경우 잠금 권한을 가져옵니다.</b><br/>사용자가 잠금 처리한 다른 프로세스의 잠금이 풀리며, 잠금 상태의 프로세스는 다른 사용자가 수정, 삭제할 수 없습니다.",
			}
		},
		// 프로세스 추가/수정 팝업
		prj1201:{
			title:{
				main:{
					default : "신규 프로세스 생성",
					update : "프로세스 수정",
				},
				processInfo:"프로세스 정보",
				authList: "프로세스 담당 목록",
				noneAuthList: "담당 대상 목록",
				processSignInfo : "사전 결재선 정보",
			},
			label:{
				processNm: "프로세스 명",
				processOrd: "정렬 순서",
				useCd: "사용 유무",
				processTransferCd: "프로세스 이관 가능 유무",
				processConfirmCd: "확정 유무",
				processDisabledCd: "폐기 유무",
				processDesc: "프로세스 설명",
				linkedProcessCd : "연계 프로세스 유무"
			},
			placeholder:{
				processNm: "프로세스 명",
				processOrd: "정렬 순서",
				processDesc: "프로세스 설명"
			},
			button:{
				complete : "완료",
				insert: "작성 완료",
				update: "수정 완료",
			},
			authDatatable:{
				title: "제외",
				button: {
					reset: "초기화",
					except: "배정 제외"
				},
				tooltip: {
					dplClick : "담당자 배정 제외",
					except: "선택 담당자 배정 제외",
					reset: "담당자 배정 목록 초기화",
				},
				field:{
					usrId: "사용자 ID"
				}
			},
			noneAuthDatatable: {
				title: "배정",
				button:{
					assignment: "배정 등록",
				},
				tooltip: {
					dblClick: "담당자 배정",
					assignment: "선택 담당자 배정 등록",
					select: "담당 대상 목록 조회"
				},
				field:{
					usrId: "사용자 ID"
				}
			},
			message:{
				insertString: "신규 프로세스를 생성하시겠습니까?",
				updateString: "프로세스를 수정하시겠습니까?",
				changeConfirmCd: "확정된 프로세스를 확정 취소하면 해당 프로세스에 이관되어있는 보안 티켓 데이터에 큰 영향이 있을 수 있습니다.<br/>프로세스를 수정하시겠습니까?",
				processCharger: "프로세스 기본 담당자는 필수 입니다.",
				canWorkProcess: "* 확정된 프로세스만 업무처리가 가능합니다.",
				cannotWorkProcess: "* 폐기된 프로세스는 업무 처리가 불가능합니다.",
			},
		},
		// 단계 정보 추가/수정 팝업
		prj1202:{
			title:{
				main:{
					default: "신규 단계 생성",
					update: "단계 정보 수정"
				},
				flowInfo: "단계 정보",
				itemPriview: "단계 입력 폼 미리보기",
			},
			label: {
				flowNm: "단계 명",
				flowTitleBgColor: "제목 배경 색상",
				flowTitleColor: "제목 글씨 색상",
				flowGuideColor: "가이드 색상",
				flowFunc: "단계 기능",
				flowSignCd: "결재 필수",
				flowSignStopCd: "결재 반려 시 종료",
				flowMiddleEndCd: "중간 종료",
				flowAuthCd: "허용 역할",
				flowWorkCd: "작업 유무",
				flowOpinionCd: "의견 제시",
				flowAuthList: "담당자 허용 역할 목록",
				signAuthList: "결재자 허용 역할 목록",
				flowDesc: "단계 설명",
				flowExpCd: "소명 유무",
				flowTplEndArmCd: "신청서 기간 만료 알림",
				flowSmrExcldCd: "처리중 통계 제외",
			},
			placeholder:{
				flowNm: "단계 명",
				flowTitleBgColor: "제목 배경 색상",
				flowTitleColor: "제목 글씨 색상",
				flowDesc: "단계 설명",
			},
			button:{
				complete :"완료",
				insert: "작성 완료",
				update: "수정 완료",
				insertItem: "신규 항목 추가",
				prev : "이전",
				next : "다음",
				add : "추가",
				createItem : "단계 입력 폼 생성",
				load : "단계 양식 불러오기",
				update : "생성/수정",
			},
			message:{
				insert: "신규 단계를 생성하시겠습니까?",
				update: "단계를 수정하시겠습니까?"
			}
		},
		// 단계 정보 상세보기 팝업
		prj1203:{
			title :{
				main:{
					default : "단계 상세 정보",
				},
				flowInfo: "단계 정보",
				itemPriview: "단계 입력 폼 미리보기",
			},
			label: {
				flowNm: "단계 명",
				flowTitleBgColor: "제목 배경 색상",
				flowTitleColor: "제목 글씨 색상",
				flowFunc: "단계 기능",
				flowSignCd: "결재 필수",
				flowSignStopCd: "결재 반려 시 종료",
				flowMiddleEndCd: "중간 종료",
				flowRevisionCd: "소스 저장소",
				flowDplCd: "배포 계획",
				flowAuthCd: "허용 역할",
				flowWorkCd: "작업 유무",
				flowExpCd: "소명 유무",
				flowTplEndArmCd: "신청서 기간 만료 알림",
				flowSmrExcldCd: "처리중 통계 제외",
				flowOpinionCd: "의견 제시",
				flowAuthList: "담당자 허용 역할 목록",
				signAuthList: "결재자 허용 역할 목록",
				flowDesc: "단계 설명",
			},
		},
		// 프로세스 상세 팝업
		prj1204:{
			title:{
				main:{
					default : "프로세스 상세 정보",
				},
				processInfo:"프로세스 정보",
				authList: "프로세스 담당 목록",
				noneAuthList: "담당 대상 목록"
			},
			label:{
				processNm: "프로세스 명",
				processOrd: "정렬 순서",
				useCd: "사용 유무",
				processTransferCd: "프로세스 이관 가능 유무",
				processConfirmCd: "확정 유무",
				processDisabledCd: "폐기 유무",
				processDesc: "프로세스 설명"
			},
			placeholder:{
				processNm: "프로세스 명",
				processOrd: "정렬 순서",
				processDesc: "프로세스 설명"
			},
			button:{
				complete : "완료",
				insert: "작성 완료",
				update: "수정 완료",
			},
			authDatatable:{
				title: "제외",
				button: {
					reset: "초기화",
					except: "배정 제외"
				},
				tooltip: {
					dplClick : "담당자 배정 제외",
					except: "선택 담당자 배정 제외",
					reset: "담당자 배정 목록 초기화",
				},
				field:{
					usrId: "사용자 ID"
				}
			},
			noneAuthDatatable: {
				title: "배정",
				button:{
					assignment: "배정 등록",
				},
				tooltip: {
					dblClick: "담당자 배정",
					assignment: "선택 담당자 배정 등록",
					select: "담당 대상 목록 조회"
				},
				field:{
					usrId: "사용자 ID"
				}
			},
			message:{
				insertString: "신규 프로세스를 생성하시겠습니까?",
				updateString: "프로세스를 수정하시겠습니까?",
				changeConfirmCd: "확정된 프로세스를 확정 취소하면 해당 프로세스에 이관되어있는 보안 티켓 데이터에 큰 영향이 있을 수 있습니다.<br/>프로세스를 수정하시겠습니까?",
				processCharger: "프로세스 기본 담당자는 필수 입니다.",
				canWorkProcess: "* 확정된 프로세스만 업무처리가 가능합니다.",
				cannotWorkProcess: "* 폐기된 프로세스는 업무 처리가 불가능합니다.",
			},
		},
		//TODO 사용 여부 체크 prj1205.jsp파일은 없음
		// 기본 항목 추가 팝업
		prj1205 :{
			title :{
				main : {
					insertItem : "기본 항목 추가",
					updateItem : "기본 항목 수정",
					prjInsItem : "프로젝트 기본 항목 추가",
					prjUpdItem : "프로젝트 기본 항목 수정"
				}
			},
			label : {
				itemNm : "항목 명",
				itemCode : "항목 분류",
				itemType : "항목 타입",
				itemPcRowNum : "데스크탑 열 넓이",
				itemTabletRowNum : "테블릿 열 넓이",
				itemMobileRowNum : "모바일 열 넓이",
				itemOrd : "순서",
				itemCommonCode : "공통코드",
				itemLength : "길이 제한",
				itemEssentialCd : "필수 유무",
				itemMinVal : "숫자 최솟값",
				itemMxaVal :"숫자 최댓값",
				itemNotModifiedCd : "수정 불가 항목",
			},
			placeholder:{
				itemNm : "항목 명",
			},
			button : {
				insert : "작성 완료",
				update : "수정 완료",
			},
			message : {
				insert : "기본 항목을 추가 하시겠습니까?",
				update : "기본 항목을 수정 하시겠습니까?",
				updateJson : "기본 항목을 수정 하시겠습니까?",
				itemNotSelect : "기본 항목을 1개 이상 선택해주세요.",
			}
		},
		// 체크리스트 생성/수정 팝업
		prj1206 : {
			title:{
				main : {
					default : "기본 항목 체크리스트",
					insert : "기본 항목 체크리스트 생성",
					update : "기본 항목 체크리스트 수정"
				}
			},
			label : {
				itemValNm : "체크리스트 명",
			},
			placeholder:{
				itemValNm : "체크리스트 명",
			},
			button : {
				complete : "완료",
				insert : "작성 완료",
				update : "수정 완료",
			},
			message : {
				insert : "체크리스트를 추가 하시겠습니까?",
				update : "체크리스트를 수정 하시겠습니까?",
			}
		},
		// 프로젝트 권한 그룹 관리
		stm1000:{
			title:{
				main:{
					default : "프로젝트 권한 그룹 관리",
				},
				authGrpList :"권한 그룹",
				authList : "시스템 메뉴 권한",
			},
			label:{
				topMenuNm : "대 메뉴 명",
				menuNm : "중 메뉴 명 > 소 메뉴 명",
				allCheck : "전체 선택",
				main : "메인",
				access : "접근",
				select : "조회",
				insert : "등록",
				update : "수정",
				delete : "삭제",
				excel : "엑셀",
				print : "출력",
			},
			tooltip : {
				allCheck : "전체 선택",
			},
			datatable:{
				button:{
					save : "저장",
				},
				tooltip:{
					select : "권한 그룹 조회",
					insert : "권한 그룹 추가",
					update : "권한 그룹 수정",
					delete : "권한 그룹 삭제",
					save : "메뉴 권한 저장",
					click  : "시스템 메뉴 권한 조회",
					dblClick : "시스템 권한 그룹 상세 보기"
				},
			},
			message :{
				saveStr : "시스템 메뉴 권한을 저장하시겠습니까?",
				authMenuConfirm : "접근 권한이 없는 화면은<br/>메인화면으로 지정할수 없습니다.<br/>계속 진행하시겠습니까?",
				mainMenu : "메인화면으로 지정되어 있는 화면의 접근권한을 해제시<br/>메인화면으로 지정상태가 해제됩니다.<br/>계속 진행하시겠습니까?",
				noDelAuthMsg : "기본 권한 배정이 되는 권한그룹입니다.<br/>기본 권한을 해제 후 권한그룹을 삭제바랍니다.",
			},
		},
		// 권한 그룹 등록, 수정 팝업
		stm1001:{
			title:{
				main:{
					default : "신규 권한 그룹 등록",
					update : "권한 그룹 수정"
				},
			},
			label : {
				authGrpNm: "권한 그룹 명",
				ord: "순번",
				usrTyp: "사용자 유형",
				acceptUseCd: "접수 권한 사용 유무",
				useCd: "사용 유무",
				authGrpDesc: "비고",
				authSettingDiv: "권한 설정",
			},
			placeholder : {
				authGrpNm: "권한 그룹 명",
			},
			button:{
				complete :"완료",
				insert :"작성 완료",
				update :"수정 완료",
			},
			message:{
				insertString :"기본 권한 배정이 예인 경우 이전 기본 권한 배정이 예인 권한그룹은 아니오로 변경됩니다.<br/>신규 권한 그룹을 등록하시겠습니까?",
				updateString :"기본 권한 배정이 예인 경우 이전 기본 권한 배정이 예인 권한그룹은 아니오로 변경됩니다.<br/>권한 그룹 정보를 수정하시겠습니까?",
				alert: {
					failUpdate:"기본권한배정된 권한그룹은 최소 1개 이상 존재해야 합니다.",
				}
			}
		},
		// 권한 그룹 상세보기 팝업
		stm1002:{
			title:{
				main:{
					default : "권한 그룹 상세보기"
				}
			},
			label : {
				authGrpNm: "권한 그룹 명",
				ord: "순번",
				usrTyp: "사용자 유형",
				acceptUseCd: "접수 권한 사용 유무",
				useCd: "사용 유무",
				authGrpDesc: "비고",
				authSettingDiv: "권한 설정",
			},
		},
		// 프로젝트 사용자 배정 관리 -> 권한 그룹 사용자 배정 관리
		stm1100:{
			common : {
				message: {
					successMsg:"정상적으로 조회되었습니다.",
				}
			},
			placeholder : {
				selectList: "입력 후 엔터 키를 입력해주세요.",
			},
			title:{
				main:{
					default : "권한 그룹 사용자 배정 관리",
				},
				authGrpList : "권한 그룹 목록",
				assingnList : "배정 목록",
				nonUserList : "미 배정 사용자 목록",
				deptList	: "조직 목록",
				deptUsrList : "사용자 목록",
			},
			authDatatable:{
				title:"선택 / 상세",
				tooltip:{
					select : "권한 그룹 목록 조회",
					click :"선택(사용자 배정, 미 배정 목록 조회)",
					dblClick :"권한 그룹 상세보기",
				},
			},
			deptUsrDataTable:{
				button : {
					allChk : "전체 선택",
					allUnChk : "전체 해제",
					selDeptOnly:"선택한 조직만 보기",
				},
				tooltip:{
					allUsrAssingn : "사용자 전체 배정",
					allUsrAssDelete : "사용자 전체 배정 제거",
					toggleUsr : "배정된 사용자만 보기",
					toggleDept : "선택한 조직에서만 조회",
					saveUsrSetting : "저장시점 초기화",
					selUsrList : "사용자 목록 조회",
				},
			},
			assDatatable:{
				button:{
					remove : "배정 제외",
					allDelete : "전체 삭제",
					reset:"초기화",
				},
				tooltip:{
					select : "배정 사용자 목록 조회",
					selInUsrDelete :"선택 사용자 배정 제외",
					dblClick : "사용자 배정 제외",
					usrOrDeptAssingn:"사용자 및 조직 배정",
					saveAssingnSetting:"저장시점 초기화",
				},
				field:{
					usrId : "사용자 ID",
				},
				search: {
					allSearch : "전체",
					deptSearch : "조직",
					usrSearch : "사용자",
				}
			},
			nonDatatable:{
				title:"배정",
				button:{
					add : "배정 등록"
				},
				tooltip:{
					select : "미 배정 사용자 목록 조회",
					selAllUsrInsert : "선택 사용자 배정 등록",
					dblClick :"사용자 배정 등록",
				},
				field:{
					usrId : "사용자 ID",
				}
			},
			treetable: {
				button : {
					allChk : "전체 선택",
					allUnChk : "전체  해제",
				},
				tooltip : {
					select : "조직 목록 조회",
					toggle : "배정된 조직만 보기",
					saveDeptSetting:"저장시점 초기화",
				}
			},
			message:{
				selAuthGroup: "권한 그룹을 선택해주세요.",
				selDeptTree: "조직을 선택해주세요.",
				noAuthGrp : "등록되어 있는 권한그룹이 없습니다.<br/>권한 그룹 관리 페이지로 이동됩니다.",
				noAssignList : "배정된 목록이 존재하지 않습니다.",
				deleteMsg	: "삭제되었습니다.",
				noSaveData	: "저장할 데이터가 없습니다.",
				resetConfirm :"초기화 시 현재 체크박스의 체크여부와 관계없이 <br/>배정 시점으로 모든 영역을 초기화하시겠습니까?",
				allDeleteMsgConfirm : "전체 삭제하시겠습니까?",
				saveMsgConfirm : "저장하시겠습니까?",
				allChkConfirm : "전체 선택하시겠습니까?",
				allunChkComfrim : "전체 해제 하시겠습니가?",
			}
		},
		// 프로젝트 사용자 배정 기간 설정 팝업
		stm1101:{
			title: {
				authSetPeriod : "권한 기간 설정",
				assingnList : "배정 목록",
			},
			message : {
				alert:{
					notSelectCheckbox: "선택된 사용자 혹은 조직이 없습니다.",
					doneUpdate: "권한 기간이 정상적으로 등록되었습니다.",
					noAssignedTarget : "배정된 조직 혹은 사용자가 존재하지 않습니다.",
					changeAssignedTarget : "변경된 배정 목록이 저장되지 않았습니다.",
				},
				confirm:{
					saveAuthDate: "권한 기간을 변경하시겠습니까?"
				},
				button : {
					setDate : "적용",
					allDelete : "일괄 제거",
					startDateDel : "시작일 제거",
					endDateDel : "종료일 제거",
				},
				tooltip : {
					setDate : "적용",
					allDelete : "일괄 제거",
					startDateDel : "시작일 제거",
					endDateDel : "종료일 제거",
				},
				label : {
					authStDtm : "시작일",
					authEdDtm : "종료일",
				},
			}
		},
		// 외부 연결 관리
		prj1600: {
			title :{
				main:{
					default : "외부 연결 관리",
				},
			},
			datatable:{
				title : "삭제 / 수정",
				button:{
					detail : "상세"
				},
				tooltip:{
					select:"외부연결 목록 조회",
					insert:"외부연결 정보 추가",
					update:"외부연결 정보 수정",
					delete:"외부연결 정보 삭제",
					detail:"외부연결 상세조회",
				},
				contextmenu:{
					prjEtnConDetail:"외부연결 상세조회",
					prjEtnConUpdate:"외부연결 수정",
					prjEtnConDelete: "외부연결 삭제"
				}
			}
		},
		// 외부 연결 정보 등록, 수정 팝업
		prj1601:{
			title:{
				main:{
					default: "프로젝트 외부연결 추가",
					update: "프로젝트 외부연결 수정"
				}
			},
			label:{
				platformTypeCd: "플랫폼 종류",
				useCd : "사용 유무",
				webhookNm : "WEBHOOK 명",
				webhookUrl : "WEBHOOK URL",
				notification : "알림 영역",
				target : "대상: ",
				code : "코드: ",
				message :"메시지: ",
			},
			placeholder :{
				webhookNm : "외부연결 명",
				webhookUrl : "외부연결 URL",
			},
			button:{
				complete : "완료",
				insert :"작성 완료",
				update :"수정 완료",
				copyOpt : "설정 복사",
			},
			message:{
				alert:{
					notSelectCheckbox: "선택된 알림 영역이 없습니다."
				},
				confirm:{
					insert: "외부연결 정보를 저장하시겠습니까?",
					update: "외부연결 정보를 수정하시겠습니까?"
				}
			},
		},
		// 외부 연결 상세 정보 팝업
		prj1602:{
			title:{
				main:{
					default : "프로젝트 외부연결 상세 정보"
				},
			},
			label:{
				platformTypeCd: "플랫폼 종류",
				useCd : "사용 유무",
				webhookNm : "WEBHOOK 명",
				webhookUrl : "WEBHOOK URL",
				notification : "알림 영역",
				target : "대상: ",
				code : "코드: ",
				message :"메시지: ",
			},
			placeholder :{
				webhookNm : "외부연결 명",
				webhookUrl : "외부연결 URL",
			},
		},
		// 외부 연결 설정 복사 팝업
		prj1603:{
			title:{
				main:{
					default : "프로젝트 외부연결 설정 복사"
				},
			},
			label:{
				etnConList: "외부 연결 목록"
			},
			datatable:{
				button:{
					selectEtnCon : "설정 복사"
				},
				tooltip: {
					select : "외부연결 목록 조회",
					detail : "외부연결 상세",
					selectEtnCon : "외부연결 설정 복사",
				}
			},
			message: {
				alert: {
					selectData: "선택된 외부연결이 없습니다.",
					selectTooManyData: "${1}건의 외부연결이 선택되었습니다.<br/>1건의 외부연결만 선택해주세요."
				},
				confirm: {
					selectEtnCon : "선택한 외부연결의 설정을 복사하시겠습니까?",
				}
			}
		},
		//소명 제출
		req4000:{
			title :{
				main:{
					default : "소명 제출",
				}
			},
			req4000Table:{
				label:{
					request: "소명 요청",
					waiting: "소명 승인 대기",
					complete : "소명 완료",
					expire: "소명 만료",
					reject: "소명 반려",
					withdraw: "소명 회수"
				},
				button:{
					update : "답변"
				},
				tooltip:{
					select : "소명 목록 조회",
					update : "소명 답변",
					detail : "소명 상세 조회",
				},
				contextmenu:{
					detail: "상세 조회",
					update: "소명 답변",
				},
			},
			message :{
				alert:{
					waiting : "소명 결재가 진행 중입니다.",
					complete : "이미 완료된 소명입니다.",
					expire : "소명 기한이 만료된 소명입니다.",
					reject : "반려된 소명입니다.",
					withdraw : "회수된 소명입니다.",
					notAdd : "소명을 등록할 수 없습니다.",
				}
			}
		},
		//소명 답변 팝업
		req4001:{
			title:{
				main:{
					default : "소명 제출",
				},
				linkReq: "연결 티켓",
			},
			label:{
				eptReqNm : "소명 요청 명",
				eptReqUsr : "소명 요청자",
				usrDeptNm : "부서/소속",
				eptReqDtm : "소명 요청일",
				eptReqDesc : "소명 요청 내용",
				eptReqFileList : "소명 요청 첨부파일",
				eptTargetUsr : "소명 대상자",
				eptWrtDtm : "소명 작성일시",
				eptDesc: "소명 내용",
				eptFileList: "소명 첨부파일",
			},
			button:{
				send : "소명 완료",
			},
			req4001ReqTable:{
				tooltip:{
					detail : "보안 티켓 상세 조회",
					select : "연결 티켓 조회"
				},
				contextmenu:{
					detail : "상세 조회",
				},
			},
			message:{
				confirm:{
					send : "제출 시 수정할 수 없습니다.<br/>제출 진행하시겠습니까?",
				},
				content:{
					deadline : "소명 기한은 ${1} ~ ${2} 까지입니다.",
				}
			},
		},
		//소명 상세
		req4002:{
			title:{
				main:{
					default : "소명 상세 정보",
				},
				linkReq: "연결 티켓",
			},
			label:{
				eptReqUsr : "소명 요청자",
				usrDeptNm: "부서/소속",
				eptTargetUsr : "소명 대상자",
				eptSignLine: "결재선",
				eptRangeDtm: "소명 기한",
				eptReqDesc : "소명 요청 내용",
				eptReqFileList : "소명 요청 첨부파일",
				eptWrtDtm : "소명 작성일시",
				eptDesc: "소명 내용",
				eptFileList: "소명 첨부파일",
				eptHistory: "소명 이력",
				now : "현재",
				chgReqUsr : "요청자 변경",
				requestEpt : "소명 요청",
				insertEpt : "소명 등록",
				signEpt : "결재 승인",
				rejectEpt : "소명 반려",
				rejReason : "반려 사유",
				completeEpt : "소명 완료",
				expireEpt : "기한 만료",
				withdrawEpt : "소명 회수",
				wthdReason : "회수 사유",
				withdrawSign : "결재 회수",
				signReq : "결재 요청",
				signRej : "결재 반려",
				chgSignLine : "결재선 변경",
				reqDraft : "기안",
				lastSignUsr : "최종 결재자(${1}/${2})",
				ordSignUsr : "결재자(${1}/${2})",
				appSignUsr : "결재 승인(${1}/${2})",
				referrer : "참조자(${1}/${2})",
				request : "요청",
				waiting : "대기",
				complete : "완료",
				expire : "만료",
				reject : "반려",
				withdraw : "회수",
			},
			tooltip:{
				state : "현재 소명은 [${1}] 상태이며, 연결된 최종 소명은 [${2}] 상태입니다.",
			},
			req4002ReqTable:{
				tooltip:{
					detail: "보안 티켓 상세 조회",
					select: "연결 티켓 조회"
				},
				contextmenu:{
					detail: "상세 조회",
				},
			},
			message:{
				confirm:{
					select: "해당 소명 정보를 확인하시겠습니까?<br/><br/>(현재 팝업은 닫힙니다.)",
				},
				content:{
					noEptDesc : "작성된 소명 내용이 없습니다.",
					nowRequest : "현재 소명은 요청 상태이며,",
					nowWaiting : "현재 소명은 결재 대기 상태이며,",
					nowComplete : "현재 소명은 완료 상태이며,",
					nowExpire : "현재 소명은 기한 만료 상태이며,",
					nowReject : "현재 소명은 반려된 상태이며,",
					nowWithdraw : "현재 소명은 회수된 상태이며,",
					lastRequest : "최종 소명은 요청 상태입니다.",
					lastWaiting : "최종 소명은 결재 대기 상태입니다.",
					lastComplete : "최종 소명은 완료 상태입니다.",
					lastExpire : "최종 소명은 기한 만료 상태입니다.",
					lastReject : "최종 소명은 반려된 상태입니다.",
					lastWithdraw : "최종 소명은 회수된 상태입니다.",
				}
			},
		},
		//이의제기 제출 팝업
		req4003:{
			title:{
				main:{
					default : "이의제기 제출",
				},
			},
			label:{
				reqUsrNm : "점검자",
				deptNm : "조직",
				email : "이메일",
				usrNum : "연락처",
				eptUsrNm : "위반자",
				ognNm : "근무지",
				eptOgnFlw : "층",
				ognSckDtm : "점검일",
				eptDtm : "제출 기한",
				eptReqNm : "이의제기 요청 명",
				eptReqUsr : "위반사항 안내자",
				eptReqDtm : "이의제기 요청일",
				reqEptDesc : "위반사실 안내",
				atchFile : "첨부 파일",
				eptDesc: "이의제기 내용",
				eptAtchFile: "이의제기 첨부파일",
			},
			button:{
				send : "제출 완료",
			},
			message:{
				confirm:{
					send : "제출 시 수정할 수 없습니다.<br/>제출 진행하시겠습니까?",
				},
				content:{
					deadline : "이의제기 제출 기한은 ${1} ~ ${2} 까지입니다.",
				}
			},
		},
		//정보유출 소명 답변 팝업
		req4004:{
			title:{
				main:{
					default : "소명 답변",
				},
			},
			label:{
				eptReqNm : "소명 요청 명",
				eptReqUsr : "소명 요청자",
				email : "소명 요청자 이메일",
				usrDeptNm : "부서/소속",
				eptReqDtm : "소명 제출 기한",
				eptReqDesc : "소명 요청 내용",
				eptReqFileList : "소명 요청 첨부파일",
				eptTargetUsr : "소명 대상자",
				eptTargetLeader : "팀장",
				eptWrtDtm : "소명 작성일시",
				eptDesc: "소명 내용",
				eptFileList: "소명 첨부파일",
				detailLog: "소명 상세로그",
				eptSkipDesc: "건너뛰기 사유",
				eptSendCnt: "소명 회차",
				maskMessage: "위반자의 소명이 제출되지 않았습니다.",
			},
			button:{
				send : "소명 완료",
			},
			req4004ReqTable:{
				tooltip:{
					detail : "보안 티켓 상세 조회",
					select : "연결 티켓 조회"
				},
				contextmenu:{
					detail : "상세 조회",
				},
			},
			message:{
				alert:{
					noAuth: "소명 제출 권한이 없습니다.",
					noEptSkipDesc: "건너뛰기 사유를 작성해주세요.",
				},
				confirm:{
					send : "제출 시 수정할 수 없습니다.<br/>제출 진행하시겠습니까?",
				},
				content:{
					deadline : "소명 기한은 ${1} ~ ${2} 까지입니다.",
				}
			},
		},
		//이의제기 상세 팝업
		req4005:{
			title:{
				main:{
					default : "이의제기 상세",
				},
				eptLog: "이의제기 이력",
			},
			label:{
				reqUsrNm : "점검자",
				deptNm : "조직",
				email : "이메일",
				usrNum : "연락처",
				eptUsrNm : "위반자",
				ognNm : "근무지",
				eptOgnFlw : "층",
				ognSckDtm : "점검일",
				eptDtm : "제출 기한",
				eptReqNm : "이의제기 요청 명",
				eptReqUsr : "위반사항 안내자",
				eptReqDtm : "이의제기 요청일",
				reqEptDesc : "위반사실 안내",
				atchFile : "첨부 파일",
				eptDesc: "이의제기 내용",
				eptAtchFile: "이의제기 첨부파일",
			},
			tooltip:{
				state : "현재 이의제기는 [${1}] 상태이며, 연결된 최종 이의제기는 [${2}] 상태입니다.",
			},
			message:{
				content:{
					nowRequest : "현재 이의제기는 요청 상태이며,",
					nowWaiting : "현재 이의제기는 승인 대기 상태이며,",
					nowComplete : "현재 이의제기는 완료 상태이며,",
					nowExpire : "현재 이의제기는 기한 만료 상태이며,",
					nowReject : "현재 이의제기는 반려된 상태이며,",
					nowWithdraw : "현재 이의제기는 회수된 상태이며,",
					lastRequest : "최종 이의제기는 요청 상태입니다.",
					lastWaiting : "최종 이의제기는 승인 대기 상태입니다.",
					lastComplete : "최종 이의제기는 완료 상태입니다.",
					lastExpire : "최종 이의제기는 기한 만료 상태입니다.",
					lastReject : "최종 이의제기는 반려된 상태입니다.",
					lastWithdraw : "최종 이의제기는 회수된 상태입니다.",
				}
			},
		},
		//정보유출 소명 상세
		req4006:{
			title:{
				main:{
					default : "소명 상세 정보",
				},
				linkSpl: "연결 로그",
			},
			label:{
				eptReqUsr : "소명 요청자",
				usrDeptNm: "부서/소속",
				eptTargetUsr : "소명 대상자",
				eptSignLine: "결재선",
				eptRangeDtm: "소명 기한",
				eptReqDesc : "소명 요청 내용",
				eptReqFileList : "소명 요청 첨부파일",
				eptWrtDtm : "소명 작성일시",
				eptDesc: "위반자 소명 내용",
				leaderEptDesc: "팀장 소명 내용",
				eptFileList: "소명 첨부파일",
				eptHistory: "소명 이력",
				now : "현재",
				chgReqUsr : "요청자 변경",
				requestEpt : "소명 요청",
				insertEpt : "소명 등록",
				signEpt : "결재 승인",
				rejectEpt : "소명 반려",
				rejReason : "반려 사유",
				completeEpt : "소명 완료",
				expireEpt : "기한 만료",
				withdrawEpt : "소명 회수",
				wthdReason : "회수 사유",
				withdrawSign : "결재 회수",
				signReq : "결재 요청",
				signRej : "결재 반려",
				chgSignLine : "결재선 변경",
				reqDraft : "기안",
				lastSignUsr : "최종 결재자(${1}/${2})",
				ordSignUsr : "결재자(${1}/${2})",
				appSignUsr : "결재 승인(${1}/${2})",
				referrer : "참조자(${1}/${2})",
				request : "요청",
				waiting : "대기",
				complete : "완료",
				expire : "만료",
				reject : "반려",
				withdraw : "회수",
				detailLog: "소명 상세로그",
			},
			tooltip:{
				state : "현재 소명은 [${1}] 상태이며, 연결된 최종 소명은 [${2}] 상태입니다.",
			},
			req4006SplTable:{
				tooltip:{
					detail: "상세 조회",
					select: "조회"
				},
				contextmenu:{
					detail: "상세 조회",
				},
			},
			message:{
				confirm:{
					select: "해당 소명 정보를 확인하시겠습니까?<br/><br/>(현재 팝업은 닫힙니다.)",
				},
				content:{
					noEptDesc : "작성된 소명 내용이 없습니다.",
					skipEptDesc : "위반자의 소명이 팀장에 의해 건너뛰기 되었습니다.",
					nowRequest : "현재 소명은 요청 상태이며,",
					nowWaiting : "현재 소명은 결재 대기 상태이며,",
					nowComplete : "현재 소명은 완료 상태이며,",
					nowExpire : "현재 소명은 기한 만료 상태이며,",
					nowReject : "현재 소명은 반려된 상태이며,",
					nowWithdraw : "현재 소명은 회수된 상태이며,",
					lastRequest : "최종 소명은 요청 상태입니다.",
					lastWaiting : "최종 소명은 결재 대기 상태입니다.",
					lastComplete : "최종 소명은 완료 상태입니다.",
					lastExpire : "최종 소명은 기한 만료 상태입니다.",
					lastReject : "최종 소명은 반려된 상태입니다.",
					lastWithdraw : "최종 소명은 회수된 상태입니다.",
				}
			},
		},
		//소명 관리
		req4100:{
			title :{
				main:{
					default : "소명 관리",
				}
			},
			req4100Table:{
				label:{
					request : "소명 요청",
					waiting : "소명 승인 대기",
					complete : "소명 완료",
					expire : "소명 만료",
					reject : "소명 반려",
					withdraw: "소명 회수",
				},
				button:{
					withdraw: "회수",
				},
				tooltip:{
					select : "소명 목록 조회",
					withdraw: "소명 회수",
					detail: "소명 상세 조회",
					other: "그 외",
					needSign: "결재를 요청해야 하는 소명이 있습니다.",
					request : "소명 요청",
					waiting : "소명 승인 대기",
					complete : "소명 완료",
					expire : "소명 만료",
					reject : "소명 반려",
					formDownload : "소명 양식 다운로드",
					formUpload : "소명 일괄 등록",
				},
				field:{
					eptUsrDeptNm: "소명자 조직",
				},
				contextmenu:{
					detail: "상세 조회",
					withdraw: "소명 회수",
				},
			},	
			message :{
				alert:{
					notAuthExpire: "소명 요청 권한이 없습니다.",
					noEptWithdraw: "회수 가능한 소명이 없습니다."
				},
				content:{
					totalEmailCount : "총 ${1}건",
				}
			}
		},
		//소명 요청 팝업
		req4101:{
			title:{
				main:{
					default : "소명 요청",
					copy: "소명 재요청",
				},
				eptInfo: "소명 정보",
				linkReq: "연결 티켓"
			},
			label:{
				reqUsrId : "소명 요청자 ID",
				reqUsrNm : "소명 요청자명",
				reqDeptId : "소명 요청자 조직 ID",
				reqDeptNm : "소명 요청자 조직명",
				eptTarget : "소명 대상자",
				eptUsrId : "소명 대상자 ID",
				eptUsrNm : "소명 대상자명",
				eptUsrEmail : "소명 대상자 이메일",
				eptDeptId : "소명 대상자 조직/소속 ID",
				eptDeptNm : "소명 대상자 조직/소속",
				eptUsrNum : "소명 대상자 연락처",
				limitDtm : "소명 기한",
				eptStDtm : "소명 시작일",
				eptEdDtm : "소명 종료일",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "소명 요청 제목",
				desc : "소명 요청 내용",
				eptStsCd : "소명 상태",
				attachments : "첨부 파일",
				rutEptId : "최상위 소명 ID",
			},
			placeholder :{
				title : "소명 요청 제목을 입력해주세요.",
			},
			button:{
				selEptUsrBtn : "검색",
				link : "연결",
				send : "요청",
				resend : "재요청",
				submit : "완료",
				selectSignLine: "결재선 지정"
			},
			tooltip:{
				selEptUsrBtn : "소명자 검색",
				link : "연결",
				reset: "결재선 초기화",
				selectSignLine: "결재선 지정"
			},
			req4101ReqTable:{
				button:{
					link : "티켓 연결",
					add : "추가",
					remove : "제외"
				},
				tooltip:{
					select :"연결 티켓 조회",
					link : "티켓 연결",
					add : "티켓 추가",
					except : "티켓 제외",
					detail: "보안 티켓 상세 조회",
				},
				contextmenu :{
					detail : "티켓 상세",
					add : "추가",
					except : "제외",
				}
			},
			message:{
				alert:{
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
					notAuthority : "소명 요청 권한이 없습니다.",
					notEptUsr : "소명 대상자를 선택해주세요,",
				},
				confirm: {
					resetSignLine : "결재선을 초기화 하시겠습니까?",
					saveString: {
						insert : "소명 요청을 하시겠습니까?",
						copy : "재소명 요청을 하시겠습니까?",
					},
				},
				content:{
					linkCheck : "소명이 요청될 티켓을 연결해주세요.",
				},
			}
		},
		//소명 상세 팝업
		req4102:{
			title:{
				main:{
					default : "소명 상세 정보",
				},
				linkReq: "연결 티켓"
			},
			tab:{
				sendEptInfo: "소명 요청 정보",
				eptInfo: "소명 정보",
			},
			label:{
				firstReqUsr : "소명 최초 요청자",
				target : "소명 대상자",
				limitDtm : "소명 기한",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "소명 요청 제목",
				desc : "소명 요청 내용",
				attachments : "첨부 파일",
				reqUsr : "소명 요청자",
				request : "요청",
				waiting : "대기",
				complete : "완료",
				expire : "만료",
				reject : "반려",
				withdraw : "회수",
				signLine : "결재선",
				usrDeptNm : "부서/소속",
				reqFileList: "소명 요청 첨부파일",
				eptUsrEptWtDtm: "소명 작성일시",
				eptDesc: "소명 내용",
				eptFileList: "소명 첨부파일",
				eptHistory: "소명 이력",
				now : "현재",
				chgReqUsr : "요청자 변경",
				requestEpt : "소명 요청",
				insertEpt : "소명 등록",
				signReq : "결재 요청",
				signEpt : "결재 승인",
				signRej : "결재 반려",
				rejectEpt : "소명 반려",
				rejReason : "반려 사유",
				completeEpt : "소명 완료",
				expireEpt : "기한 만료",
				withdrawEpt : "소명 회수",
				wthdReason : "회수 사유",
				withdrawSign : "결재 회수",
				requestSign : "결재 요청",
				chgSignLine : "결재선 변경",
				reqDraft : "기안",
				lastSignUsr : "최종 결재자(${1}/${2})",
				ordSignUsr : "결재자(${1}/${2})",
				appSignUsr : "결재 승인(${1}/${2})",
				referrer : "참조자(${1}/${2})",
			},
			placeholder :{
				targetSelect : "선택 또는 입력",
			},
			button:{
				withdrawEpt : "소명 회수",
				resend : "재요청",
				changeSignLine : "결재선 변경",
				withdrawSign : "결재 회수",
				approve : "승인",
				reject : "반려",
				request : "결재 요청",
				allWithdraw : "소명 전체 회수",
				allResend : "전체 재요청",
				changeReqUsr : "요청자 변경",
			},
			tooltip:{
				withdrawEpt : "소명 회수",
				resend : "재요청",
				changeSignLine : "결재선 변경",
				withdrawSign : "결재 회수",
				approve : "결재 승인",
				reject : "결재 반려",
				signLineReset : "결재선 초기화",
				signLineSaveCall : "결재선 저장 및 요청",
				state: "현재 소명은 [${1}] 상태이며, 연결된 최종 소명은 [${2}] 상태입니다.",
				needReq: "<br/>결재를 요청해야 하는 소명입니다.",
				stsReq : "소명 요청 상태",
				stsWaiting : "소명 대기 상태",
				stsComplete : "소명 완료 상태",
				stsExpire : "소명 만료 상태",
				stsReject : "소명 반려 상태",
				stsWithdraw : "소명 회수 상태",
			},
			req4102ReqTables:{
				tooltip:{
					select :"연결 티켓 조회",
					detail: "보안 티켓 상세 조회",
				},
				contextmenu :{
					reqDetail : "티켓 상세",
				}
			},
			message:{
				alert:{
					dontSelectEpt: "해당 소명 조회가 불가능합니다.",
					dontChgReqUsr: "요청자를 변경할 수 없습니다.",
					noUsrId: "요청자 정보가 정확하지 않습니다.<br/>변경할 수 없습니다.",
					sameReqUsr: "요청자가 동일합니다.",
					noReqAuth: "소명 요청 권한이 없습니다.",
					noWithdraw: "소명을 회수할 수 없습니다.",
					scssChgReqUsr : "요청자 변경에<br/>${1}건 성공하였습니다.",
					noResend: "소명을 재요청할 수 없습니다.",
				},
				confirm:{
					changeReq: "소명 요청자 정보를 정말 변경하시겠습니까?",
					closeSignChg: "변경된 결재선 정보가 있습니다.<br/>그래도 닫으시겠습니까?<br/><br/>(변경된 결재선은 저장되지 않으며, 결재 요청이 진행되지 않습니다.)",
					selectOtherEmp: "해당 소명 정보를 확인하시겠습니까?<br/><br/>(현재 팝업은 닫힙니다.)",
					cancelAndResend: "재요청을 할 수 없는 소명이 있습니다.<br/>제외하고 재요청하시겠습니까?",
					request: "현재 결재선으로 결재 요청하시겠습니까?",
					withdraw: "결재를 회수하시겠습니까?",
					approve: "결재를 승인하시겠습니까?",
					reject: "결재를 반려하시겠습니까?",
				},
				content:{
					noEptDesc : "작성된 소명 내용이 없습니다.",
				}
			}
		},
		//소명 회수/재요청 사유 등록 팝업
		req4103:{
			title :{
				main: {
					default : "소명 회수 사유",
					resend : "소명 재요청 사유",
				},
			},
			label:{
				wthdReason : "회수 사유",
			},
			button:{
				eptWithdraw: "소명 회수",
			},
			message:{
				confirm:{
					withdraw : "정말 회수하시겠습니까?",
				}
			}
		},
		//소명 일괄 등록 팝업
		req4104:{
			title: {
				main: {
					default : "소명 일괄 등록"
				}
				,errorMessage: "에러 메세지"
			}
			,placeholder :{
				notFile :"파일이 없습니다."
			}
			,button: {
				insert: "등록"
			}
			,datatable: {
				button: {
					checkData: "데이터 확인"
					,rowInsert: "행 추가"
					,delete: "행 제거"
					,reset: "초기화"
				}
				,tooltip: {
					upload: "업로드"
					,checkData: "데이터 확인"
					,rowInsert: "행 추가"
					,delete: "행 제거"
					,reset: "초기화"
				}
				,field: {
					reqEptNm : "소명 요청 제목"
					,reqEptDesc : "소명 요청 내용"
					,eptStDtm : "소명 시작일시"
					,eptEdDtm : "소명 종료일시"
					,eptArmUseCd : "알림 사용 여부"
					,eptArmCd : "알림 기간"
					,reqId : "연결 티켓 ID"
					,eptTargetTypeCd : "소명 대상 유형"
					,eptUsrId : "소명자 ID"
					,eptUsrNm : "소명자 이름"
					,eptUsrNum : "소명자 연락처"
					,eptUsrEmail : "소명자 이메일"
					,eptDeptId : "소명자 부서 ID"
					,eptDeptNm : "소명자 부서(소속)명"
				}
			}
			,message: {
				alert : {
					selectFile:"업로드할 파일을 선택해주세요."
					,invalidFile:"유효하지 않은 첨부파일입니다."
					,alreadyInsertFile:"이미 업로드한 파일입니다."
					,isEmpty: "필수값 입력을 완료해주세요."
					,noData:"데이터 확인을 위한 업로드 데이터가 없습니다."
					,isNotChecked:"데이터 확인을 진행해주세요."
					,cantRead:"업로드 할 수 없는 내용이 포함 되어있습니다.(빈 값 혹은 잘못된 값)"
					,invalidData : "유효하지 않은 값이 입력되어 있습니다."
				}
				,confirm : {
					reset:"입력중인 정보를 초기화 하시겠습니까?"
					,insert:"입력하신 정보로 등록하시겠습니까?"
				}
				,describe: {
					row1: "* 사용 방법"
					,row2: "- 엑셀파일은 두개의 시트가 필요합니다. 업로드할 소명 정보는 두번째 시트에 입력합니다."
					,row3: "- 행과 행사이에 빈 행이 들어갈 수 없습니다.(연속된 행 조건)"
					,row4: "- (*) 표시는 필수항목입니다."
					,row5: "- 사용자 아이디는 영문 + 숫자 조합으로 이루어져야 합니다 (5~20자의 영문 소문자, 숫자와 특수기호 _(언더바), -(하이픈)만 사용가능합니다."
					,row6: "- 이메일 특수문자는 특수기호 _(언더바), -(하이픈)만 사용가능합니다."
					,row7: "- 소명자 부서 ID는 16자리 조직ID 값을 입력합니다."
					,row8: "- 소명 요청 제목, 소명 요청 내용, 소명 시작일시, 소명 종료일시, 알림 사용 여부, 소명 대상 유형은 필수 입력사항입니다."
					,row9: "- 소명 시작일시와 소명 종료일시는 YYYY-MM-DD HH:mm 형식으로 입력합니다."
					,row10: "- 소명 대상 유형이 조직(01)인 경우 소명자 부서ID는 필수 입력사항입니다."
					,row11: "- 소명 대상 유형이 사용자(02)인 경우 소명자 이메일은 필수 입력사항입니다."
					,row12: "- 소명자 연락처는 숫자만 입력합니다."
				}
				,loading:{
					dataCheck:"데이터 정보를 확인하는 중입니다.<br/>잠시만 기다려주세요."
					,readData:"엑셀 데이터를 읽어오는 중입니다.<br/>잠시만 기다려주세요."
				}
				,dataCheck:{
					notExistUsrId:"사용자 ID ${1}(은)는 등록되지 사용자입니다.\n"
				}
				,validate:{
					reqEptNmSize:"행 소명 요청 제목 글자 수가 최대치(4000Byte)를 초과했습니다.\n"
					,reqEptDescSize:"행 소명 요청 내용 글자 수가 최대치(4000Byte)를 초과했습니다.\n"
					,dtmFormat:"행 날짜형식이 아닙니다. 예) YYYY-MM-DD HH:mm \n"
					,eptArmUseCdFormat:"행 알림 사용 여부는 01 또는 02로만 입력 가능합니다. \n"
					,eptArmCdFormat:"행 알림 사용 기간은 01, 02, 03, 04로만 입력 가능합니다. \n"
					,eptDeptIdLength:"행 부서코드 값은 16자리 입니다.\n"
					,eptDeptIdFormat:"행 부서코드 값은 DPT로 시작해야 합니다.\n"
					,eptDeptIdNumber:"행 부서코드 형식이 맞지 않습니다. 예) DPT0000000000001 \n"
					,eptDeptNmFormat:"행 조직명은 한글, 영문, 숫자만 입력가능합니다.\n"
					,eptDeptNmSize:"행 조직명 글자 수가 최대치(200Byte)를 초과했습니다.\n"
					,reqIdLength:"행 보안티켓 ID 값은 16자리 입니다.\n"
					,reqIdFormat:"행 보안티켓 ID 값은 REQ로 시작해야 합니다.\n"
					,reqIdNumber:"행 보안티켓 ID 형식이 맞지 않습니다. 예) REQ0000000000001 \n"
					,eptTargetTypeCdFormat:"행 소명자 대상 유형은 01 또는 02만 입력 가능합니다. \n"
					,eptUsrIdFormat:"행 아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.\n"
					,eptUsrNmFormat:"행 이름은 한글, 영문, 숫자만 입력가능합니다.\n"
					,eptUsrNmSize:"행 이름 글자 수가 최대치(200Byte)를 초과했습니다.\n"
					,eptUsrNumFormat:"행 연락처 4~13자리 숫자, 하이픈(-)만 사용가능합니다. (예) 01011254476, 010-5496-2254 \n"
					,eptUsrEmailSize:"행 이메일 글자 수가 최대치(50Byte)를 초과했습니다.\n"
					,eptUsrEmailFormat:"행 이메일 형식이 맞지 않습니다. 예) mymail@gmail.com \n"
					,essential:"${1}행 ${2}(은/는) 필수값입니다<br/> \n"
				}
			}
		},
		//정보유출 소명관리
		req4300:{
			title :{
				main:{
					default : "소명 관리",
				}
			},
			req4300Table:{
				label:{
					request : "요청",
					waiting : "승인 대기",
					complete : "완료",
					expire : "만료",
					reject : "반려",
					withdraw: "회수",
					exceptHigh: "상",
					exceptMiddle: "중",
					exceptLow: "하",
					waitExcept: "대기",
					noExcept: "종결",
				},
				button:{
					withdraw: "회수",
				},
				tooltip:{
					select : "소명 목록 조회",
					withdraw: "소명 회수",
					detail: "소명 상세 조회",
					other: "그 외",
					needSign: "결재를 요청해야 하는 소명이 있습니다.",
					request : "소명 요청",
					waiting : "소명 승인 대기",
					complete : "소명 완료",
					expire : "소명 만료",
					reject : "소명 반려",
					formDownload : "소명 양식 다운로드",
					formUpload : "소명 일괄 등록",
				},
				field:{
					eptUsrDeptNm: "소명자 부서",
				},
				contextmenu:{
					detail: "상세 조회",
					withdraw: "소명 회수",
				},
			},	
			message :{
				alert:{
					notAuthExpire: "소명 요청 권한이 없습니다.",
					noEptWithdraw: "회수 가능한 소명이 없습니다."
				},
				content:{
					totalEmailCount : "총 ${1}건",
				}
			}
		},
		//정보유출 소명 요청 팝업
		req4301:{
			title:{
				main:{
					default : "소명 요청",
					copy: "소명 재요청",
				},
				eptInfo: "소명 정보",
				history: "소명 이력",
				linkReq: "연결 티켓"
			},
			label:{
				reqUsrId : "소명 요청자 ID",
				reqUsrNm : "소명 요청자명",
				reqDeptId : "소명 요청자 조직 ID",
				eptTarget : "소명 대상자",
				eptUsrNm : "소명 대상자",
				eptUsrLeaderNm : "소명 대상자 팀장",
				voltLeaderNm : "소명 대상자 팀장",
				eptUsrEmail : "이메일",
				eptDeptNm : "조직/소속",
				eptUsrNum : "연락처",
				limitDtm : "소명 기한",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "소명 요청 제목",
				desc : "소명 요청 내용",
				attachments : "첨부 파일",
				eptStDtm : "소명 시작일",
				eptEdDtm : "소명 종료일",
				eptStsCd : "소명 상태",
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder :{
				target : "사용자 검색/선택 및 입력된 이메일 추가로 소명자 email 추가가 가능합니다.",
				title : "소명 요청 제목을 입력해주세요.",
				selectList: "입력 후 엔터 키를 입력해주세요",
			},
			button:{
				selEptUsrBtn : "검색",
				link : "연결",
				send : "요청",
				resend : "재요청",
				submit : "완료",
				selectSignLine: "결재선 지정"
			},
			tooltip:{
				selEptUsrBtn : "소명자 검색",
				voltLeaderBtn : "소명자 팀장 검색",
				add : "추가",
				link : "연결",
				reset: "결재선 초기화",
				selectSignLine: "결재선 지정"
			},
			req4301ReqTable:{
				button:{
					link : "티켓 연결",
					add : "추가",
					remove : "제외"
				},
				tooltip:{
					select :"연결 티켓 조회",
					link : "티켓 연결",
					add : "티켓 추가",
					except : "티켓 제외",
					detail: "보안 티켓 상세 조회",
				},
				contextmenu :{
					detail : "티켓 상세",
					add : "추가",
					except : "제외",
				}
			},
			message:{
				alert:{
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
					notAuthority : "소명 요청 권한이 없습니다.",
					notEptUsr : "소명 대상자를 선택해주세요",
					notEptUsrLeader : "소명 대상자 팀장을 선택해주세요",
					signLineRequired : "결재선 등록이 필요합니다.",
				},
				confirm: {
					resetSignLine : "결재선을 초기화 하시겠습니까?",
				},
				content:{
					linkCheck : "소명이 요청될 티켓을 연결해주세요.",
				},
			}
		},
		//정보유출 소명상세 팝업
		req4302:{
			title:{
				main:{
					default : "소명 상세 정보",
				},
				scenario: "시나리오"
			},
			tab:{
				sendEptInfo: "소명 요청 정보",
				eptInfo: "소명 정보",
			},
			label:{
				firstReqUsr : "소명 최초 요청자",
				target : "소명 대상자",
				leaderNm : "소명 대상자 팀장",
				limitDtm : "소명 기한",
				eptArmCd : "상기 알림",
				eptReqCnt : "소명 회차",
				title : "소명 요청 제목",
				desc : "소명 요청 내용",
				attachments : "첨부 파일",
				reqUsr : "소명 요청자",
				request : "요청",
				waiting : "대기",
				complete : "완료",
				expire : "만료",
				reject : "반려",
				withdraw : "회수",
				signLine : "결재선",
				usrDeptNm : "부서/소속",
				reqFileList: "소명 요청 첨부파일",
				eptUsrEptWtDtm: "소명 작성일시",
				eptUsrLeaderEptWtDtm: "팀장 소명 작성일시",
				eptDesc: "소명 내용",
				leaderEptDesc: "팀장 소명 내용",
				eptFileList: "소명 첨부파일",
				leaderEptFileList: "팀장 소명 첨부파일",
				eptHistory: "소명 이력",
				now : "현재",
				chgReqUsr : "요청자 변경",
				requestEpt : "소명 요청",
				insertEpt : "소명 등록",
				signReq : "결재 요청",
				signEpt : "결재 승인",
				signRej : "결재 반려",
				rejectEpt : "소명 반려",
				sucReason : "승인 사유",
				rejReason : "반려 사유",
				completeEpt : "소명 완료",
				skipEpt : "소명 건너뛰기",
				skipDesc : "소명 건너뛰기 사유",
				expireEpt : "기한 만료",
				withdrawEpt : "소명 회수",
				wthdReason : "회수 사유",
				withdrawSign : "결재 회수",
				requestSign : "결재 요청",
				chgSignLine : "결재선 변경",
				chgEptProStCd : "처리 변경",
				chgEptProStCdReason : "위험도 변경 사유",
				reqDraft : "기안",
				lastSignUsr : "최종 결재자(${1}/${2})",
				ordSignUsr : "결재자(${1}/${2})",
				appSignUsr : "결재 승인(${1}/${2})",
				referrer : "참조자(${1}/${2})",
				detailLog : "소명상세로그",
				maskMessage : "작성된 소명 내용이 없습니다.",
				skipDesc : "건너뛰기 사유",
			},
			placeholder :{
				targetSelect : "선택 또는 입력",
			},
			button:{
				withdrawEpt : "소명 회수",
				resend : "재요청",
				changeSignLine : "결재선 변경",
				withdrawSign : "결재 회수",
				approve : "승인",
				reject : "반려",
				request : "결재 요청",
				allWithdraw : "소명 전체 회수",
				allResend : "전체 재요청",
				changeReqUsr : "요청자 변경",
			},
			tooltip:{
				withdrawEpt : "소명 회수",
				resend : "재요청",
				changeSignLine : "결재선 변경",
				withdrawSign : "결재 회수",
				approve : "결재 승인",
				reject : "결재 반려",
				signLineReset : "결재선 초기화",
				signLineSaveCall : "결재선 저장 및 요청",
				state: "현재 소명은 [${1}] 상태이며, 연결된 최종 소명은 [${2}] 상태입니다.",
				needReq: "<br/>결재를 요청해야 하는 소명입니다.",
				stsReq : "소명 요청 상태",
				stsWaiting : "소명 대기 상태",
				stsComplete : "소명 완료 상태",
				stsExpire : "소명 만료 상태",
				stsReject : "소명 반려 상태",
				stsWithdraw : "소명 회수 상태",
			},
			req4302ReqTables:{
				tooltip:{
					select :"연결 티켓 조회",
					detail: "보안 티켓 상세 조회",
				},
				contextmenu :{
					reqDetail : "티켓 상세",
				}
			},
			message:{
				alert:{
					dontSelectEpt: "해당 소명 조회가 불가능합니다.",
					dontChgReqUsr: "요청자를 변경할 수 없습니다.",
					noUsrId: "요청자 정보가 정확하지 않습니다.<br/>변경할 수 없습니다.",
					sameReqUsr: "요청자가 동일합니다.",
					noReqAuth: "소명 요청 권한이 없습니다.",
					noWithdraw: "소명을 회수할 수 없습니다.",
					scssChgReqUsr : "요청자 변경에<br/>${1}건 성공하였습니다.",
					noResend: "소명을 재요청할 수 없습니다.",
				},
				confirm:{
					changeReq: "소명 요청자 정보를 정말 변경하시겠습니까?",
					closeSignChg: "변경된 결재선 정보가 있습니다.<br/>그래도 닫으시겠습니까?<br/><br/>(변경된 결재선은 저장되지 않으며, 결재 요청이 진행되지 않습니다.)",
					selectOtherEmp: "해당 소명 정보를 확인하시겠습니까?<br/><br/>(현재 팝업은 닫힙니다.)",
					cancelAndResend: "재요청을 할 수 없는 소명이 있습니다.<br/>제외하고 재요청하시겠습니까?",
					request: "현재 결재선으로 결재 요청하시겠습니까?",
					withdraw: "결재를 회수하시겠습니까?",
					approve: "결재를 승인하시겠습니까?",
					reject: "결재를 반려하시겠습니까?",
				},
				content:{
					noEptDesc : "작성된 소명 내용이 없습니다.",
					skipEptDesc : "해당 소명은 건너뛰기 되었습니다.",
				}
			}
		},
		//정보유출 소명 회수 & 재요청 사유 등록 팝업
		req4303:{
			title :{
				main: {
					default : "소명 회수 사유",
					resend : "소명 재요청 사유",
				},
			},
			label:{
				wthdReason : "회수 사유",
			},
			button:{
				eptWithdraw: "소명 회수",
			},
			message:{
				confirm:{
					withdraw : "정말 회수하시겠습니까?",
				}
			}
		},
		//정보 유출 소명 로그 관리
		req4400:{
			title:{
				modal:{
					detail: "정보유출 소명 로그 상세",
				}
			},
			datatable:{
				tooltip:{
					select : "정보유출 소명 로그 목록 조회",
					detail: "정보유출 소명 로그 상세 조회",
				},
				field:{
					eptUsrDeptNm: "소명자 부서",
				},
				contextmenu:{
					detail: "상세 조회",
				},
			},
		},
		//정보 유출 소명 로그 상세
		req4401:{
			title:{
				linkedEpt: "소명 목록",
				allLog: "로그 전문",
				history: "이력",
			},
			datatable:{
				tooltip:{
					select : "소명 조회",
					insert : "소명 요청",
					detail: "소명 상세",
				},
			},
			label:{
				serverName: "서버명",
				tool: "수집툴",
				scenario: "발생 시나리오 명",
				scenarioKey: "발생 시나리오 키",
				selCharger: "지정 담당자",
			},
			message:{
				content:{
					noConnect:"미연결",
				},
				alert:{
					selTicket : "소명을 선택해주세요.",
					noInsertEpt : "소명 요청이 불가합니다.",
				}
			}
		},
		//정보 유출 소명 로그 상세
		req4402:{
			title:{
				main:{
					default : "소명 요청",
					copy: "소명 재요청",
				},
				eptInfo: "소명 정보",
				history: "소명 이력",
				scenario: "시나리오"
			},
			label:{
				reqUsrId : "소명 요청자 ID",
				reqUsrNm : "소명 요청자명",
				reqDeptId : "소명 요청자 조직 ID",
				eptTarget : "소명 대상자",
				eptUsrId : "소명 대상자 ID",
				eptUsrNm : "소명 대상자",
				eptDeptNm : "소명 대상자 부서",
				voltLeaderId : "소명 대상자 팀장 ID",
				voltLeaderNm : "소명 대상자 팀장",
				voltLeaderDeptNm : "소명 대상자 팀장 부서",
				limitDtm : "소명 기한",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "소명 요청 제목",
				desc : "소명 요청 내용",
				attachments : "첨부 파일",
				detailLog : "소명상세로그",
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder :{
				target : "사용자 검색/선택 및 입력된 이메일 추가로 소명자 email 추가가 가능합니다.",
				title : "소명 요청 제목을 입력해주세요.",
				selectList: "입력 후 엔터 키를 입력해주세요",
			},
			button:{
				selEptUsrBtn : "검색",
				link : "연결",
				send : "요청",
				resend : "재요청",
				submit : "완료",
				selectSignLine: "결재선 지정"
			},
			tooltip:{
				selEptUsrBtn : "소명자 검색",
				voltLeaderBtn : "소명자 팀장 검색",
				add : "추가",
				link : "연결",
				reset: "결재선 초기화",
				selectSignLine: "결재선 지정"
			},
			req4301ReqTable:{
				button:{
					link : "티켓 연결",
					add : "추가",
					remove : "제외"
				},
				tooltip:{
					select :"연결 티켓 조회",
					link : "티켓 연결",
					add : "티켓 추가",
					except : "티켓 제외",
					detail: "보안 티켓 상세 조회",
				},
				contextmenu :{
					detail : "티켓 상세",
					add : "추가",
					except : "제외",
				}
			},
			message:{
				alert:{
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
					notAuthority : "소명 요청 권한이 없습니다.",
					notEptUsr : "소명 대상자를 선택해주세요",
					notEptUsrLeader : "소명 대상자 팀장을 선택해주세요",
					signLineRequired : "결재선 등록이 필요합니다.",
				},
				confirm: {
					resetSignLine : "결재선을 초기화 하시겠습니까?",
					insert : "소명을 요청하시겠습니까?",
				},
				content:{
					linkCheck : "소명이 요청될 티켓을 연결해주세요.",
				},
			}
		},
		//정보 유출 소명 이력 관리
		req4500:{
			title:{
				modal:{
					detail: "정보유출 소명 로그 상세",
				}
			},
			datatable:{
				tooltip:{
					select : "정보유출 소명 이력 목록 조회",
					detail: "정보유출 소명 상세 조회",
				},
				contextmenu:{
					detail: "상세 조회",
				},
			},
		},
		//시나리오별 소명 통계
		req4600:{
			title :{
				main:{
					default : "소명 관리",
				}
			},
			datatable:{
				button:{
					select : "통계 조회",
					detail : "통계 상세",
					excel : "엑셀 다운로드",
				},
				tooltip:{
					select : "통계 조회",
					detail : "통계 상세",
					excel : "엑셀 다운로드",
				},
			},
		},
		
		//시나리오 부서별 소명 통계
		req4601:{
			title :{
				main:{
					default : "시나리오 부서별 소명 통계",
				}
			},
			datatable:{
				button:{
					select : "통계 조회",
					excel : "엑셀 다운로드",
				},
				tooltip:{
					select : "통계 조회",
					excel : "엑셀 다운로드",
				},
			},
		},
		
		// 보안사업 일정 관리
		prj5000:{
			title :{
				main:{
					default : "보안사업 일정 관리",
				},
				searchParam : "검색 조건",
				prjList : "보안사업 목록",
			},
			label:{
				holiday : "휴일",
				request : "보안 티켓",
			},
			button:{
				insert: "일정 등록",
				locale: 'ko',
				dataSelect: '일정 데이터 조회',
				fourDay: '4일',
				select : "조회",
			},
			tooltip:{
				insert: "일정 등록",
				select: "보안사업 조회",
				prjGrpNm : "보안사업 그룹명",
				prjNm : "보안사업명",
				reqSwitchCd : "보안티켓 ON/OFF",
				holiday : "휴일",
			},
			message :{
				updateWriter : "등록자만 수정이 가능합니다.",
			}
		},
		// 프로젝트 일정 등록, 수정 팝업
		prj5001:{
			title:{
				main : {
					default :"보안사업 일정 등록",
					insert :"보안사업 일정 등록",
					update :"보안사업 일정 수정",
					view : "일정 상세 정보",
					request : "보안티켓 일정 정보",
				}
			},
			label : {
				evtNm: "일정 명",
				evtRange: "일정 일자",
				prjList : "보안 사업 목록",
				evtType :"보안사업 일정 분류",
				evtUseCd : "개인 일정 공개 여부",
				guideColor: "가이드 색상",
				evtBgColor: "일정 배경 색상",
				evtColor: "일정 글 색상",
				evtDesc: "일정 설명",
				target: "수신 대상 수 (${1}${2})",
				armUseCd : "사전 알림 설정",
				armCd : "알림 기간",
				allDay : "전일",
			},
			search:{
				selectList:{
					option:{
						A: "전체",
						dept: "조직",
						usr: "사용자",
					}
				},
			},
			placeholder :{
				evtNm: "일정 명",
				evtDesc: "일정 설명",
				selectList: "입력 후 엔터 키를 입력해주세요",
			},
			button:{
				complete: "완료",
				insert :"작성 완료",
				update :"수정 완료",
				delete : "삭제",
				detail : "요구사항 상세",
				add : "추가",
			},
			tooltip:{
				reset: "수신 대상자 초기화",
			},
			message :{
				insertString : "신규 보안사업 일정을 생성하시겠습니까?",
				updateString :"보안사업 일정을 수정하시겠습니까?",
				deleteString: "보안사업 일정을 삭제하시겠습니까?",
				noUpdateString: "수정된 내용이 존재하지 않습니다.",
				
			},
		},
		// 전체 이력 조회
		his7000:{
			title:{
				main:{
					default : "통합 이력 조회",
				}
			},
			label:{
				modifyType : {
					change: "변경",
					update : "수정",
					sign : "결재 요청",
					link : {
						prev : "선행 연결",
						next : "후행 연결",
						add : "추가",
						remove : "해제"
					}
				},
				changeLog : {
					flow : "단계 이동",
					flowOption : {
						start : "시작 단계",
						sign : "결재",
						signStop : "결재 반려 시 종료 유무",
						revision : "리비전 저장 유무",
						dpl : "배포계획 저장 유무",
						middleEnd : "중간 종료",
						done : "최종 완료 단계"
					},
					charger : "담당자 변경",
					chargerOption : {
						preCharger : "변경 전 담당자",
						chgCharger : "변경 후 담당자",
					},
					acceptance : "접수 승인",
					acceptOption :{
						reqUsr : "요청자",
						reception : "접수자",
						charger : "담당자"
					},
					compaion : "접수 반려",
					compOption :{
						reqUsr : "요청자",
						reception : "접수자",
						reason : "반려 사유",
						nothing : "(없음)"
					},
					chgPrj:"프로젝트 이관",
					chgPrjOption:{
						reason:"프로젝트 이관 사유",
						chgPerson:"이관자",
						pre:"이관 전",
						next:"이관 후",
					}
				},
				updateLog :{
					title : "수정",
					labelOption : {
						req : "[보안 티켓]",
						item : "[기본 항목]",
						dpl : "[배포계획]",
						reqGrp : "[그룹 보안 티켓]",
						slgSev : "[보안서버]",
						sev : "[이상징후 수집서버]",
						slgSevPrj : "[보안서버 프로젝트 배정]",
						alertRule : "[키워드]",
						slg : "[이상징후]",
						slgReq : "[이상징후 보안 티켓 연결]",
						enter : "입력",
						set : "설정",
						update : "수정",
						add : "추가",
						delete : "삭제",
						check : "체크",
						unCheck : "체크 해제",
						nothing : "(없음)",
						pre : "변경 전",
						next : "변경 후",
						tpl: "[양식]",
						cfg: "[정보자산]",
						move: "이동",
					},
					text : "(이)가 ${1}되었습니다.",
				},
				signLog :{
					request : "결재 요청",
					withdraw : "결재 회수",
					signLineInfo : "결재선 정보",
					approver : "결재자",
					accept : "결재 승인",
					middleAccept : "결재 중간 승인",
					endAccept : "결재 최종 승인",
					reject : "결재 반려",
					reason : "반려 사유",
					nothing : "(없음)"
				},
				linkLog :{
					link : "연결",
					unlink : "연결 해제",
					prev : "선행 보안 티켓",
					next : "후행 보안 티켓",
					inSlgSevPrj : "보안서버 프로젝트 배정",
					delSlgSevPrj : "보안서버 프로젝트 배정 해제",
					inSlgReq : "이상징후 보안 티켓 연결",
					delSlgReq : "이상징후 보안 티켓 연결 해제",
					inCfgReq:"정보자산 보안 티켓 연결",
					delCfgReq:"정보자산 보안 티켓 연결 해제",
					inCfgCfg:"정보자산 연결",
					delCfgCfg:"정보자산 연결 해제",
					//TODO 둘중 하나 정하기
					conSubCim:'정보자산[${1}]의 [${2}]에 ${3}되었습니다.',
					conSubCps:'정보자산[${1}]의 [${2}]에 ${3}되었습니다.',
				},
				delLog : {
					title: "삭제",
					delSlgSev : "이상징후 서버 삭제",
					delSev : "이상징후 하위서버 삭제",
					delKwd : "키워드 삭제",
					delSlg : "이상징후 삭제",
					deleter : "삭제자"
				}
			},
			his7000LogTable:{
				tooltip:{
					detail : "이력 상세조회",
				},
				contextmenu:{
					detail : "이력 상세조회",
				}
			},
			message:{
				alert:{
					nothingUser : "사용자가 존재하지 않습니다.",
				}
			}
		},
		// 마이페이지 팝업
		usr1000:{
			title:{
				main:{
					default : "마이페이지",
				},
				myPostBadList : "내가 작성한 게시글 목록",
				myPostCmtList : "내가 작성한 댓글 목록",
				signLineList : "결재선 목록",
				signLineInfo : "결재선 정보",
			},
			tab:{
				profile : "사용자 프로필",
				changePw : "비밀번호 변경",
				usrBoardPost : "게시글 목록",
				shortCut : "단축키 설정",
				webhook : "개인 외부연결 관리",
				armSetting : "개인 알림 설정",
				usrCldMg : "개인 일정 관리",
				usrSignLine : "개인 결재선 관리",
				signDelegateMng : "대결자 관리",
			},
			label: {
				id : "아이디",
				name : "이름",
				telno : "연락처",
				email : "이메일",
				position : "직급",
				duty : "직책",
				workStartTime : "근무 시작 시간",
				workEndTime : "근무 종료 시간",
				refreshStartTime : "휴식 시작 시간",
				refreshEndTime : "휴식 종료 시간",
				dept : "부서",
				absRange: "부재 기간",
				signDelegate: "대결자",
				absReason: "부재 사유",
				ect : "비고",
				lately : "최근 변경 일시",
				currentPw  :"현재 비밀번호",
				newPw : "새 비밀번호",
				newPwChk : "새 비밀번호 확인",
				shortCutNm : "단축키 명",
				popupAction : "팝업시 동작 여부",
				shortCutKey : "단축키",
				all : "전체",
				indiSetting : "개별 설정",
				notice : "공지",
				holiday : "휴일",
				usrCld : "개인 일정",
				reqSwitchCd : "보안티켓",
				
				normal:"일반",
				gallery:"갤러리",
				movie:"영상",
				storage:"자료실",
				comment : "댓글",
				shortcut01:"단축키 정보 보기",
				shortcut02:"프로젝트 및 권한 그룹 선택",
				shortcut03:"팝업창 가운데 정렬",
				shortcut04:"추가 기능바",
				shortcut05:"새로고침",
				shortcut06:"검색",
				shortcut07:"마이페이지",
				shortcut08:"메시지",
				shortcut09:"알림",
				shortcut10:"개인설정",
				shortcut11:"담당보안 티켓",
				shortcut12:"로그아웃",
				topMenuNm:"대 메뉴명",
				menuNm:"중 메뉴명 > 소 메뉴명",
			},
			placeholder :{
				id : "아이디",
				name : "이름",
				telno : "연락처",
				email : "이메일",
				dept : "부서 검색 시 검색 결과가 1건일 경우 자동세팅됩니다.",
				currentPw  :"현재 비밀번호",
				newPw : "새 비밀번호",
				newPwChk : "새 비밀번호 확인",
				shortcut : "단축 키 입력",
			},
			regex:{
				usrNm : "한글,영문,숫자,특수문자( _ -)만 입력가능",
				telno : "숫자만 입력가능",
				password : "영문,숫자,특수문자(!@#$%&*?) 필수 포함",
			},
			button: {
				reset : "되돌리기",
				doubleCheck : "중복 확인",
				deptSearch : "부서 검색",
				endAbs : "부재 종료",
				mngSignDelegate : "대결자 관리",
				updateComplete : "수정 완료",
				profileComplete : "프로필 수정 완료",
				pwComplete : "비밀번호 변경 완료",
				dontUsed : "사용 안함",
				usrCldInsert : "개인 일정 등록",
				select : "조회",
				insert : "등록",
				update : "수정",
				delete : "삭제",
				save : "저장",
				cancel : "취소",
				reset : "초기화",
				search : "검색",
				fvrListOnly : "즐겨찾기만 보기",
				signFlowBtn : "결재선 지정",
				endAbsBtn : "부재 종료",
			},
			tooltip:{
				profile : "사용자 프로필",
				changePw : "비밀번호 변경",
				usrBoardPost : "게시글 목록",
				shortCut : "단축키 설정",
				webhook : "개인 외부연결 관리",
				armSetting : "개인 알림 설정",
				usrCldMg : "개인 일정 관리",
				usrImgFind : "이미지 찾기",
				usrImgReset : "기존 이미지로 되돌리기",
				usrImgDelete : "이미지 삭제",
				usrProfileComplete : "사용자 프로필 수정",
				changePwComplete : "사용자 비밀번호 변경",
				shortCutComplete : "사용자 단축키 변경",
				resetArmSet : "알림 설정 초기화",
				saveArmSet : "알림 설정 저장",
				usrCldInsert : "개인 일정 등록",
				usrCldList : "개인 일정 목록",
				popAction : "팝업 시 동작 여부",
				holiday : "휴일",
				usrCld : "개인 일정",
				select : "조회",
				prjGrpNm : "보안 사업 그룹명",
				prjNm : "보안 사업명",
				selectPrvtSignLine : "개인 결재선 조회",
				insertPrvtSignLine : "개인 결재선 등록",
				updatePrvtSignLine : "개인 결재선 수정",
				cancelPrvtSignLine : "개인 결재선 삭제",
				cancelPrvtSignLine : "결재선 취소",
				searchPrvtSignLine : "결재선 명 검색",
				saveSignLine : "결재선 저장",
				resetSignLine : "결재선 초기화",
				reqSwitchCd : "보안티켓 ON/OFF",
				usrImage : "사용자 이미지",
				signDelegateMng : "대결자 관리",
			},
			webhookDatatable:{
				title:"Action",
				tooltip:{
					select : "외부연결 목록 조회",
					insert : "외부연결 정보 추가",
					update : "외부연결 정보 수정",
					delete : "외부연결 정보 삭제",
				},
				contextmenu:{
					usrEtnUpdate: "외부연결 수정",
					usrEtnDelete: "외부연결 삭제"
				}
			},
			boardDatatable:{
				title : "수정 / 삭제",
				tooltip:{
					select : "게시글 조회",
					update : "게시글 수정",
					delete : "게시글 삭제",
					detail : "게시글 상세",
				},
				field:{
					badTitle : "제목",
					badHit : "조회수",
					badFileCnt : "첨부파일 수",
					badWtdtm : "작성일",
					badContent : "내용",
					tagNm : "태그"
				},
				contextmenu:{
					usrBadDetail : "게시글 상세",
					usrBadUpdate : "게시글 수정",
					usrBadDelete : "게시글 삭제",
				}
			},
			cmtDatatable:{
				title : "삭제",
				tooltip:{
					delete : "댓글 삭제",
					detail : "댓글 상세",
				},
				field:{
					badCmtContent : "내용",
					badCmtDtm : "작성일"
				},
				contextmenu:{
					usrCmmBadDetail  : "게시글 상세",
					usrCmmDelete  : "댓글 삭제",
				}
			},
			signDelegateDatatable:{
				title:"Action",
				tooltip:{
					select : "대결자 목록 조회",
					insert : "대결자 정보 추가",
					update : "대결자 정보 수정",
					delete : "대결자 정보 삭제",
					detail : "대결자 정보 상세",
				},
				contextmenu:{
					signDelegateInfoUpdate: "대결자 정보 수정",
					signDelegateInfoDelete: "대결자 정보 삭제",
					signDelegateInfoDetail: "대결자 정보 상세",
				}
			},
			message :{
				alert:{
					emptyEmailStr : "이메일을 입력해주세요.",
					currentEmailStr : "현재 사용자의 이메일입니다.",
					emailDubleChkStr : "이메일 중복체크를 해주세요.",
					emptyDeptInfo : "부서 검색 버튼을 클릭하여 부서를 선택해주세요.",
					withinYearPwStr : "1년 이내 사용한 비밀번호는 사용할 수 없습니다.",
					notSingleKey : "Fn 키와 특수문자를 제외하고 단일 키 입력이 불가능합니다.",
					usedKey : "이미 사용 중인 키 조합입니다.",
					notSearch : "등록 또는 수정 중일 경우 조회할 수 없습니다.",
					selUpdateCard : "수정할 결재선을 선택해주세요.",
					inputSignLIneNm : "결재선 명을 한글, 영문, 특수문자( _ -) 30자 이내로 입력해주세요.",
					selDelSignLIne : "삭제할 결재선을 체크해주세요.",
					notMoveTap : "변경된 결재선 정보가 있습니다.<br/>저장 또는 취소 후 이동해주세요.",
					selectsignDelegateInfoCnt : "1건의 대결자 정보를 선택하세요.<br/>${1}건의 대결자 정보가 선택되었습니다." ,
				},
				confirm:{
					updateProfileStr : "사용자 프로필을 수정하시겠습니까?",
					updatePwStr :"비밀번호를 변경하시겠습니까?",
					updateKey : "정말 수정하시겠습니까?",
					delReason : "사용자(${1}) 직접 삭제",
					save : "저장하시겠습니까?",
					cancel : "취소하시겠습니까?",
					resetSignLineInfo : "결재선 정보가 최초 상태로 변경됩니다.<br/>결재선 정보를 초기화 하시겠습니까?",
					delUpdateSignLine : "수정중인 결재선을 삭제하시겠습니까?",
					delSignLine : "(${1})건의 결재선을 삭제하시겠습니까?",
				},
				content:{
					subTelno : "(-를 제외한 11자를 입력해주세요.)",
					periodically : "주기적으로 비밀번호를 변경해야 합니다. 비밀번호 사용기간 만료 시 계정이 차단되며 시스템에 로그인할 수 없습니다.",
					shortCutOneLine : "단축키는 단일키 혹은 Ctrl,Alt,Shift 버튼과 키의 조합으로 구성할 수 있습니다. ex) F2, Ctrl+F2, Ctrl + Shift + F2",
					shortCutTwoLine  : "또한 단축키는 최우선적으로 적용되므로 주로 사용하는 기본 단축키를 설정할 경우 기본 단축키는 사용할 수 없습니다.",
					shortCutTreeLine  : "단축키 입력 시 단축키 입력란을 클릭 후 사용할 단축키를 눌러주세요.",
					
				},
				//TODO
				reDeptInfo : "정확한 부서 명을 입력하거나, 부서 검색을 하여 다시 부서를 선택해주세요.",
			},
		},
		// 비밀번호 변경 팝업 - TODO 사용 확인 필요
		usr1001:{
			label:{
				currentPw : "현재 비밀번호",
				newPw : "새 비밀번호",
				newPwChk : "새 비밀번호 확인",
			},
			placeholder:{
				currentPw : "현재 비밀번호를 입력해 주세요.",
				newPw : "9자 이상 영문 대소문자,숫자,특수문자를 조합해야 합니다.",
				newPwChk : "9자 이상 영문 대소문자,숫자,특수문자를 조합해야 합니다.",
			},
			message :{
				alert : {
					notFoundUsrId : "사용자의 아이디를 조회할 수 없습니다.",
					notEquals : "새 비밀번호와 비밀번호 확인이 일치 하지 않습니다.",
					regexPwStr : "비밀번호는 9자 이상 영문 대소문자,숫자,특수문자를 조합해야 합니다.",
					withoutId : "비밀번호에는 사용자 아이디를 포함할 수 없습니다.",
					withoutEmpty : "비밀번호는 공백을 포함할 수 없습니다.",
					withoutEqualChar : "비밀번호는 같은 문자를 3번 이상 연속해서 사용하실 수 없습니다.",
					withoutLinkChar : "연속된 문자열(123 ,321, abc, cba 등)을 3자 이상 사용 할 수 없습니다.",
					dontChangePw : "비밀번호 수정을 할 수 없습니다.",
					enterPwRange : "비밀번호는 ${1}byte까지 입력이 가능합니다.",
				},
				confirm : {
					saveStr : "저장하시겠습니까?",
				},
			},
		},
		// 기타 정보 수정화면 - 사용 확인 필요
		usr1002:{
			message : {
				alert : {
					inputMaxLength : "프로젝트명은 ${1}byte까지 입력가능합니다.",
					notPrjNm : "입력된 프로젝트명이 잘못되었습니다. \n\n프로젝트 검색 창에서 정확한 프로젝트를 선택해 주세요.",
					dontUpdate : "기타정보를 수정할 수 없습니다.",
				},
				confirm : {
					saveStr : "저장하시겠습니까?",
				},
			},
		},
		// 메뉴 및 권한 관리 단축키 팝업 - F1 키 눌러 나타나는 팝업
		usr1003:{
			title:{
				main:{
					default : "단축키 설정 정보",
				},
				shortcut :"메뉴 및 권한 관리 단축키",
				shortcut01:"단축키 정보 보기",
				shortcut02:"프로젝트 및 권한 그룹 선택",
				shortcut03:"팝업창 가운데 정렬",
				shortcut04:"추가 기능바",
				shortcut05:"새로고침",
				shortcut06:"검색",
				shortcut07:"마이페이지",
				shortcut08:"메시지",
				shortcut09:"알림",
				shortcut10:"개인설정",
				shortcut11:"담당보안 티켓",
				shortcut12:"로그아웃",
			},
			label:{
				shortcutNm : "단축키 명",
				popupAction : "팝업시 동작 여부",
				shortcutKey : "단축키"
			},
			placeholder:{
				enterKey :"단축키 입력",
			},
			tooltip:{
				popupAction : "팝업시 동작 여부",
			},
		},
		// 마이페이지 - 개인 외부연결 관리 등룩, 수정 팝업
		usr1004:{
			title:{
				main :{
					default: "외부연결 정보 추가",
					update: "외부연결 정보 수정"
				}
			},
			label:{
				platformTypeCd: "플랫폼 종류",
				useCd : "사용 유무",
				webhookNm : "외부연결 명",
				webhookUrl : "외부연결 URL",
				notification : "알림 영역",
				target : "대상: ",
				code : "코드: ",
				message :"메시지: ",
			},
			placeholder :{
				webhookNm : "외부연결 명",
				webhookUrl : "외부연결 URL",
			},
			button:{
				complete :"작성 완료",
				insert: "저장하기",
				update: "수정하기",
			},
			tooltip: {
				allCheck : "전체 선택",
			},
			message:{
				alert:{
					notSelectCheckbox: "선택된 알림 영역이 없습니다."
				},
				confirm:{
					insert: "외부연결 정보를 저장하시겠습니까?",
					update: "외부연결 정보를 수정하시겠습니까?"
				}
			},
		},
		// 개인 일정 관리의 개인 일정 등록 팝업
		usr1005:{
			title:{
				main : {
					default :"개인 일정 등록",
					insert : "개인 일정 등록",
					update :"개인 일정 수정",
					request : "보안티켓 일정 정보",
					view : "일정 상세 정보",
				}
			},
			label : {
				evtNm: "일정 명",
				evtRange: "일정 일자",
				guideColor: "가이드 색상",
				evtBgColor: "일정 배경 색상",
				evtColor: "일정 글 색상",
				evtDesc: "일정 설명",
				allDay : "전일",
			},
			placeholder :{
				evtNm: "일정 명",
			},
			button:{
				complete: "완료",
				insert :"작성 완료",
				update :"수정 완료",
				delete : "삭제"
			},
			message :{
				insertString : "신규 개인 일정을 생성하시겠습니까?",
				updateString :"개인 일정을 수정하시겠습니까?",
				deleteString: "개인 일정을 삭제하시겠습니까?",
			},
		},
		//대결자 관리 목록 팝업
		usr1006:{
			
		},
		//대결자 등록/수정 팝업
		usr1007:{
			title:{
				main : {
					default : "대결자 등록",
					update : "대결자 수정"
				}
			},
			message : {
				alert:{
					selSignDelegate : "대결자를 지정해주세요." ,
					selRange : "부재 기간을 설정해주세요."
				},
			},
		},
		//대결자 상세 팝업
		usr1008:{
			title:{
				main : {
					default : "대결자 상세"
				}
			},
		},
		//대결자 목록 팝업
		usr1009:{
			title:{
				main : {
					default : "대결자 목록"
				}
			},
			signDelegateDatatable: {
				tooltip: {
					select: "대결자 목록 조회",
					detail: "대결자 정보 상세",
				}
			}
		},
		// 보안 정책 티켓 요청 관리
		req1000:{
			title:{
				main:{
					default : "보안정책 신청서 작성", //보안 정책 티켓 요청 관리
				},
				downloadExcel : "엑셀 다운로드",
			},
			button:{
				url : "URL",
			},
			tooltip:{
				urlCopy : "외부 보안 티켓 등록 URL 복사",
			},
			req1000ReqTable:{
				button:{
					xtn : "연장/회수 목록", //연장/회수 목록
					submit : "상신",
				},
				tooltip:{//보안 티켓 -> 신청서
					select : "신청서 조회", 
					insert : "신청서 등록",
					update : "신청서 수정",
					delete : "신청서 삭제",
					xtn : "연장/회수 확인 목록 조회", //연장/회수 목록 조회
					detail : "신청서 상세",
					formDownload : "신청서 양식 다운로드",
					formUpload : "신청서 일괄 등록",
					submit : "상신",
					apply :{
						apply01 : "적용 대상 아님",
						apply02 : "적용 대기",
						apply03 : "적용 성공",
						apply04 : "적용 실패",
					}
				},
				columns :{
					apply :{
						apply01 : "-",
						apply02 : "적용 대기",
						apply03 : "적용 성공",
						apply04 : "적용 실패",
					}
				},
				field:{
					/* 외부 주입 search bar 인 경우 사용 */
					prjGrpNm: "프로젝트 그룹 명",
					/*reqGrpNm: "그룹 보안 티켓 명",
					reqGrpNo : "그룹 보안 티켓 번호",
					reqDesc : "보안 티켓 내용"*/
				},
				contextmenu:{//보안 티켓 -> 신청서
					detail : "신청서 상세",
					update : "신청서 수정",
					delete : "신청서 삭제",
				}
			},
			message : {
				alert:{//보안 티켓 -> 보안정책 신청서
					update : "임시저장 상태의 보안정책 신청서만 수정 가능합니다.",
					delete : "임시저장 상태의 보안정책 신청서만 삭제 가능합니다.",
					urlClipboard : "URL이 클립보드에 복사되었습니다.",
					dontSubmit : "임시저장 상태의 신청서만 상신할 수 있습니다.",
				},
			},
		},
		// 보안 정책 티켓 관리
		req1100:{
			title:{
				main:{
					default : "보안정책 신청서 관리",
				},
			},
			button:{
				url : "URL"
			},
			label:{
				applyTxt : "적용 실패 사유",
			},
			req1100ReqTable:{
				button:{
					process : "업무처리",
					requestAccept : "접수",
					xtn : "연장/회수 확인 목록", //연장/회수 목록
					moveProject : "프로젝트 이관",
				},
				tooltip:{//보안 티켓 -> 신청서
					select : "신청서 조회",
					insert : "신청서 등록",
					update : "신청서 수정",
					delete : "신청서 삭제",
					xtn : "연장/회수 확인 목록 조회", //연장/회수 목록
					detail : "신청서 상세",
					formDownload : "신청서 양식 다운로드",
					formUpload : "신청서 일괄 등록",
					copy : "신청서 복사",
					process : "신청서 업무처리",
					requestAccept : "신청서 접수",
					moveProject : "신청서 프로젝트 이관",
					urlCopy : "외부 신청서 등록 URL 복사",
					apply :{
						apply01 : "적용 대상 아님",
						apply02 : "클릭하여 적용 여부를 지정해주세요.",
						apply02NotHandsOnWorker : "적용 대기",
						apply03 : "적용 성공",
						apply04 : "적용 실패",
					}
				},
				columns :{
					apply :{
						apply01 : "-",
						apply02 : "적용 대기",
						apply03 : "적용 성공",
						apply04 : "적용 실패",
					}
				},
				contextmenu:{
					reqAccept : "신청서 접수 처리",
					reqProcessing : "신청서 업무처리",
					reqMovePrj : "프로젝트 이관",
					reqDetail : "신청서 상세",
					reqUpdate : "신청서 수정",
					reqDelete : "신청서 삭제",
					reqCopy : "신청서 복사"
				}
			},
			message : {
				alert:{ //보안 티켓 -> 보안정책 신청서
					notUpdate :"접수 요청이거나 임시저장 상태인 보안정책 신청서만 수정 가능합니다.",
					outUsrNotUpd : "외부 사용자가 등록한 보안정책 신청서는 수정할 수 없습니다.",
					outUsrNotDel : "외부 사용자가 등록한 보안정책 신청서는 삭제할 수 없습니다.",
					canAcceptOneKindProcess:"지정된 프로세스가 동일한 보안정책 신청서만 다중 접수가 가능합니다.",
					canAcceptOneKindTpl:"동일한 분류의 보안정책 신청서만 다중 접수가 가능합니다.",
					notAuthority : {
						basic : "접근 권한이 없습니다.",
						insertMessage : "보안정책 신청서 등록 권한이 없습니다.",
						copy : "보안정책 신청서 복사 권한이 없습니다.",
						selectMessage : "보안정책 신청서 조회 권한이 없습니다.",
						updateMessage : "보안정책 신청서 수정 권한이 없습니다.",
						deleteMessage : "보안정책 신청서 삭제 권한이 없습니다.",
						list : "권한이 없는 보안정책 신청서가 있습니다.",
						accept : "보안정책 신청서 접수 권한이 없습니다.",
						process : "보안정책 신청서 처리 권한이 없습니다.",
						changeOpenDetail : "권한이 없어 상세 화면으로 표출됩니다.",
					},
					delete : "임시저장 상태의 보안정책 신청서만 삭제 가능합니다.",
					selectData : "보안정책 신청서를 선택해주세요.",
					selectDatas : "${1}건의 보안정책 신청서이 선택되었습니다.<br/>1건의 보안정책 신청서만 선택해주세요.",
					selectTooManyData : "상세 조회는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
					selectCopyData : "복사는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
					notProcessing : "처리 중인 보안정책 신청서만 업무처리가 가능합니다.",
					notSelect : "접수 가능한 보안정책 신청서가 선택되지 않았습니다.",
					notSelectChgPrj : "프로젝트 이관 가능한 보안정책 신청서가 선택되지 않았습니다.",
					removeReq :"접수 대기가 아닌 보안정책 신청서 ${1} 건을 제외했습니다.",
					urlClipboard : "URL이 클립보드에 복사되었습니다.",
				},
				confirm:{
					reqApplyTitle : "정책 적용",
					selectReqApplyType : "적용 여부를 선택하세요.",
					delSlgCon: "이상징후가 연결된 보안 티켓은 삭제 시 연결이 해제됩니다. 연결 해제 후 삭제하시겠습니까?"
				}
			}
		},
		// 결재 요청현황
		req5000:{
			title:{
				main:{
					default : "결재 요청 현황",
				}
			},
			req5000SignTable:{
				button:{
					process : "결재 처리",
					signReclaim: "결재 회수",
					signLine:"결재선",
				},
				tooltip:{
					select : "결재 요청 목록 조회",
					process : "결재 처리",
					detail : "상세 조회",
					signReclaim : "결재 회수",
					signLine: "결재선 정보 조회",
				},
				field:{
					reqDtm : "요청일"
				},
				contextmenu:{
					detail: "상세 정보",
					process: "결재 처리",
					signLine: "결재선 정보",
					signReclaim: "결재 회수",
				}
			},
			message:{
				alert:{
					notAuthority : "접근 권한이 없습니다.",
					selectOne: "1개의 데이터를 선택하세요.",
					selectOnlyOne: "${1}개가 선택되었습니다.<br/>1개의 데이터만 선택하세요.",
					nonSelect : "결재하려는 데이터를 선택해주세요.",
					notDraft: "기안 상태의 결재만 회수가능합니다.",
					signFail : "결재 실패",
				},
				confirm:{
					signReclaim: "결재 회수 하시겠습니까?"
				},
				toastr:{
					signSuccess : "결재 성공",
				},
				content:{
					nonStr:{
						signRes : "결재 의견 없음",
					},
					signRes : "결재 회수 처리",
				}
			}
		},
		// 결재 승인 관리
		req5100:{
			title:{
				main:{
					default : "결재 승인 관리"
				}
			},
			req5100SignTable:{
				button:{
					process : "업무처리",
					signApr : "승인",
					signRjt : "반려",
					signLine : "결재선",
				},
				tooltip:{
					select : "결재 조회",
					process : "결재 처리",
					detail : "상세",
					signApr : "결재 승인",
					signRjt : "결재 반려",
					signLine : "결재선 정보 조회",
				},
				contextmenu:{
					detail: "상세 정보",
					process: "결재 처리",
					signApr: "결재 승인",
					signRjt: "결재 반려",
					signLine : "결재선 정보 조회",
				}
			},
			button: {
				signApr : "승인",
				signAllApr : "전결"
			},
			message:{
				alert:{
					selectOne: "1개의 데이터를 선택하세요.",
					selectOnlyOne: "${1}개가 선택되었습니다.<br/>1개의 데이터만 선택하세요.",
					notSignType : "결재 대기 상태가 아닌 항목이 있습니다.",
					notAuthority : "접근 권한이 없습니다.",
					notSignOrd : "결재 순서가 아닌 항목이 있습니다.",
					notEnterAprRes : "결재 사유를 입력해주세요.",
					notEnterRjtRes : "반려 사유를 입력해주세요.",
					signFail : "결재 실패",
				},
				confirm:{
					signApr : "결재 승인하시겠습니까?",
					signRjt : "결재 반려를 완료하시겠습니까?",
					signAllApr : "전결 처리하시겠습니까?",
					signInAllApr : "전결 권한을 가지고 있는 결재 건이 있습니다.<br/>전결 권한을 가지고 있는 결재 건에 대해 전결처리 하시겠습니까?",
					delegateSign : "대결 권한을 가지고 있는 결재 건이 있습니다.",
				},
				toastr:{
					signSuccess : "결재 성공",
				},
				content:{
					nonStr:{
						signRes: "결재 의견 없음"
					},
				}
			}
		},
		// 결재 이력 
		req5200: {
			title:{
				main:{
					default : "결재 이력"
				}
			},
			req5200SignTable:{
				button:{
					signLine : "결재선",
					process : "업무처리",
					signApr : "승인",
					signRjt : "반려",
				},
				tooltip:{
					select : "결재 조회",
					detail : "상세",
					signLine : "결재선 정보 조회",
					process : "결재 처리",
					signApr : "결재 승인",
					signRjt : "결재 반려",
				},
				contextmenu:{
					detail: "상세 정보",
					signLine : "결재선 정보 조회",
				}
			},
			message:{
				alert:{
					selectOne: "1개의 데이터를 선택하세요.",
					selectOnlyOne: "${1}개가 선택되었습니다.<br/>1개의 데이터만 선택하세요.",
					signFail : "결재 실패",
				},
				toastr:{
					signSuccess : "결재 성공",
				},
			}
		},
		// 보안사고 신고 티켓 요청 관리
		req2000:{
			title:{
				main:{
					default : "보안사고 신고 티켓 요청 관리",
				},
				downloadExcel : "엑셀 다운로드",
			},
			req2000ReqTable:{
				button:{
					submit : "상신",
				},
				tooltip:{
					select : "보안사고 신고 티켓 조회",
					insert : "보안사고 신고 티켓 등록",
					update : "보안사고 신고 티켓 수정",
					delete : "보안사고 신고 티켓 삭제",
					detail : "보안사고 신고 티켓 상세",
					submit : "상신",
				},
				contextmenu:{
					detail : "보안사고 신고 티켓 상세",
					update : "보안사고 신고 티켓 수정",
					delete : "보안사고 신고 티켓 삭제",
				}
			},
			message : {
				alert:{
					update : "임시저장 상태의 보안사고 신고 티켓만 수정 가능합니다.",
					delete : "임시저장 상태의 보안사고 신고 티켓만 삭제 가능합니다.",
					dontSubmit : "임시저장 상태인 티켓만 상신할 수 있습니다.",
				},
				confirm:{
					submit : "티켓 상신 후 수정이 불가합니다.</br>상신하시겠습니까?",
				},
			},
		},
		// 보안사고 신고 접수
		req2100:{
			title:{
				main:{
					default : "보안사고 신고 접수",
				},
			},
			req2100ReqTable:{
				button:{
					process : "업무처리",
					requestAccept : "접수",
					xtn : "연장/회수 목록",
				},
				tooltip:{
					select : "보안사고 신고 티켓 조회",
					detail : "보안사고 신고 티켓 상세",
					copy : "보안사고 신고 티켓 복사",
					process : "보안사고 신고 티켓 업무처리",
					requestAccept : "보안사고 신고 티켓 접수",
				},
				contextmenu:{
					reqAccept : "보안사고 신고 티켓 접수 처리",
					reqProcessing : "보안사고 신고 티켓 업무 처리",
					reqDetail : "보안사고 신고 티켓 상세",
				}
			},
			message : {
				alert:{
					canAcceptOneKindProcess:"지정된 프로세스가 동일한 보안사고 신고 티켓만 다중접수가 가능합니다.",
					canAcceptOneKindTpl:"동일한 분류의 보안사고 신고 티켓만 다중접수가 가능합니다.",
					notAuthority : {
						basic : "접근 권한이 없습니다.",
						selectMessage : "보안사고 신고 티켓 조회 권한이 없습니다.",
						list : "권한이 없는 티켓이 있습니다.",
						accept : "보안사고 신고 티켓 접수 권한이 없습니다.",
						process : "보안사고 신고 티켓 처리 권한이 없습니다.",
					},
					selectData : "보안사고 신고 티켓을 선택해주세요.",
					selectDatas : "${1}건의 보안사고 신고 티켓이 선택되었습니다.<br/>1건의 보안사고 신고 티켓만 선택해주세요.",
					selectTooManyData : "상세 조회는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
					notProcessing : "처리중인 보안사고 신고 티켓만 업무처리가 가능합니다.",
					notSelect : "접수 가능한 보안사고 신고 티켓이 선택되지 않았습니다.",
					removeReq :"${1} 건의 접수 대기가 아닌 보안사고 신고 티켓을 제외했습니다.",
				},
			}
		},
		//사옥 관리
		chk1000:{
			title:{
				main:{
					default : "사옥 관리",
				},
				downloadExcel : "사옥 목록 엑셀 다운로드",
			},
			chk1000ChkTable:{
				tooltip:{
					select : "사옥 정보 조회",
					insert : "사옥 정보 등록",
					update : "사옥 정보 수정",
					delete : "사옥 정보 삭제",
					detail : "사옥 정보 상세",
				},
				contextmenu:{
					detail : "사옥 정보 상세",
					update : "사옥 정보 수정",
					delete : "사옥 정보 삭제",
				},
				field: {
					deptNm : "조직",
				}
			},
			message : {
				alert:{
				
				},
				confirm:{
					deleteOgn : "점검 계획에 포함된 사옥은 삭제할 수 없습니다.</br>사옥 정보를 삭제하시겠습니까?"
				},
			},
		},
		//사옥 등록/수정
		chk1001:{
			title:{
				main:{
					default : "사옥 등록",
					insert : "사옥 등록",
					update : "사옥 수정",
				},
			},
			label:{
				ognNm: "사옥 명",
				ognUsrNum: "상주인원 수",
				ognAddr: "주소",
				dept: "조직",
			},
			button:{
				insert: "등록",
				update: "수정",
			},
			message:{
				confirm:{
					insertString: "사옥 정보를 등록하시겠습니까?",
					updateString: "사옥 정보를 수정하시겠습니까?",
				},
			},
		},
		//사옥 상세
		chk1002:{
			title:{
				main:{
					default : "사옥 상세",
				},
			},
			label:{
				ognNm: "사옥 명",
				ognUsrNum: "상주인원 수",
				ognAddr: "주소",
				dept: "조직",
			},
		},
		//사무실 보안점검 통계
		chk1100:{
			title:{
				deptList : "조직 목록",
				allStat : "전체 통계",
				workStat : "근무지별 통계",
				caseStat : "점검 항목별 통계",
				cntStat : "적발 건수별 통계",
				planStat : "계획별 점검 결과",
				planStatList : "계획별 결과",
				voltList : "위반자 목록",
			},
			label:{
				all : "전체",
				sckNm : "계획명",
				sckStDtm : "점검계획 시작일",
				sckEdDtm : "점검계획 종료일"
			},
			chk1100ChkTable:{
				tooltip:{
					select : "통계 정보 조회",
					excel : "통계 정보 다운로드",
				},
			},
		},
		//사무실 보안점검 관리
		chk1200:{
			title:{
				main:{
					default : "사무실 보안점검 관리",
				},
			},
			label:{
				complete : "완료",
				noData : "데이터가 없습니다"
			},
			chk1200SckScheduleTable:{
				tooltip:{
					select : "보안점검 계획 목록 조회",
					insert : "보안점검 계획 등록",
					update : "보안점검 계획 수정",
					detail : "보안점검 계획 상세",
					delete : "보안점검 계획 삭제",
					manual : "보안점검 수행 매뉴얼",
				},
				field:{
					sckStDtm: "계획 시작일",
					sckEdDtm: "계획 종료일",
				},
				contextmenu:{
					detail : "보안점검 계획 상세",
					update : "보안점검 계획 수정",
					delete : "보안점검 계획 삭제",
				}
			},
			chk1200SckExecutionTable:{
				tooltip:{
					select : "보안점검 수행 목록 조회",
					insert : "보안점검 수행 정보 등록",
					update : "보안점검 수행 정보 수정",
					detail : "보안점검 수행 정보 상세",
					delete : "보안점검 수행 정보 삭제",
					execution : "보안점검 수행 시 발견된 위반사실 등록",
					review : "수행자가 등록한 위반사실을 검토하여 이의제기 요청",
					process : "제출된 이의제기 처리",
					sckTargetView : "클릭 시 점검 수행자 목록이 표출됩니다.",
				},
				field:{
					sckExctStDtm: "수행 시작일",
					sckExctEdDtm: "수행 종료일",
				},
				contextmenu:{
					detail : "보안점검 수행 정보 상세",
					update : "보안점검 수행 정보 수정",
					delete : "보안점검 수행 정보 삭제",
					execution : "보안점검 수행",
					review : "위반사항 검토",
					process : "이의제기 처리",
				}
			},
			message : {
				alert:{
					notAuthority : "권한이 없습니다.",
					notDelInfo : "삭제 가능한 정보가 없습니다.",
					selectSckScd : "보안점검 계획을 선택해주세요.",
					selectSckExct : "보안점검 수행 정보를 선택해주세요.",
					notUpdateSt : "수정 불가 상태입니다.",
					notExecutionSt : "대기 또는 수행중 상태일 경우 접근 가능합니다.",
					notReviewSt : "검토중 상태인 경우만 접근 가능합니다.",
					notProcessSt : "처리중 또는 완료 상태인 경우만<br/>접근 가능합니다.",
					cpltSckScd : "점검 완료된 계획입니다.",
				},
				selSckScd: "보안점검 계획을 선택해주세요."
			},
		},
		//사무실 보안점검 계획 등록/수정
		chk1201:{
			title:{
				main:{
					default : "보안점검 계획 등록",
					insert : "보안점검 계획 등록",
					update : "보안점검 계획 수정",
				},
				sckScdInfo : "보안 점검",
				smrAuth : "통계 권한"
			},
			label:{
				sckScdNm: "점검 계획명",
				sckDtm: "점검기간",
				chkOgn: "점검 사옥",
				smrAcsStDtm: "열람 시작일시",
				smrAcsEdDtm: "열람 종료일시",
				smrAcsTarget: "통계 열람 대상자",
			},
			placeholder:{
				sckScdNm: "점검 계획 명",
				select2 : "선택 또는 입력",
			},
			button:{
				insert: "등록",
				update: "수정",
			},
			message:{
				alert:{
					noOgn: "선택된 사옥 정보가 없습니다.",
				},
				confirm:{
					insertString: "보안점검 계획 정보를 등록하시겠습니까?",
					updateString: "보안점검 계획 정보를 수정하시겠습니까?",
					resetSmrAcsTargetList : "통계 열람 대상자 목록이 최초 상태로 변경됩니다.<br/>기존 대상자 목록으로 초기화 하시겠습니까?",
				},
			},
		},
		//사무실 보안점검 계획 상세
		chk1202:{
			title:{
				main:{
					default : "사무실 보안점검 계획 상세",
				},
			},
			label:{
				sckScdNm: "점검 계획명",
				sckDtm: "점검기간",
				chkOgn: "점검 사옥",
				smrAcsStDtm: "열람 시작일시",
				smrAcsEdDtm: "열람 종료일시",
				smrAcsTarget: "통계 열람 대상자",
			},
		},
		//사무실 보안점검 수행 정보 등록/수정
		chk1203:{
			title:{
				main:{
					default : "보안점검 수행 정보 등록",
					insert : "보안점검 수행 정보 등록",
					update : "보안점검 수행 정보 수정",
				},
				sckExct : "보안점검 수행정보"
			},
			label:{
				sckExctNm: "점검 수행명",
				sckDtm: "점검기간",
				sckOgnCnt: "점검사옥 수",
				regDtm: "등록일시",
				sckExctTarget: "점검 관리자",
				sckOgn: "점검사옥",
				sckDtm: "점검일시",
				sckExctTarget: "점검 수행자",
				attachments: "첨부파일",
			},
			placeholder:{
				sckExctDtm: "점검일시",
				select2 : "선택 또는 입력",
			},
			button:{
				insert: "등록",
				update: "수정",
			},
			message:{
				alert:{
					noSckExctTarget: "선택된 점검 수행자가 없습니다.",
				},
				confirm:{
					insertString: "보안점검 수행 정보를 등록하시겠습니까?",
					updateString: "보안점검 수행 정보를 수정하시겠습니까?",
				},
			},
		},
		//사무실 보안점검 수행 정보 상세
		chk1204:{
			title:{
				main:{
					default : "보안점검 수행 정보 상세",
				},
				sckExct : "보안점검 수행정보"
			},
			label:{
				sckExctNm: "점검 수행명",
				sckDtm: "점검기간",
				sckOgnCnt: "점검사옥 수",
				regDtm: "등록일시",
				sckExctTarget: "점검 관리자",
				sckOgn: "점검사옥",
				sckDtm: "점검일시",
				sckExctTarget: "점검 수행자",
				attachments: "첨부파일",
			},
		},
		//사무실 보안점검 위반사실 관리
		chk1205:{
			title:{
				main:{
					default : "[${1}]위반사실 관리",
				},
				execution : "수행",
				review : "검토",
				process : "처리",
			},
			label:{
				
			},
			button:{
				sckExctCplt : "수행 완료",
				sckExctCpltCancel : "수행 완료 취소",
				sckExctReviewCplt : "검토 완료",
				dplyListOnly : "중복목록만 보기",
			},
			chk1205SckEptTable:{
				label:{
					dplyInfo: "중복",
					request : "요청",
					waiting : "제출",
					complete : "완료",
					expire : "기한 만료",
					pending : "대기",
					approved : "예외 승인",
					unapproved : "예외 미승인",
				},
				tooltip:{
					select : "위반사실 목록 조회",
					insert : "위반사실 등록",
					update : "위반사실 수정",
					detail : "위반사실 상세",
					delete : "위반사실 삭제",
					dplyListOnly : "중복목록만 보기",
				},
				field:{
					eptUsrDeptNm: "위반자 조직",
				},
				contextmenu:{
					detail : "위반사실 상세",
					update : "위반사실 수정",
					delete : "위반사실 삭제",
				}
			},
			message:{
				alert:{
					notAuthority : "권한이 없습니다.",
					notDelInfo : "삭제 가능한 위반사실 정보가 없습니다.",
				},
				confirm:{
					sckExctCplt01: "보안점검 수행을 완료하시겠습니까?",
					sckExctCplt02: "보안점검 수행 완료를 취소하시겠습니까?",
					sckExctReviewCplt: "검토 완료 시 이의제기 요청이 발송됩니다.<br/>보안점검 검토를 완료하시겠습니까?",
				},
			},
		},
		//위반사실 등록 팝업
		chk1206:{
			title:{
				main:{
					default : "위반사실 등록",
					insert : "위반사실 등록",
					update : "위반사실 수정",
					copy: "위반사실 재요청",
				},
				eptInfo: "위반사실 정보",
			},
			label:{
				reqUsrId : "위반사실 안내자 ID",
				reqUsrNm : "위반사실 안내자명",
				reqDeptId : "위반사실 안내자 조직 ID",
				reqDeptNm : "위반사실 안내자 조직명",
				eptTarget : "위반자",
				eptUsrId : "위반자 ID",
				eptUsrNm : "위반자명",
				eptUsrEmail : "위반자 이메일",
				eptDeptId : "위반자 조직/소속 ID",
				eptDeptNm : "위반자 조직/소속",
				eptUsrNum : "위반자 연락처",
				limitDtm : "이의제기 기한",
				eptStDtm : "이의제기 시작일",
				eptEdDtm : "이의제기 종료일",
				ognSckDtm : "점검일",
				eptOgnNm : "근무지",
				eptOgnFlw : "층",
				ognSckDtm : "점검일",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "위반사실 안내명",
				voltItem : "위반 항목",
				desc : "위반사실 안내",
				eptStsCd : "이의제기 상태",
				attachments : "첨부 파일",
				rutEptId : "최상위 이의제기 ID",
			},
			placeholder :{
				title : "위반사실을 입력해주세요.",
				eptOgnFlw : "위반 대상자의 사옥 층 수를 입력해주세요.",
			},
			button:{
				selEptUsrBtn : "검색",
				insert : "등록",
				update : "수정",
				copy: "재요청",
				submit : "완료",
			},
			tooltip:{
				selEptUsrBtn : "위반자 검색",
			},
			message:{
				alert:{
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
					notAuthority : "권한이 없습니다.",
					notEptUsr : "위반자를 선택해주세요,",
					notVoltItem : "위반항목을 선택해주세요,",
				},
				confirm: {
					saveString: {
						insert : "이의제기 정보를 등록 하시겠습니까?",
						update : "이의제기 정보를 수정 하시겠습니까?",
						copy : "이의제기 정보를 재요청을 하시겠습니까?",
					},
				},
			}
		},
		//위반사실 상세 팝업
		chk1207:{
			title:{
				main:{
					default : "위반사실 상세",
				},
				eptInfo: "위반사실 정보",
			},
			label:{
				eptTarget : "위반자",
				eptUsrNm : "위반자명",
				limitDtm : "이의제기 기한",
				eptStDtm : "이의제기 시작일",
				eptEdDtm : "이의제기 종료일",
				eptOgnNm : "근무지",
				eptOgnFlw : "층",
				ognSckDtm : "점검일",
				eptArmCd : "상기 알림",
				eptReReqCnt : "재요청 횟수",
				title : "위반사실 안내명",
				voltItem : "위반 항목",
				desc : "위반사실 안내",
				attachments : "첨부 파일",
			},
			placeholder :{
				eptOgnFlw : "위반 대상자의 사옥 층 수를 입력해주세요.",
			},
		},
		//이의제기 처리 상세 팝업
		chk1208:{
			title:{
				main:{
					default : "위반사실 상세",
				},
				reqEptInfo: "위반사실 안내 정보",
				eptInfo: "이의제기 정보",
				eptLog: "이의제기 이력",
			},
			label:{
				reqUsrNm : "위반사실 안내자",
				eptUsrNm : "위반 대상자",
				eptDeptNm : "위반 대상자 조직",
				eptDtm : "이의제기 기한",
				eptSendCntNm : "위반 안내 회차",
				eptOgnNm : "근무지",
				eptOgnFlw : "층",
				ognSckDtm : "점검일",
				voltItem : "위반 항목",
				reqEptNm : "위반사실 안내명",
				reqEptDesc : "위반사실 안내",
				atchFile : "첨부 파일",
				eptWtDtm : "이의제기 작성일시",
				eptDesc : "이의제기 내용",
				eptAtchFile : "이의제기 첨부 파일",
			},
			button:{
				chgEptTarget : "위반자 변경",
				exctAppr : "예외 승인",
				exctNotAppr : "예외 미승인",
			},
			tooltip:{
				chgEptTarget : "위반자 변경",
				exctAppr : "예외 승인",
				exctNotAppr : "예외 미승인",
			},
			message:{
				alert:{
					noUsrId: "사용자 정보가 정확하지 않습니다.<br/>변경할 수 없습니다.",
					sameEptUsr: "기존 위반자와 동일한 사용자입니다.",
					notAuthority : "이의제기 요청 권한이 없습니다.",
				},
				confirm:{
					chgEptTarget : "위반자를 변경하시겠습니까?",
					exctAppr02 : "이의제기를 승인 하시겠습니까?",
					exctAppr03 : "이의제기를 미승인 하시겠습니까?",
				},
				submitSckEpt : "작성된 이의제기 내용이 없습니다.",
			},
		},
		//사용자 사옥 관리
		chk1300: {
			title:{
				main:{
					default : "사용자 사옥 관리",
				},
				downloadExcel : "사용자 사옥 목록 엑셀 다운로드",
			},
			chk1300ChkTable:{
				tooltip:{
					select : "사용자 사옥 정보 조회",
					update : "사용자 사옥 정보 수정",
					detail : "사용자 사옥 정보 상세",
				},
				contextmenu:{
					detail : "사용자 사옥 정보 상세",
					update : "사용자 사옥 정보 수정",
				}
			},
		},
		//사용자 사옥 수정/상세
		chk1301: {
			title : {
				main: {
					update: "사용자 사옥 정보 수정",
					detail: "사용자 정보 상세"
				}
			},
			label: {
				usrNm : "사용자명",
				deptName : "조직",
				email: "이메일",
				ognNm: "사옥",
				exWareaMailNoAddr: "주소",
			},
			message: {
				confirm: {
					update: "사용자의 사옥 정보를 수정하시겠습니까?"
				}
			}
		},
		//TODO 정확한 명칭 체크 필요
		//통합 이력 조회
		his1000:{
			title:{
				main:{
					default : "통합 이력 조회",
				}
			},
			label:{
				changeLog:{
					flow : "단계 이동",
					flowOption:{
						sign : "결재",
						signStop : "결재 반려종료",
						middleEnd : "중간종료",
						done : "최종완료",
					},
					compOption :{
						reqUsr : "요청자",
						reception : "접수자",
						reason : "반려 사유",
						nothing : "(없음)"
					},
					charger : "담당자 변경",
					chargerOption : {
						preCharger : "변경 전 담당자",
						chgCharger : "변경 후 담당자",
					},
					acceptance : "접수 승인",
					acceptOption :{
						reqUsr : "요청자",
						reception : "접수자",
						charger : "담당자"
					},
					compaion : "접수 반려",
					chgPrj:"프로젝트 이관",
					chgPrjOption:{
						reason:"프로젝트 이관 사유",
						chgPerson:"이관자",
						pre:"이관 전",
						next:"이관 후",
					}
				},
				modifyType:{
					change: "변경",
					update : "수정",
					sign : "결재 요청",
				},
				updateLog :{
					title : "수정",
					labelOption : {
						pre : "변경 전",
						next : "변경 후",
						move: "이동",
						req : "[보안 티켓]",
						item : "[기본 항목]",
						tpl: "[양식]",
						cfg: "[정보자산]",
						slgSev : "[보안서버]",
						sev : "[이상징후 수집서버]",
						slgSevPrj : "[보안서버 프로젝트 배정]",
						alertRule : "[키워드]",
						slg : "[이상징후]",
						slgReq : "[이상징후 보안 티켓 연결]",
						enter : "입력",
						check : "체크",
						unCheck : "체크 해제",
						update : "수정",
						add : "추가",
						delete : "삭제",
						nothing : "(없음)",
						
						dpl : "[배포계획]",
						reqGrp : "[그룹 보안 티켓]",
						set : "설정",
					},
					text : "(이)가 ${1}되었습니다.",
				},
				signLog :{
					request : "결재 요청",
					withdraw : "결재 회수",
					signLineInfo : "결재선 정보",
					approver : "결재자",
					accept : "결재 승인",
					middleAccept : "결재 중간 승인",
					endAccept : "결재 최종 승인",
					reject : "결재 반려",
					reason : "반려 사유",
					nothing : "(없음)"
				},
				linkLog :{
					link : "연결",
					unlink : "연결 해제",
					prev : "선행 보안 티켓",
					next : "후행 보안 티켓",
					inSlgSevPrj : "보안서버 프로젝트 배정",
					delSlgSevPrj : "보안서버 프로젝트 배정 해제",
					inSlgReq : "이상징후 보안 티켓 연결",
					delSlgReq : "이상징후 보안 티켓 연결 해제",
					inCfgReq:"정보자산 보안 티켓 연결",
					delCfgReq:"정보자산 보안 티켓 연결 해제",
					inCfgCfg:"정보자산 연결",
					delCfgCfg:"정보자산 연결 해제",
					conSubCps:'정보자산[${1}]의 [${2}]에 ${3}되었습니다.',
				},
				delLog : {
					title: "삭제",
					delSlgSev : "이상징후 서버 삭제",
					delSev : "이상징후 하위서버 삭제",
					delKwd : "키워드 삭제",
					delSlg : "이상징후 삭제",
					deleter : "삭제자"
				}
			},
			his1000LogTable:{
				tooltip:{
					detail : "이력 상세조회",
				},
				contextmenu:{
					detail : "이력 상세조회",
				}
			},
			message:{
				alert:{
					nothingUser : "사용자가 존재하지 않습니다.",
					selectData : "보안 티켓을 선택해주세요.",
					selectTooManyData : "상세 조회는 1건에 대해서만 가능합니다. 현재 ${1}건 선택되었습니다.",
				}
			}
		},
		// 일반 사용자 대시보드
		dsh1000:{
			title: {
				main:{
					default : "보안 관리자 대시보드",
				},
				reqPolicyIns : "신청서 작성",
				reqIncidentIns : "보안사고 신고",
				atvQuestion : "문의하기",
				myWork : "나의 할 일",
				lawInfo : "법률 정보",
				reqPolicySch : "규정ㆍ지침ㆍ가이드",
				infoShare : "정보 공유",
				reqPolicySituation : "신청서 현황",
				all : "전체",
				processing : "처리중",
				refusal : "반려",
				reqPolicyUse : "사용중인 정책",
				reqPolicyPeriod : "기간 임박 정책",
			},
			label:{
				dshRefresh : "${1} 후 자동 갱신",
				autoRefresh: "자동 새로고침",
			},
			tooltip:{
				refreshAll : "전체 새로고침",
			},
			message:{
				alert : {
					maxOneYear : "최대 1년까지만 조회 가능합니다.",
					max12Month : "최대 12개월까지만 조회 가능합니다.<br/><br/>예시<br/>2020-01-01 ~ 2020-12-31 (12개월)<br/>2020-06-15 ~ 2021-06-14 (13개월)<br/>",
				}
			}
		},
		// 보안 관리자 대시보드 - 소명 목록
		dsh1001:{
			title: {
				main:{
					default: "소명 목록",
				},
			},
			label: {
				request: "소명 요청",
				waiting: "소명 승인 대기",
				complete: "소명 완료",
				expire: "소명 만료",
				reject: "소명 반려",
				withdraw: "소명 회수",
			},
			req1001ReqEptTable:{
				tooltip: {
					select: "작업 정보 조회",
					detail: "작업 정보 상세 보기",
				},
				contextmenu:{
					detail : "상세 조회"
				}
			},
		},
		//사용여부 체크
		// 대시보드 위젯 칸반보드 업무처리
		dsh1003:{
			title : {
				main : "[${1}] - ${2}"
			}
		},
		//사용여부 체크
		//대시보드 위젯 칸반보드 팝업
		dsh1004:{
			title:{
				main:"${1} 스프린트 칸반 보드",
				sprintKanbanBoard:"스프린트 칸반보드"
			},
			label:{
				reqWait:"대기",
				reqDone:"완료",
				reqInProgress:"진행 중",
				status:"상태",
				restDay:"남은 일수",
				progress:"진척률",
				avgEndTime:"평균 완료 시간",
				day:"일",
				hour:"시간",
				reqType:"처리 유형별 보안 티켓",
				reqAll:"전체",
				chargeReq:"담당 보안 티켓",
				totalReq:"전체 보안 티켓",
				req:"보안 티켓",
				canProcess:"업무처리가능",
				signOngoing:"결재중",
				taskEnd:"작업 종료 가능",
				startTask : "업무 처리 가능",
				tasking:"작업 진행 중",
				chargerReq:"담당 보안 티켓",
				totalReq:"전체 보안 티켓",
				overCnt:"초과",
				aroundCnt:"임박",
				possibleCnt:"여유",
				failCnt:"실패",
				successCnt:"성공"
			},
			tooltip:{
				sign:"결재",
				returnSignCompCd:"결재 반려시 종료 유무",
				distSaveCd:"배포계획 저장 유무",
				rivisionSaveCd:"리비전 저장유무",
				midComp:"중간 종료",
				reqDone:"최종 완료",
			},
			burnUpChart:{
				title:"번업 차트",
				label:{
					idealLine:"이상적인 번업 라인",
					realLine:"실제 번업 라인",
				}
			},
			burnDownChart:{
				title:"번다운 차트",
				label:{
					idealLine:"이상적인 번다운 라인",
					realLine:"실제 번다운 라인",
				}
			},
			velocityChart:{
				title:"벨로시티 차트",
				label:{
					realSpr:"실제 스토리포인트",
					idealSpr:"이상적인 스토리포인트",
					realSpeed:"실제 속도",
					idealSpeed:"이상적인 속도",
				}
			},
			message:{
				sprTypeWaitMsg: "대기 중인 스프린트만 시작 할 수 있습니다.",
				sprTypeStartMsg: "시작 중인 스프린트만 종료 할 수 있습니다.",
				existsOngoingSpr:"시작 중인 스프린트가 존재합니다. \n 프로젝트당 스프린트는 1건만 진행가능합니다.",
				noReq:"스프린트에 배정된 보안 티켓이 0건 입니다.",
				noData:"데이터 없음",
				dragProcess:"보안 티켓 카드를 드래그하여 담당보안 티켓 업무처리가 가능합니다. 결재중인 보안 티켓은 업무처리가 불가능합니다.",
				notProcessing : "처리 중인 보안 티켓만 업무 처리가 가능합니다.",
			},
		},
		//보안 담당자 대시보드
		dsh1100:{
			title: {
				main:{
					default : "보안 담당자 대시보드",
				},
				anomaly: "이상징후 현황",
				ept: "소명",
				anomalyRisk: "위험도별 이상징후 현황",
				spreadRisk: "위험 전파율",
				secEduYn: "보안 교육 이수 여부",
				anomalyKeyword: "키워드별 이상징후 현황",
				inputUsr: "투입 인력 관리",
				secOath: "보안 서약서 현황",
				secEdu: "보안 교육 이수",
				
				anomalySign: "이상징후 결재",
				secAdminSign: "보안 행정 업무 결재",
				anomalyWork: "이상징후 업무",
				secAdminWork: "보안 행정 업무",
				
				installServer: "서버 보안 설치율",
				installTerminal: "단말 보안 설치율",
			},
			label:{
				anomalyIdx: "현재 이상징후 지수",
				low : "관심",
				middle : "주의",
				high : "경계",
				critical : "심각",
				lastChkSecRiskDtm : "기준 날짜 시각",
				eptAdmin: "소명 관리",
				eptSend: "소명 제출",
				inputAll : "전체",
				inputReq : "요청",
				inputIn : "투입",
				inputExp : "만료",
				
				//TODO
				spreadRiskDtm : "2023.03.03 기준",
				completeEdu : "이수율 : 50%",
				completeEduTime : "15.2/24시간 기준",
				
				signWaiting: "결재 대기",
				signRequest: "결재 요청",
				reqWaiting : "접수 대기",
				myEnd : "담당 완료",
				nullChargerTck: "무담당 티켓",
				myTck: "담당 티켓",
				opinion : "의견 제시",
				myWork : "담당 작업",
				installRcnt : "최신 설치",
				installBf : "이전 설치",
				installNo : "미설치",
				versionRcnt : "최신 버전",
				versionBf : "이전 버전",
				
				dshRefresh : "${1} 후 자동 갱신",
			},
			tooltip:{
				refreshAll: "전체 새로고침",
				stopAutoSelect: "자동 조회 중지",
			},
			message:{
				alert : {
					maxOneYear : "최대 1년까지만 조회 가능합니다.",
					max12Month : "최대 12개월까지만 조회 가능합니다.<br/><br/>예시<br/>2020-01-01 ~ 2020-12-31 (12개월)<br/>2020-06-15 ~ 2021-06-14 (13개월)<br/>",
				}
			},
		},
		//보안 담당자 대시보드 - 소명 목록
		dsh1101:{
			title: {
				main:{
					default : "소명 목록",
				}
			},
			label: {
				request: "소명 요청",
				waiting: "소명 승인 대기",
				complete: "소명 완료",
				expire: "소명 만료",
				reject: "소명 반려",
				withdraw: "소명 회수",
			},
			tooltip:{
				request: "소명 요청",
				waiting: "소명 승인 대기",
				complete: "소명 완료",
				expire: "소명 만료",
				reject: "소명 반려",
				withdraw: "소명 회수",
				other: "그 외",
			},
			req1001ReqEptTable:{
				button:{
					update: "답변",
					withdraw: "회수",
				},
				tooltip: {
					select: "작업 정보 조회",
					detail: "작업 정보 상세 보기",
					update: "소명 답변",
					insert: "소명 추가",
					withdraw: "작업 회수",
				},
				contextmenu:{
					detail: "상세 조회",
					withdraw: "소명 회수",
					reply: "소명 답변"
				},
			},
			message :{
				alert:{
					waiting: "소명 결재가 진행 중입니다.<br/>",
					complete: "이미 완료된 소명입니다.<br/>",
					expire: "소명 기한이 만료된 소명입니다.<br/>",
					reject: "반려된 소명입니다.<br/>",
					withdraw: "회수된 소명입니다.<br/>",
					notAdd: "소명을 등록할 수 없습니다.",
					noEptWithdraw: "회수 가능한 소명이 없습니다.",
				},
				content:{
					totalEmailCount : "총 ${1}건",
				}
			}
		},
		//보안 일반사용자 대시보드
		dsh1200:{
			title:{
				main:{
					default : "일반 사용자 대시보드",
				},
				secAdminWork: "보안 행정 업무",
			},
			label:{
				reqTckNew:"신규 신청",
				reqTckOther:"기타 보안 행정 업무 신청",
				reqTckWall:"방화벽 허용",
				reqTckMedia:"매체 사용 신청",
				reqTckHome:"재택근무 신청",
				reqTckUsb:"보안 USB 신청",
				all: "전체",
				waiting: "대기",
				progress: "진행중",
				end: "완료",
				signAdmin: "결재 관리",
				eptSend: "소명 제출",
				request:"요청 보안 티켓",
				prsSchedule:"개인 일정",
				holiday: "휴일",
				dshRefresh : "${1} 후 자동 갱신",
			},
			button:{
				insert: "일정 등록",
				locale: "ko",
				dataSelect: "일정 데이터 조회",
				fourDay: "4일",
			},
			tooltip:{
				refreshAll: "전체 새로고침",
				stopAutoSelect: "자동 조회 중지",
				holiday: "휴일",
				usr: "사용자",
				request: "요구사항",
				insert: "일정 등록",
			},
			message :{
				alert:{
					updateWriter : "등록자만 수정이 가능합니다.",
				}
			}
		},
		//커스텀 대시보드
		dsh1300:{
			title:{
				main:{
				default : "일반 사용자 대시보드",
				},
				secAdminWork: "보안 행정 업무 처리",
				mySecAdminWork : "나의 보안 행정 업무",
				currentAll : "현재 전체",
				reqStay : "접수 대기",
				processing : "처리중",
				done : "최종 완료",
				end : "종료",
				finish : "완료",
				secRiskLevel : "보안 위험 등급",
				middle : "주의",
				secWork : "보안 업무 처리",
				secWorkInfo : "보안 업무 처리 현황",
				secWorkRatio : "보안 업무 처리율",
				processRatio : "처리율",
				all : "전체",
				waiting : "대기",
				expire : "만료",
				reject : "반려",
				nullChargerTck : "무담당 티켓",
				myTck : "담당 티켓",
				secAdmin : "보안 행정",
				opinion : "의견 제시",
				myOpinion : "나의 의견",
				noReply : "미답변 의견",
				reply : "답변 의견",
				myWork : "담당 작업",
				signMg : "결재 승인 관리",
				reqSign : "결재 승인 요청",
				secEvt : "보안 이벤트",
				exp : "소명",
				reqTck : "티켓 요청",
				secLogKeyword: "보안 로그 키워드 현황",
				reqClsType : "분류",
				signWaiting : "결재 대기",
				signDone : "결재 완료",
				reqWork : "작업 요청",
				working : "진행 작업",
				endWork : "종료 작업",
			},
			label:{
				middle : "주의",
				reqWork : "작업 요청",
				working : "진행 작업",
				endWork : "종료 작업",
			},
			tooltip:{
				refreshAll: "전체 새로고침",
				stopAutoSelect: "자동 조회 중지",
				workInfoTextArea : "작업 관련 정보 텍스트란입니다.",
			},
			message :{
				alert:{
					updateWriter : "등록자만 수정이 가능합니다.",
				}
			}
		},
		//보안이벤트 서버 관리
		sec3000:{
			title : {
				main:{
					default : "보안이벤트 서버관리",
				},
				slgSevSelect : "보안이벤트 서버 조회",
				slgSevUpdate : "보안이벤트 서버 수정"
			}
		},
		//보안이벤트 이력조회
		sec3300:{
			title: {
				main:{
					default : "보안이벤트 이력조회"
				}
			},
			label:{
				enter : "입력",
				update : "수정",
				delUsr : "삭제자",
				conUsr : "연결자",
				disConUsr : "해제자",
				before : "변경 전",
				after : "변경 후",
				modify : "(이)가 ${1}되었습니다.",
				add : "추가",
				connect : "연결",
				delete : "삭제",
				disconnect : "연결 해제"
			},
			datatable:{
				tooltip: {
					select : "보안이벤트 이력 조회",
					dblClick : "보안이벤트 상세"
				}
			}
		},
		// 전체 보안사업 그룹 생성 관리 미사용 (LG+U 메뉴없음 stm1000은 권한 그룹관리에서 사용)
		/*stm1000:{
			title : {
				main:{
					default : "전체 보안사업 그룹 생성 관리"
				},
			},
			datatable:{
				title: "수정 / 삭제 / 상세",
				button :{
					trash : "폐기 목록",
					redo : "복구",
					recordDelete : "완전 삭제",
					prev : "돌아가기",
				},
				tooltip:{
					select : "보안사업 그룹 조회",
					insert  :"신규 보안사업 그룹 등록",
					update : "보안사업 그룹 수정",
					delete : "보안사업 그룹 폐기",
					trash : "보안사업 그룹 폐기 목록",
					redo : "보안사업 그룹 복구",
					recordeDelete : "보안사업 그룹 완전 삭제",
					prev : "보안사업 그룹 목록으로 이동",
					dblClick : "보안사업 그룹 상세 정보"
				},
				contextmenu: {
					prjGrpDetail: "보안사업 그룹 상세 정보",
					prjGrpUpdate: "보안사업 그룹 수정",
					prjGrpDelete : "보안사업 그룹 폐기",
					prjGrpRestore: "보안사업 그룹 복구",
					prjGrpFullDelete: "보안사업 그룹 완전 삭제"
				}
			},
			message:{
				confirm : {
					prjGrpRedo: "${1}건의 보안사업 그룹을 복구하시겠습니까?",
					prjGrpDelete: "${1}건의 보안사업 그룹을 완전 삭제하시겠습니까?<br/>삭제된 보안사업 그룹은 복구 할 수 없습니다.",
				},
			},
		},*/
		// 전체 보안사업 생성 관리 미사용 (LG+U 메뉴없음 stm1100은 권한 그룹 배정관리에서 사용)
		/*stm1100:{
			title : {
				main:{
					default : "전체 보안사업 생성 관리",
				},
				allPrjGrpList : "전체 보안사업 그룹 목록",
				prjList : "보안사업 목록",
			},
			treetable:{
				tooltip:{
					selAllPrjGrp : "전체 보안사업 그룹 조회"
				}
			},
			datatable:{
				title :"상세보기",
				button:{
					dblClick : "상세보기"
				},
				tooltip:{
					trash: "보안사업 폐기 목록 이동",
					prev : '보안사업 목록으로 이동',
					select :"보안사업 목록 조회",
					insert : "보안사업 등록",
					update :"보안사업 수정",
					disposal : "보안사업 폐기",
					redo : "보안사업 복구",
					recordDelete : "보안사업 완전 삭제",
					dblClick : "상세보기"
				},
				contextmenu:{
					projectDetail: "보안사업 상세 정보",
					projectUpdate: "보안사업 수정",
					projectDelete: "보안사업 폐기",
					prjRestore: "보안사업 복구",
					prjFullDelete: "보안사업 완전 삭제"
				}
			},
			message:{
				alert:{
					treeSelect : "트리에서 보안사업 그룹을 선택해주세요.",
					notRootSelect : "보안사업 그룹을 선택해주세요.",
					notUsePrjGrp : "사용 유무가 아니오인 보안사업 그룹의 하위에 보안사업을 생성할 수 없습니다.",
				},
				confirm:{
					prjRedo: "${1}건의 보안사업을 복구하시겠습니까?",
					prjDelete: "${1}건의 보안사업을 완전 삭제하시겠습니까?<br/>삭제된 보안사업은 복구 할 수 없습니다."
				}
			},
		},*/
		//특수 권한 관리 
		stm1200 : {
			title:{
				main:{
					default : "특수 권한 관리"
				},
			},
			stm1200SpcAuthTable : {
				tooltip : {
					select : "특수권한 목록 조회",
					insert : "특수권한 등록",
					update : "특수권한 수정",
					delete : "특수권한 삭제",
					detail : "특수권한 목록 상세",
					chargerView : "클릭 시 담당자 목록이 표출됩니다.",
					spcAuthRevoke: "특수 권한 회수",
				},
				button : {
					spcAuthRevoke : "특수 권한 회수",
				},
			},
			message : {
				confirm : {
					updateRevoke : "회수로 변경 시 수정 삭제가 불가하고, 알림 발송되지 않습니다.<br/>그래도 회수하시겠습니까?",
				},
				alert : {
					cantRevoke :"회수된 특수권한은 회수가 불가합니다.",
					cantUpdate : "회수된 특수권한은 수정이 불가합니다.",
					cantDelete : "회수된 특수권한은 삭제가 불가합니다.",
				},
				toastr : {
					cantExpDelete : "삭제 불가한 ${1}건 제외 후 삭제되었습니다.",
					cantSpcAuthRevoke : "회수 불가한 ${1}건 제외 후 회수되었습니다.",
				},
				authSultChkEndDesc : "[${1}]적정성 점검 결과 회수",
			}
		},
		//특수 권한 관리 등록/수정
		stm1201 : {
			title:{
				main:{
					default : "특수 권한 관리",
					insert : "특수권한 등록",
					update : "특수권한 수정",
				},
			},
			placeholder : {
				spcAuthNm : "특수권한명",
				referenceSysNm : "관련 시스템",
				spcAuthUsrNm : "처리자 명",
				selectList : "입력 후 엔터 키를 입력해주세요.",
			},
			label : {
				spcAuthGrpNm : "특수권한명",
				referencdSysNm : "관련 시스템",
				agreementDesc : "협의 내용",
				spcAuthDesc: "특수권한 내용",
				spcAuthTagetUsrList : "권한 부여 대상자",
				spcAuthUsr : "처리자",
				spcAuthKeep : "권한 유지",
				spcAuthGrentDtm: "권한 부여 일자",
				spcAuthRevokeDtm :"권한 회수 일자",
				spcAuthStartDtm : "권한 사용 시작 일자",
				spcAuthEndDtm : "권한 사용 종료 일자",
			},
			button : {
				add : "권한 부여 대상자 지정",
			},
			message : {
				confirm :  {
					insert : "특수권한을 등록하시겠습니까?",
					update : "특수권한을 수정하시겠습니까?",
					resetCharge : "권한 부여 대상자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
				},
				alert : {
					noAuthUsrId : "처리자를 검색하여 지정해주세요.",
					reset : "권한 부여 대상자 목록이 초기화 되었습니다.",
				},
				content : {
					sultCycle : "적정성 점검 주기는 1년 주기입니다.",
					noUpdateArm : "적정성 점검 시 회수한 경우 수정 삭제가 불가하고, 알림이 발송되지 않습니다.",
					authRevokeAutoDtm : "적정성 점검 회수 시 권한 회수 일자가 자동으로 입력됩니다.",
				},
			},
			tooltip: {
				reset : "권한 부여 대상자 초기화",
			}
		},
		//특수 권한 관리 등록/수정
		stm1202 : {
			title:{
				main:{
					default : "특수권한 상세보기",
					spcAuthsult : "권한 적정성 점검 현황 내역",
					spcAuthHis : "특수권한 변경 이력",
				},
			},
			label : {
				spcAuthGrpNm : "특수권한명",
				referencdSysNm : "관련 시스템",
				agreementDesc : "협의 내용",
				spcAuthDesc: "특수권한 내용",
				spcAuthTagetUsrList : "권한 부여 대상자",
				spcAuthUsr : "처리자",
				spcAuthKeep : "권한 유지",
				spcAuthGrentDtm: "권한 부여 일자",
				spcAuthRevokeDtm :"권한 회수 일자",
				spcAuthStartDtm : "권한 사용 시작 일자",
				spcAuthEndDtm : "권한 사용 종료 일자",
			},
			button : {
				spcAuthSultEnd : "회수",
				spcAuthSultFit : "유지",
			},
			message : {
				confirm :  {
					updateRevoke : "회수로 변경 시 수정 삭제가 불가하고, 알림 발송되지 않습니다.<br/>그래도 회수하시겠습니까?",
					updateSultKeep : "특수권한을 유지하시겠습니까?",
				},
				alert : {},
				authSultChkFitDesc : "[${1}]적정성 점검 결과 유지",
				authSultChkEndDesc : "[${1}]적정성 점검 결과 회수",
			}
		},
		/*// 전체 사용자 배정 관리
		stm1200:{
			title:{
				main:{
					default : "전체 사용자 관리",
				},
				allAuthGrpList : "모든 권한 그룹 목록",
				assignUsrList : "배정 사용자 목록",
				unassignUsrList : "미 배정 사용자 목록",
			},
			treetable :{
				tooltip :{
					selAuthGrp : "전체 권한 그룹 조회",
				}
			},
			assDatatable:{
				title :"제외",
				button:{
					excludeAssign : "배정 제외",
				},
				tooltip:{
					select :"배정 사용자 조회",
					excludeAssign : "선택 사용자 배정 제외",
					dblClick :"사용자 배정 제외"
				},
				field:{
					usrId : "사용자 ID",
				},
				contextmenu:{
					userInfo: "사용자 정보",
					userDelete: "배정 해제"
				}
			},
			nonAssDatatable:{
				title :"배정",
				button:{
					registerAssign : "배정 등록",
				},
				tooltip :{
					select : "미 배정 사용자 조회",
					registerAssign :"선택 사용자 배정 등록",
					dblClick : "배정"
				},
				field:{
					usrId : "사용자 ID",
				},
				contextmenu:{
					userInfo: "사용자 정보",
					userInsert: "배정"
				}
			},
		},*/
		// 시스템 메뉴 관리
		stm2000:{
			title:{
				main:{
					default: "시스템 메뉴 관리",
				},
				menu: "메뉴 목록",
				info: "메뉴 정보",
			},
			label:{
				upMenuId : "상위 메뉴 ID",
				upMenuNm :"상위 메뉴 명",
				menuId : "메뉴 ID",
				menuNm : "메뉴 명",
				menuPath : "메뉴 경로",
				menuUrl : "메뉴 URL",
				menuImgUrl : "메뉴 이미지 URL",
				menuIcon : "메뉴 아이콘",
				menuType : "메뉴 타입",
				menuLvl : "메뉴 레벨",
				menuOrd :"순번",
				menuUseCd : "사용 유무",
				prjType : "프로젝트 유형",
				mobileUseCd : "모바일 사용 유무",
				menuDesc : "메뉴 설명"
			},
			placeholder:{
				upMenuId : "상위 메뉴 ID",
				upMenuNm :"상위 메뉴 명",
				menuId : "메뉴 ID",
				menuNm : "메뉴 명",
				menuPath : "메뉴 경로",
				menuUrl : "메뉴 URL",
				menuImgUrl : "메뉴 이미지 URL",
				menuIcon : "메뉴 아이콘",
				menuType : "메뉴 타입",
				menuLvl : "메뉴 레벨",
				menuOrd :"순번",
				menuUseCd : "사용 유무",
				prjType : "프로젝트 유형",
				mobileUseCd : "모바일 사용 유무",
				menuDesc : "메뉴 설명"
			},
			stm2000MenuTree :{
				tooltip:{
					select : "메뉴 조회",
					add : "메뉴 추가",
					update : "메뉴 수정",
					delete : "메뉴 삭제",
				}
			},
			message:{
				alert:{
					selMenu : "메뉴를 선택해주세요.",
					overMenuLvl :"${1}레벨 이상 메뉴를 추가할 수 없습니다.",
					insNotUsedMenu :"미사용 메뉴에서는 하위 메뉴를 추가할 수 없습니다.",
					selUpdMenu : "수정할 메뉴를 선택해주세요.",
					selDelMenu : "삭제할 메뉴를 선택해주세요.",
					notDelTopMenu :"최상위 메뉴(root)는 삭제할 수 없습니다.",
					notDelHasMenu : "하위 메뉴가 존재하기때문에 삭제할 수 없습니다.<br/>하위메뉴를 먼저 삭제해주세요.",
					usedBoard : "게시판으로 사용된 메뉴입니다. (전체 게시글 수 : ${1})",
				},
				confirm:{
					delMessage :"메뉴 정보 삭제는 시스템에 중대한 영향을 미칠 수 있습니다.<br/>선택한 메뉴를 삭제 하시겠습니까?",
				},
			}
		},
		// 시스템 메뉴 등록, 수정 팝업
		stm2001:{
			title :{
				main :{
					default : "신규 메뉴 등록",
					update : "메뉴 수정"
				}
			},
			label:{
				upMenuId : "상위 메뉴 ID",
				upMenuNm :"상위 메뉴 명",
				menuId : "메뉴 ID",
				menuNm : "메뉴 명",
				menuPath : "메뉴 경로",
				menuUrl : "메뉴 URL",
				menuImgUrl : "메뉴 이미지 URL",
				menuIcon : "메뉴 아이콘",
				menuType : "메뉴 타입",
				boardSet : "게시판 설정",
				menuLvl : "메뉴 레벨",
				menuOrd :"순번",
				menuUseCd : "사용 유무",
				prjType : "프로젝트 유형",
				mobileUseCd : "모바일 사용 유무",
				menuEct : "비고",
				menuDesc : "메뉴 설명",
				menuAdm : "메뉴 관리자",
			},
			placeholder:{
				upMenuId : "상위 메뉴 ID",
				upMenuNm :"상위 메뉴 명",
				menuId : "메뉴 ID는 자동 생성됩니다.",
				menuNm : "메뉴 명",
				menuPath : "메뉴 경로",
				menuUrl : "메뉴 URL",
				menuImgUrl : "메뉴 이미지 URL",
				menuIcon : "메뉴 아이콘",
				menuLvl : "메뉴 레벨",
				menuOrd :"순번",
				menuDesc : "메뉴 설명",
			},
			button:{
				add : "추가",
				insert : "작성 완료",
				update : "수정 완료",
				addReplyUsr : "대상자 지정",
				reset : "초기화",
			},
			message:{
				alert:{
					beforeBoardRestore : "이전에 게시판으로 사용되었던 메뉴입니다.<br/>이전 게시판 속성으로 복원됩니다.",
					beforeBoardCurrent : "이전에 게시판으로 사용되었던 메뉴입니다.<br/>현재 설정한 게시판 속성으로 복원됩니다.",
					setBoard : "게시판 속성을 설정하세요.",
				},
				confirm:{
					insertString: "신규 메뉴를 등록하시겠습니까?",
					updateString: "메뉴 정보 수정은 시스템에 중대한 영향을 미칠 수 있습니다. 메뉴 정보를 수정하시겠습니까?",
					resetCharge: "메뉴 관리자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
				},
				content : {
					beforeBoard : "게시판으로 사용된 메뉴입니다. (전체 게시글 수 : ${1})",
				},
			}
		},
		// 시스템 게시판 관리 stm2100
		stm2100:{
			title:{
				main: {
					default : "시스템 게시판 관리",
				},
			},
			label:{
				stmDsType: "공개 범위",
				stmDsTypeNm: {
					"01": "시스템 게시판",
					"02" : "프로젝트 그룹",
					"03" : "프로젝트"
				},
				summary : "통계 (30일)",
				use: "사용",
				notUse : "사용 안함",
				comment : "댓글",
				board : "게시글",
				attachFile : "첨부파일",
				charger : "담당자",
				chargerList : "담당자 목록",
				type:{
					"01":"[일반]",
					"02":"[자료실]",
					"03":"[갤러리]",
					"04":"[영상]",
				},
				count:{
					cmtAllCnt: "전체 수",
					cmtMaxInfo: "최다 수",
					badAllCntY: {
						create : "전체 수",
						valid : "유효한 수",
						delete : "삭제 수",
					},
					badAllCnt: "전체 게시글 수",
					badHitInfo: "최다 조회 수",
					badPwCnt: "비밀글 수",
					fileAllCnt: "전체 수",
					fileAllSize: "전체 크기",
				},
			},
			stm2100StmTable:{
				title : "수정 / 관리 / 통계",
				button:{
					detail:"관리",
					summary:"통계",
				},
				tooltip:{
					select:"게시판 조회",
					update :"게시판 속성 수정",
					detail:"게시글 관리",
					summary:"게시판 통계",
				},
				field:{
					stmTypeNm: "유형",
					stmNm: "게시판 명",
					stmDsTypeNm: "공개 범위",
					cnt: "전체글 수",
					badCnt: "유효글 수",
					delCnt: "삭제글 수",
				},
				contextmenu:{
					update : "게시판 속성 수정",
					detail : "게시판 관리",
					summary : "게시판 통계"
				}
			},
			stm2102BadSummaryChart:{
				legend:{
					newPost : "등록 게시글",
					deletePost : "삭제 게시글",
				},
			},
			message:{
				alert:{
					notAuthority : "해당 게시판에 대한 권한이 없습니다.",
					selectStmInfoCnt : "1건의 게시판만 선택하세요.<br/>${1}건의 게시판이 선택되었습니다." ,
				},
			},
		},
		// 시스템 게시판 옵션 관리 팝업
		stm2101:{
			title :{
				main: {
					default : "게시판 옵션 설정",
				},
			},
			label:{
				name: "게시판 명",
				type : "유형",
				dsType : "게시물 공개 범위",
				option : "옵션",
				noticeCheck : "공지사항 사용",
				commentCheck : "댓글 사용",
				secretCheck : "비밀글 사용",
				attachFileCheck : "첨부파일 사용",
				tagCheck : "태그 사용",
				thumbnailCheck : "썸네일 사용",
				ntcPopupCnt : "공지 팝업 개수",
				maxNtcPopupCnt : "최대 개수 : 5",
				fileCount : "첨부파일 개수",
				maxFileCnt : "최대 개수 : 10",
				limitFileStrg : "첨부파일 용량 제한(MB)",
				maxFileStrg:{
					basic : "최대 용량 : [자료실] 4GB(4096MB) [영상] 2GB(2048MB) [일반/갤러리] 500MB",
					normal: "최대 500MB",
					movie: "최대 2048MB(2GB)",
					storage: "최대 4096MB(4GB)"
				},
				charger : "담당자",
				nothing : "미 배정 권한 그룹 및 사용자",
				user : "사용자",
				authGrp : "권한 그룹",
				admin: "담당자 지정",
				writer: "글 작성 범위 지정",
			},
			placeholder:{
				maxFileCnt :"최대 10개 파일",
				limitFileStrg : "최대 용량(합)",
			},
			regex : {
				maxFileCnt :"최대 숫자 10",
				limitFileStrg : "최대 용량 : [자료실] 4GB(4096MB) [영상] 2GB(2048MB) [일반/갤러리] 500MB",
			},
			button : {
				equals : "담당자 동일",
				insert : "설정 완료",
				update : "수정 완료",
			},
			tooltip:{
				equals : "담당자 동일",
			},
			message:{
				confirm:{
					update: "게시판 정보를 수정하시겠습니까?",
				},
				content:{
					equalsMenuNm : "메뉴명과 동일하게 설정됩니다.",
				},
				formCheck:{
					fileOptionMessage : "해당 게시판 유형은 첨부파일이 필수입니다.",
					noticePopupCnt : "공지팝업 개수는 ${1} ~ ${2}까지 가능합니다.",
					fileCntMessage : "첨부파일 개수는 최소 1부터 10까지 가능합니다<br/> 첨부파일 갯수를 최솟값인 1로 변경합니다.",
					fileMaxCntMessage : "첨부파일 가능한 개수를 초과합니다. <br/> 최대 수로 적용됩니다.",
					fileMaxStrgMessage : "게시판 유형에 따라<br/> 최대 첨부파일 용량으로 지정됩니다.",
					fileMaxStrgOutMessage : "최대 첨부파일 용량을 초과합니다<br/> 최대용량(${1})으로 변경됩니다.",
				},
			}
		},
		// 시스템 게시판 관리 - 통계 팝업
		stm2102:{
			title:{
				main: {
					default : "[ ${1} ] 통계보기",
				},
				type:{
					normal:"[일반]",
					gallery:"[갤러리]",
					movie:"[영상]",
					storage:"[자료실]",
				},
			},
			label:{
				notice : "공지사항",
				comment : "댓글",
				board : "게시글",
				tag : "태그",
				attachFile : "첨부파일",
				noticeCnt: "공지사항 수 : ",
				ntcCurrent: "최신 공지일 : ",
				cmtAllCnt: "전체 댓글 수 : ",
				cmtMaxCnt: "최다 댓글 수 : ",
				badAllInsertCnt : "전체 등록 게시글 수 : ",
				badAllDeleteCnt : "전체 삭제 게시글 수 : ",
				badAllCnt : "전체 게시글 수 : ",
				badHitCnt : "최다 조회 수 : ",
				badPwCnt : "비밀글 수 : ",
				tagLabelY: "사용 TOP ${1} : # ${2}",
				tagLabelN: "사용 태그 없음",
				fileAllCnt : "전체 첨부파일 수 : ",
				fileAllSizeCnt : "전체 첨부파일 크기 : ",
				sizeAny : "${1}",
				sizeCase : "${1} 건",
				sizeTime : "${1} 회",
				sizeNothing : "없음",
				
				/*
				noticeCntY: "공지사항 수 : ${1} 건",
				noticeCntN: "공지사항 수 : 없음",
				ntcCurrentY: "최신 공지일 : ${1}",
				ntcCurrentN: "최신 공지일 : 없음",
				
				cmtAllCntY: "전체 댓글 수 : ${1} 건",
				cmtAllCntN: "전체 댓글 수 : 없음",
				cmtMaxInfoY: "최다 댓글 수 : ${1} 건",
				cmtMaxInfoN: "최다 댓글 수 : 없음",
				
				badAllCntY: {
					create : "전체 등록 게시글 수 : ${1} 건",
					delete : "전체 삭제 게시글 수 : ${1} 건",
				},
				badAllCntN: "전체 게시글 수 : 없음",
				
				badHitInfoY: "최다 조회 수 : ${1} 회",
				badHitInfoN: "최다 조회 수 : 없음",
				
				badPwCntY: "비밀글 수 : ${1} 건",
				badPwCntN: "비밀글 수 : 없음",
				
				tagLabelY: "사용 TOP ${1} : # ${2}",
				tagLabelN: "사용 태그 없음",
				
				fileAllCntY: "전체 첨부파일 수 : ${1} 건",
				fileAllCntN: "전체 첨부파일 수 : 없음",
				fileAllSizeY: "전체 첨부파일 크기 : ${1}",
				fileAllSizeN: "전체 첨부파일 크기 : 없음",
				 */
			},
		},
		// 시스템 권한 그룹 관리
		stm2200:{
			title:{
				main :{
					default : "시스템 권한 그룹",
				},
				authGrpList : "시스템 권한 그룹 ",
				authList : "시스템 메뉴 권한",
			},
			label:{
				topMenuNm : "대 메뉴 명",
				menuNm : "중 메뉴 명 > 소 메뉴 명",
				allCheck : "전체 선택",
			},
			tooltip:{
				save : "메뉴 권한 저장",
				allCheck : "전체 선택",
			},
			stm2200AuthTable:{
				tooltip:{
					select : "시스템 권한 그룹 조회",
					add : "시스템 권한 그룹 추가",
					update : "시스템 권한 그룹 수정",
					delete : "시스템 권한 그룹 삭제",
					click  : "시스템 메뉴 권한 조회",
					detail : "시스템 권한 그룹 상세 보기"
				},
			},
			message :{
				alert:{
					notDelete : "${1} 권한은 관리자 필수 권한입니다.<br/>삭제 할 수 없습니다.",
					noDelAuthMsg : "기본 권한 배정이 되는 권한그룹이 있습니다.<br/>기본 권한을 해제 후 권한그룹을 삭제바랍니다.",
				},
				confirm:{
					save : "시스템 메뉴 권한을 저장하시겠습니까?",
					disConMain : "메인화면으로 지정되있는 화면의 접근권한을 해제시 메인화면으로 지정상태가 해제됩니다. 계속 진행하시겠습니까?",
					
				},
			}
		},
		// 시스템 권한 그룹 등록, 수정, 상세 팝업
		stm2201:{
			title:{
				main:{
					default : "신규 시스템 권한 그룹 등록",
					update : "시스템 권한 그룹 수정",
					view : "시스템 권한 그룹 상세보기",
				}
			},
			label : {
				authGrpNm: "권한 그룹 명",
				ord: "순번",
				usrType: "사용자 유형",
				acceptUseCd: "접수권한 사용 유무",
				useCd: "사용 유무",
				authGrpDesc: "비고",
				authSet : "권한 설정",
				defaultAuthCd:"기본 권한 배정"
			},
			placeholder:{
				authGrpNm: "권한 그룹 명",
				ord: "순번",
				authGrpDesc: "비고",
			},
			button:{
				insert : "등록 완료",
				update :"수정 완료",
			},
			message :{
				confirm:{
					insertString :"기본 권한 배정이 예인 경우 이전 기본 권한 배정이 예인 권한그룹은 아니오로 변경됩니다.<br/>시스템 권한 그룹을 등록하시겠습니까?",
					updateString :"기본 권한 배정이 예인 경우 이전 기본 권한 배정이 예인 권한그룹은 아니오로 변경됩니다.<br/>시스템 권한 그룹을  수정하시겠습니까?",
				},
				content : {
					acceptUse : "접수 권한을 활성화 시킬 경우 업무 화면 <br/>접근을 활성화해야 합니다.",
					acceptMenu : "대시보드>운영 대시 보드>대시보드(운영) 또는 대시보드>개발 대시 보드>대시보드(개발)"
				},
				alert : {
					failUpdate:"기본권한배정된 권한그룹은 최소 1개 이상 존재해야 합니다.",
				}
			},
			tooltip : {
				defualtAuthMsg  : "프로젝트 생성 후 사용자 등록 시 기본이 되는 권한 그룹을 지정합니다."
			}
		},
		// 사용자 관리
		stm3000:{
			title :{
				main:{
					default : "사용자 관리",
				},
			},
			datatable :{
				title : "수정 / 삭제 / 상세",
				tooltip :{
					selectUser:"사용자 목록 조회",
					insertUser:"사용자 추가",
					updateUser:"사용자 수정",
					deleteUser:"사용자 삭제",
					detailUser:"사용자 상세보기",
					formDownload:"사용자 양식 다운로드",
					formUpload:"사용자 양식 업로드",
					excel : "사용자 목록 엑셀",
					print : "화면 프린트",
				},
				contextmenu:{
					userDetail: "사용자 상세 정보",
					userUpdate: "사용자 수정",
					userDelete: "사용자 삭제"
				}
			},
			message:{
				alert : {
					notDeleteLicUser:"라이선스 최초 등록자는 삭제가 불가능합니다.",
					isNotPotalId : "연동 계정은 삭제할 수 없습니다."
				},
				confirm : {
					deleteUsr:"사용자 삭제 시 해당 사용자가 담당자로 지정된 프로젝트와 프로젝트 그룹과 배정된 프로젝트가 모두 해제됩니다. 삭제하시겠습니까?",
				},
				content : {
					licUser:"* 라이선스 최초 등록자 : ",
				},
			},
		},
		// 사용자 등록,수정 팝업
		stm3001:{
			title:{
				main :{
					default : "사용자 등록",
					update : "사용자 수정",
				},
			},
			label:{
				usrId:"아이디",
				usrNm:"이름",
				usrPw:"비밀번호",
				reUsrPw:"비밀번호 확인",
				telno:"연락처",
				email:"이메일",
				usrPosition:"직급",
				usrDuty:"직책",
				deptName:"부서",
				searchDept:"부서 검색",
				use:"사용 유무",
				block:"차단 유무",
				blkLog:"차단 로그",
				etc:"비고",
				deptLeader:"부서장 여부",
				exWareaMailNoAddr: "주소",
				admPortalAuthNm: "보안포탈 관리 계정 여부",
				accPerIp: "접속 허용 IP"
			},
			placeholder:{
				usrId:"아이디",
				usrNm:"이름",
				usrPw : "비밀번호",
				reUsrPw : "비밀번호 확인",
				emptyMaintainPw:"공백인 경우 기존 비밀번호가 사용됩니다.",
				telno :"연락처",
				email:"이메일",
				searchDeptOne:"검색결과가 1건일 경우 자동 세팅됩니다.",
				exWareaMailNoAddr: "주소"
			},
			regex : {
				usrId:"영문 소문자, 숫자, _-",
				usrNm:"한글,영문,숫자,특수문자( _ -)만 입력가능",
				usrPw : "영문 ,숫자,특수문자(!@#$%&*?) 필수 포함",
				reUsrPw : "영문 ,숫자,특수문자(!@#$%&*?) 필수 포함",
				telno :"숫자만 입력가능",
				accPerIp : "아이피 주소만 입력가능(다건 입력시 , 구분)",
			},
			button : {
				resetImage : "되돌리기",
				duplCheck:"중복확인",
				initPw:"초기화",
				searchDept:"부서 검색",
				complete :"완료",
				insertUser:"작성 완료",
				updateUser:"수정 완료",
			},
			tooltip:{
				userImage:"사용자 이미지",
				findImageFile:"이미지 찾기",
				deleteImage:"이미지 삭제",
				resetImage:"기존 이미지로 되돌리기",
			},
			message:{
				alert:{
					enterId:"아이디를 입력해주세요.",
					enterEmail:"이메일을 입력해주세요.",
					currentEmail:"현재 사용자의 이메일입니다.",
					initPasswordAfter:"초기화 후 비밀번호는 사용자 아이디이며, <br/>로그인하여 비밀번호를 재설정해야 합니다.",
					notLogin:"님은 3개월 이상 미 접속으로 차단되었습니다.",
					blockChange:"차단 유무를 [정상]으로 변경시 로그인 할 수 있습니다.",
					idDuplCheck:"아이디 중복체크를 해주세요.",
					newIdDuplCheck:"새로 입력한 아이디를 중복체크 해주세요.",
					emailDuplCheck:"이메일 중복체크를 해주세요.",
					newEmailDupl:"새로 입력한 이메일을 중복체크 해주세요.",
					withinYearPw:"1년이내 사용한 비밀번호는 사용할 수 없습니다.",
					emptyDeptInfo:"부서 검색 버튼을 클릭하여 부서를 선택해주세요."
				},
				confirm:{
					insertUser:"신규 사용자를 등록하시겠습니까?",
					updateUser:"사용자 정보를 수정하시겠습니까?",
					passwordInit:"비밀번호 초기화 진행 시 현재 입력중인 정보가 저장되지 않습니다. <br/>계속 진행하시겠습니까?"
				},
				words:{
					warningUnconnected:"3개월 이상 미 접속한 사용자입니다. 차단 유무를 [정상]으로 수정 시 로그인 가능합니다.",
					accurateDeptNameInput:"정확한 부서 명을 입력하거나, 부서 검색을 하여 다시 부서를 선택해주세요.",
					originalDeptName:"(원본 : ${1})",
					firstLicenseUser:"최초 라이선스 등록자는 사용 유무를 변경할 수 없습니다.",
				}
			}
		},
		// 사용자 정보 상세 팝업
		stm3002:{
			title :{
				main:{
					default : "사용자 상세정보"
				},
			},
			label:{
				usrId:"아이디",
				usrNm:"이름",
				telno:"연락처",
				email:"이메일",
				usrPosition:"직급",
				usrDuty:"직책",
				deptName:"부서",
				use:"사용 유무",
				block:"차단 유무",
				blkLog:"차단 로그",
				etc:"비고",
				deptLeader:"부서장 여부",
				exWareaMailNoAddr: "주소",
				admPortalAuthNm: "보안포탈 관리 계정 여부",
				accPerIp: "접속 허용 IP"
			},
			tooltip:{
				userImage:"사용자 이미지",
			}
		},
		// 사용자 일괄 등록
		stm3003:{
			title:{
				main:{
					default : "사용자 일괄 등록",
				},
				errorMessage:"에러 메세지"
			},
			placeholder :{
				notFile :"파일이 없습니다.",
			},
			button :{
				save:"저장",
			},
			datatable :{
				button :{
					fileChoose:"파일 선택",
					upload:"업로드", 
					check:"데이터 확인",
					rowInsert:"행 추가",
					delete:"행 제거",
					reset:"초기화",
				},
				tooltip:{
					upload:"파일 업로드", 
					check:"데이터 확인",
					rowInsert:"행 추가",
					delete:"선택 정보 제거",
					reset:"입력 초기화",
				}
			},
			message:{
				alert : {
					selectFile:"업로드할 파일을 선택해주세요.",
					invalidFile:"유효하지 않은 첨부파일입니다.",
					alreadyInsertFile:"이미 업로드한 파일입니다.",
					isEmpty: "필수값 입력을 완료해주세요.",
					noData:"데이터 확인을 위한 업로드 데이터가 없습니다.",
					isNotChecked:"데이터 확인을 진행해주세요.",
					cantRead:"업로드 할 수 없는 내용이 포함 되어있습니다.(빈 값 혹은 잘못된 값)",
				},
				confirm : {
					reset:"입력중인 정보를 초기화 하시겠습니까?",
				},
				loading:{
					dataCheck:"데이터 정보를 확인하는 중입니다.<br/>잠시만 기다려주세요.",
					readData:"엑셀 데이터를 읽어오는 중입니다.<br/>잠시만 기다려주세요.",
				},
				dataCheck:{
					duplicateUsrId:"사용자 아이디 ${1}(은)는 중복 아이디 입니다.\n",
					notExistDeptId:"소속 ID ${1}(은)는 등록되지 않은 소속입니다.\n",
					duplicateEmail:"이메일 ID ${1}(은)는 중복된 이메일입니다.\n",
				},
				validate:{
					usrIdFormat:"행 아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.\n",
					usrIdSize:"행 사용자 아이디 글자 수가 최대치(20Byte)를 초과했습니다.\n",
					duplicateUsrId:"행  중복된 아이디입니다.\n",
					essentialUsrId:"행  사용자 아이디는 필수 입력값 입니다.\n",
					nameSize:"행  성명 글자 수가 최대치(200Byte)를 초과했습니다.\n",
					nameFormat:"행  이름은 한글, 영문, 숫자, 특수문자( _ -) 만 입력가능합니다.\n",
					telnoSize:"행  연락처 4~14자리로 입력해야 합니다. \n",
					telnoFormat:"행  연락처 4~14자리 숫자, 하이픈(-)만 사용가능합니다. (예) 01011254476, 010-5496-2254 \n",
					telnoRequired:"행  연락처는 필수 입력값 입니다.\n",
					emailSize:"행  이메일 글자 수가 최대치(50Byte)를 초과했습니다.\n",
					emailFormat:"행  이메일 형식이 맞지 않습니다. 예) mymail@gmail.com \n",
					duplicateEmail:"행  중복된 이메일입니다.\n",
					emailRequired:"행  이메일은 필수 입력값 입니다.\n",
					deptIdLength:"행  소속의 조직코드 값은 16자리 입니다.\n",
					deptIdFormat:"행  소속의 조직코드 값은 DPT로 시작해야 합니다.\n",
					deptIdNumber:"행  소속의 조직코드 형식이 맞지 않습니다. 예) DPT2018080900012 \n",
					deptIdRequired:"행  소속은 필수 입력값 입니다.\n",
					etcSize:"행  비고 글자 수가 최대치(4000Byte)를 초과했습니다.\n",
				},
				describe:{
					row1:"* 사용 방법",
					row2:"- 엑셀파일은 두개의 시트가 필요합니다. 업로드할 사용자 정보는 두번째 시트에 입력해야 합니다.",
					row3:"- 연락처는 숫자로 이루어져야 합니다.",
					row4:"- 아이디는 영문 + 숫자 조합으로 이루어져야 합니다 (5~20자의 영문 소문자, 숫자와 특수기호 _(언더바), -(하이픈)만 사용가능합니다.",
					row5:"- 아이디, 성명, 연락처 ,이메일, 조직은 필수 입력값 입니다.",
					row6:"- 소속은 16자리 조직 ID값을 입력합니다.",
					row7:"- 조직 ID값은 조직관리화면에서 조회가능합니다.",
					row8:"- 행과 행사이에 빈 행이 들어갈 수 없습니다.(연속된 행 조건)",
				},
			},
		},
		// 공통코드 관리
		stm4000:{
			title : {
				main:{
					default : "공통코드 관리",
				},
				master : "공통코드 마스터",
				detail :"공통코드 디테일",
			},
			masterDatatable:{
				tooltip:{
					select : "공통코드 마스터 조회",
					insert : "공통코드 마스터 추가",
					update : "공통코드 마스터 수정",
					delete: "공통코드 마스터 삭제",
					excel: "공통코드 마스터 엑셀",
					print: "화면 프린트",
					click : "공통코드 디테일 조회",
				},
				contextmenu:{
					update:"공통코드 마스터 수정",
					delete: "공통코드 마스터 삭제",
				}
			},
			detailDatatable:{
				tooltip:{
					select : "공통코드 디테일 조회",
					insert : "공통코드 디테일 추가",
					update : "공통코드 디테일 수정",
					delete: "공통코드 디테일 삭제",
					excel: "공통코드 디테일 엑셀",
					print: "화면 프린트",
				},
				contextmenu:{
					update : "공통코드 디테일 수정",
					delete: "공통코드 디테일 삭제",
				}
			},
			message:{
				alert : {
					selCodeMaster : "공통코드 마스터를 선택 후<br/>공통코드 디테일 등록이 가능합니다.",
					dontInsCode : "공통코드 마스터가 시스템에서 사용중인 경우 <br/>공통코드 디테일을 추가할 수 없습니다.",
					dontDelCode : "시스템에서 사용중인 코드는 삭제할 수 없습니다.",
				},
			}
		},
		// 공통코드 마스터 등록, 수정 팝업
		stm4001 :{
			title :{
				main : {
					default : "공통코드 마스터 등록",
					update : "공통코드 마스터 수정",
				}
			},
			label:{
				mstCd : "공통 코드",
				upperMstCd : "상위 코드",
				mstCdNm : "코드 명",
				ord : "순번",
				useNm : "사용 유무",
				stmUseNm : "시스템 사용 유무",
				mstCdDesc : "코드 설명",
			},
			placeholder:{
				mstCd : "공통 코드",
				upperMstCd : "상위 코드",
				mstCdNm : "코드 명",
				ord : "순번",
				useNm : "사용 유무",
				stmUseNm : "시스템 사용 유무",
			},
			regex : {
				code : "영문 대문자, 숫자 조합 8자리",
			},
			button:{
				complete : "완료",
				insert : "작성 완료",
				update :"수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 공통코드 마스터를 등록하시겠습니까?",
					update:"공통코드 마스터 정보를 수정하시겠습니까?",
				},
				content : {
					msg : "시스템에서 사용되는 공통코드는 순번만 수정 가능합니다.",
				},
			}
		},
		// 공통코드 디테일 등록, 수정 팝업
		stm4002:{
			title :{
				main :{
					default : "공통코드 디테일 등록",
					update : "공통코드 디테일 수정",
				}
			},
			label:{
				mstCd : "마스터 코드",
				subCd : "서브 코드",
				subCdNm : "서브 코드 명",
				subCdRefNoNum : "보조 필드",
				ord : "순번",
				useNm : "사용 유무",
				subCdDesc : "코드 설명",
			},
			placeholder:{
				mstCd : "공통 코드 마스터",
				subCd : "서브 코드",
				subCdNm : "서브 코드 명",
				subCdRef : "보조 필드 ${1}",
			},
			regex : {
				subCd : "2자리 숫자",
			},
			button:{
				complete : "완료",
				insert : "작성 완료",
				update :"수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 공통코드 디테일을 등록하시겠습니까?",
					update:"공통코드 디테일 정보를 수정하시겠습니까?",
				},
				content : {
					msg : "시스템에서 사용되는 공통코드는 순번만 수정 가능합니다.",
				},
			}
		},
		// 위젯 타입 관리
		stm4100:{
			title:{
				main:{
					default : "위젯 관리",
				},
				widgetList:"위젯 목록",
				widgetInfo:"위젯 정보",
			},
			treetable:{
				tooltip:{
					select: "위젯 조회",
					insert: "위젯 추가",
					update: "위젯 수정",
					delete: "위젯 삭제"
				}
			},
			datatable:{
				title :"추가 / 수정 / 삭제",
				tooltip:{
					select: "위젯 조회",
					insert: "위젯 추가",
					update: "위젯 수정",
					delete: "위젯 삭제"
				},
				field:{
					widgetTypeColor : "글씨 색상",
				},
				contextmenu:{
					update: "위젯 수정",
					delete: "위젯 삭제"
				}
			},
			message:{
				alert:{
					treeNoneSelect:"위젯 그룹을 선택해주세요.",
					notUsedWidgetGroup:"미사용 위젯 그룹에는 하위 위젯 그룹을 추가할 수 없습니다.",
					notRootDelete:"최상위 위젯 그룹(ROOT)은 삭제할 수 없습니다.",
					childCheckNotDelete:"하위 위젯 그룹이 존재하는 위젯 그룹은 삭제 할 수 없습니다."
				},
				confirm:{
					deleteWidgetGroup:"선택한 위젯 그룹을 삭제 하시겠습니까?"
				}
			},
		},
		// 위젯 그룹 등록, 수정 팝업
		stm4101:{
			title:{
				main:{
					default:"신규 위젯 그룹 등록",
					update:"위젯 그룹 수정",
				}
			},
			label:{
				widgetUpperGroupId : "상위 위젯 그룹 ID",
				widgetUpperGroupNm : "상위 위젯 그룹 명",
				WidgetGroupId : "위젯 그룹 ID",
				widgetGroupNm : "위젯 그룹 명",
				widgetGroupOrd : "순번",
				useCd : "사용 유무",
			},
			placeholder :{
				widgetUpperGroupId : "상위 위젯 그룹 ID",
				widgetUpperGroupNm : "상위 위젯 그룹 명",
				WidgetGroupId : "위젯 그룹 ID",
				widgetGroupNm : "위젯 그룹 명",
			},
			button:{
				insert : "작성 완료",
				update : "수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 위젯 그룹을 등록하시겠습니까?",
					update:"위젯 그룹 정보를 수정하시겠습니까?"
				}
			}
		},
		// 위젯 타입 등록, 수정
		stm4102:{
			title:{
				main:{
					default:"위젯 타입 등록",
					update:"위젯 타입 수정",
				},
				widgetTypeInfo : "위젯 타입 정보",
				widgetTypeSetInfo : "위젯 타입 설정 정보",
			},
			label:{
				widgetGroupNm : "위젯 그룹 명",
				widgetTypeNm : "위젯 타입 명",
				widgetTypeOrd : "순번",
				widgetTypeFn: "위젯 타입 함수명",
				widgetTypeMinWidth: "위젯 가로 최솟값",
				widgetTypeMinHeight: "위젯 세로 최솟값",
				widgetTypeMaxWidth: "위젯 가로 최댓값",
				widgetTypeMaxHeight: "위젯 세로 최댓값",
				widgetTypeBgColor: "위젯 배경 색상",
				widgetTypeColor: "위젯 글씨 색상",
				widgetTypeModifyCd: "수정 가능 여부",
				widgetTypeDesc: "위젯 타입 설명",
				useCd : "사용 유무",
			},
			placeholder :{
				widgetGroupNm : "위젯 그룹 명",
				widgetTypeNm : "위젯 타입 명",
				widgetTypeMinWidth: "위젯 가로 최솟값",
				widgetTypeMinHeight: "위젯 세로 최솟값",
				widgetTypeMaxWidth: "위젯 가로 최댓값",
				widgetTypeMaxHeight: "위젯 세로 최댓값",
				widgetTypeBgColor: "위젯 배경 색상",
				widgetTypeColor: "위젯 글씨 색상",
			},
			button:{
				insert : "작성 완료",
				update : "수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 위젯 타입을 등록하시겠습니까?",
					update:"위젯 타입 정보를 수정하시겠습니까? <br/>이미 사용된 위젯 타입의 경우<br/>등록된 위젯의 설정 값이 변경될 수 있습니다."
				}
			}
		},
		// 관리자 - 휴일관리
		stm4300:{
			title:{
				main:{
					default : "휴일 관리",
				},
				searchParam:"검색 조건",
			},
			label : {
				holiday : "휴일",
			},
			button:{
				insert:"휴일 등록",
				dataSelect:"휴일 데이터 조회",
				dataReset:"휴일 데이터 재생성",
				fourDay:"4일",
			},
			tooltip:{
				insert:"휴일 등록",
			},
			message:{
				alert : {
					doneReset:"정상적으로 등록되었습니다.",
					updateWriter : "등록자만 수정이 가능합니다.",
				},
				confirm : {
					resetEventConfirm:"이전에 생성된 휴일이 모두 삭제됩니다.<br>휴일 데이터를 새로 생성하시겠습니까?",
					
				},
			}
		},
		// 관리자 - 휴일 등록
		stm4301:{
			title:{
				main:{
					default:"휴일 등록",
					update:"휴일 정보 수정",
					view:"휴일 상세 정보",
				}
			},
			label : {
				holiNm: "휴일 명",
				holiRange: "휴일 일자",
				guideColor: "가이드 색상",
				holiBgColor: "휴일 배경 색상",
				holiColor: "휴일 색상",
				holiDesc: "휴일 설명",
			},
			placeholder :{
				holiNm: "일정 명",
				holiRange: "일정 일자",
			},
			button:{
				complete: "완료",
				insert : "작성 완료",
				update :"수정 완료",
				delete : "삭제"
			},
			message :{
				confirm : {
					insertString : "신규 휴일을 생성하시겠습니까?",
					updateString :"휴일을 수정하시겠습니까?",
					deleteString: "휴일을 삭제하시겠습니까?",
				},
			},
		},
		// 시스템 기본 항목 관리
		stm4400 : {
			title:{
				main:{
					default : "시스템 기본 항목 관리",
				},
				list : "대상 목록",
				itemList : "기본 항목 목록",
			},
			label : {
				templateId : "양식 ID",
				templateNm : "양식 명",
				templateDesc : "비고"
			},
			treetable:{
				tooltip:{
					select : "양식 메뉴 목록 조회",
					insert : "양식 메뉴 목록 추가",
				},
				contextmenu : {
					insert : "하위 양식 등록",
					update : "양식 수정",
					delete : "양식 삭제"
				}
			},
			datatable:{
				button:{
					preview :"미리보기"
				},
				tooltip:{
					preview :"기본 항목 미리보기",
					select : "기본 항목 조회",
					insert : "기본 항목 추가",
					update : "기본 항목 수정",
					delete : "기본 항목 삭제",
				},
				contextmenu:{
					update : "기본 항목 수정",
					delete : "기본 항목 삭제",
				}
			},
			message : {
				alert : {
					treeSelect : "왼쪽 트리에서 양식을 선택해주세요.",
					notUsedTemplate : "미사용 양식에는 하위 양식을 추가할 수 없습니다.",
					notRootDelete : "최상위 양식(ROOT)은 삭제할 수 없습니다.",
				},
				confirm:{
					deleteTemplate:"양식 정보 삭제 시 선택한 양식 정보 및 하위 양식 정보가 모두 삭제됩니다. 선택한 양식 정보를 삭제 하시겠습니까?",
				} 
			},
		},
		// 시스템 기본 항목 관리 - 양식 등록, 수정 팝업
		stm4401:{
			title:{
				main:{
					default : "신규 양식 등록",
					update: "양식 수정",
				}
			},
			label:{
				upperTemplateId : "상위 양식 ID",
				upperTemplateNm : "상위 양식 명",
				templateId : "양식 ID",
				templateNm : "양식 명",
				templateDesc : "비고",
			},
			placeholder :{
				upperTemplateId : "상위 양식 ID",
				upperTemplateNm : "상위 양식 명",
				templateId : "양식 ID",
				templateNm : "양식 명",
			},
			button:{
				insert: "작성 완료",
				update: "수정 완료",
			},
			message:{
				confirm : {
					insert : "신규 양식 등록을 하시겠습니까?",
					update : "수정 완료하시겠습니까?",
				},
			},
		},
		// 기본 항목 등록, 수정 팝업
		stm4402:{
			title : {
				main : {
					default : "기본 항목 등록",
					update : "기본 항목 수정",
				}
			},
			label:{
				itemNm : "항목 명",
				itemCode : "항목 분류",
				itemType : "항목 타입",
				itemPcRowNum : "데스크탑 열 넓이",
				itemTabletRowNum : "태블릿 열 넓이",
				itemMobileRowNum : "모바일 열 넓이",
				itemOrd : "순서",
				itemCommonCode : "공통 코드",
				itemLength : "길이 제한",
				itemEssentialCd : "필수 유무",
				itemMinVal : "숫자 최솟값",
				itemMxaVal :"숫자 최댓값",
				itemNotModifiedCd : "수정 불가 항목",
			},
			placeholder:{
				itemNm : "항목 명",
			},
			button:{
				insert: "작성 완료",
				update: "수정 완료",
			},
			message :{
				confirm : {
					insert : "등록 완료하시겠습니까?",
					update :"수정 완료하시겠습니까?",
				},
			}
		},
		// 기본 항목 미리보기 팝업
		stm4403:{
			title:{
				main:{
					default : "기본 항목 미리보기",
				}
			},
		},
		// 프로젝트 기본 항목 리스트 팝업
		stm4404:{
			title :{
				main:{
					default : "프로젝트 기본 항목 리스트",
				},
				list : "대상 목록",
				itemList : "기본 항목 목록",
			},
			treetable:{
				tooltip:{
					select : "양식 메뉴 목록 조회",
					insert : "양식 메뉴 목록 추가",
				},
				contextmenu : {
					insert : "하위 양식 등록",
					update : "양식 수정",
					delete : "양식 삭제"
				}
			},
			datatable:{
				button:{
					preview :"미리보기",
					itemAllSelect : "전체 선택",
					itemSelect : "선택",
				},
				tooltip:{
					itemAllSelect : "기본 항목 전체선택",
					itemSelect : "기본 항목 선택",
					select : "기본 항목 조회",
				}
			},
			message : {
				alert : {
					treeSelect : "왼쪽 트리에서 양식을 선택해주세요.",
					itemNotSelect:"선택된 기본 항목이 없습니다. 기본 항목을 선택하세요.",
				},
			},
		},
		// 기본 항목 등록, 수정 팝업
		stm4405:{
			title :{
				main :{
					default : "기본 항목 등록",
					update : "기본 항목 수정",
					copy : "기본 항목 복사",
				},
				targetList :"대상 목록",
			},
			treetable:{
				button:{
					copy : "복사"
				},
				tooltip:{
					copy :"시스템 양식 복사",
					select : "양식 메뉴 목록 조회",
				}
			}
		},
		// 시스템 로그인 이력
		stm5000:{
			title :{
				main:{
					default : "로그인 이력 로그",
				}
			},
			datatable:{
				tooltip:{
					slect : "로그인 이력 조회",
				},
			}
		},
		// 시스템 사용 이력 로그
		stm5100:{
			title :{
				main:{
					default : "시스템 사용 이력 로그",
				}
			},
			datatable:{
				tooltip:{
					slect : "시스템 사용 이력 조회",
				},
			}
		},
		// 알림 발송 이력
		stm5200:{
			title :{
				main:{
					default : "알림 발송 이력"
				},
			},
			datatable:{
				title: "알림 발송 이력",
				tooltip:{
					select : "알림 발송 로그 조회",
					download :"알림 발송 로그 다운로드",
				},
			},
			label :{
				regDtm : "발송일시"
			}
		},
		//오류 로그 화면
		stm5300:{
			datatable:{
				tooltip:{
					select : "오류 로그 목록 조회",
				},
			},
		},
		// 조직 관리
		stm6000:{
			title:{
				main:{
					default : "조직 관리",
				},
				deptList:"조직 목록",
				deptInfo:"조직 정보"
			},
			label:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
				deptOrd : "순번",
				deptUseCd : "사용 유무",
				deptEtc : "비고",
				pmo : "PMO",
				deptLeaderNm : "팀장",
			},
			placeholder:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
				deptOrd : "순번",
				deptUseCd : "사용 유무",
			},
			datatable:{
				tooltip:{
					select: "조직 조회",
					insert: "조직 추가",
					update: "조직 수정",
					delete: "조직 삭제",
					assignPmo : "PMO 설정",
					releasePmo : "PMO 해제",
				}
			},
			message:{
				alert:{
					treeSelect:"왼쪽 트리에서 조직을 선택해주세요.",
					notUsedDept:"미사용 조직에는 하위 조직을 추가할 수 없습니다.",
					notRootDelete:"최상위 조직(ROOT)은 삭제할 수 없습니다.",
					notAssignDeptPmo : "선택한 조직은 PMO 조직으로 설정되어 있습니다.",
					notReleaseDeptPmo : "선택한 조직은 PMO 조직이 아니므로 해제가 불가합니다.",
				},
				confirm:{
					assignDeptAuthMsg :"선택한 조직은 권한그룹에 배정되어 있습니다.<br/>",
					deleteDeptMsg : "보안티켓에 배정된 조직인 경우 오류가 발생할 수 있고, 선택한 조직 및 하위 조직이 모두 삭제됩니다.",
					delDeptTitle : "선택한 조직을 삭제 하시겠습니까?",
					deleteDept:"조직 삭제 시 선택한 조직 및 하위 조직이 모두 삭제됩니다. 선택한 조직을 삭제 하시겠습니까?",
					assignPmoMsg : "PMO 설정하시겠습니까?",
					releasePmoMsg : "PMO 해제하시겠습니까?",
				}
			},
			button : {
				assignPmo : "PMO 설정",
				releasePmo : "PMO 해제",
			},
		},
		// 조직 등록, 수정 팝업
		stm6001:{
			title:{
				main:{
					default:"신규 조직 등록",
					update:"조직 수정"
				}
			},
			label:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
				deptOrd : "순번",
				deptUseCd : "사용 유무",
				deptEtc : "비고",
			},
			placeholder:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
			},
			button:{
				insert : "작성 완료",
				update : "수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 조직을 등록하시겠습니까?",
					update:"조직 정보를 수정하시겠습니까?"
				}
			}
		},
		//조직 상세 팝업
		stm6002:{
			title:{
				main:{
					default : "조직 상세정보"
				},
			},
			label:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
				deptOrd : "순번",
				deptUseCd : "사용 유무",
				deptEtc : "비고",
			},
			placeholder:{
				upperDeptId : "상위 조직 ID",
				upperDeptNm : "상위 조직 명",
				deptId : "조직 ID",
				deptNm : "조직 명",
			},
			button:{
				insert : "작성 완료",
				update : "수정 완료"
			},
			message:{
				confirm:{
					insert:"신규 조직을 등록하시겠습니까?",
					update:"조직 정보를 수정하시겠습니까?"
				}
			}
		},
		// 알림 설정 관리
		stm7000:{
			title : {
				menu : "메뉴 목록",
				notice : "알림",
				noticeList : "알림 목록",
				noticeSetting : "설정",
			},
			label:{
				system : "시스템 알림",
				mail : "메일 알림",
				value : "알림 변수",
				valueNm : "변수명",
				valueDesc : "설명",
				armContent : "알림 전송 내용",
				target : "알림 수신 대상",
			},
			message : {
				selectMenu : "3Depth 메뉴를 선택하세요.",
				systemTarget : "수신 대상자가 없을 경우 솔루션 시스템에 따라 지정된 대상자에게 전송됩니다.",
				changeToSave : "변경 사항이 존재합니다. 저장하시겠습니까?",
				afterChangeToSave : "변경 사항이 존재합니다. 저장하고 선택 메뉴 알림 정보를 조회하시겠습니까?",
				notChange : "변경 사항이 없습니다.",
				hasNotValueSave : "존재하지 않는 변수(${1})이/가 있습니다. 그냥 저장할 경우 해당 변수는 단순 텍스트로 처리됩니다. 계속하시겠습니까?"
			}
		},
		// 구독 설정 관리
		stm7001:{
			title : {
				main: {
					default : "구독 설정 관리"
				},
				armList : "알림 목록",
			},
			label:{
				menuNm : "메뉴명",
				armList : "알림 목록",
				armSubscribeYn : "구독 여부",
			},
			message : {
				confirm: {
					save: "저장하시겠습니까?"
				}
			}
		},
		// 이상징후 서버 관리
		prj3000:{
			title:{
				main:{
					default : "이상징후 서버 관리",
				},
			},
			label:{
				useY : "사용 중",
				useN : "사용 안함",
				logKeyMapping : "로그 키 맵핑",
			},
			datatable:{
				button : {
					allConnection : "전체 접속 확인",
					selectConnection : "선택 접속 확인",
					testLogInsert : "보안 위험 발생 테스트",
					allGetLog : "전체 로그 가져오기",
					selectGetLog : "선택 로그 가져오기",
					logSelect : "가져오기 이력 조회",
				},
				tooltip : {
					slgSevSelect : "이상징후 서버 조회",
					slgSevInsert : "이상징후 서버 등록",
					slgSevUpdate : "이상징후 서버 수정",
					slgSevDelete : "이상징후 서버 삭제",
					slgSevDetail : "이상징후 서버 상세",
					allConnection : "전체 이상징후 서버 접속 확인",
					selectConnection : "선텍 이상징후 서버 접속 확인",
					allGetLog : "전체 이상징후 서버 로그 가져오기",
					selectGetLog : "선택 이상징후 서버 로그 가져오기",
					logSelect : "이상징후 서버 로그 가져오기 이력 조회",
				},
				contextmenu : {
					update : "수정",
					delete : "삭제",
					detail : "상세",
					connect : "접속 확인",
					getLog : "로그 가져오기",
					logSelect : "가져오기 이력 조회",
					keyMapping : "키 맵핑",
				},
			},
			message:{
				alert : {
					noSevData : "이상징후 서버가 없습니다.",
					selSev : "이상징후 서버를 선택해주세요.",
					nonSelect: "선택된 보안서버가 없습니다.",
					onlyOnekeyMapping : "키 맵핑 조회는 1건에 대해서만 가능합니다<br/>현재 ${1}건 선택되었습니다.",
					multipleSelect : "다중 선택으로 인해 전체 이력으로 표출됩니다.",
					selectSevLog : "선택한 서버의 이력만 표출됩니다.",
				},
				content : {
					noData : "데이터 없음(연결이 필요합니다.)",
				},
				toastr : {
					connectSuccess:"접속 성공",
					notConnectionCheck:"[${1}] 접속 조회를 할 수 없는 서버입니다.",
				},
			}
		},
		//이상징후 서버 추가/수정
		prj3001:{
			title:{
				main:{
					default:"이상징후 서버 추가",
					insert:"이상징후 서버 추가",
					update:"이상징후 서버 수정",
					detail:"이상징후 서버 상세",
				},
				sevInfo : "이상징후 서버 정보",
			},
			label:{
				sevId : "이상징후 서버 ID",
				sevType : "이상징후 수집 툴",
				sevDataGet : "수집 방식",
				sevDataCd : "데이터 타입",
				sevNm : "이상징후 서버 명",
				sevPtl : "프로토콜",
				sevHost : "서버 호스트",
				sevPort : "서버 포트",
				sevUsrId : "사용자 ID",
				sevUsrPw : "사용자 Password",
				sevTm : "시간 간격",
				useCd : "사용 유무",
				sevLocate : "서버 위치",
				attachments: "실장도",
			},
			placeholder:{
				sevId : "이상징후 서버 ID (추가시 자동입력)",
				sevNm : "이상징후 서버 명",
				sevHost : "서버 호스트",
				sevPort : "서버 포트",
				sevLocate : "서버 위치",
				sevUsrId : "이벤트서버 사용자 ID",
				sevUsrPw : "이벤트서버 사용자 비밀번호",
			},
			tooltip:{
				sevSelect : "이상징후 하위서버 조회",
				sevInsert : "이상징후 하위서버 등록",
				sevUpdate : "이상징후 하위서버 수정",
				sevDelete : "이상징후 하위서버 삭제",
			},
			message : {
				waitConnect : "서버 상태를 확인하는 중입니다.<br/>잠시만 기다려주세요.",
				alert : {
					noSev : "삭제되었거나 존재하지 않는 이상징후 하위서버입니다.",
				},
				confirm : {
					sevInsert : "이상징후 서버 정보를 등록하시겠습니까?",
					sevUpdate : "이상징후 서버 정보를 수정하시겠습니까?",
					sevDelete : "이상징후 서버 정보를 삭제하시겠습니까?",
				},
			},
		},
		//이상징후 서버 키맵핑 목록 팝업
		prj3002:{
			title:{
				main:{
					default:"[${1}] 키 맵핑 목록",
				}
			},
			label: {
				useY : "사용 중",
				useN : "사용 안함",
			},
			datatable : {
				tooltip : {
					select : "키 맵핑 목록 조회",
					insert : "키 맵핑 등록",
					update : "키 맵핑 수정",
					delete : "키 맵핑 삭제",
					detail : "키 맵핑 상세",
				},
				contextmenu : {
					update : "수정",
					delete : "삭제",
					detail : "상세",
				},
			},
			message : {
				alert : {
					selectData : "데이터를 선택해주세요.",
					onlyOneSelect : "상세 조회는 1건에 대해서만 가능합니다<br/>현재 ${1}건 선택되었습니다.",
				},
			},
		},
		//이상징후 서버 키 맵핑 등록
		prj3003:{
			title : {
				main:{
					default: "키 맵핑 등록",
					insert : "키 맵핑 등록",
					update : "키 맵핑 수정",
					delete : "키 맵핑 삭제",
					detail : "키 맵핑 상세",
				},
				sevInfo : "서버 정보",
			},
			label : {
				sevNm : "이상징후 서버 명",
				sevType : "이상징후 수집 툴",
				sevDataGet : "수집 방식",
				sevDataCd : "데이터 타입",
				evtNm : "경고 표출명",
				evtDesc : "경고 설명",
				sevIndex : "서버 인덱스",
				keyMapping : "키 맵핑",
				mapKey : "매칭 경고 명 Path",
				score : "점수 Path",
				threatScore : "위험도",
				severity : "심각성",
				fidelity : "정확도",
				actual : "빈도",
				typical : "평균",
				category : "분류",
				alertId : "경고 발생 ID",
				alertIdx : "경고 발생 인덱스",
				alertDtm : "경고 발생 일시",
				ticketId : "이상징후 연결 티켓 ID",
				useCd : "사용 유무",
				template: "연결 양식",
			},
			placeholder : {
				evtNm : "경고 표출명",
				evtDesc : "경고 설명",
				sevIndex : "서버 인덱스",
				mapKey : "매칭 경고 명 Path",
				score : "점수 Path",
				threatScore : "위험도 Path",
				severity : "심각성 Path",
				fidelity : "정확도 Path",
				actual : "빈도 Path",
				typical : "평균 Path",
				category : "분류 Path",
				alertId : "경고 발생 ID Path",
				alertIdx : "경고 발생 인덱스 Path",
				alertDtm : "경고 발생 일시 Path",
				ticketId : "이상징후 연결 티켓 ID Path",
				tplNm : "연결된 양식이 없습니다.",
			},
			button : {
				dontConnect : "연결 양식 해제",
			},
			message : {
				alert : {
					noSev : "서버 정보가 없습니다.",
					noMapInfo : "키 맵핑 정보가 없습니다.",
				},
			}
		},
		//보안 로그 가져오기 이력 조회 팝업
		prj3004:{
			title : {
				main: {
					default : "보안 로그 가져오기 이력 조회",
				},
				sevList : "서버 목록",
			},
			label: {
				useY:"사용",
				useN:"미사용",
				success : "성공",
				fail : "실패",
			},
			tooltip: {
				successCnt : "성공 ${1} 건",
				failCnt : "실패 ${1} 건",
			},
			datatable : {
				field : {
					sevNm : "서버명"
				},
				tooltip : {
					select : "이상징후 서버 조회",
					detail : "이상징후 서버 상세",
				},
				contextmenu : {
					detail : "상세",
				},
			},
			message : {
				alert : {
					sevSelect : "이상징후 서버를 선택해주세요.",
					onlyOneSelect : "상세 조회는 1건에 대해서만 가능합니다<br/>현재 ${1}건 선택되었습니다.",
					dontSelectLog : "로그를 조회할 수 없습니다.",
				},
				content : {
					notLog : "로그 가져오기 이력이 없습니다.",
				},
			},
		},
		// 신청서 연동정보 등록/수정
		// 202501029 배용진 - 기존 lang은 우선 남겨두고 추가, 작업완료 후 기존 lang 제거
		prj3005 : {
			title:{
				main : {
					default : "보안 로그 가져올 범위 지정"
				},
				getLogList : "해당 서버 보안 로그 가져오기 이력",
			},
			label:{
				logRangeStDtm: "시작 일시",
				logRangeEdDtm: "종료 일시",
				alertStateCd: "경고 상태",
				scoreRange: "보안 점수",
				severityRange: "심각도",
				threatRange: "위험도",
				fidelityRange: "정확도",
				useY:"사용",
				useN:"미사용",
				targetSever:"조회 서버",
				success : "성공",
				fail : "실패",
			},
			tooltip:{
				getStatusNm : "경고 상태",
				getAlertDtm : "경고 발생 기간",
				score:"보안 점수",
				severity:"심각도",
				threatScore:"위험도",
				fidelity:"정확도",
				successCnt: "성공 ${1} 건",
				failCnt: "실패 ${1} 건",
			},
			message : {
				alert:{
					forGetLogStr:"로그를 가져올 기간 및 옵션을 지정하세요.",
					caution:"해당 기간에 로그가 많을 경우, 완료까지 오랜 시간이 소요될 수 있습니다.",
				},
				dontLog:"로그 가져오기 이력이 없습니다.",
				linkTplSel:"신청서 선택 시 연동 정보에 있는<br/>신청서 맵핑 정보는 삭제됩니다.<br/><br/>신청서를 선택하시겠습니까?"
			}
		},
		// 시스템 정보
		stm8000:{
			title:{
				main : "시스템 정보",
				serverInfo:"서버 정보",
				diskInfo:"디스크 정보",
				cpuInfo:"CPU 정보",
				memInfo:"메모리 정보",
			},
			label:{
				serverTime:"서버 시간",
				os : "OS",
				hostNm :"Host Name",
				ipvFour : "Ipv4",
				ipvSix : "Ipv6",
				cpuProcessor: "CPU 논리 프로세서",
				cpuUseRatio:"CPU 사용률",
				assignMem:"할당 메모리",
				usableMem: "사용 가능 메모리",
				memUseRatio: "메모리 사용률",
				hipMem:"힙 메모리",
				nonHipMem:"논 힙 메모리",
				usableStor:"사용 가능 용량: ",
				totalStor:"전체 용량: ",
			}
		},
		// 라이선스 정보
		stm9000:{
			title :{
				main : "라이선스 정보",
				licInfo : "라이선스 정보",
				newLic : "라이선스 갱신",
			},
			label : {
				licNo : "라이선스 번호",
				siteNm : "사이트 명",
				usrCnt: "등록 사용자 수",
				maxUsrCnt : "최대 사용자 수",
				endDtm : "만료일",
				key : "라이선스 키",
				enterKey : "라이선스 증명 키",
				lockKey : "라이선스 복호화 키"
			},
			placeholder:{
				enterKey : "발급받은 라이선스 증명 키를 입력해주세요.",
				lockKey : "발급받은 라이선스 복호화 키를 입력해주세요."
			},
			button :{
				refresh : "갱신"
			},
			tooltip:{
				refresh : "라이선스 갱신"
			},
			message :{
				enterInfo : "라이선스 키 갱신에 필요한 정보를 입력해주세요.",
			}
		},
		//양식 > 양식 관리 > 정보자산 양식 관리 or 보안 티켓 양식 관리
		tpl1000:{
			title : {
				main : {
					default : "양식 관리",
				},
				common : "양식 목록",
				cfgTplList : "정보자산 양식 목록",
				reqTplList : "보안 티켓 양식 목록",
				tplItemList : "양식 구성",
				tplUseInfo : "양식 활성 정보",
				tplAcceptInfo : "양식 접수 기본항목 구성",
			},
			label:{
				fileFormStr01 : "파일을 여기에 놓고 붙여넣기 또는 ",
				fileFormStr02 : "&nbsp;찾아보기",
				alarmSetting : "알림 설정",
				alarmRange :"알림 기간",
				tplLinkProcess :"연결 프로세스",
				tplUseCd : "사용 유무",
				tplAutoAccept : "프로세스 자동 접수 유무"
			},
			placeholder : {
				notLinkProcess : "연결된 프로세스가 없습니다."
			},
			button :{
				select : "조회",
				update : "수정",
				save : "저장",
				//deleteReset : "삭제 초기화",
				reset : "초기화",
			},
			tooltip:{
				selectTplItemList : "양식 구성 조회",
				updateTplItemList : "양식 구성 수정",
				saveTplUseInfo : "양식 활성 정보 저장",
				updateTplLnkProcess : "양식 연결 프로세스 수정",
				saveTplLnkProcess : "양식 연결 프로세스 수정 완료",
				resetTplLnkProcess : "양식 연결 프로세스 초기화",
				updateTplUseCd : "사용 유무 수정",
				saveTplUseCd : "사용 유무 수정 완료",
				updateTplAcceptForm : "양식 접수 항목 구성 수정",
			},
			treetable:{
				tooltip :{
					select : "양식 목록 조회",
					insert : "양식 등록",
					update : "양식 수정",
					delete : "양식 삭제",
				},
				contextmenu : {
					update : "양식 수정",
					delete : "양식 삭제"
				}
			},
			message : {
				alert : {
					maxFileCntOverReset :"최대 파일 개수가 초과되어 삭제 파일 초기화가 불가능합니다.<br/>기존 파일로 초기화됩니다.",
					notLinkedProcess : "연결된 프로세스가 없습니다<br/>프로세스를 선택하세요.",
					cantAutoAccpet:"접수 기본항목 중 필수항목이 존재하여, 자동 접수가 불가능합니다. 수동 접수를 이용해주세요.",
					selectUpperTpl :"양식 생성을 위한 상위 목록을 선택하세요.",
					underDirNewable : "디렉토리 하위에만 추가 가능합니다.",
					selectUpdateTpl : "수정하기 위한 양식을 선택하세요.",
					notUpdateRoot :"ROOT는 수정할 수 없습니다.",
					notUpdateDefault :"기본 양식은 수정할 수 없습니다.",
					notDeleteRoot :"ROOT는 삭제할 수 없습니다.",
					notDelete : "이미 사용 중인 양식이 있어 삭제할 수 없습니다.",
					notDeleteDefault :"기본 양식은 삭제할 수 없습니다.",
					notDeleteChangeUseCd : "이미 사용 중인 양식이 있어 삭제할 수 없어<br/>사용 유무가 변경됩니다.",
					notAuthUpdate : "권한이 없는 양식은 수정할 수 없습니다.",
					notRootAddAuth : "ROOT 하위 디렉토리 추가 권한이 없습니다.",
					notAuthInsert : "선택한 디렉토리의 추가 권한이 없습니다.",
				},
				confirm : {
					updateDirInfo : "디렉토리 정보 변경 시 하위 콘텐츠도 영향을 받습니다.<br/>그래도 수정하시겠습니까?",
					updateUnderDirInfo : "하위 콘텐츠 정보도 모두 수정하시겠습니까?<br/><br/>예 : 하위 콘텐츠 정보 모두 수정<br/>아니오 : 디렉토리 정보만 수정",
					deleteTpl : "양식 정보를 삭제하시겠습니까?",
					linkProcess : "티켓 등록 시 지정된 연결 프로세스에 맞게 이관됩니다. 프로세스를 연결하시겠습니까?",
				},
				toastr : {
					updateTpl : "[${1}]이 수정되었습니다.",
					updateUseCd : "[${1}]의 사용 유무가 수정되었습니다.",
					deleteTplInfo : "[${1}]이 삭제되었습니다.",
					updateTplDownFile : "양식 파일이 수정되었습니다.",
					
				},
				selectTpl : "양식 목록에서 항목을 먼저 선택하세요.",
				dontLinkedProcess : "(연결 불가)",
				dontLinkedProcessMsg : "프로젝트의 접수 기본 항목 중 필수 항목이 있어 자동 접수가 불가능합니다.",
				hasUnderDir : "(하위 목록 포함)",
				settingAlarm:"알림 기능이 설정된 기간입니다.",
				changeData :{
					file : "양식 파일 정보",
					process : "연결 프로세스 정보",
					use :"양식 사용 유무",
					active : "양식 활성화 정보",
					change : "가 변경되었습니다.<br/>변경 정보를 저장하시겠습니까?",
				},
			}
		},
		//양식 등록, 수정
		tpl1001:{
			title :{
				main :{
					default : "양식 등록",
					update : "양식 수정",
				},
				tplItem : "(미리보기)가져올 양식 구성",
			},
			label:{
				upperTplId : "상위 구분 ID",
				upperTplNm : "상위 구분 명",
				tplId : "ID",
				tplNm : "표출 명",
				tplViewCd : "표출 유형",
				tplClsType : "구분",
				detailType : "세부 구분",
				copyTplId : "양식 가져오기",
				tplGrpCd : "양식 그룹 구분",
				tplTypeCd : "양식 유형",
				xtnCd : "연장 신청 가능",
				lvl : "레벨",
				ord : "순번",
				tplDesc : "양식 설명",
				tplAdm:"신청서 관리자",
				manual : "매뉴얼",
				tplSign : "사전 결재선",
				tplChar : "신청서 실무자",
			},
			placeholder :{
				upperTplId : "상위 구분 ID",
				upperTplNm : "상위 구분 명",
				tplId : "ID는 자동 생성됩니다.",
				tplNm : "표출 명",
				lvl : "레벨",
				ord : "순번",
				selectList : "입력 후 엔터 키를 입력해주세요.",
			},
			button :{
				submit : "완료",
				add:"추가",
				selManualFile : "파일 선택",
				delManualFile : "파일 삭제",
				selectSignLine: "결재선 지정",
				delSignLine: "결재선 제거",
			},
			message :{
				confirm : {
					insertSubmit :"등록 완료하시겠습니까?",
					updateSubmit :"수정 완료하시겠습니까?",
					resetSignLine : "결재선을 초기화 하시겠습니까?",
					delSignLineMsg : "결재선을 삭제 하시겠습니까?",
					tplAdmReset : "신청서 관리자 목록을 초기화 하시겠습니까?",
					tplChargeReset : "신청서 실무자 목록을 초기화 하시겠습니까?",
				},
				alert : {
					selectFile:"업로드할 파일을 선택해주세요.",
					invalidFile:"유효하지 않은 첨부파일입니다.",
				},
				toastr : {
					insertTplInfo : "[${1}]이 등록되었습니다.<br/>상세 내용을 등록하세요.",
					updateTplInfo : "[${1}]이 등록되었습니다.<br/>상세 내용을 등록하세요.",
					
				},
				tooltip : {
					signLineReset : "결재선 초기화",
					selectSignLine: "결재선 지정",
					delSignLine : "결재선 제거",
					tplSignMsg : "신청서 상신 시 자동으로 결재 요청되어야 하는 경우 사전 결재선을 입력해야 합니다.",
					tplAdmReset : "신청서 관리자 초기화",
					tplChargeReset : "신청서 실무자 초기화",
					
				},
				nothing :"(없음)",
				newTplInfo :"신규 생성",
				tplTypeFix : "양식 유형은 최초 설정 시 고정됩니다.(수정불가)<br/>[서비스 유형 : 사용자의 사용 유무 또는 소속이 변경될 경우 연장/회수 알림이 발생하는 양식]",
			}
		},
		//양식 구성 팝업
		tpl1100 : {
			title:{
				main:{
					default : "양식 구성",
					cim :{
						insert : "정보자산 등록",
						update : "정보자산 수정",
						copy : "정보자산 복사",
					}
				},
				cfgTpl : "정보자산 양식",
			},
			label:{
				cimRuteNm : "정보자산 명",
				chkStateYn : "상태 체크 유무",
				chkType : "체크 타입",
				url : "URL",
				id : "ID",
				pw : "PW",
			},
			placeholder :{
				cimRuteNm : "정보자산 명",
				url : "SITE URL",
				id : "SITE ID",
				pw : "SITE PW",
			},
			button :{
				updateVal : "값 수정",
				updateItem : "항목 수정",
				tplChange : "양식 선택",
				change : "변경",
			},
			tooltip:{
				compact : "전체 정렬",
				reset :"초기화",
				allDelete : "전체 삭제",
				newWidget : "신규 목록",
				trashWidget : "삭제 목록",
				closeSetting : "설정창 닫기",
				updateVal : "값 수정",
				updateItem : "항목 수정",
				chkDept : "사용자의 정보가 연계되어<br/>부서 이동 및 사용 유무를 확인할 수 있습니다.",
			},
			message:{
				confirm:{
					changeTpl :"입력된 정보는 모두 초기화됩니다.<br/>그래도 양식을 변경하시겠습니까?",
					saveTpl : "양식 구성 정보를 저장하시겠습니까?",
					insertCfg : "정보자산 정보를 추가하시겠습니까?",
					updateCfg : "정보자산 정보를 수정하시겠습니까?",
				},
				content:{
					dontDragAddItem : "Drag & Drop으로 추가 할 수 없습니다.(+ 버튼을 클릭하여 추가하세요.)",
					dontDragDelItem : "Drag & Drop으로 삭제 할 수 없습니다.(휴지통 버튼을 클릭하여 삭제하세요.)",
					dontDeleteItem : "해당 항목은 삭제 할 수 없습니다.",
					usrInfoForm : "사용자 정보 연결 양식으로 사용",
				},
			}
		},
		//정보자산, 보안 티켓(신청서, 보안사고) 등록, 수정 팝업
		//보안 티켓 -> 신청서/보안정책 신청서
		tpl1101:{
			title :{
				main : {
					default: "양식 등록",
					cfg : {
						insert : "정보자산 등록",
						update : "정보자산 수정",
						copy : "정보자산 복사",
					},
					req : {
						insert : "신청서 등록",
						update : "신청서 수정",
						detail : "신청서 상세",
						copy : "신청서 복사",
						reInsert : "신청서 재요청",
					},
					acdt : {
						insert : "보안사고 신고 등록",
						update : "보안사고 신고 수정",
					},
					dta : {
						insert : "자료정보 등록",
						update : "자료정보 수정",
					},
				},
				reqTpl : "양식 선택",
				regUsrInfo : "작성자 정보",
				reqInfo : "신청 내용",
				acdtReqInfo : "신고 내용",
				dtaInfo : "양식 내용",
				prepReqListInfo :"선행처리 지식확인",
			},
			label : {
				cfg : {
					cimRuteNm :"정보자산명",
					chkStateYn : "상태 체크 유무",
					chkType : "체크 타입",
					url : "URL",
					id : "ID",
					pw : "PW",
				},
				req :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					prj : "프로젝트",
					reqDtm : "요청일",
					reqNm : "제목",
					reqPwTxt :"내용 잠금", //보안 티켓 잠금 -> 내용 잠금
					reqPw :"PW",
					reqPwCheck :"PW 확인",
					prepData : {
						reqNm : "제목",
						result : "다음과 같은 연관 결과가 있습니다.",
						notResult : "연관 결과가 없습니다.",
						total : "총",
						count : "건",
					},
					applyStd : "일반 신청",
					applyExcel : "엑셀 신청",
				},
				acdt :{
					reqNm : "제목",
					reqPwTxt :"내용 잠금",
					reqAcdTypeCd :"사고 유형",
				},
				dta :{
					dtaNm : "자료 제목",
				},
				anomaly:{
					evt : "이벤트",
				}
			},
			placeholder :{
				cfg : {
					cfgRutNm : "정보자산명",
					siteUrl : "SITE URL",
					siteId : "SITE ID",
				},
				req :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					reqGrpNm : "그룹 보안 티켓을 선택하세요.",
					reqUsrNm :"요청자명을 입력하세요.",
					reqUsrDeptNm : "소속/부서명을 입력하세요.",
					reqUsrEmail :"요청자 이메일을 입력하세요.",
					reqUsrNum :"요청자 연락처를 입력하세요.",
					password : "알파벳, 숫자 사용 4-12자 이내",
					nullPassword : "공백인 경우 기존 비밀번호 사용",
					searchTemplate : "양식명 검색"
				},
				dta :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
				}
			},
			regex:{
				password : "알파벳, 숫자 사용 4-12자 이내",
			},
			button :{
				temporarySave : "임시 저장",
				submit :"상신",
				change :"변경",
				tplChange :"양식 선택",
				downMenual :"매뉴얼",
				prevCheck : "선행처리지식 확인",
			},
			prevDatatable:{
				button:{
					reset :"초기화",
					add :"추가",
					remove : "제외",
					detail : "상세",
					reqInsert : "접수",
				},
				tooltip:{
					select : "선행 보안 티켓 조회",
					reset :"초기화",
					add : "선행 연결 저장",
					remove :"선행 연결 해제",
					reqInsert : "접수",
				},
				field:{
					prjGrpNm : "프로젝트 그룹명",
					reqGrpNm: "그룹 보안 티켓명",
					reqGrpNo : "그룹 보안 티켓 번호",
				},
			},
			nextDatatable:{
				button:{
					reset :"초기화",
					add :"추가",
					remove : "제외"
				},
				tooltip:{
					select : "후행 보안 티켓 조회",
					reset :"초기화",
					add : "후행 연결 저장",
					remove :"후행 연결 해제"
				},
				field:{
					reqGrpNm: "그룹 보안 티켓명",
					reqGrpNo : "그룹 보안 티켓 번호",
				},
			},
			prepReqDatatable :{
				button:{
					detail :"상세 조회",
				},
				tooltip:{
					select : "선행지식 조회",
					detail :"상세 조회"
				}
			},
			message :{
				alert:{
					formCheck:{
						passwordMessage : "비밀글에 사용할 비밀번호를 입력해주세요.",
						passwordMatching : "입력된 비밀번호가 서로 다릅니다.",
					},
					usrInOutsideOrd : "",
					dontSubmit : "등록한 신청서 양식이 사용 불가하여<br/>상신할 수 없습니다.",
					inReqNm : "제목을 입력하세요",
					writeReqNm : "요청 제목을 2자 이상 입력해주세요",
				},
				confirm:{
					changeTpl :"입력된 정보는 모두 초기화됩니다.<br/>그래도 양식을 변경하시겠습니까?",
					saveString :{
						tplClsType01 :{
							insertStr : "정보자산을 등록하시겠습니까?",
							updateStr : "정보자산 수정을 완료하시겠습니까?",
							copyStr : "정보자산 복사를 완료하시겠습니까?",
						},
						tplClsType02 :{
							insertStr : "신청서를 등록하시겠습니까?",
							updateStr : "신청서 수정을 완료하시겠습니까?",
							//copyStr : "신청서 복사를 완료하시겠습니까?",
							copyStr : "신청서를 재상신 하시겠습니까?",
							yetInsertStr : "신청서를 임시 저장하시겠습니까?",
							deleteStr : "신청서를 삭제하시겠습니까?",
							notDeleteStr : "신청서를 삭제할 수 없습니다.",
						},
						tplClsType04 :{
							insertStr : "보안사고를 등록하시겠습니까?",
							updateStr : "보안사고 수정을 완료하시겠습니까?",
							copyStr : "보안사고 신고 내용 복사를 완료하시겠습니까?",
							yetInsertStr : "보안사고를 임시 저장하시겠습니까?",
							deleteStr : "보안사고를 삭제하시겠습니까?",
							notDeleteStr : "보안사고를 삭제할 수 없습니다.",
						},
						tplClsType05 :{
							insertStr : "자료정보를 등록하시겠습니까?",
							updateStr : "자료정보 수정을 완료하시겠습니까?",
							deleteStr : "자료정보를 삭제하시겠습니까?",
							notDeleteStr : "자료정보를 삭제할 수 없습니다.",
						}
					},
				},
				content:{
					notProcess : "배정된 프로세스 없음",
					error : "오류 발생",
				},
			}
		},
		//정보자산, 보안 티켓 상세 팝업
		//보안 티켓 -> 신청서/보안정책 신청서
		tpl1102:{
			title :{
				main:{
					default : "보안정책 신청서 상세",
					acdt : "보안사고 신고 상세",
				},
				regUsrInfo : "작성자 정보",
				reqInfo : "정보",
				applyInfo : "신청 내용",
				acdtReqInfo : "신고 내용",
			},
			label : {
				req :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					prj : "프로젝트",
					reqDtm : "요청일",
					reqKey :"내용 Key", //보안 티켓 Key -> 내용 Key
					reqOrd :"순번", //보안 티켓 순번 -> 순번
					reqProTypeNm :"처리 유형",
					processNm :"프로세스명",
					flowNm : "단계명",
					reqNm : "제목",
					tplNm : "분류",
					reqAcdType : "사고 유형",
					reqAcceptTxt : "반려 사유",
					reqApplyTxt : "적용 실패 사유",
				},
				acdt :{
					reqNm : "제목",
				},
				usrInfoChange : "사용자 정보 변경",
				xtnReqCnt : "연장 ${1}번",
				xtnTerminate : "해지",
			},
			placeholder :{
				req :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					reqNm : "제목",
				}
			},
			message :{
				content : {
					notProcess : "배정된 프로세스 없음",
				},
				alert :{
					notAuthority : {
						copy : "보안정책 신청서 복사 권한이 없습니다.",
						reSend : "보안정책 신청서 재상신 권한이 없습니다.",
					}
				}
			}
		},
		// 연장 신청 기간 설정 팝업
		tpl1103:{
			title : {
				main:{
					default : "연장 신청 목록 및 기간 지정",
				}
			},
			label :{
				reqOrd : "순번",
				reqNm : "보안 티켓 명",
				oriDateRange : "기존 신청 기간",
				maxDateRange : "최대 신청 가능 기간",
				newDateRange : "신청 기간",
				usrDateRange : "사용자 지정",
				xtn:{
					"01" : "[연장] ",
				},
			},
			placeholder :{
				dateRange : "신청 기간"
			}
		},
		// 연장/회수 신청된 보안 티켓 확인용 팝업
		tpl1104:{
			title :{
				main : {
					default : "연장/회수 신청 완료",
				},
				selectReqInfo : "선택 보안 티켓 정보",
				reqItem : "요청 기본 항목",
				xtnList : "연장/회수 목록",
				xtnExtensionList : "연장 보안 티켓 목록",
				xtnTerminateList : "해지 보안 티켓 목록",
			},
			label :{
				regUser : {
					usrNm :"작성자 명",
					email :"작성자 e-mail",
					deptNm : "작성자 소속",
					tel :"작성자 연락처",
				},
				reqInfo :{
					prj :"프로젝트",
					reqDtm :"요청 일자",
					reqGrpNm :"그룹 보안 티켓 제목",
					reqNm : "요청 제목",
					reqDesc :"요청 내용",
				},
			},
			tpl1104ReqTable :{
				tooltip :{
					select : "보안 티켓 조회",
				},
				field:{
					reqGrpNm : "그룹 보안 티켓 명",
					reqUsrEmail :"요청자 이메일",
					reqUsrNum :"요청자 연락처",
					reqKey :"보안 티켓 키",
					tplBeforeRange : "기존 기간",
					tplAfterRange : "연장 기간",
				},
			},
			message:{
				content:{
					reqCover : "보안 티켓을 선택해주세요.",
				},
				deleteTemplateItem : "현재 양식에서 삭제된 항목입니다.",
			}
		},
		//단계 항목 생성 팝업
		tpl1105 : {
			title:{
				main:{
					default : "단계 입력 폼 생성",
				},
			},
			tooltip:{
				compact : "전체 정렬",
				reset :"초기화",
				allDelete : "전체 삭제",
				newWidget : "신규 목록",
				trashWidget : "삭제 목록",
				closeSetting : "설정창 닫기",
			},
			message : {
				content:{
					dontDragAddItem : "Drag & Drop으로 추가 할 수 없습니다.(+ 버튼을 클릭하여 추가하세요.)",
					dontDragDelItem : "Drag & Drop으로 삭제 할 수 없습니다.(휴지통 버튼을 클릭하여 삭제하세요.)",
					dontDeleteItem : "해당 항목은 삭제 할 수 없습니다.",
				},
			}
		},
		//양식 다운로드 팝업 -> 신청서 선택 엑셀 다운로드 팝업
		tpl1106 : {
			title:{
				main:{
					default : "신청서 선택 다운로드",
				},
				common : "신청서 목록",
				tplItemList : "신청서 구성",
				tplAcceptInfo : "신청서 접수 기본항목 구성",
			},
			tooltip:{
			},
			treetable:{
				tooltip :{
					select : "신청서 목록 조회",
				},
			},
			message : {
				alert:{
					noSelectTpl : "신청서를 선택해주세요.",
					selectContents : "디렉토리나 구분선이 아닌<br/>신청서를 선택해주세요.",
					selectUse : "사용중인 신청서를 선택해주세요.",
				},
				/*
				confirm:{
					selectDownload : "선택한 티켓 업로드 양식을 다운로드하시겠습니까?",
				},
				*/
			}
		},
		//양식 일괄 업로드 팝업
		tpl1107 : {
			title:{
				main:{
					default : "티켓 일괄 업로드",
				},
				common : "양식 목록",
				tplItemList : "양식 내용",
				errorMessage:"에러 메세지",
			},
			placeholder :{
				notFile :"파일이 없습니다.",
			},
			button :{
				save:"저장",
			},
			tooltip:{
			},
			treetable:{
				tooltip :{
					select : "양식 목록 조회",
				},
			},
			datatable :{
				button :{
					fileChoose:"파일 선택",
					upload:"업로드", 
					check:"데이터 확인",
					rowInsert:"행 추가",
					delete:"행 제거",
					reset:"초기화",
				},
				tooltip:{
					upload:"파일 업로드", 
					check:"데이터 확인",
					rowInsert:"행 추가",
					delete:"선택 정보 제거",
					reset:"입력 초기화",
				},
				label:{
					header:{
						selectN: "(${1}개 선택)",
						selectMinMax: "(최소${1}개에서 최대${2} 선택 가능)",
					}
				},
			},
			message : {
				alert:{
					noSelectTpl : "티켓 양식을 선택해주세요.",
					selectContents : "디렉토리나 구분선이 아닌<br/>티켓 양식을 선택해주세요.",
					selectUse : "사용중인 티켓 양식을 선택해주세요.",
					invalidData : "유효하지 않은 값이 입력되어 있습니다.",
					
					selectFile:"업로드할 파일을 선택해주세요.",
					invalidFile:"유효하지 않은 첨부파일입니다.",
					alreadyInsertFile:"이미 업로드한 파일입니다.",
					isEmpty: "필수값 입력을 완료해주세요.",
					noData:"데이터 확인을 위한 업로드 데이터가 없습니다.",
					isNotChecked:"데이터 확인을 진행해주세요.",
					cantRead:"업로드 할 수 없는 내용이 포함 되어있습니다.(빈 값 혹은 잘못된 값)",
				},
				confirm:{
					selectDownload : "선택한 티켓 업로드 양식을 다운로드하시겠습니까?",
					reset:"입력중인 정보를 초기화 하시겠습니까?",
					insert:"입력하신 정보로 등록하시겠습니까?",
					move:"진행중인 작업이 있습니다.<br/>이동하시겠습니까?",
				},
				loading:{
					dataCheck:"데이터 정보를 확인하는 중입니다.<br/>잠시만 기다려주세요.",
					readData:"엑셀 데이터를 읽어오는 중입니다.<br/>잠시만 기다려주세요.",
				},
				dataCheck:{
					notExist:{
						"06": "${1}행 ${2}(은/는) 최대 지정 기간에 유효하지 않은 기간입니다.<br/>",
						"08": "${1}행 ${2}(은/는) 등록되지 않거나 유효하지 않은 옵션ID입니다.(개수 불일치 포함)<br/>",
						"09": "${1}행 ${2}(은/는) 등록되지 않은 사용자ID입니다.<br/>",
						10: "${1}행 ${2}(은/는) 등록되지 않거나 유효하지 않은 공통코드입니다.<br/>",
						11: "${1}행 ${2}(은/는) 등록되지 않은 조직ID입니다.<br/>",
						12: "${1}행 ${2}(은/는) 등록되지 않거나 유효하지 않은 공통코드입니다.<br/>",
						14: "${1}행 ${2}(은/는) 등록되지 않거나 유효하지 않은 공통코드입니다.<br/>",
						15: "${1}행 ${2}(은/는) 등록되지 않은 정보자산ID입니다.<br/>",
					},
				},
				validate:{
					cmmErrorMsg:"${1}행 ${2}<br/>",
					essential:"${1}행 ${2}(은/는) 필수값입니다<br/>",
					essentialArmTem:"${1}행 ${2}(은/는) 알림 설정 값이 '01'인 경우 필수로 입력해야 합니다.<br/>",
				},
				describe:{
					row1:"* 사용 방법",
					row2:"- 엑셀파일은 두개의 시트가 필요합니다. 업로드할 사용자 정보는 두번째 시트에 입력해야 합니다.",
					row3:"- 첫번째 시트의 작성 가이드, 세번째 시트부터의 작성 참고 데이터 목록을 참조하여 작성해야 합니다.",
					row4:"- (*) 항목은 필수 입력사항입니다.",
					row5:"- 행과 행사이에 빈 행이 들어갈 수 없습니다.(연속된 행 조건)",
					row6:"- 요청일과 일자항목은 (YYYY-MM-DD) 형태이며, 해당 셀은 날짜형식이어야 합니다.",
					row7:"- ID값을 기준으로 정보가 입력됩니다.",
				},
			}
		},
		tpl1108 : {
			title:{
				main:{
					default : "항목 검색",
				},
			},
			label: {
				searchTarget: "검색 대상",
				tpl: "신청서",
				process: "프로세스",
				flow: "단계",
				tplItem: "항목",
				searchData: "검색어"
			}
		},
		//자료정보 상세 팝업
		tpl1109:{
			title :{
				main:{
					dta : "자료정보 상세",
				},
				regUsrInfo : "작성자 정보",
				reqInfo : "정보",
				tplInfo : "양식 내용",
				acdtReqInfo : "신고 내용",
			},
			label : {
				dta :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					prj : "프로젝트",
					dtaNm : "자료 제목",
					tplNm : "자료 양식명",
				},
			},
			placeholder :{
				req :{
					regUsrNm : "작성자명",
					regUsrEmail : "작성자 e-mail",
					regUsrDeptNm : "작성자 소속",
					regUsrNum : "작성자 연락처",
					dtaNm : "자료제목",
				}
			},
		},
		//보고서 출력
		rpt1000:{
			title:{
				main:{
					default : "보고서 출력",
				}
			},
			datatable:{
				button:{
					rptPrint:"보고서 출력",
				},
				tooltip:{
					select:"데이터 조회",
					rptPrint:"보고서 출력",
				},
				field:{
					prjGrpNm:"프로젝트 그룹명",
				},
				contextmenu:{
					detail:"보안 티켓 상세",
					print:"보고서 출력"
				}
			},
			message:{
				selectOne:"보안 티켓을 한건만 선택해주세요.",
			},
		},
		// 보안 티켓 결과보고서 미리보기
		rpt1001:{
			title:{
				main:{
					default : "보안 티켓 결과보고서",
				},
			},
			label:{
				title:"보안 티켓 결과 보고서",
				reqInfo:"보안 티켓 정보",
				prjGrpNm:"프로젝트 그룹 명",
				prjNm:"프로젝트 명",
				processNm:"프로세스 명",
				reqOrd:"보안 티켓 순번",
				reqNm:"요청 제목",
				reqDesc:"요청 내용",
				reqChargerInfo : "보안 티켓 책임자 정보",
				division:"구분",
				reqInfo:"요청자 정보",
				chargerInfo:"담당자 정보",
				reqGrpInfo : "그룹 보안 티켓 정보",
				reqGrpNm:"그룹 보안 티켓 제목",
				reqGrpOrd:"그룹 보안 티켓 순번",
				reqGrpDesc:"그룹 보안 티켓 내용",
				reqGrpChargerInfo : "그룹 보안 티켓 책임자 정보",
				stepInfo:"단계별 항목 정보",
				atchFileList : "첨부파일 목록",
				signProgress : "결재 진행",
				checker:"검토자",
				signInfo:"결재 정보",
				flowNm:"단계명",
				signContent : "반려 사유",
				changeInfo:"변경 정보",
				changeLogInfo:"변경 이력 정보",
				dtm:"일시",
				content:"내용",
				chargerNm:"담당자 명",
				lastSigner:"최종 결재자",
				signRjt: "반려",
				flowChg : "작업 흐름 변경",
				beforeFlowNm : "이전 작업흐름",
				changeFlowNm : "변경 작업흐름",
				chargerChg : "담당자 변경",
				beforeCharger : "이전 담당자",
				changeCharger : "변경 담당자",
				accept : "접수 승인",
				signPerson : "접수 승인자",
				drafting:"기안",
			},
			button:{
				print:"출력",
			},
		},
		// TODO 페이지 부재
		// 보안 티켓 처리결과서
		rpt1100:{
			title:{
				main:"보안 티켓 처리결과서",
			},
			datatable:{
				tooltip:{
					rptPrint:"출력 단계 선택",
					dblClick:"출력 단계 선택",
				},
				button:{
					rptPrint:"출력 단계 선택",
				},
				field:{
					prjGrpNm:"프로젝트 그룹 명"
				},
				contextmenu:{
					detail:"보안 티켓 상세",
					print:"출력 단계 선택"
				}
			}
		},
		// 보안 티켓 단계 선택 팝업
		rpt1101:{
			title:{
				main:"간이 이력",
				splHis:"보안 티켓 간이 이력"
			},
			button:{
				print:"출력"
			},
			message:{
				selectFlow:"출력할 단계를 선택해주세요.",
			}
		},
		// 보안 티켓 처리결과서 출력 미리보기 팝업
		rpt1102:{
			title:{
				main:"보안 티켓 처리결과서 미리보기"
			},
			label:{
				title:"보안 티켓 처리 결과서",
				reqInfo:"보안 티켓 정보",
				prjGrpNm:"프로젝트 그룹 명",
				prjNm:"프로젝트 명",
				processNm:"프로세스 명",
				reqOrd:"보안 티켓 순번",
				reqNm:"요청 제목",
				reqDesc:"보안 티켓 내용",
				division:"구분",
				dept:"소속",
				name:"이름",
				email:"이메일",
				telno:"연락처",
				reqInfo:"요청자 정보",
				chargerInfo:"담당자 정보",
				reqGrpNm:"그룹 보안 티켓 제목",
				reqGrpOrd:"그룹 보안 티켓 순번",
				reqGrpDesc:"그룹 보안 티켓 내용",
				stepInfo:"단계별 항목 정보",
				signInfo:"결재 정보",
				flowInfo:"단계별 정보",
				changeInfo:"변경 정보",
				changeLogInfo:"변경 이력 정보",
				dtm:"일시",
				content:"내용",
				atchFileList:"첨부파일 목록",
				reqContent:"요청 내용",
				reqStDtm:"작업 시작 일시",
				reqStDuDtm:"작업 시작 예정 일시",
				reqEdDtm:"작업 종료 일시",
				reqEdDuDtm:"작업 종료 예정 일시",
			},
			button:{
				print:"출력"
			}
		},
		// 프로젝트 결과보고서
		rpt1200:{
			title:{
				main:"프로젝트 결과보고서",
				selectedPrj:"프로젝트",
			},
			label:{
				authGroupInfo:"권한 그룹 정보",
				printOption:"출력 옵션",
				range:"기간",
			},
			tooltip:{
				rptPrint:"보고서 출력",
			},
			button:{
				rptPrint:"보고서 출력",
			},
		},
		// 프로젝트 결과보고서 미리보기
		rpt1201:{
			title:{
				main:"프로젝트 결과보고서"
			},
			label:{
				imm:"임박",
				comp:"여유",
				excess:"초과",
				bandit:"적기",
				deptInfo:"조직별 정보",
				deptReqCnt:"조직별 보안 티켓 수",
				deptNm:"조직명",
				reqCnt:"보안 티켓 수",
				deptReqProcess:"조직별 처리율",
				process:"처리율",
				authInfo:"권한 그룹별 정보",
				authReqCnt:"권한 그룹별 보안 티켓 수",
				authNm:"권한 그룹 명",
				authProcess:"권한 그룹별 처리율",
				info:"정보",
				processRatio:"프로세스 별 보안 티켓 처리율",
				misInfo:"마일스톤 정보",
				sprInfo:"스프린트 현황 정보",
				select:"범위별 데이터 선택",
				title:"프로젝트 실적 보고서",
				nowTime:"기준 일시: ",
				prjNm:"프로젝트 명",
				prjRange:"프로젝트 기간",
				typeCd:"처리 상태",
				processInfo :"프로세스별 정보",
				processReqCnt:"프로세스 별 보안 티켓 수",
				fail:"실패",
				misNm : "마일스톤 명",
				misDtm : "마일스톤 기간",
				misPercentage : "진행률",
				misDesc : "마일스톤 내용",
				misReqTypeChart : "배정 보안 티켓 처리 상태 별 수",
				misProcessChart : "프로세스 별 보안 티켓 단계율",
				reqCnt : "보안 티켓 건 수",
				reqStay : "접수 대기",
				reqIn : "처리 중",
				reqOut : "접수 반려",
				reqDone : "완료",
				reqOutApprove : "결재 반려 종료",
				reqOutProgress : "중간 종료",
				reqInProgress:"처리중",
				reqTotal : "합계",
				reqAll : "전체",
				req : "보안 티켓",
				misDocList : "산출물 목록",
				reqType:"Number of requirements processing status",
				proReqType:"Process Number of requirements processing status",
				daily:"일별",
				weekly:"주별",
				monthly:"월별",
				quater:"분기별",
				half:"반기별",
				yearly:"연도별",
				quater:"분기",
				reqTypeCnt:"보안 티켓 처리상태별 수",
				processTypeCnt:"프로세스별 보안 티켓 처리 상태별 수",
			},
			rangeReqCntChart:{
				label:{
					reqAllCnt:"총 보안 티켓",
					reqEndCnt:"최종완료 보안 티켓",
				}
			},
			rangeReqRatioChart:{
				label:{
					reqEdRatio:"범위별 처리율"
				}
			},
			deptReqCntChart:{
				label:{
					reqAllCnt:"총 보안 티켓",
					reqEndCnt:"최종완료 보안 티켓",
				}
			},
			deptReqRatioChart:{
				label:{
					reqEdRatio:"조직별 처리율",
				}
			},
			authReqCntChart:{
				label:{
					reqAllCnt:"총 보안 티켓",
					reqEndCnt:"최종완료 보안 티켓",
				}
			},
			authReqRatioChart:{
				label:{
					reqEdRatio:"권한 그룹별 처리율",
				}
			},
			processReqCntChart:{
				label:{
					reqAllCnt:"총 보안 티켓",
					reqEndCnt:"최종완료 보안 티켓",
				}
			},
			processRatioChart:{
				label:{
					reqEdRatio:"프로세스별 처리율",
				}
			},
			processMonthRatioChart:{
				label:{
					processNm:"프로세스 명",
					monthRatio:"프로세스별 처리율"
				}
			},
			reqTypeChart:{
				title: "배정 보안 티켓 처리 상태",
				label:{
					keyName : "보안 티켓 건수",
					reqAll : "전체",
					reqStay : "접수 대기",
					reqIn : "처리 중",
					reqOut : "접수 반려",
					reqDone : "완료",
					reqOutApprove : "결재 반려 종료",
					reqOutProgress : "중간 종료",
				}
			},
			processChart:{
				title:"프로세스 별 보안 티켓 처리",
				label:{
					reqAll : "전체",
					reqStay : "접수 대기",
					reqIn : "처리 중",
					reqOut : "접수 반려",
					reqDone : "완료",
					reqOutApprove : "결재 반려 종료",
					reqOutProgress : "중간 종료",
				}
			},
			burnUpChart:{
				label:{
					idealLine:"이상적인 번업 라인",
					realLine:"실제 번업 라인"
				}
			},
			burnDownChart:{
				label:{
					idealLine:"이상적인 번다운 라인",
					realLine:"실제 번다운 라인"
				}
			},
			VelocityChart:{
				label:{
					realSpr:'실제 스토리포인트',
					idealSpr:"이상적인 스토리포인트",
					realSpeed:"실제 속도",
					idealSpeed:"이상적인 속도",
				}
			},
			button:{
				print:"출력"
			},
			message:{
				loadData:"데이터를 불러오는 중 입니다.",
			}
		},
		//보안이벤트 서버 이력 조회
		//이상징후 서버 이력 조회
		stm12200:{
			title : {
				
			},
			label:{
				add : "추가",
				modify : "수정",
				connect : "연결",
				delete : "삭제",
				disconnect : "연결 해제"
			},
			datatable:{
				tooltip:{
					select: "보안이벤트 서버 이력 조회",
					detail : "상세보기"
				}
			}
		},
		// 정보자산관리
		cim1000:{
			title:{
				main: {
					default : "정보자산 관리",
					insert : "정보자산 등록",
					update : "정보자산 수정",
					detail : "정보자산 상세",
					move : "정보자산 이동",
					copy : "정보자산 복사",
					info : "정보자산 정보",
					hist : "정보자산 이력",
					tree : "정보자산 트리",
					check : "정보자산 서버 체크",
				},
				metaInfo : "선택 정보자산 정보",
				reqList : "배정 보안 티켓 목록",
				reqListSelect : "배정 보안 티켓 조회",
				nonReqList : "미 배정 보안 티켓 목록",
				nonReqListSelect : "미 배정 보안 티켓 조회",
			},
			tab:{
				detail : "상세 정보",
				cimCmp : "구성 정보자산",
				cimUsing : "사용중 정보자산",
				reqLink : "연결 티켓"
			},
			label:{
				searchInfo :"선택 기록&nbsp;:&nbsp;",
				cimRute : "정보자산 경로",
				cimRuteNm : "정보자산 명",
				chkStateYn : "상태 체크 유무",
				chkType : "체크 타입",
				url : "URL",
			},
			placeholder :{
				cimRuteNm : "정보자산 명",
				url : "SITE URL",
			},
			button:{
				complete: "저장",
				tplinsert : "정보자산 양식 추가",
				ciminsert : "정보자산 폴더 추가",
			},
			tooltip:{
				detail : "상세",
			},
			cim1000Tree:{
				button:{
					stateCheck : "상태체크",
				},
				tooltip:{
					move : "정보자산 이동",
					copy: "정보자산 복사",
					select : "정보자산 조회",
					tplinsert : "정보자산 양식 추가",
					insertCim : "정보자산 폴더 추가",
					stateCheck : "정보자산 상태체크",
					update : "정보자산 수정",
					delete : "정보자산 삭제",
					detail : "정보자산 상세",
				},
				contextmenu:{
					detail : "정보자산 상세"
				},
			},
			message : {
				alert:{
					selCim : "정보자산을 선택해주세요.",
					isNotUsed : "사용중인 정보자산이 아닙니다.",
					cantUpdateRoot: "ROOT는 수정할 수 없습니다.",
					cantDeleteRoot: "ROOT는 삭제할 수 없습니다.",
					cantDeleteSubCim: "선택된 정보자산을 하위 구성으로 포함하는 정보자산이 있어 삭제 할 수 없습니다. 하위 정보자산에서 먼저 삭제해주세요.",
					cantSelectRoot: "ROOT는 조회 할 수 없습니다.",
				},
				confirm:{
					selCimDelete : "정보자산을 삭제하시겠습니까?",
				},
				content:{
					selectTpl : "양식 목록에서 항목을 먼저 선택하세요.",
				},
				//TODO
				isDeletedItem : "현재 삭제된 항목입니다.",
				conSubCim:'정보자산[${1}]의 [${2}]에 ${3}되었습니다.',
			},
		},
		//정보자산 서버 체크 팝업
		cim1001:{
			title:{
				main:{
					default : "정보자산 서버 체크"
				},
				chkTarget : "서버 상태 체크 대상",
			},
			cim1001CfgTable:{
				button:{
					allConnect : "전체 서버 확인",
					selConnect : "선택 서버 확인",
					detail : "연결 확인 상세",
				},
				tooltip:{
					select : "정보자산 조회",
					allConnect : "전체 서버 확인",
					selConnect : "선택 서버 확인",
					detail : "연결 확인 상세",
				}
			},
			message:{
				alert:{
					selectData : "정보자산을 선택해주세요.",
				}
			}
		},
		//정보자산 상세 팝업
		cim1002:{
			title:{
				main:{
					default : "정보자산 상세",
				},
				metaInfo : "선택 정보자산 정보",
			},
			tab:{
				detail : "상세 정보",
				cimCmp : "구성 정보자산",
				cimUsing : "사용중 정보자산",
				reqLink : "연결 티켓"
			},
			label:{
				searchInfo :"선택 기록&nbsp;:&nbsp;",
				cimRuteNm : "정보자산 명",
				metaInfo:"메타 정보",
				changeBefore:"변경 전",
				changeAfter:"변경 후",
				connection:"연결",
				disConnection:"해제",
				regUsr:"등록자",
				insertLocation:"등록 위치",
				item:"항목",
				end:"종료",
				companion:"반려",
				cimSelectLog:"정보자산 선택 기록",
				cimRute : "정보자산 경로",
				chkStateYn : "상태 체크 유무",
				chkType : "체크 타입",
				url : "URL",
				reqInfo : "보안 티켓 배정 정보",
				cimMetaRute : "선택된 정보자산을 하위 구성으로 포함하는 정보자산",
				sub : "하위",
				cim : "정보자산",
				req : "보안 티켓"
			},	
			placeholder :{
				cimRuteNm : "정보자산 명",
				url : "SITE URL",
			},
			tooltip:{
				detail : "상세",
			},
			message:{
				alert:{
					deleteItem:"현재 양식에서 삭제된 항목입니다.",
				},
				content:{
					cfgAdd:" 항목이 추가되었습니다.",
					cfgInsert:"(이)가 신규 등록되었습니다",
					cfgInput:"(이)가 입력되었습니다.",
					cfgDelete:" 항목이 제거되었습니다.",
					addFile: "에 첨부파일이 추가되었습니다.",				
					deleteFile: "에 첨부파일이 제거되었습니다.",
					updateItem: " (이)가 수정되었습니다.",
					conSubCim:'정보자산[${1}]의 [${2}]에 ${3}되었습니다.',
				},
				//TODO
				disconnectReq:"선택한 보안 티켓을 연결 제외 하시겠습니까?",
				notExist : "존재하지 않습니다.",
			}
		},
		//정보자산 트리 선택
		cim1003:{
			title:{
				main: {
					select : "정보자산 선택",
					move : "정보자산 이동",
					copy : "정보자산 복사",
				},
			},
			button:{
				complete: "완료",
				save : "저장",
				select : "선택"
			},
			message: {
				alert : {
					noMoveSelf : "본인 하위의 정보자산으로 이동시킬 수 없습니다.",
					noSelectSelf : "본인은 선택 할 수 없습니다."
				},
				confirm : {
					copy : "선택한 정보자산을 복사하시겠습니까?",
					move : "선택한 정보자산 하위로 이동시키겠습니까?"
				},
			}
		},
		//정보자산 현황
		cim1100:{
			title:{
				main:{
					default : "정보자산 현황 정보",
				},
				metaInfo : "선택 정보자산 정보",
			},
			tab:{
				detail : "상세 정보",
				cimCmp : "구성 정보자산",
				cimUsing : "사용중 정보자산",
				reqLink : "연결 티켓"
			},
			label:{
				searchInfo :"선택 기록&nbsp;:&nbsp;",
				cimRuteNm : "정보자산 명",
				chkStateYn : "상태 체크 유무",
				chkType : "체크 타입",
				url : "URL",
				id : "ID",
				pw : "PW",
				/*
				memberCnt:"등록 정보자산 수 : ",
				logMetatCnt:"이벤트서버 메타정보 수 : ",
				webMeataCnt:"WEB 서버 메타정보 수 : ",
				jeusMetaCnt:"JEUS 메타정보 수 : ",
				dbMetaCnt:"DB 메타정보 수 : ",
				etcCnt:"기타 수 : ",
				cim: "구성 항목",
				selectLog:"선택 기록",
				selectCimMetaInfo : "선택 정보자산 메타정보",
				cimPath:"정보자산 경로",
				*/
			},
			placeholder :{
				cimRuteNm : "정보자산 명",
				url : "SITE URL",
				id : "SITE ID",
			},
			tooltip:{
				detail : "상세",
			},
			cim1000Tree:{
				button:{
					stateCheck : "상태체크",
				},
				tooltip:{
					select : "정보자산 조회",
					stateCheck : "정보자산 상태체크",
					stateCheck : "상태체크",
					update : "정보자산 수정",
					delete : "정보자산 삭제",
					detail : "정보자산 상세",
				},
				contextmenu:{
					detail : "정보자산 상세"
				}
			},
			message:{
				alert:{
					selCim : "정보자산을 선택해주세요.",
					isNotUsed : "사용중인 정보자산이 아닙니다.",
					cantUpdateRoot: "ROOT는 수정할 수 없습니다.",
					cantDeleteRoot: "ROOT는 삭제할 수 없습니다.",
					cantDeleteSubCim: "선택된 정보자산을 하위 구성으로 포함하는 정보자산이 있어 삭제 할 수 없습니다. 하위 정보자산에서 먼저 삭제해주세요.",
					cantSelectRoot: "ROOT는 조회 할 수 없습니다.",
				},
				content:{
					selectTpl : "양식 목록에서 항목을 먼저 선택하세요.",
				},
			}
		},
		//정보자산 서비스 배정 관리
		cim1200:{
			title:{
				main:{
					default : "정보자산 서비스 배정 관리",
				},
				reqProcess : "정보자산 진행 보안 티켓 목록",
				reqNotLink : "미 연결 보안 티켓 목록",
			},
			cim1200Tree:{
				tooltip:{
					select : "정보자산 조회",
				},
				contextmenu:{
					detail : "정보자산 상세"
				}
			},
			cim1200LinkReqTable:{
				tooltip:{
					disconnectReq : "선택 보안 티켓 연결 제외",
					reqLinkList : "연결 보안 티켓 목록 조회",
				}
			},
			cim1200NotLinkReqTable:{
				tooltip:{
					connectReq : "선택 보안 티켓 연결",
					reqNotLinkList : "미 연결 보안 티켓 목록 조회",
				}
			},
			message:{
				alert:{
					selectCim : "정보자산을 선택해주세요.",
				},
				confirm:{
					disconnect : "선택한 보안 티켓을 연결 제외 하시겠습니까?",
					connect : "선택한 요구사항을 연결 하시겠습니까?",
				},
				content:{
					selectTpl : "양식 목록에서 항목을 먼저 선택하세요.",
				}
			}
		},
		//전체 정보자산 이력 조회
		cim1300:{
			title:{
				main:{
					default : "전체 정보자산 이력 조회"
				}
			},
			label:{
				cimSelectLog:"정보자산 선택 기록",
				metaInfo:"메타 정보",
				insertLocation:"등록 위치",
				item:"항목",
				changeBefore:"변경 전",
				changeAfter:"변경 후",
				connection:"연결",
				disConnection:"해제",
				end:"종료",
				companion:"반려",
				regUsr:"등록자",
			},
			message:{
				alert:{
					noUsr : "사용자 정보가 없습니다.",
				},
				/*
				cfgAdd:" 항목이 추가되었습니다.",
				disconnectReq:"선택한 보안 티켓을 연결 제외 하시겠습니까?",
				deleteItem:"현재 양식에서 삭제된 항목입니다.",
				cfgInsert:"(이)가 신규 등록되었습니다",
				cfgInput:"(이)가 입력되었습니다.",
				cfgAdd:" 항목이 추가되었습니다.",
				cfgDelete:" 항목이 제거되었습니다.",
				addFile: "에 첨부파일이 추가되었습니다.",				
				deleteFile: "에 첨부파일이 제거되었습니다.",
				updateItem: " (이)가 수정되었습니다.",
				*/
			}
		},
		//보안 법률 정보
		inf1000:{
			datatable:{
				tooltip: {
					select:"법률 조회",
					delete:"법률 삭제",
					detail:"법률 상세",
					lawConOpt: "법률 연동 설정",
				},
				label: {
					lawConOpt: "법률연동설정",
					subscribe: "구독"
				},
				contextmenu: {
					detail: "법률 상세",
					delete: "법률 삭제",
				}
			},
		},
		//보안 법률 상세 정보
		inf1001: {
			title: {
				modal: {
					detail : "보안 법률 상세 정보"
				}
			},
			label: {
				actNm: "법률 명",
				pmgNum: "공포번호",
				pmgDt: "공포일자",
				enfDt: "시행일자",
				lawCd: "법령종류",
				revNm: "재정.개정 구분",
				minNm: "소관부처",
				con: "법률 내용"
			},
			placeholder : {
				actNm: "법률 명",
				pmgNum:"공포번호",
				pmgDt: "공포일자",
				enfDt: "시행일자",
				lawCd: "법령종류",
				revNm: "재정.개정 구분",
				minNm: "소관부처",
			}
		},
		//보안 법률 연동 설정 정보
		inf1002: {
			title: {
				modal : {
					lawConOpt: "보안 법률 연동 설정 정보"
				}
			},
			datatable: {
				tooltip: {
					select : "보안 법률 연동 설정 정보 조회",
					insert : "보안 법률 연동 설정 정보 추가",
					update : "보안 법률 연동 설정 정보 수정",
					delete : "보안 법률 연동 설정 정보 삭제"
				},
				contextmenu: {
					update : "연동 설정 수정",
					delete : "연동 설정 삭제"
				}
			},
			message : {
				info : "배치 시간에 해당 설정한 연동 대상 법률 정보가 연동됩니다."	
			}
		},
		//보안 법률 연동 설정 추가/삭제
		inf1003: {
			title : {
				modal : {
					insert : "법률 연동 설정 등록",
					update : "법률 연동 설정 수정"
				}
			},
			label: {
				actNm: "법률 명",
				minNm: "소관부처"
			},
			placeholder: {
				actNm: "법률 명",
				minNm: "소관부처"
			},
			button: {
				insert: "등록",
				update: "수정"
			},
			message : {
				alert : {
					nullStop : "입력값이 없습니다."
				},
				confirm: {
					insert: "연동 설정 정보를 등록하시겠습니까?",
					update: "연동 설정 정보를 수정하시겠습니까?"
				}
			}
		},
		//보안정책 조회
		inf1100:{
			title:{
				modal:{
					detail : "보안 정책 상세",
					structure : "보안 정책 구조도",
				},
			},
			datatable :{
				tooltip :{
					selectInf:"보안정책 목록 조회",
					fileDownload:"파일 다운로드",
					showStructure:"구조도",
				},
				contextmenu:{
					infDetail: "보안 정책 상세 정보",
				},
				button:{
					showStructure:"구조도",
				}
			},
			message:{
				alert : {
					noData : "${1} 데이터가 없습니다.",
				},
			},
		},
		//보안정책 관리
		inf1200:{
			title:{
				modal:{
					insert : "보안 정책 등록",
					update : "보안 정책 수정",
					updateList : "보안 정책 목록",
					detail : "보안 정책 상세",
					structure : "보안 정책 구조도",
				},
			},
			datatable :{
				tooltip :{
					selectInf:"보안정책 목록 조회",
					insertInf:"보안정책 추가",
					updateInf:"보안정책 수정",
					deleteInf:"보안정책 삭제",
					fileDownload:"파일 다운로드",
				},
				contextmenu:{
					infDetail: "보안 정책 상세 정보",
					infUpdate: "보안 정책 수정",
					infDelete: "보안 정책 삭제",
				},
			},
			message:{
				alert : {
					noData : "${1} 데이터가 없습니다.",
				},
				confirm : {
					selectJob: "수행할 작업을 선택하세요.",
					deleteInf: "보안 정책을 삭제하시겠습니까?",
				},
				content : {
				},
			},
		},
		
		//보안정책 등록 수정 팝업
		inf1201:{
			label :{
				title : "보안 정책 제목",
				division : "구분",
				revisionNum : "개정번호",
				writeDt : "작성일",
				deptNm : "관리부서명",
				usrNm : "작성자명",
				content : "보안 정책 내용",
				changeContent : "보안 정책 변경사항",
				file : "첨부파일",
				compareFile : "신구 대조표",
				tag : "태그",
				preInfList : "기존 보안정책 목록",
			},
			button : {
				complete: "완료",
				update: "수정",
			},
			message : {
				alert : {
					plcFileCnt: "첨부파일을 필수로 첨부해야합니다.",
					tagCnt : "태그는 ${1}개를 필수로 첨부해야합니다.",
					changeTogether : "보안 정책 내용과 첨부파일 모두 수정되지 않았습니다.<br/>모두 수정 후 다음 작업을 진행해주세요.",
					deptId : "부서 검색을 통해서 부서를 선택해야합니다.",
				},
				confirm : {
					insert: "보안 정책 등록을 완료하시겠습니까?",
					update: "보안 정책 수정을 완료하시겠습니까?",
				},
			}
		},
		
		//보안정책 상세 팝업
		inf1202:{
			label :{
				title : "보안 정책 제목",
				division : "구분",
				revisionNum : "개정번호",
				writeDt : "작성일",
				deptNm : "관리부서명",
				usrNm : "작성자명",
				content : "보안 정책 내용",
				changeContent : "보안 정책 변경사항",
				file : "첨부파일",
				compareFile : "신구 대조표",
				tag : "태그",
				preInfList : "기존 보안정책 목록",
			},
		},
		
		//보안정책 수정 목록 팝업
		inf1203:{
			title:{
				modal:{
					update : "보안 정책 수정",
				},
			},
			datatable :{
				tooltip :{
					selectInf:"보안정책 목록 조회",
					updateInf:"보안정책 수정",
				},
				contextmenu:{
					infUpdate: "보안 정책 수정",
				},
			},
		},
		
		//보안정책 히스토리
		inf1300:{
			title:{
				modal:{
					detail : "기존 보안 정책 상세",
				},
			},
			datatable :{
				tooltip :{
					selectInf:"보안정책 목록 조회",
					fileDownload:"파일 다운로드",
				},
				contextmenu:{
					infDetail: "보안 정책 상세 정보",
				},
			},
			message:{
				alert : {
					noData : "${1} 데이터가 없습니다.",
				},
			},
		},
		
		//보안정책 기존 상세 팝업
		inf1301:{
			label :{
				title : "보안 정책 제목",
				division : "구분",
				revisionNum : "개정번호",
				writeDt : "작성일",
				deptNm : "관리부서명",
				usrNm : "작성자명",
				content : "보안 정책 내용",
				changeContent : "보안 정책 변경사항",
				file : "첨부파일",
				compareFile : "신구 대조표",
				tag : "태그",
				preInfList : "기존 보안정책 목록",
			},
		},
		
		//정보교육 관리
		inf2000:{
			title:{
				modal:{
					insert : "교육 이수 등록",
					update : "교육 이수 수정",
					detail : "교육 이수 상세",
					copy : "교육 이수 복사",
					mail : "교육 이수 독촉 메일 발송",
					upload : "교육 이수 엑셀 업로드",
				},
			},
			datatable:{
				tooltip:{
					select:"정보보호 교육 조회",
					insert:"정보보호 교육 등록",
					update:"정보보호 교육 수정",
					delete:"정보보호 교육 삭제",
					copy:"정보보호 교육 복사",
					mail:"메일 발송",
					download:"양식 다운로드",
					upload:"업로드",
					excel:"엑셀",
				},
				button:{
					copy : "복사",
					mail : "메일 발송",
					apiLink : "배움마당 수동 연동",
				},
			},
			message:{
				alert:{
					completionUser : "이수 완료된 교육 대상자입니다."
				},
			},
		},
		
		//정보교육 등록, 수정
		inf2001:{
			label :{
				className : "교육명",
				ipeTypCd : "교육 구분",
				revisionNum : "개정번호",
				writeDt : "작성일",
				deptNm : "관리부서명",
				usrNm : "작성자명",
				content : "보안 정책 내용",
				changeContent : "보안 정책 변경사항",
				file : "첨부파일",
				compareFile : "신구 대조표",
				tag : "태그",
				preInfList : "기존 보안정책 목록",
			},
			button : {
				complete: "완료",
				update: "수정",
			},
			message : {
				alert : {
					plcFileCnt: "첨부파일을 필수로 첨부해야합니다.",
					tagCnt : "태그는 ${1}개를 필수로 첨부해야합니다.",
					changeTogether : "보안 정책 내용과 첨부파일 모두 수정되지 않았습니다.<br/>모두 수정 후 다음 작업을 진행해주세요.",
					deptId : "부서 검색을 통해서 부서를 선택해야합니다.",
				},
				confirm : {
					insert: "보안 정책 등록을 완료하시겠습니까?",
					update: "보안 정책 수정을 완료하시겠습니까?",
				},
			}
		},
		
		//정보교육 상세
		inf2002:{
			label :{
				className : "교육명",
				ipeTypCd : "교육 구분",
				classDateRange : "교육일",
				classUsrNm : "교육 대상자",
				classUsrId : "교육 대상자 ID",
				completionStatus : "이수 여부",
				file : "첨부파일",
			},
		},
		
		//정보교육 독촉 메일
		inf2005:{
			label :{
				mailTitle : "제목",
				mailDesc : "내용",
				reciever : "수신자(TO)",
				referrer : "참조자(CC)",
			},
			button :{
				addReplyUsr : "대상자 지정",
				sendMail : "발송",
				reset : "초기화", 
			},
			message :{
				confirm :{
					sendMail : "메일을 전송하시겠습니까?",
					recResetCharge : "수신자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
					refResetCharge : "참조자 목록이 최초 상태로 변경됩니다.<br/>초기화 하시겠습니까?",
				},
				alert :{
					recieverList : "최소 1명 이상의 수신자를 선택해야합니다.",
				}
			},
			placeholder :{
				title: "제목을 입력하세요.",
				content: "내용을 입력하세요.",
			}
		},
		
		//정보교육 이수 현황
		inf2100:{
			title:{
				modal:{
					detail:"교육 이수 상세",
					userList:"교육 대상자 목록",
				},
			},
			datatable:{
				tooltip:{
					select:"교육 이수 현황 조회",
					excel:"엑셀",
				},
				field:{
					deptNm:"부서",
				},
			},
		},
		
		//정보교육 교육 대상자 목록 조회
		inf2101:{
			datatable:{
				tooltip:{
					select:"교육 대상자 목록 조회",
				},
			},
		},
		
		//정보교육 상세
		inf2102:{
			label :{
				className : "교육명",
				ipeTypCd : "교육 구분",
				classDateRange : "교육일",
				classUsrNm : "교육 대상자",
				classUsrId : "교육 대상자 ID",
				completionStatus : "이수 여부",
				file : "첨부파일",
			},
		},
		
		
		sec:{
			label : {
				usrInfoChange : "사용자 정보 변경",
				dontSubmit : "상신 불가",
			}
		},
	};
	
	return {
		// public functions
		init: function() {
			// 언어팩 목록
			var langList = ["ko"];
			
			// 언어 데이터
			var langData = {};
			
			$.each(langList, function(idx, map){
				langData[map] = lang[map];
			});
			
			$.osl.langData = langData;
			
			// datepicker 언어 처리
			$.osl.date.init();
		}
	};
}();