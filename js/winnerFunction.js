//=============================================================================================================================================
//=============================================================== 함수 =========================================================
//=============================================================================================================================================
 //#region 함수
    
    //데이터가 있는지 확인
    function checkThis(num) 
    {
        const targetTextarea = num == 1 ? entryTextarea : donationTextarea;        
        const targetList = targetTextarea.value.split("\n");
        const wisherList = wisherTextarea.value.split("\n");
        let no_targetList = [];
        wisherList.forEach(function(wisher){
            //console.log("wisher : " + wisher);
            //console.log("no_entry? " + !targetList.includes(wisher));
            if(!targetList.includes(wisher))
                no_targetList.push(wisher);
        });
        const noListArea = num == 1 ? "no_entryList" : "no_donationList";
        document.getElementById(noListArea).innerHTML = no_targetList.toString();
    }
    //인원수 보여주기
    function showCount()
    {
        entryCnt.innerHTML = getCount(entryTextarea);
        donationCnt.innerHTML = getCount(donationTextarea);
        wisherCnt.innerHTML = getCount(wisherTextarea);
        exceptCnt.innerHTML = getCount(exceptTextarea);
    }

    //textarea에 입력된 줄 수 확인
    //"줄 수 = 캐릭 수"로 본다
    function getCount(targetTextarea)
    {
        var count = 0;
        var tempArray = targetTextarea.value.split("\n");
        tempArray.forEach(function(name){
            if(name.trim() != "")
                count++;
        });
        return count;
    }

    //#region 제거
    //space 제거
    function removeSpace(list)
    {
        let arr = [];
        list.forEach((element) => {
            arr.push(element.trim());
        });
        return arr;
    }

    //조건 미달자 제거 
    function removeMember(wisherList)
    {
        //미참여자 제거
        const no_entryList = document.getElementById("no_entryList").innerHTML.split(",");   
        wisherList = removeMemberWithExcluded(wisherList, no_entryList);   
        
        //미공헌자 제거
        const no_donationList = document.getElementById("no_donationList").innerHTML.split(",");
        wisherList = removeMemberWithExcluded(wisherList, no_donationList);

        //추첨제외자 제거
        const exceptList = document.getElementById("exceptList").value.split("\n"); 
        wisherList = removeMemberWithExcluded(wisherList, exceptList);   

        return wisherList;
    }

    function removeMemberWithExcluded(wisherList, excludedList)
    {
        console.log(excludedList);
        excludedList.forEach(function(no_entry){
            console.log("no_entry : " + no_entry);
            if(wisherList.includes(no_entry))
            {
                const idx = wisherList.indexOf(no_entry);
                wisherList.splice(idx, 1);
            }
        });

        return wisherList;
    }

    //중복값 제거
    function removeDuplicateItem(dupArr)
    {
        let uniqueArr = [];
        dupArr.forEach((element) => {
            if (!uniqueArr.includes(element)) {
                uniqueArr.push(element);
            }
        });
        return uniqueArr;
    }

    //#endregion 제거    

    //#endregion 함수