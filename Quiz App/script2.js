const requestData = new XMLHttpRequest();
requestData.open("GET", "quizData.json");
requestData.responseType = 'json';
requestData.send()
requestData.onload = function(){
    if(this.readyState == 4 & this.status == 200){
        let responseData = this.response;
        startApp(responseData)
    }
}

//References
const questionTextElement = document.querySelector('[data-question]')
const answerTextElements = document.querySelectorAll('[data-answer]');
const submitBtn = document.querySelector('[data-submit]')

function startApp(quizData){
    let i = 0;
    showData(i)
    onsend(i)
    function showData(i){
        questionTextElement.innerText = quizData[i].question;
        answerTextElements.forEach((element, index)=>{
            let elementId = element.getAttribute("for");
            element.innerText = quizData[i].answers[elementId]
        })
    }

    function onsend(i){
        i = 1
        let quizDataLength = quizData.length;
        submitBtn.onclick = ()=>{
            if(i < quizDataLength){
                showData(i)
                checkAnswer(i)
                ++i;
            }else{
                showResult();
            }
        }
    }

    function checkAnswer(i){
        i = 0
        let correct = quizData[i].correct;
        console.log(correct)
    }
}