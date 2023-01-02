//Some Refrences
const mealContainerELement = document.querySelector('.meals');
const favoriteELementContainer = document.querySelector('.fav-meals')
const searchElement = document.getElementById('search-term');

//arr for favorite meals, it'll get it from local storage if there any
//and well update local storage when we want 
//it'll contain object for each meal with name and id
let favoriteArr = [];

//customize localStorage , well get the favorite meals from local storage 
//if ther any and well update them from the favoriteArr and update local storage
//againg and well update the favoriteArr with local storage values
customizeStorage()

//here after updating the favoriteArr by calling customizStorage(), it well have
//the meals from localStorage if there any and then we'll loop through them 
//to show them
favoriteArr.map((meal)=>{
    getMealById(meal.id)
});

getRandomMeal()
//get random meal--------------
async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    showMeal(randomMeal, true);
}

//get meal by id -----------------
async function getMealById(id){
    const resp = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const respData = await resp.json();
    const mealData = respData.meals[0];
    showFavorites(mealData)
}

//Show favorites from local if there any and from server after adding it
function showFavorites(mealData){
    const favMealElement = document.createElement("li");
    favMealElement.id = mealData.idMeal;
    // favMealElement.classList.add(`id-${mealData.idMeal}`)

    favMealElement.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    favoriteELementContainer.appendChild(favMealElement);

    //remove it from favorite
    window.onclick = (e)=>{
        if(e.target.classList.contains("fa-window-close")){
           const mealId = e.target.parentNode.parentNode.id;
           unfavorite(mealId);
           e.target.parentNode.parentNode.remove()
        }
    }
}

//unfavorite function that'll take the meal id and will remove it from the arr and local storage
function unfavorite(mealId){
    // console.log(mealId)
    // console.log(favoriteArr)
    favoriteArr = favoriteArr.filter((item)=>item.id !== mealId)
    //Update localStorage-------
    //this'll not work here because it concating , but here we want to replace
    // customizeStorage()
    localStorage.setItem('favoriteMeals', JSON.stringify(favoriteArr))
}

//show random meal----------
function showMeal(mealData, random = false){
    const mealELement = document.createElement('div');
    mealELement.classList.add('meal');
    mealELement.id = `${mealData.idMeal}-meal`
    mealELement.innerHTML = `
    <div class="meal-header">
    ${random ? '<span class="random"> Random Recipe </span>' : ""}
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn">
        <i class="fas fa-heart"></i>
    </button>
    </div>
    `;
    mealContainerELement.appendChild(mealELement);
    
    window.onclick = (e)=>{
        if(e.target.classList.contains('fa-heart')){
            const heartBtn = e.target;
            heartBtn.onclick = ()=>{
                heartBtn.classList.toggle("active");
                if(heartBtn.classList.contains('active')){
                    // addToFavorite(mealData);
                    const mealId = parseInt(heartBtn.parentNode.parentNode.parentNode.id);
                    const mealName = heartBtn.parentNode.parentNode.innerText
                    const mealObj = {id : mealId, name : mealName}
                    addToFavorite(mealObj)
                }else{
                    unfavorite(mealData.idMeal)
                    const favoriteElement = document.getElementById(`${mealData.idMeal}`)
                    favoriteElement.remove()
                }
            }
        }
    }

    // const heartBtn = document.querySelector('.fa-heart');
    // heartBtn.addEventListener('click', (e)=>{
    //     heartBtn.classList.toggle("active");
    //     if(heartBtn.classList.contains('active')){
    //         addToFavorite(mealData);
    //     }else{
    //         unfavorite(mealData.idMeal)
    //         const favoriteElement = document.getElementById(`${mealData.idMeal}`)
    //         favoriteElement.remove()
    //     }
    // })
}

//Favorite Btn ---------------------
//add meal to favorite meals by taking its id and calling get meal by id
//and from there pass this id and getting its data and after it add it
//to the page by calling th show Meal function
function addToFavorite(favobj){
    // const mealId = mealDate.id;
    // const mealName = mealDate.name;

    //show mealsin favorite------
    // getMealById(mealId)

    // add it to local storage-------
    //What I want to do is make a arr with objects for each meal
    //id and name so we can add it into the localStorage into one 
    //place and loop through it for getting it's ides and passing 
    //it into the getMealById function

    //and the constructor for creating objects for meals;
    // class Meal {
    //     constructor(id, name){
    //         this.id = id;
    //         this.name = name;
    //     }
    // }
    // const favobj = new Meal(mealId, mealName);
    favoriteArr.push(favobj);
    console.log(favoriteArr)
    //add To localStorage
    customizeStorage()

    // if(localStorage.getItem('favoriteMeals')){
    //     const favorites = JSON.parse(localStorage.getItem('favoriteMeals'));
    //     favorites.push(favobj);
    //     localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
    // }else{
    //     favoriteArr.push(favobj);
    //     localStorage.setItem('favoriteMeals', JSON.stringify(favoriteArr));
    // }
}

function customizeStorage(){
    if(localStorage.getItem('favoriteMeals')){
        const favoritesFStorage = JSON.parse(localStorage.getItem('favoriteMeals'));
        
        if(favoriteArr.length > 0){
            favoriteArr.concat(favoritesFStorage);
            localStorage.setItem('favoriteMeals', JSON.stringify(favoriteArr));
        }else{
            favoriteArr = favoriteArr.concat(favoritesFStorage);
        }
    }else{
        localStorage.setItem('favoriteMeals', JSON.stringify(favoriteArr))
    }
}

//Search Function-------------
//Customize search function.. when we search about something
//we'll take the value from the search bar then
//we'll call function to get the meal by name 
//then we'll show them in the place of the random meals
searchElement.oninput = function(){
    const mealName = this.value;
    if(mealName){
        getMealByName(mealName);
    }else{
        getRandomMeal()
    }
}

//get meal by name function
async function getMealByName(name){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name
    );

    const respData = await resp.json();
    const meals = respData.meals;
    
    if(meals){
        mealContainerELement.innerHTML = '';
        meals.map((meal)=>{
            showMeal(meal)
        })
        
    }else{
        mealContainerELement.innerHTML = `<p class='warrning'>There's no result for ${name}</p>`;
    }
}
