document.addEventListener("DOMContentLoaded",function(){

//adding event listeners to the elements where needed
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatContainer = document.querySelector(".stats-cards");


    //Valdiating username- returns true or false based on a regex
    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty!");
            return false;
        }
        const regex =/^(?![_-])(?!.*[_-]$)[A-Za-z0-9_-]{3,20}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching; //either returns true or false based on returning value of regex.test
    }


    async function fetchUserDetails(username){

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //const response = await fetch (url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };
            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok){
                throw new Error("Unable to fetch user details");
            }
            const parsedData = await response.json();
            console.log("Logging Data: ", parsedData);
            displayUserData(parsedData);
        }

        catch(error){
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }

        finally{
            searchButton.disabled = false;
            searchButton.textContent = "Search";
        }
    }

    //function to update the progress of user

    function updateProgress(total, solved, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    //function to display UserData in UI 
    function displayUserData(parsedData){
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;
        
        const solvedQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;
        
        //passing the userData to the update function to update it in UI
        updateProgress(totalEasyQues,solvedEasyQues,easyLabel,easyProgressCircle);
        updateProgress(totalMediumQues,solvedMediumQues,mediumLabel,mediumProgressCircle);
        updateProgress(totalHardQues,solvedHardQues,hardLabel,hardProgressCircle);
    
        const cardData = [
            {label : "Overall Submissions", 
                value:parsedData.data.matchedUser.submitStats.
                totalSubmissionNum[0].submissions},
            {label : "Easy Submissions", 
                value:parsedData.data.matchedUser.submitStats.
                totalSubmissionNum[1].submissions},
            {label : "Medium Submissions", 
                value:parsedData.data.matchedUser.submitStats.
                totalSubmissionNum[2].submissions},
            {label : "Hard Submissions", 
                value:parsedData.data.matchedUser.submitStats.
                totalSubmissionNum[3].submissions},
        ];

        console.log("Card Data: ", cardData);

        cardStatContainer.innerHTML = cardData.map(
            data => {
                return `<div class="card">
                        <h4>${data.label}</h4>
                        <p>${data.value}</p>
                        </div>`
            }
        ).join("")
    }

    searchButton.addEventListener('click',function(){
        const username = usernameInput.value;
        console.log("Logging Username: ", username);
        
        //After checking the validity of username, we proceed to execute the search
        // we will use API fetching
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })








})