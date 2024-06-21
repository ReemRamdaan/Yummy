let rowData=document.getElementById("rowData");
let searcContainer=document.getElementById('searchContainer');
let submitBtn;
let nameFlag=false;
let emailFlag=false;
let phoneFlag=false;
let ageFlag=false;
let passwordFlag=false;
let repasswordFlag=false;

$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow","visible");
    })  
})
function clearRowData(){
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML=""
}
function openSideNav(){
    $(".side-nav-menu").animate({left:0},500);

        $(".open-close-icon").removeClass("fa-align-justify");
        $(".open-close-icon").addClass("fa-x");

        for(let i=0;i<5;i++){
            $(".links li").eq(i).animate({top:0},(i+5)*100);
        }
}
function closeSideNav(){
    let boxWidth=$(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({left:-boxWidth},500);
        $(".open-close-icon").removeClass("fa-x");
        $(".open-close-icon").addClass("fa-align-justify");

        for(let i=0;i<5;i++){
            $(".links li").eq(i).animate({top:300},(i+5)*100);
        }
}
closeSideNav();
$(".side-nav-menu i.open-close-icon").click(()=>{
    if($(".side-nav-menu").css("left")=="0px"){
        closeSideNav()
    }else
    {
        openSideNav()
    }
})
function displayMeals(arr){
    let cartoona=``;
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                    <div onclick="getMealDetails(${arr[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img src="${arr[i].strMealThumb}" alt="meal" class="w-100">
                        <div class="meal-layer h-100 w-100 d-flex  align-items-center text-black p-2 position-absolute">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML=cartoona;
}
async function searchByName(term){
closeSideNav();
clearRowData();  
let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
let result=await response.json();
result.meals?displayMeals(result.meals) : displayMeals([]);
$(".inner-loading-screen").fadeOut(300);
}
async function searchByFLetter(term){
closeSideNav();
clearRowData();
term==""?term="a":"";
let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
let result=await response.json();
result.meals?displayMeals(result.meals) : displayMeals([]);
$(".inner-loading-screen").fadeOut(300);
}
async function getCategories(){
    clearRowData();
    searcContainer.innerHTML="";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let result=await response.json();
    displayCategories(result.categories);
    $(".inner-loading-screen").fadeOut(300);
}
function displayCategories(arr){
    let cartoona=``;
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img src="${arr[i].strCategoryThumb}" alt="meal" class="w-100">
                        <div class="meal-layer h-100 w-100 text-center text-black p-2 position-absolute">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML=cartoona;
}
async function getArea(){
    clearRowData();
    searcContainer.innerHTML="";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let result=await response.json();
    displayArea(result.meals)
    $(".inner-loading-screen").fadeOut(300);
}
function displayArea(arr){
    let cartoona=``;
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                    <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 p-2 text-center cursor-pointer">
                    <i class="fa-solid fa-city fa-3x text-danger my-2"></i>
                            <h3>${arr[i].strArea}</h3>
                        </div>
                </div>
        `
    }
    rowData.innerHTML=cartoona;
}
async function getIngrdients(){
    clearRowData();
    searcContainer.innerHTML="";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result=await response.json();
     displayIngrdients(result.meals.slice(0,24))
     $(".inner-loading-screen").fadeOut(300);
}
function displayIngrdients(arr){
    let cartoona=``;
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                    <div onclick="getIngredientMeals('${arr[i].strIngredient}')" class="rounded-2 p-2 text-center cursor-pointer">
                    <i class="fa-solid fa-utensils fa-3x text-success my-2"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
                        </div>
                </div>
        `
    }
    rowData.innerHTML=cartoona;
}
async function getCategoryMeals(category){
clearRowData();
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
let result=await response.json();
displayMeals(result.meals);
$(".inner-loading-screen").fadeOut(300);
}
async function getAreaMeals(area){
clearRowData();
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
let result=await response.json();
displayMeals(result.meals);
$(".inner-loading-screen").fadeOut(300);
}
async function getIngredientMeals(ingredient){
clearRowData();
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
let result=await response.json();
displayMeals(result.meals);
$(".inner-loading-screen").fadeOut(300);
}
async function getMealDetails(mealID){
closeSideNav();
clearRowData();
searcContainer.innerHTML="";
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
let result=await response.json();
displayMealDetails(result.meals[0]);
$(".inner-loading-screen").fadeOut(300);
}
function displayMealDetails(meal){
    let ingredients=``;
    for(let i=1;i<=20;i++){
            if(meal[`strIngredient${i}`]){
                ingredients+=`<li class="alert alert-success m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
        let tags=meal.strTags?.split(",");
        if(!tags) tags=[];
        let strTags="";
        for(let i=0;i<tags.length;i++){
           strTags+=`
           <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
           `
        }
let cartoona=`
<div class="col-md-4">
<img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="">
<h2 class="mt-2">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
<h2>Instructions</h2>
<p>${meal.strInstructions}</p>
<h5>Area : ${meal.strArea}</h5>
<h5>Category : ${meal.strCategory}</h5>
<h5>Recipes :</h5>
<ul class="list-unstyled d-flex flex-wrap">
 ${ingredients}
</ul>
<h5>Tags :</h5>
<ul class="list-unstyled d-flex flex-wrap">
${strTags}
</ul>
<a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
<a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
</div>
`
rowData.innerHTML=cartoona;
}
function showSearchInputs(){
   searcContainer.innerHTML=`  
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0  text-white" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" type="text" maxlength="1" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0  text-white" placeholder="Search By First Letter">
        </div>
    </div>`
    rowData.innerHTML=""
}
function showContacts(){
    searcContainer.innerHTML=""; 
    rowData.innerHTML=`   
     <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
        <!-- <h2 class="text-secondary">Contact Us...</h2>-->
            <div class="col-md-6">
                <input type="text" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Enter Your Name" id="nameInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="nameAlert">
                    Special Characters & Numbers Are Not Allowed. 
                </div>
            </div>
            <div class="col-md-6">
                <input type="email" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Enter Your Email" id="emailInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="emailAlert">
                    Enter Valid Email. *EX: xxx@yyy.zzz 
                </div>
            </div>
            <div class="col-md-6">
                <input type="text" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Enter Your Phone" id="phoneInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="phoneAlert">
                    Enter Valid Phone Number.
                </div>
            </div>
            <div class="col-md-6">
                <input type="number" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Enter Your Age" id="ageInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="ageAlert">
                    Enter Valid Age. 
                </div>
            </div>
            <div class="col-md-6">
                <input type="password" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Enter Your Password" id="passwordInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="passwordAlert">
                    Enter Valid Password. *Minimum 8 Characters, at least 1 letter and 1 number
                </div>
            </div>
            <div class="col-md-6">
                <input type="password" onkeyup="inputsValidation()" class="form-control bg-transparent border border-top-0 border-start-0 border-end-0 text-white" placeholder="Repassword" id="repasswordInput">
                <div class="text-center w-100 alert alert-danger my-2 d-none" id="repasswordAlert">
                    Enter Valid Repassword.
                </div>
            </div>
        </div>
        <button disabled class="btn btn-outline-danger px-2 mt-3" id="submitBtn">Submit</button>
    </div>
</div>`
submitBtn=document.getElementById("submitBtn");
document.getElementById("nameInput").addEventListener('focus',()=>{
    nameFlag=true;
});
document.getElementById('emailInput').addEventListener('focus',()=>{
    emailFlag=true;
});
document.getElementById('phoneInput').addEventListener('focus',()=>{
    phoneFlag=true;
});
document.getElementById('ageInput').addEventListener('focus',()=>{
    ageFlag=true;
});
document.getElementById('passwordInput').addEventListener('focus',()=>{
    passwordFlag=true;
});
document.getElementById('repasswordInput').addEventListener('focus',()=>{
    repasswordFlag=true;
});
}
function inputsValidation(){
if (nameFlag){
    if(nameValidation()){
        document.getElementById('nameAlert').classList.replace("d-block","d-none");
        document.getElementById('nameInput').classList.add("is-valid");
    }else{
        document.getElementById('nameAlert').classList.replace("d-none","d-block");
        document.getElementById('nameInput').classList.remove("is-valid");
    }
}
if(emailFlag){
    if(emailValidation()){
            document.getElementById('emailAlert').classList.replace("d-block","d-none");
            document.getElementById('emailInput').classList.add("is-valid");
    }else{
       document.getElementById('emailAlert').classList.replace("d-none","d-block");
       document.getElementById('emailInput').classList.remove("is-valid");
    }
}
if(phoneFlag){
    if(phoneValidation()){
        document.getElementById('phoneAlert').classList.replace("d-block","d-none");
        document.getElementById('phoneInput').classList.add("is-valid");
    }else{
        document.getElementById('phoneAlert').classList.replace("d-none","d-block");
        document.getElementById('phoneInput').classList.remove("is-valid");
    }
}    
if(ageFlag){
    if(ageValidation()){
        document.getElementById('ageAlert').classList.replace("d-block","d-none");
        document.getElementById('ageInput').classList.add("is-valid");
    }else{
        document.getElementById('ageAlert').classList.replace("d-none","d-block");
        document.getElementById('ageInput').classList.remove("is-valid");
    }
}    
if(passwordFlag){
    if(passwordValidation()){
        document.getElementById('passwordAlert').classList.replace("d-block","d-none");
        document.getElementById('passwordInput').classList.add("is-valid");
    }else{
        document.getElementById('passwordAlert').classList.replace("d-none","d-block");
        document.getElementById('passwordInput').classList.remove("is-valid");
    }
}    
if(repasswordFlag){
    if(repasswordValidation()){
        document.getElementById('repasswordAlert').classList.replace("d-block","d-none");
        document.getElementById('repasswordInput').classList.add("is-valid");
    }else{
        document.getElementById('repasswordAlert').classList.replace("d-none","d-block");
        document.getElementById('repasswordInput').classList.remove("is-valid");
    }
}
if(
    nameValidation()&&
    emailValidation()&&
    phoneValidation()&&
    ageValidation()&&
    passwordValidation()&&
    repasswordValidation()
){
     submitBtn.removeAttribute("disabled");
}else{
submitBtn.setAttribute("disabled",true);
}
}
function nameValidation(){
return /^[a-zA-z]+$/.test(document.getElementById("nameInput").value);
}
function emailValidation(){
return /^(([^<>()[\]\\.,;:s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9(1,3)\.[0-9]{1,3}\])|(([a-zA-Z\0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value);
}
function phoneValidation(){
return /^(002){0,1}01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value);
}
function ageValidation(){
return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);
}
function passwordValidation(){
return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}
function repasswordValidation(){
return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value;
}
$(".logo").click(()=>{
    searchByName("");
})