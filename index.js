const elements={
    searchInput:document.querySelector('.search__field'),
    searchForm:document.querySelector('.search'),
    searchView:document.querySelector(".results__list"),
    infiniteLoader:document.querySelector(".results"),
    resultsPerPages:document.querySelector(".results__pages"),
     button:document.querySelector(".btn-inline"),
    recipe:document.querySelector(".recipe"),
    loader:document.querySelector(".loader"),
    shopping:document.querySelector(".shopping__list"),
    likeList:document.querySelector(".likes__list")
}




/********************Data Views********************/

//Search

const renderLoader=(parent)=>{
    const loader=`<div class="loader">
                    <svg>
                        <use href="js/img/icons.svg#icon-cw"></use>
                    </svg>
                </div>`;
    parent.insertAdjacentHTML('afterBegin',loader);
}

const clearLoader=()=>{
    const loader=document.querySelector('.loader');
    
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}

const clearLoaders=parent=>{
    
    if(parent){
        parent.parentElement.removeChild(parent);
    }
}

const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
    //console.log('working');
};

const limitRecipeTitle=(title,limit=17)=>{
    const newTitle=[];
    
   if(title.length > limit){ 
       
    title.split(" ").reduce((acc,val)=>{
        if(acc+val.length<=limit)
            newTitle.push(val);
        
            return acc+val.length;
            
    },0);
    
    return `${newTitle.join(" ")}...`;
}
    return title;
}


const renderRecipe=recipe=>{
    const markup=`
                    <li>
                    <a class="results__link results__link--active"  href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.searchView.insertAdjacentHTML('beforeEnd',markup);
    
}

//type: prev and next
const displayButton=(page,type)=>{
    
              return      `<button class="btn-inline results__btn--${type}" data-goto="${type==='prev'? page-1 : page +1}">
                    <span>Page ${type==='prev'? page-1 : page +1}</span>
                    <svg class="search__icon">
                        <use href="js/img/icons.svg#icon-triangle-${type==='prev'? 'left':'right'}"></use>
                    </svg>
                    
                </button>`
    ;
}

const renderButton=(page,numRes,resPerPage)=>{
    
    const pages =Math.ceil(numRes/resPerPage);
    let button;
    
    if(page===1 && pages>1){
        button=displayButton(page,"next");//only button goto next page only
    }
    else if(page<pages){
        button=`${displayButton(page,"next")} 
                    ${displayButton(page,"prev")}`//both buttons
    }
    else if(page===pages && pages>1){
        button=displayButton(page,"prev");//only button to go to prev page
    }
    
    elements.resultsPerPages.insertAdjacentHTML('afterBegin',button);
   
}

const renderResults=function (recipes,page=1,resPerPage=10){
    
    const start = (page-1)*resPerPage;
    const end=(page)*resPerPage;
    recipes.slice(start,end).forEach(el=>{
        renderRecipe(el);       
    });
    
    renderButton(page,recipes.length,resPerPage);
};
/*
const gcd=(a,b)=>{
    
    if(!b)
    return a;
    
    return gcd(b,a%b);
    
}

const fraction=decimal=>{
    let num=100;
    const stringdec=('0.'+decimal.toString());
    const numdec=parseFloat(stringdec).toFixed(2);
    
     const gcdnum=gcd(decimal,num);
    let numerator=decimal;
    let denominator=num;
    for(let i=0;numerator>gcdnum;i++){
        if(numerator%gcdnum===0 && denominator%gcdnum===0)
        {
            numerator=numerator/gcdnum;
            denominator=denominator/gcdnum;
                
        }
    }
    
    return `${numerator}/${denominator}`;
    
    
}*/

const formatCount=count=>{
    return count.toFixed(2);
}
    /*
    if(count){
    const numtoString=count.toString().split('.');
        //console.log(numtoString);
    let [int,dec]=numtoString.map((el)=>
                                  {
        return parseInt(el,10);
    });
    
    //console.log(int,dec);
    
        
        if(!dec){
            return count;
        }
        
        if(int===0){
            return `${fraction(dec)}`;
        }
        
        else{
            
            console.log(`${fraction(dec)}`);
            //return `${fraction(dec)}`;
        }*/



        
    
        

const createIngredients = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="js/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

const renderResult=(recipe,isLiked)=>{
    
    const markup=`  
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="js/img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="js/img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-dec">
                            <svg>
                                <use href="js/img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-inc">
                            <svg>
                                <use href="js/img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="js/img/icons.svg#icon-heart${isLiked ? '' :'-outlined'}"></use>
                    </svg>
                </button>
            </div>

       <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredients(el)).join('')}
            </ul>

                <button class="btn-small recipe__btn recipe__btn-add">
                    <svg class="search__icon">
                        <use href="js/img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="js/img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>`
    
    elements.recipe.insertAdjacentHTML('afterbegin',markup);
    
}

const updateServings=recipe=>{
    //Update Count
    document.querySelector('.recipe__info-data--people').textContent=recipe.servings;
    
    //Update Ingredients
    const countElement=Array.from(document.querySelectorAll('.recipe__count'));
    
    //console.log(countElement);
    countElement.forEach((el,i)=>{
        el.textContent=formatCount(recipe.ingredients[i].count);
    });
    
}

//List View

const renderItem=item=>{
    
    const markup=`<li class="shopping__item" data-item="${item.id}">
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="js/img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`
    
    elements.shopping.insertAdjacentHTML('beforeEnd',markup); 
    
};

const deleteItem=id=>{
    const item=document.querySelector(`[data-item="${id}"]`);
    item.parentElement.removeChild(item);
};

//Like View

const toggleLikes=isLiked=>{
    
    const iconString=isLiked ? `icon-heart` :`icon-heart-outlined`;
    document.querySelector(`.recipe__love use`).setAttribute(`href`,`js/img/icons.svg#${iconString}`);
};

const toogleLikeMenu=numofLikes=>{
    
    document.querySelector('.likes__field').style.visibility=numofLikes>0 ? 'visible' :'hidden';
    
}

const renderLike=like=>{
    
    const markup=       
                    `<li>
                    <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                    </figure>
                    <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                    </div>
                    </a>
                    </li>`
    
    elements.likeList.insertAdjacentHTML('beforeEnd',markup);
}

const deleteLike=id=>{
    
    
    const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el)
    el.parentElement.removeChild(el);
};

/**************************Data Models*********************/

//Search.js

class Search
    {
    constructor(query){
        this.query=query;
    }
    async getResults(){

   try{    
    let res=await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
    
    const data=await res.json();
    const result=data.recipes;
       
    if(data.error)
        alert("Not Found in Database");
    
    else
        this.result=result;
    
   }
    catch (err){
        console.log(err);
    }
}
}

//  Recipe

class Recipe{
    constructor(id){
        this.id=id;
    }
    async getRecipe(){
        
        try{
            const data=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const res=await data.json();
            //console.log(res);
            this.title=res.recipe.title;
            this.author=res.recipe.publisher;
            this.img=res.recipe.image_url;
            this.url=res.recipe.source_url;
            this.ingredients=res.recipe.ingredients;
        }
        catch(err)
            {
                console.log(err);
            }
        }
    
    calcTime(){
            //3 ingredients take 15 min.
            const numIng=this.ingredients.length;
            const periods=Math.ceil(numIng/3);
            this.time=periods*15;
            //console.log(this.time);
            }
    
    calcServings(){
            this.servings=4;
        }
    
   parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
    
    updateServings=type=>{
        
        //Servings
        const newServings=type==='dec'?this.servings-1:this.servings+1;
        
        //ingredients
        this.ingredients.forEach(ing=>{
            ing.count*=(newServings/this.servings);
            })
        
        this.servings=newServings;
              
    }
        }

        //List
        
class List{
    constructor(){
        this.items=[]
    }
    
    addItems(count,unit,ingredient){
        const item={
            id:(Math.random()*10000).toFixed(0),
                count,
                unit:unit,
                    ingredient:ingredient
        }
        this.items.push(item);
        //console.log(item.id);
        //console.log(item.id);
        return item;
    }
    
    deleteitem(id){
        const index=this.items.findIndex(el=>{
            el.id===id
        });
        this.items.splice(index,1);
        
        return this.items;
    }
    
    updateCount(id,newcount){
        this.items.find(el=>el.id===id)=newcount;
    }
}        


//Likes class

class Likes{
    constructor(){
        this.likes=[];
    }
    
    addLike(id,title,author,img){
    const like={
        id,
        title,
        author,
        img           
        }
    this.likes.push(like);
        this.persistData();
        return like;
    }
    
    deleteLike(id){
        const index=this.likes.findIndex(el=>{
            el.id===id;
        });
        
        this.likes.splice(index,1);
        this.persistData();
    }
    
    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!=-1;
    }
    
    getNumLikes(){
        return this.likes.length;
    }
    persistData(){
        localStorage.setItem("likes",JSON.stringify(this.likes));
        }
    
    readStorage(){
        
        const storage=JSON.parse(localStorage.getItem("likes"));
        if(storage)
            this.likes=storage;
    }
    
    
}


/**************************Controller***************************/

//Search


//State variable to have access to all the things at a particular time
const state={};



const controlSearch=async ()=>{
    //1.get query from the view
    const query=elements.searchInput.value;
    
    //2.Add it to the global state
    if(query && query !=="Search over 1,000,000 recipes...")
        state.search=new Search(query);
    
    //3. Prepare UI from the result
    elements.searchInput.value=" ";
    elements.searchView.innerHTML=" ";
    renderLoader(elements.infiniteLoader);
    
    //4.Search for the recipes
    await state.search.getResults();//async function returns promises so it needs to be awaited
    
    //5.Render results on UI
    clearLoader();
    renderResults(state.search.result);
    
}

//Recipe

const recipeControl=async ()=>{
    
    const id=window.location.hash.replace('#','');
   if(id){ 
       
    //Update the UI
    elements.recipe.innerHTML=" "; 
    renderLoader(elements.recipe);
       
    if (state.search) 
        highlightSelected(id);
  
    
    //Create recipe object
    state.recipe=new Recipe(id);
       
      
    
    try{
    //get the data
    await state.recipe.getRecipe();
        state.recipe.parseIngredients();
    
    //call the calctime and servings
        state.recipe.calcServings();
        state.recipe.calcTime();
    
    //render the results
        clearLoader();
        console.log(state.recipe);
        renderResult(state.recipe,state.likes.isLiked(id));
        
       }
       catch(err){
           console.log(err);
       }
   }
}



//window.l=new List();

//List Control

const controlList=()=>{
    
    //Create the list if not yet
    if(!state.list)
    state.list=new List();
    
    //add each ingredients and in state as well as UI
    state.recipe.ingredients.forEach(el=>{
        const item=state.list.addItems(el.count,el.unit,el.ingredient);
        //console.log(el.unit);
        renderItem(item);
    });
    
}

window.addEventListener('load',()=>{
    
    //Create new likes object
    state.likes=new Likes();
    
    
    state.likes.readStorage();
    
    
    toogleLikeMenu(state.likes.getNumLikes());
    
    
    state.likes.likes.forEach(like=>{
        renderLike(like);
    })
})

const controlLikes=()=>{
    //Create new object if not created yet
    
    if(!state.likes)
    state.likes=new Likes();
    
    const currID=state.recipe.id;
    //if is not Selected then add to likes
    
    if(!state.likes.isLiked(currID)){
        //Add to state
        const newLike=state.likes.addLike(currID,state.recipe.title,state.recipe.author,state.recipe.img);
        
        //Toogle the Heart
        toggleLikes(true);
        
        
        //Add to to UI list
        console.log(state.likes);
        renderLike(newLike);
        
     //else selected than delete from likes of state   
    }else{
        
        state.likes.deleteLike(currID);
        
        toggleLikes(false);
        
        
         console.log(state.likes,currID);
        deleteLike(currID);
    }
    
    toogleLikeMenu(state.likes.getNumLikes());
    
    
}








//Events

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault(); //prevent previous results
    controlSearch();
})

elements.resultsPerPages.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        
    const gotoPage=parseInt(btn.dataset.goto,10);
    elements.resultsPerPages.innerHTML=" ";
    elements.searchView.innerHTML=" ";
    
    renderResults(state.search.result,gotoPage);
    }
})

window.addEventListener('hashchange',recipeControl);
window.addEventListener('load',recipeControl);
//[,'load'].forEach(event=>{window.addEventListener(curr,recipeControl)});

elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-dec,.btn-dec *')){
        if(state.recipe.servings>1)
            {
                //Dec
                state.recipe.updateServings('dec');
                updateServings(state.recipe);
            }
    }
    else if(e.target.matches('.btn-inc,.btn-inc *')){
        state.recipe.updateServings('inc');
        updateServings(state.recipe);
    }
    else if(e.target.matches('.recipe__btn-add,.recipe__btn-add *')){
        //console.log('trig');
        controlList();
    }else if(e.target.matches('.recipe__love,.recipe__love *')){
        console.log('exec');
        controlLikes();
    }
            
        
    
    //console.log(state.recipe.servings);
    //console.log(state.recipe.ingredients);
});

elements.shopping.addEventListener('click',el=>{
    const id=el.target.closest('.shopping__item').dataset.item;
    console.log(id);
    //handling the delete button
    
   if(el.target.matches('.shopping__delete,.shopping__delete *')){
        //Delete from state
        state.list.deleteitem(id);
       
        //delete from UI
        deleteItem(id);
    }else if(el.target.matches('.shopping__count-value')){
         console.log(el.target.value);
        const val=parseFloat(el.target.value,10);
        if(val>0){
        state.list.updateCount(id,val);
        }
       
    }
});