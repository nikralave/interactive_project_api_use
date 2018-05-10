// let request = new XMLHttpRequest();


// function displayNicely(apiData) {
//     let newData = JSON.parse(apiData);
//     console.log(newData);
//     let htmlString = "";



//     for (var i = 0; i < 3; i++) {
//         let link = newData.hits[i].recipe.url;
//         let image = newData.hits[i].recipe.image;
//         htmlString += "<div><strong>Recipe Title:</strong> " + newData.hits[i].recipe.label + "</div>";
//         htmlString += "<div>" + `<img src=${image}>` + "</div>";
//         htmlString += "<div><strong>Ingredient List: </strong> " + newData.hits[i].recipe.ingredientLines + "</div>";
//         htmlString += "<div><strong>Link to website: </strong>" + `<a href=${link}>` + link + "</a>" + "</div>";
//         for (var j = 0; j < newData.hits[i].recipe.healthLabels.length; j++) {
//             htmlString += "<div><strong>Health Labels: </strong> " + newData.hits[i].recipe.healthLabels[j] + "</div>";
//         }
//         let serving = newData.hits[i].recipe.yield;
//         let calories = newData.hits[i].recipe.calories;
//         let caloriesPerServing = parseInt(calories) / parseInt(serving);
//         caloriesPerServing = caloriesPerServing.toFixed(0);
//         htmlString += "<div><strong>Servings: </strong> " + serving + "</div>";
//         htmlString += "<div><strong>Calories per serving: </strong> " + caloriesPerServing + "</div>";
//         document.getElementById("data").innerHTML = htmlString;
//     }
// }


// request.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         displayNicely(this.responseText);
//     }
//     if (this.readyState == 4 && this.status == 404) {
//         document.getElementById("data").innerHTML = "<strong>Ingredient not found. Please try again!</strong>";
//     }
// }



// function submitIngredient() {
//     let appid = "4146a356";
//     let appKey = "34e3f6ef70c832075c90fe333865819b";

//     let searchBarIngredient = document.getElementById("recipeForm")["ingredient"].value;

//     let requestString = "https://api.edamam.com/search?q=" + searchBarIngredient;
//     let e = document.getElementById("preselect");
//     let preselect = e.options[e.selectedIndex].value;
//     if (preselect != "") {
//         requestString += " " + preselect;
//     }

//     requestString += "&app_id=" + appid + "&app_key=" + appKey + "&from=0&to=3";

    // let nuts = document.getElementById("dietaryForm")["nutFree"].checked;
    // if (nuts == true) {
    //     requestString += "&health=tree-nut-free";
    // }

    // let vegan = document.getElementById("dietaryForm")["vegan"].checked;
    // if (vegan == true) {
    //     requestString += "&health=vegan";
    // }

    // let vegetarian = document.getElementById("dietaryForm")["vegetarian"].checked;
    // if (vegetarian == true) {
    //     requestString += "&health=vegetarian";
    // }

    // let sugarConscious = document.getElementById("dietaryForm")["sugarConscious"].checked;
    // if (sugarConscious == true) {
    //     requestString += "&health=sugar-conscious";
    // }

    // let calories = document.getElementById("dietaryForm")["maxCalories"].value;
    // if (calories != "") {
    //     calories = "&calories=0-" + calories;
    // }
    // requestString += calories;
    // console.log(requestString);

//     request.open("GET", requestString);
//     request.send();
// }

