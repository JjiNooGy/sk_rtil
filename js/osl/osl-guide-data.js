
/**
 * function 명 : OSLCoreLangSetting function 설명 : core에서 사용되는 언어 데이터를 세팅한다.
 */
const OSLCoreGuideData = function () {
	/*
	 * 가이드 내용 데이터
	 * pageId:
	 * [
	 *	{
	 *		target(Element data-guide="target-key"): "",
	 *		title: "",
	 *		top: 0,
	 *		left: 0,
	 *		arrow:
	 *		{
	 *			start: "" (top, left, right, bottom),
	 *			end: "" (top, left, right, bottom)
	 *		},
	 *		curve: true (true, false)	,
	 *		contents:
	 *		[
	 *			{
	 *				title: "",
	 *				content: ""
	 *			}
	 *		]
	 *	}
	 * ]
	 *@desc
	 * pageId: 화면 ID
	 * [
	 *	{
	 *		target: 가이드 대상 요소 (data-giude에 입력된 key 값)
	 *		title: 가이드 상자 제목
	 *		top: 가이드 상자 위치 - 세로
	 *		left: 가이드 상자 위치 - 가로
	 *		arrow: 화살표 설정
	 *		{
	 *			start: 화살표 시작 위치 (가이드 대상 요소에서 시작)
	 *			end: 화살표 끝 위치 (가이드 상자 요소에서 종료)
	 *		},
	 *		curve: 화살표 곡선 유무
	 *		contents: 가이드 상자 상세 내용
	 *		[
	 *			{
	 *				title: 상세 내용 제목
	 *				content: 상세 내용
	 *			}
	 *		]
	 *	}
	 * ]
	 * */
	// 가이드 내용 데이터
	const guideContents = {
		"ko":{},
		"en":{}
	};
	guideContents["ko"] = {
		tpl1000:
			[
				{
					target: "tpl1000Tree",		title: "가이드 상자 제목",
					top: 100,					left: 100,
					arrow:
					{
						start: "right",			end: "bottom"
					},
					curve: true,
					contents:
					[
						{title: "양식 목록",		content: "양식 목록."},
						{title: "양식 목록2",		content: "양식 목록2."},
						{title: "양식 목록3",		content: "양식 목록3."},
						{title: "양식 목록4",		content: "양식 목록4."}
					]
				},
				{
					target: "tpl1000Tree",		title: "가이드 상자 제목",
					top: 100,					left: 100,
					arrow:
					{
						start: "right",			end: "bottom"
					},
					curve: true,
					contents:
					[
						{title: "양식 목록",		content: "양식 목록."},
						{title: "양식 목록2",		content: "양식 목록2."},
						{title: "양식 목록3",		content: "양식 목록3."},
						{title: "양식 목록4",		content: "양식 목록4."}
					]
				}
			],
		tpl1001:
			[
				{
					target: "tpl1000Tree",		title: "가이드 상자 제목",
					top: 100,					left: 100,
					arrow:
					{
						start: "right",			end: "bottom"
					},
					curve: true,
					contents:
					[
						{title: "양식 목록",		content: "양식 목록."},
						{title: "양식 목록2",		content: "양식 목록2."},
						{title: "양식 목록3",		content: "양식 목록3."},
						{title: "양식 목록4",		content: "양식 목록4."}
					]
				},
				{
					target: "tpl1000Tree",		title: "가이드 상자 제목",
					top: 100,					left: 100,
					arrow:
					{
						start: "right",			end: "bottom"
					},
					curve: true,
					contents:
					[
						{title: "양식 목록",		content: "양식 목록."},
						{title: "양식 목록2",		content: "양식 목록2."},
						{title: "양식 목록3",		content: "양식 목록3."},
						{title: "양식 목록4",		content: "양식 목록4."}
					]
				}
			],
			"dsh1100": [
				{
					"target": "dsh1100_secReq",
					"title": "보안 행정 업무",
					"top": 643,
					"left": 1441,
					"arrow": {
						"start": "left",
						"end": "top"
					},
					"curve": true,
					"contents": [
						{
							"title": "- 접수 대기",
							"content": "접수를 기다리는 접수 요청 상태의 보안 티켓 건수를 나타냅니다. <br/> (*사용자에게 접수 권한이 있을 경우에만 해당 버튼이 보여집니다.)"
						},
						{
							"title": "- 담당 완료",
							"content": "사용자가 처리자인 보안 티켓 중 처리 완료된 보안 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 무담당 티켓",
							"content": "처리자가 지정되지 않은 보안 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 담당 티켓",
							"content": "사용자가 처리자인 보안 티켓 중 처리중인 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 의견제시",
							"content": "사용자가 답변자로 지정되어 있어 답변을 해야 하는 의견제시 건수를 나타냅니다."
						},
						{
							"title": "- 담당 작업",
							"content": "사용자가 작업 대상자로 지정되어 있어 처리해야 하는 작업 건수를 나타냅니다."
						}
					]
				},
				{
					"target": "dsh1100_reqSecSig",
					"title": "보안 행정 업무 결재",
					"top": 16,
					"left": 1524,
					"arrow": {
						"start": "left",
						"end": "left"
					},
					"curve": true,
					"contents": [
						{
							"title": "- 결재 대기",
							"content": "사용자가 결재 해야 하는 보안 행정 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 결재 요청",
							"content": "사용자가 결재 요청을 한 보안 행정 티켓 건수가 나타납니다."
						}
					]
				},
				{
					"target": "dsh1100_secEvt",
					"title": "이상징후 업무",
					"top": 643,
					"left": 976,
					"arrow": {
						"start": "bottom",
						"end": "top"
					},
					"curve": true,
					"contents": [
						{
							"title": "- 접수 대기",
							"content": "접수를 기다리는 접수 요청 상태의 보안 티켓 건수를 나타냅니다. <br/> (*사용자에게 접수 권한이 있을 경우에만 해당 버튼이 보여집니다.)"
						},
						{
							"title": "- 담당 완료",
							"content": "사용자가 처리자인 이상징후 티켓 중 처리 완료된 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 무담당 티켓",
							"content": "처리자가 지정되지 않은 이상징후 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 담당 티켓",
							"content": "사용자가 처리자인 이상징후 티켓 중 처리중인 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 의견제시",
							"content": "사용자가 답변자로 지정되어 있어 답변을 해야 하는 의견제시 건수를 나타냅니다."
						},
						{
							"title": "- 담당 작업",
							"content": "사용자가 작업 대상자로 지정되어 있어 처리해야 하는 작업 건수를 나타냅니다."
						}
					]
				},
				{
					"target": "dsh1100_secEvtSig",
					"title": "이상징후 업무 결재",
					"top": 20,
					"left": 1131,
					"arrow": {
						"start": "left",
						"end": "center"
					},
					"curve": true,
					"contents": [
						{
							"title": "- 결재 대기",
							"content": "사용자가 결재 해야 하는 이상징후 티켓 건수를 나타냅니다."
						},
						{
							"title": "- 결재 요청",
							"content": "사용자가 결재 요청을 한 이상징후 티켓 건수가 나타납니다."
						}
					]
				},
				{
					"target": "dsh1100_secEpt",
					"title": "소명 관리",
					"top": 14,
					"left": 704,
					"arrow": {
						"start": "top",
						"end": "bottom"
					},
					"curve": false,
					"contents": [
						{
							"title": "- 소명 관리",
							"content": "사용자가 다른 사용자에게 소명을 요청한 소명 건수가 나타납니다."
						},
						{
							"title": "- 소명 제출",
							"content": "사용자가 소명을 제출해야 하는 소명 건수가 나타납니다."
						}
					]
				},
				{
					"target": "dsh1100_secRiskIdx",
					"title": "이상징후 현황",
					"top": 16,
					"left": 130,
					"arrow": {
						"start": "left",
						"end": "bottom"
					},
					"curve": true,
					"contents": [
						{
							"title": "탐지 된 이상징후 중 가장 많은 건수의 위험도를 나타냅니다.",
							"content": "- 조회 기간을 기준으로 계산합니다. <br/> - 완료된 이상징후도 포함하여 계산합니다."
						}
					]
				},
				{
					"target": "dsh1100_secRisk",
					"title": "위험도별 이상징후 현황",
					"top": 468,
					"left": 691,
					"arrow": {
						"start": "right",
						"end": "top"
					},
					"curve": true,
					"contents": [
						{
							"title": "조회 기간을 기준으로 탐지된 이상징후를 위험도별로 나타냅니다.",
							"content": "- 조회 기간을 기준으로 계산합니다. <br/> - 완료된 이상징후도 제외하여 계산합니다."
						}
					]
				},
				{
					"target": "dsh1100_secSvtKeyword",
					"title": "키워드별 이상징후 현황",
					"top": 778,
					"left": 650,
					"arrow": {
						"start": "right",
						"end": "left"
					},
					"curve": true,
					"contents": [
						{
							"title": "탐지된 이상징후를 키워드 별로 분류하여",
							"content": "- 조회 기간을 기준으로 계산합니다. <br/> - 제일 많이 탐지 된 키워드 상위 5위까지 보여줍니다."
						}
					]
				}
				
			]
	
		
	};
	
    return {
    	init: () => {
    		try{
    			//guide data 초기화 되있는지 체크
    			if(!OSLCoreGuideSetting.isData()){
    				OSLCoreGuideSetting.setData(guideContents[$.osl.langCd]);
    			}
    		}catch(e){
    			console.error(e);
    		}
    	},
        // public functions
        get: () => {
        	return guideContents[$.osl.langCd];
        }
    };
}();