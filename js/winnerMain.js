//#region 객체

//count text
const entryCnt = document.getElementById("entryCnt"); //참여자 인원
const donationCnt = document.getElementById("donationCnt"); //풀공헌자 인원
const wisherCnt = document.getElementById("wisherCnt"); //희망자 인원
const exceptCnt = document.getElementById("exceptCnt"); //제외자 인원

//textarea
const entryTextarea = document.getElementById("entryList"); //참여자
const donationTextarea = document.getElementById("donationList"); //풀공헌
const wisherTextarea = document.getElementById("wisherList"); //희망자
const exceptTextarea = document.getElementById("exceptList"); //제외자

//button
const exBtn = document.getElementById("executeBtn"); //사다리 추첨 버튼            
const getAllBtn = document.getElementById("getAllBtn"); //한꺼번에 불러오기 버튼
const getEntryBtn = document.getElementById("getEntryBtn"); //참여자 불러오기 버튼
const getDonationBtn = document.getElementById("getDonationBtn"); //공헌자 불러오기 버튼
const getWisherBtn = document.getElementById("getWisherBtn"); //희망자 불러오기 버튼

//#endregion 객체

window.onload = function () {
    //#region Init
    setMethod();
    
    //#region Event

    //#region radio Event
    //수동 or 자동
    const methodRadios = document.querySelectorAll("input[name='method']"); 
	methodRadios.forEach((radio) => {
		radio.addEventListener("change", (e) => {
            setMethod();
		});
	});
    //씰룩 or 쌜룩 
    const sheetRadios = document.querySelectorAll("input[name='sheet']"); 
	sheetRadios.forEach((radio) => {
		radio.addEventListener("change", (e) => {
            sheetName = document.querySelector('input[name="sheet"]:checked').value;
            entryTextarea.innerHTML = '';
            donationTextarea.innerHTML = '';
            wisherTextarea.innerHTML = '';
            exceptTextarea.innerHTML = '';
		});
	});
    //#endregion radio Event
    
    //#region textarea Event
    //참여자 확인
    entryTextarea.addEventListener("keyup", function (event) {
        if (window.event.keyCode == 32) {
            return false;
        }
        checkThis(1);
        showCount();        
    });
    //풀공헌자 확인
    donationTextarea.addEventListener("keyup", function (event) {
        if (window.event.keyCode == 32) {
            return false;
        }
        checkThis(2);
        showCount();        
    });
    //희망자 확인
    wisherTextarea.addEventListener("keyup", function (event) {
        if (window.event.keyCode == 32) {
            return false;
        }
        checkThis(1);
        checkThis(2);
        showCount();        
    });
    //제외자 확인
    exceptTextarea.addEventListener("keyup", function (event) {
        if (window.event.keyCode == 32) {
            return false;
        }
        showCount();        
    });
    //#endregion textarea Event

    //#region 자동 관련 Event

    //한꺼번에 불러오기
    getAllBtn.addEventListener("click", async function () {
        showLoader(true);
        await setAutoDatus();
        getEntry();
        getDonation();
        getWisher();
        executeFinal();
    });
    //참여자 불러오기
    getEntryBtn.addEventListener("click", async function () {
        showLoader(true);
        await setAutoDatus();
        getEntry();
        executeFinal();
    });
    //풀공헌자 불러오기
    getDonationBtn.addEventListener("click", async function () {
        showLoader(true);
        await setAutoDatus();
        getDonation();
        executeFinal();
    });
    //희망자 불러오기
    getWisherBtn.addEventListener("click", async function () {
        showLoader(true);
        await setAutoDatus();
        getWisher();
        executeFinal();
    });
    
    //#endregion 자동 관련 Event
    
    //#endregion Event
    
    //#endregion Init

    //#region 추첨 실행
    //추첨 실행
    exBtn.addEventListener("click", function () {
        let oriWisherList = document.getElementById("wisherList").value.split("\n");                    
        const no_entryList = document.getElementById("no_entryList").innerHTML.split(",");
        

        oriWisherList = removeSpace(oriWisherList); //space 제거
        oriWisherList = removeDuplicateItem(oriWisherList); //중복값 제거
        oriWisherList = removeMember(oriWisherList); //조건 미달자 제거  + 제외자 제거
        let oriWisherCnt = oriWisherList.length;

        console.log("final wisherList : " + oriWisherList.toString());
        let wisherList = JSON.parse(JSON.stringify(oriWisherList));
        let wisherCnt = wisherList.length;
        let addPrizeCnt = 0;
        let prizeCnt = document.getElementById("prizeCnt").value;
        let leftPrizeCnt = document.getElementById("prizeCnt").value;
        let winnerList = [];

        //희망자수보다 상품이 더 많을 경우
        if(oriWisherCnt < prizeCnt)
        { 
            addPrizeCnt = Math.floor(prizeCnt/oriWisherCnt);
            leftPrizeCnt = prizeCnt%oriWisherCnt;
        }    
        let tempLeftCnt = leftPrizeCnt;
        while(tempLeftCnt > 0)
        {
            var randomIdx = Math.floor(Math.random() * (wisherList.length));
            console.log('randomIdx :' + randomIdx);
            let wisher = wisherList[randomIdx];
            console.log('wisher : ' + wisher);
            if(!winnerList.includes(wisher))
            {    
                winnerList.push(wisher);
                tempLeftCnt--;
            }
        }
        let result = document.getElementById("prizeName").value + '<br>';
        let boxes = [];
        let tempBoxItem = '';
        if(addPrizeCnt > 0)
        {   
            let add = 0;
            for(var cnt= 1; cnt <= oriWisherCnt; cnt++)
            {
                //일정 갯수만큼 가지기
                const prizeNumArr = Array.from({length:addPrizeCnt}, (v,i)=>(i+1) + add); 
                tempBoxItem = prizeNumArr.reduce(
                    (accumulator, currentValue) => accumulator + ', ' + currentValue
                );
                add += prizeNumArr.length;

                //추가 당첨된 경우 하나 더!
                if(winnerList.includes(oriWisherList[cnt-1]))
                {
                    tempBoxItem += ', ' + (prizeNumArr[prizeNumArr.length-1] + 1);
                    add++;
                }
                tempBoxItem += '. ' + oriWisherList[cnt-1];
                boxes.push(tempBoxItem);
            }
        }
        else
        {
            for(var idx= 0; idx < leftPrizeCnt; idx++)
            {
                tempBoxItem = (idx+1) + '. ' + winnerList[idx];
                boxes.push(tempBoxItem);
            }
        }
        document.getElementById("winnerList").innerHTML = result; 
        entranceAnimation(boxes);
        eventPopupFromNyanya();
    });

    function eventPopupFromNyanya()
    {
        //아직도 이걸 써요? 쓴다면 선착순 선물.. 먼저 쓰는 사람꺼..
        
        
    }
    
    function entranceAnimation(arr)
    {
        var colors = ["#ABDEE6", "#CBAACB", "#FFFFB5", "#FFCCB6", "#F3B0C3"];
        let area = document.getElementById("winnerList");
        for(var i=0;i<arr.length;i++){ 
            let colorIdx = i%colors.length;
            let div = document.createElement('div');            
            div.className = 'animate__animated animate__bounceInRight'; 
            div.style = 'background:' + colors[colorIdx] + ';';
            // let img = document.createElement('img');
            // img.src = "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMzFfMTI0/MDAxNTA5NDEwMTc5Nzc2.lSesGatzO1Jik6cJFJ49XPMlN9vUeCVNDHom1QktxIUg.6uEYd6eMTNqcA-6tLVP4fwNnp7ZGCvPDBR-atmPWnfYg.PNG.cool911016/33.png?type=w800";
            // img.width = 100;
            // img.className = 'animate__animated animate__bounceInRight'; 
            // div.appendChild(img);
            div.append(arr[i]);                     
            setTimeout(function () {                 
                area.appendChild(div);
            }, 500 * i);            
        }
        
    }

    //#endregion 추첨 실행
}

//#region 불러오기
    //참여자 불러오기
    function getEntry()
    {
        var contentsNo = document.querySelector('input[name="contents"]:checked').value == 1? 2:12;
        entryTextarea.innerHTML = datus.map(item => item[contentsNo]).slice(2).join('\n'); //참여자
    }
    //풀공헌자 불러오기
    function getDonation()
    {
        var contentsNo = document.querySelector('input[name="contents"]:checked').value == 1? 1:11;
        donationTextarea.innerHTML = datus.map((item) => item[contentsNo]).slice(2).join('\n'); //풀공헌
    }
    //희망자 불러오기
    function getWisher()
    {
        //no, 풀공헌, 참여자, 리버셜희망자, 리버셜추첨대상, 우드희망자, 우드추첨대상, 파이어희망자, 파이어 추첨대상, 속성하사품희망자, 속성하사품추첨대상, 풀공헌, 참여자, 딩고희망자, 딩고추첨대상, 블랙희망자, 블랙추첨대상, 왕쟁상자희망자, 왕쟁추첨대상        
        var contentsNo = document.querySelector('input[name="reward"]:checked').value;
        wisherTextarea.innerHTML = datus.map((item) => item[contentsNo]).slice(2).join('\n'); //희망자
    }
//#endregion 불러오기

 //불러오고 마지막에 실행할 것들
 function executeFinal()
 {
     checkThis(1);
     checkThis(2);
     showCount();
     showLoader(false);
 }
 //로딩이미지
 function showLoader(isShow)
 {
     var loader = document.getElementById("loader");
     if(isShow)
         loader.style.display = "block";
     else
         loader.style.display = "none";
 }