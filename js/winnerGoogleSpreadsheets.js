//=============================================================================================================================================
//=============================================================== Google Spreadsheets =========================================================
//=============================================================================================================================================

//#region 구글 스프레드시트

//자동/수동 세팅
function setMethod()
{
    var checkedMethod = document.querySelector('input[name="method"]:checked').value;
    //자동
    if(checkedMethod == 'auto'){
        showAutoElement(true);
        //setAutoDatus();
    }
    //수동
    else{
        showAutoElement(false);
        entryTextarea.innerHTML = '';
        donationTextarea.innerHTML = '';
        wisherTextarea.innerHTML = '';
        exceptTextarea.innerHTML = '';
        executeFinal();
    }
}

//자동 관련 Element display 설정
function showAutoElement(isShow)
{
    const autoElement = document.querySelectorAll("[name='auto-el']"); 
    autoElement.forEach((el) => {
        if(isShow){
            el.style.display = 'inline-block';
        }
        else{
            el.style.display = 'none';
        }
    });
}

//자동데이터 세팅
async function setAutoDatus()
{
    datus = await getSheetData();
    //no, 풀공헌, 참여자, 리버셜희망자, 리버셜추첨대상, 우드희망자, 우드추첨대상, 파이어희망자, 파이어 추첨대상, 속성하사품희망자, 속성하사품추첨대상, 풀공헌, 참여자, 딩고희망자, 딩고추첨대상, 블랙희망자, 블랙추첨대상, 왕쟁상자희망자, 왕쟁추첨대상        
}

let sheetName = '씰룩추첨대상';
let datus;
//구글 스프레드시트에서 데이터 가져오기
const getSheetData = async () => {
    //const sheetId = '1kz1EsyDQjkbxZbSu00eUBUbzUXrYnuqfot829pJVekY'; //네이트람 씰룩쌜룩 - 구버전
    const sheetId = '1cK1wDv7SFPqD2G-IzhKuaNQW1bVMdG8sVAQQEwExW0o'; //네이트람추첨
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;        
    const query = encodeURIComponent('Select *')
    const url = `${base}&sheet=${sheetName}&tq=${query}`
    
    const response = await fetch(url);
    // const data = await response.text().substring(47).slice(0, -2).json();
    data = await response.text();
    parsed = JSON.parse(data.substring(47).slice(0, -2))
    
    console.log(parsed)
    let items = parsed.table.rows
    .map(({ c }) => cleanRow(c))
    return items

    const dbSheetId = '1jg3Yq7bsxe_URZcvvdetBGURUl3j3tacy5cgipbdg-4';//씰룩쌜룩 추첨 프로그램 저장용
};

function cleanRow(row) {
// row = [null,{v:'123'},null,{v:'hello'}]
    function replaceNull(item) {
        if (item == null) {
            return { v: '' }
        }
            return item
    }
    data = row
        .map((item) => replaceNull(item))
        .map((item) => item.v)
    return data
}

//#endregion 구글 스프레드시트