let favMealsArr = [];
class startApp {
    constructor(favoriteElementContainer, mealsElementContainer){
        this.favoriteElementContainer = favoriteElementContainer;
        this.mealsElementContainer = mealsElementContainer;
    }
    
    reset(){
        this.customizeStorage();
        this.showMealFromStorage();
        this.showRandomMeal();
    }
    
    refresh(){
        searchBar.value = ''
        this.showRandomMeal();
    }

    async showRandomMeal(){
        const fetching = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await fetching.json();
        const mealData = data.meals[0];
        this.showMeal(mealData, true);
    }   

    async getMealByName(mealName){
        const fetching = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await fetching.json();
        const mealsData = data.meals;
        if(mealsData){
            mealsData.map((meal)=>this.showMeal(meal))
            
        }else {
            this.mealsElementContainer.innerHTML = `
            <p class='warrning'>Sorry.. We can't fiend "${mealName}"</p>
            `
        };
        

        // this.showMeal(mealData)
    }

    showMeal(mealData, random = false){
        if(random) this.mealsElementContainer.innerHTML = '';
        const mealELement = document.createElement('div');
        mealELement.dataset.id = mealData.idMeal;
        mealELement.classList.add('meal');
        
        mealELement.innerHTML = `
        <div data-id = ${mealData.idMeal} class="meal-header">
            ${random?"<span class='random'>Random Recipe</span>" : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div data-id = ${mealData.idMeal} class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button data-heart-id = ${mealData.idMeal} class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
        `;
        this.mealsElementContainer.appendChild(mealELement)
    }

    getMealById(id, callback){
        const xmlRequest = new XMLHttpRequest();
        xmlRequest.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
        xmlRequest.responseType = 'json'
        xmlRequest.onload = function(){
            if(this.status === 200 && this.readyState === 4){
                callback(this.response.meals[0])
            }else{
                console.log(Error(this.statusText))
            }
        }
        xmlRequest.send()
    }

    showFav(mealData){
        const liFav = document.createElement("li");
        liFav.dataset.id = mealData.idMeal;
        liFav.innerHTML = `
            <img data-open-popup src="${mealData.strMealThumb}" alt="${mealData.strmeal}">
                <span>${mealData.strMeal}</span>
                <button class="clear">
                <i class="fas fa-window-close"></i>
            </button>
        `
        favoriteElementContainer.append(liFav);
    }

    removeFromFav(mealId){
        document.querySelector(`li[data-id="${mealId}"]`).remove()
        favMealsArr = favMealsArr.filter((meal)=>{
            return meal.idMeal !== mealId
        })
        this.customizeStorage();

    }

    customizeStorage(mealObj){
        if(localStorage.getItem('favMeals')){
            let mealsFromS = JSON.parse(localStorage.getItem('favMeals'));
            if(favMealsArr.length > 0){
                mealsFromS = favMealsArr;
                if(mealObj) mealsFromS.push(mealObj);
                favMealsArr = mealsFromS;
                localStorage.setItem('favMeals', JSON.stringify(mealsFromS))
            }else {
                if(mealObj) mealsFromS.push(mealObj);
                favMealsArr = mealsFromS;
                localStorage.setItem('favMeals', JSON.stringify(favMealsArr))
            }
        }else {
            localStorage.setItem('favMeals', JSON.stringify([{}]))
        }
        
        
    }

    showMealFromStorage(){
        for(let i = 0; i < favMealsArr.length; i++){
            if(favMealsArr[i].idMeal){
                const mealData = favMealsArr[i];
                this.showFav(mealData)
            }
        }
    }

    showMealInfo(mealData){
        //vedio ul customize
        const mealVideo = mealData.strYoutube.replace(/watch\?v=/g, "embed/");
        popupElementContainer.classList.remove('hidden');
        popupElement.innerHTML = `
            <h1>${mealData.strMeal}</h1>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>Category: ${mealData.strCategory}</span>
            <span>Area: ${mealData.strArea}</span>
            <h3>Tutorial video : </h3>
            <iframe 
            src="${mealVideo}">
            </iframe><hr>
            <h3>Instructions: </h3>
            <p>${mealData.strInstructions}</p>
            <hr>
            <h3>Ingredients:</h3>
        `;

        //ingeridents
        const ulIngContainer = document.createElement('ul');
        for(let i = 1; i <= 20; i++){
            if(`${mealData['strIngredient'+i]}`){
                const liIng = document.createElement('li');
                liIng.innerHTML = `${mealData['strIngredient'+i]}: ${mealData['strMeasure'+i]}`;
                ulIngContainer.append(liIng)
            }  
        }
        popupElement.append(ulIngContainer)
    }

}

// DOM References
const searchBar = document.querySelector("[data-search]")
const favoriteElementContainer = document.querySelector("[data-fav-container]")
const mealsElementContainer = document.querySelector("[data-meals-container]")
const refreshBtn = document.querySelector('button[data-refresh]');
const popupElementContainer = document.querySelector('[data-popup-container]')
const popupElement = document.querySelector('[data-popup]')

// start the app
const recipeApp = new startApp(favoriteElementContainer, mealsElementContainer);

window.onload = ()=>{
    recipeApp.reset();
}

//favorite btns and customize add to favorite function
window.addEventListener('click' ,(e)=>{
    if(e.target.classList.contains('fa-heart')){
        e.target.classList.toggle('active');
        const mealId = e.target.parentNode.parentNode.dataset.id;
        
        if(e.target.classList.contains('active')){
            recipeApp.getMealById(mealId, recipeApp.showFav)
            recipeApp.getMealById(mealId, recipeApp.customizeStorage)
        }else {
            //TODO: Remove from UI and from Storage
            recipeApp.removeFromFav(mealId)
            //DONE
        }
    }else if( e.target.classList.contains('fa-window-close')){
        const mealId = e.target.parentNode.parentNode.dataset.id;
        recipeApp.removeFromFav(mealId)
        const heart = document.querySelector(`button[data-heart-id="${mealId}"]`);
        if(heart){
            heart.firstElementChild.classList.remove('active')
        }
    //popup-----------
    }else if(e.target.tagName == 'IMG' || e.target.tagName === "SPAN" ||e.target.tagName === "H4"){
        const mealId = e.target.parentNode.dataset.id;
        recipeApp.getMealById(mealId, recipeApp.showMealInfo)
        //hidden popup
    }else if(e.target.classList.contains('fa-times')){
        // console.log('close');
        popupElementContainer.classList.add('hidden')
    }
    
})

//search function
searchBar.addEventListener('input', function(){
    if(this.value){
        mealsElementContainer.innerHTML = ''
        recipeApp.getMealByName(this.value)
    }else {
        recipeApp.reset();
    }
})

//refresh
refreshBtn.addEventListener('click', function(){
    this.classList.add('rotate')
    mealsElementContainer.innerHTML = ''
    this.addEventListener('animationend', ()=>{
        recipeApp.refresh()
        this.classList.remove('rotate')
    })
})
// localStorage.clear() 

//popup -------
// console.log(document.querySelector('.meals'))
// console.log(document.querySelector('[data-fav-container]').fchildElement)