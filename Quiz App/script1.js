//------------------Try 1
// const answersText = document.querySelectorAll('lable');
// const questionText = document.querySelector('[data-question]')
// const submitBtn = document.querySelector('[data-submit]');
// const answerRadios = document.querySelectorAll('[data-answer]')


// const dataRequest = new XMLHttpRequest();
// dataRequest.open("GET", 'quizData.json');
// dataRequest.send();
// dataRequest.onreadystatechange = function(){
//     if(this.readyState === 4 && this.status === 200){
//        const quizData = JSON.parse(this.responseText);
//        showData(0 , quizData)
//        onSubmit(0 ,quizData);
//     }
// }



// function onSubmit( i,quizData){
//     let count = i + 1;
//     submitBtn.onclick = (e)=>{
//         const answersLength = quizData.length;
//         e.preventDefault();
//         if(count < answersLength){
//             showData(count, quizData)
//             checkAnswer(quizData, count)
//             count++;
//         }else {
//             count = 0;
//             submitBtn.click();
//         }
//     }
// }

// function showData(i, quizData){
//     answersText.forEach((answerText, index)=>{
//         const answerTextId = answerText.getAttribute('for');
//         answerText.innerText = quizData[i].answers[answerTextId];
//         questionText.innerText = quizData[i].question;
//     })
// }

// function checkAnswer(quizData, i){
//     console.log(quizData[i])
//     const answerRadiosChecked = document.querySelector('input[name=answer]:checked')
//     if(answerRadiosChecked.getAttribute('id') === quizData[i].correct){
//         console.log('correct')
//     }
// }