//Getting data from server
const requestData = new XMLHttpRequest();
requestData.open("GET", "quizData.json");
requestData.responseType = 'json';
requestData.send()
requestData.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        let quizData = this.response;
        showQuiz(quizData)
    }
}

//Elements Refrences
const answerTextElemnts = document.querySelectorAll("[data-answer]");
const questionTextElemnt = document.querySelector("[data-question]");
const submitBtn = document.querySelector("[data-submit]") 
const correctTextElement = document.querySelector('.correct')
const uncorrectTextElement = document.querySelector('.uncorrect')
const warrningTextElement = document.querySelector('.warrning')
const finalResult = document.querySelector('[data-final-result]')
const finalResultParent = document.querySelector('.final-result')
let chosenAnswer = document.querySelector('input[type=radio]:checked');


//Element for current quiz
let current = 0;
let result = 0;
let correct = 0;
let uncorrect = 0;
let quizData;

//Show quizes after getting it
function showQuiz(quizData2){
    chosenAnswer ? chosenAnswer.checked = false : null
    quizData = quizData2;
    //current question
    let currentQuestion = quizData[current];
    //show question
    questionTextElemnt.innerText = currentQuestion.question;
    //show answers
    answerTextElemnts.forEach((element)=>{
        //getting answers ID
        let answerId = element.getAttribute('for');
        //showing answers
        element.innerText = currentQuestion.answers[answerId]
    })
}

//customize the submit button change questions and show results and getting final resuls
submitBtn.addEventListener('click', function(){
    warrningTextElement.innerText = ''
    //getting checked answer for checking if there is or not and on that change the question
    chosenAnswer = document.querySelector('input[type=radio]:checked');
    //if there is checked answer 
    if(chosenAnswer){
        //if there is more questions 
        if(current < quizData.length ){
            checkAnswer(chosenAnswer);
            showQuiz(quizData)
            chosenAnswer.checked = false;
        }else{
            //TODO: show final result
            questionTextElemnt.style.display = "none";
            correctTextElement.parentNode.style.display = 'none';
            answerTextElemnts[0].parentNode.parentNode.style.display = 'none';
            warrningTextElement.innerText = ''
           
            // show final result
            finalResult.innerText = result;
            result > 0 ? finalResult.style.color = 'green': finalResult.style.color = 'red' ;
            finalResultParent.style.display = "block";
            //customize retry
            submitBtn.innerText = 'Retry';
            submitBtn.onclick = ()=>{
                location.reload()
                // current = 0;
                // result = 0;
                // correct = 0;
                // uncorrect = 0;
                
                // questionTextElemnt.style.display = "block";
                // correctTextElement.parentNode.style.display = 'block';
                // answerTextElemnts[0].parentNode.parentNode.style.display = 'block';
                // submitBtn.innerText = 'Submit';
                // correctTextElement.firstElementChild.innerText = correct;
                // uncorrectTextElement.firstElementChild.innerText = uncorrect;
                // finalResultParent.style.display = "none";
                // warrningTextElement.style.display = 'none'

                // showQuiz(quizData)
            }
        }
        
    }else {
        warrningTextElement.innerText = 'Choose an answer please'
    }

})

//customize the answer and check if it correct or not
// we'll see if the chosen answer id equals to the correct id 
function checkAnswer(chosenAnswer, done){
    let correctAnswer = quizData[current].correct;
    let chosenAnswerId = chosenAnswer.id;
    if(correctAnswer == chosenAnswerId){
        result++;
        correct++;
        correctTextElement.firstElementChild.innerText = correct;
        // alert(`correct`)
    }else{
        result--;
        uncorrect++;
        uncorrectTextElement.firstElementChild.innerText = uncorrect;
        // alert(`uncorrect`)
    }
    current++
}