$(function load(){
    $('#loading').fadeOut(1000,function(){
        $('body').css('overflow','auto')
    })
}
)

let isOpen = true 
$('.open').on('click',function(){
    let width = $("#box-element").width()
    if(isOpen){
        $("#box-container").animate({left:-width},1000)
        $(".open").removeClass("fa-solid fa-xmark");
    $(".open").addClass("fa-solid fa-bars");
        isOpen = false
    }else{
        $("#box-container").animate({left:0},1000)
        $(".open").removeClass("fa-solid fa-bars");
    $(".open").addClass("fa-solid fa-xmark");
        isOpen = true

    }
})

$('a').on('click',function(){
    let width = $("#box-element").width()
    if(isOpen){
        $("#box-container").animate({left:-width},1000)
        $(".open").removeClass("fa-solid fa-xmark");
    $(".open").addClass("fa-solid fa-bars");
        isOpen = false
    }else{
        $("#box-container").animate({left:0},1000)
        $(".open").removeClass("fa-solid fa-bars");
    $(".open").addClass("fa-solid fa-xmark");
        isOpen = true
    }
})

async function getMainMeals(){
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let response = await data.json()
    displayMainMeals(response.meals)
 }
 
 getMainMeals()
 
 function displayMainMeals(data){
     var cartona = ``
     for(i=0;i<data.length;i++){
         cartona += `
         <div class="col-md-3">
                        <div onclick="getMealInfo('${data[i].idMeal}')" class="colu">
                            <img src="${data[i].strMealThumb}" alt="">
                            <div class="over">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
         `
     }
 
     document.getElementById("main-meal").innerHTML = cartona;
 }

 async function searchByName(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`)
    let response = await data.json()
    displayMainMeals(response.meals)
    $('#s-name').on('keyup',function(){
        $('#searches').siblings().css('display','none')
        $('#searches').css('display','block')
        $('#main-meals').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }

async function searchByLetter(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${info}`)
    let response = await data.json()
    displayMealsByLetter(response.meals)
    $('#s-letter').on('keyup',function(){
        $('#searches').siblings().css('display','none')
        $('#searches').css('display','block')
        $('#search-letter').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }

 searchByLetter()

 function displayMealsByLetter(data){
    var cartona = ``
    for(i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${data[i].idMeal}')" class="colu">
                           <img src="${data[i].strMealThumb}" alt="">
                           <div class="over">
                               <h3>${data[i].strMeal}</h3>
                           </div>
                       </div>
                   </div>
        `
    }

    document.getElementById("search-l").innerHTML = cartona;
}

 function displayMeals(data){
    var cartona = ``
    for(i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                       <div onclick="getMealInfo('${data[i].idMeal}')" class="colu">
                           <img src="${data[i].strMealThumb}" alt="">
                           <div class="over">
                               <h3>${data[i].strMeal}</h3>
                           </div>
                       </div>
                   </div>
        `
    }
    
    document.getElementById("meal").innerHTML = cartona;
}

async function getCategories(){
   let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
   let response = await data.json()
   displayCategories(response.categories)
}

getCategories()

function displayCategories(data){
    var cartona = ``
    for(i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="co-lay">
                            <img src="${data[i].strCategoryThumb}" alt="">
                            <div class="layer text-center pt-2 px-2">
                                <h3>${data[i].strCategory}</h3>
                                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                        </div>
                    </div>
        `
    }
    document.getElementById("category").innerHTML = cartona;
}

async function getCategoryMeals(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${info}`)
    let response = await data.json()
    
    displayMeals(response.meals.slice(0, 20))
    $('.co-lay').on('click',function(){
        $('#meals').siblings().css('display','none')
        $('#meals').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }

 async function getAreas(){
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let response = await data.json()
    displayAreas(response.meals)
 }

 getAreas()

 function displayAreas(data){
    var cartona = ``
    for(i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                        <div onclick="getAreaMeals('${data[i].strArea}')" class="lay">
                            <i class="fa-solid fa-house-laptop"></i>
                        <h3>${data[i].strArea}</h3>
                        </div>
                    </div>

        `
    }

    document.getElementById("area").innerHTML = cartona;
}

 async function getAreaMeals(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${info}`)
    let response = await data.json()
    displayMeals(response.meals.slice(0, 20))
    $('.lay').on('click',function(){
        $('#meals').siblings().css('display','none')
        $('#meals').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }

 async function getIngredients(){
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let response = await data.json()
    displayIngredients(response.meals)
 }

 getIngredients()

 function displayIngredients(data){
    var cartona = ``
    
    for(i=0;i<20;i++){

        cartona += `
        <div class="col-md-3">
                        <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="lay">
                            <i class="fa-solid fa-drumstick-bite"></i>
                            <h3>${data[i].strIngredient}</h3>
                            <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>

        `
    }
    document.getElementById("ingredient").innerHTML = cartona;
}

 async function getIngredientsMeals(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${info}`)
    let response = await data.json()
    displayMeals(response.meals.slice(0, 20))
    $('.lay').on('click',function(){
        $('#meals').siblings().css('display','none')
        $('#meals').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }
 
 async function getMealInfo(info){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    let response = await data.json()
    displayMealInfo(response.meals)
    $('.colu').on('click',function(){
        $('#items').siblings().css('display','none')
        $('#items').css('display','block')
        $("#box-container").animate({left:-width},1000)
    })
 }
 
 getMealInfo()

 function displayMealInfo(data){
     var cartona = ``
     for(i=0;i<data.length;i++){
         cartona += `
         <div class="col-md-4">
         <div class="item-img">
             <img src="${data[i].strMealThumb}" alt="">
             <h2>${data[i].strMeal}</h2>
         </div>
     </div>
     <div class="col-md-8">
         <div class="item-info">
             <h2>Instructions</h2>
             <p>${data[i].strInstructions}</p>
             <h3>Area: ${data[i].strArea}</h3>
             <h3>Category: ${data[i].strCategory}</h3>
             <h3>Recipes: </h3>
             <ul class="ul1">
                 <li>${data[i].strMeasure1+data[i].strIngredient1}</li>
                 <li>${data[i].strMeasure2+data[i].strIngredient2}</li>
                 <li>${data[i].strMeasure3+data[i].strIngredient3}</li>
                 <li>${data[i].strMeasure4+data[i].strIngredient4}</li>
                 <li>${data[i].strMeasure5+data[i].strIngredient5}</li>
                 <li>${data[i].strMeasure6+data[i].strIngredient6}</li>
                 <li>${data[i].strMeasure7+data[i].strIngredient7}</li>
                 <li>${data[i].strMeasure8+data[i].strIngredient8}</li>
                 <li>${data[i].strMeasure9+data[i].strIngredient9}</li>
             </ul>
             <h3>Tags: </h3>
             <ul class="ul2">
                 <li>${data[i].strTags}</li>
             </ul>
             <button class="btn btn-success"><a href="${data[i].strSource}" target="_blank">Sourcse</a></button>
            <button class="btn btn-danger"><a href="${data[i].strYoutube}" target="_blank">Youtube</a></button>
         </div>
     </div>
         `
     }
 
     document.getElementById("item").innerHTML = cartona;
 }

$('#c').on('click',function(){
    $('#categories').siblings().css('display','none')
    $('#categories').css('display','block')
    $("#box-container").animate({left:-width},1000)
})

$('#s').on('click',function(){
    $('#searches').siblings().css('display','none')
    $('#searches').css('display','block')
    $("#box-container").animate({left:-width},1000)
})

$('#a').on('click',function(){
    $('#areas').siblings().css('display','none')
    $('#areas').css('display','block')
    $("#box-container").animate({left:-width},1000)
})

$('#i').on('click',function(){
    $('#ingredients').siblings().css('display','none')
    $('#ingredients').css('display','block')
    $("#box-container").animate({left:-width},1000)
})

$('#co').on('click',function(){
    $('#contacts-us').siblings().css('display','none')
    $('#contacts-us').css('display','block')
    $("#box-container").animate({left:-width},1000)
})

const validateName = (name) => {
    return name.match(
        /^[a-zA-Z ]+$/
        );
  };
  
  const validateNa = () => {
    const $result = $('#result-name');
    const name = $('#name').val();
    $result.text('');
  
    if(validateName(name)){
      $result.text(name + ' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text('Enter valid Name');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  $('#name').on('input', validateNa);

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
  const validateEm = () => {
    const $result = $('#result-email');
    const email = $('#email').val();
    $result.text('');
  
    if(validateEmail(email)){
      $result.text(email + ' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text(' Email not valid *exemple@yyy.zzz');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  
  $('#email').on('input', validateEm);

  const validateNumber = (number) => {
    return number.match(
        /^[a-zA-Z0-9\-().\s]{10,15}$/
        );
  };
  
  const validateNum = () => {
    const $result = $('#result-number');
    const number = $('#number').val();
    $result.text('');
  
    if(validateNumber(number)){
      $result.text(number + ' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text('Enter valid Phone Number');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  
  $('#number').on('input', validateNum);

  const validateAge = (age) => {
    return age.match(
        /^(0?[1-9]|[1-9][0-9])$/
        );
  };
  
  const validateAg = () => {
    const $result = $('#result-age');
    const age = $('#age').val();
    $result.text('');
  
    if(validateAge(age)){
      $result.text(age + ' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text('Enter valid age');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  
  $('#age').on('input', validateAg);

const validatePassword = (password) => {
    return password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        );
  };
  
  const validatePass = () => {
    const $result = $('#result-password');
    const password = $('#password').val();
    $result.text('');
  
    if(validatePassword(password)){
      $result.text(' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text('Enter valid password *Minimum eight characters, at least one number, one uppercase and one lowercase:*');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  $('#password').on('input', validatePass);

  const validateRepassword = (repassword) => {
    return repassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        );
  };
  
  const validateRepass = () => {
    const $result = $('#result-repassword');
    const repassword = $('#repassword').val();
    $result.text('');
  
    if(validateRepassword(repassword)){
      $result.text(' is valid.');
      $result.css('color', 'green');
      $result.css('background-color', '#D2E3C8')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    } else{
      $result.text('Enter valid repassword');
      $result.css('color', '#842029');
      $result.css('background-color', '#F8D7DA')
      $result.css('text-align', 'center')
      $result.css('padding', '10px');
      $result.css('border-radius', '5px');
    }
    return false;
  }
  
  $('#repassword').on('input', validateRepass);