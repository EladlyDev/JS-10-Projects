const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const mins = document.querySelector('#mins')
const seconds = document.querySelector('#seconds')

function countdown(){
    const currentDate = new Date();
    const newYearDate = new Date();
    newYearDate.setFullYear(currentDate.getFullYear()+1)
    newYearDate.setMonth(0, 1)
    newYearDate.setHours(0, 0, 0, 0)
    
    const diffInMs = (newYearDate - currentDate)/ 1000;
    const secondsValue = Math.floor(diffInMs) % 60;
    const minsValue = Math.floor(diffInMs/60) % 60;
    const hoursValue = Math.floor(diffInMs/3600) % 24;
    const daysValue = Math.floor(diffInMs/3600/24)

    seconds.innerText = formateTime(secondsValue);
    seconds.style.color = '#EE5486';
    mins.innerText = formateTime(minsValue);
    hours.innerText = formateTime(hoursValue);
    days.innerText = formateTime(daysValue);
    seconds.innerText < 1 ? mins.style.color = '#EE5486' : mins.style.color = 'black';
    if(mins.innerText < 1){
        hours.style.color = '#EE5486';
    }else{hours.style.color = 'black';}
    if(hours.innerText < 1){
        days.style.color = '#EE5486';
    }else{days.style.color = 'black';}
    // console.log(daysValue, hoursValue, minsValue, secondsValue)
}
function formateTime(time){
    return time < 10 ? `0${time}` : time;
}
// countdown()
setInterval(countdown, 1000)