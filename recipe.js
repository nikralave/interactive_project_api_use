let request = new XMLHttpRequest();


function displayNicely(apiData) {
    let newData = JSON.parse(apiData);
    console.log(newData);

    let htmlString = "";
    let sugarRDI = 20;
    let fatRDI = 10;

    let count = 0;
    for (var i = 0; i < 12; i++) {
        // adding bootstrap row every 3rd loop   
        count++;
        if (i % 3 == 0) {
            htmlString += "</div>" + "</div>" + "<div class = 'container'>" + "<div class ='row' id = 'spacer'>";
        }
        // link and image display
        let link = newData.hits[i].recipe.url;
        let image = newData.hits[i].recipe.image;


        htmlString += "<div class='col-xs-12 col-sm-6 col-md-4'>";
        htmlString += "<div>" + `<img src=${image} class='image'>` + "</div>";
        htmlString += "<div><strong>Recipe:</strong> " + newData.hits[i].recipe.label + "</div>";
        htmlString += "<div><strong>Link to website: </strong>" + `<a href=${link}>` + "Link to source" + "</a>" + "</div>";

        // Health & Ingredients Lists

        htmlString += "<div> Health Labels <ul>";


        for (var j = 0; j < newData.hits[i].recipe.healthLabels.length; j++) {
            htmlString += "<li>" + newData.hits[i].recipe.healthLabels[j] + "</li>";
        }
        htmlString += "</ul></div>";

        htmlString += "<div> Ingredients<button class= 'fullingredients'>+</button>";
        
       
        
        htmlString += "<ul>";

        for (var p = 0; p < newData.hits[i].recipe.ingredientLines.length; p++) {
            htmlString += "<li>" + newData.hits[i].recipe.ingredientLines[p] + "</li>";
        }
        htmlString += "</ul></div>";
        
         $(document).ready(function() {
            $(".fullingredients").click(function() {
                $(this).next().children().slideToggle();
            });
        });
        

        //serving and nutritional information

        let serving = newData.hits[i].recipe.yield;
        let calories = newData.hits[i].recipe.calories;
        let caloriesPerServing = parseInt(calories) / parseInt(serving);
        caloriesPerServing = caloriesPerServing.toFixed(0);
        htmlString += "<div><strong>Servings: </strong> " + serving + "</div>";
        htmlString += "<div><strong>Calories per serving: </strong> " + caloriesPerServing + "</div>";
        let sugar = newData.hits[i].recipe.totalNutrients.SUGAR.quantity;
        let fat = newData.hits[i].recipe.totalNutrients.FAT.quantity;
        htmlString += "<div><strong>Sugar % of RDI: </strong> " + (sugar / sugarRDI) + "</div>";
        htmlString += "<div><strong>Fat % of RDI: </strong> " + (fat / fatRDI) + "</div>";
        htmlString += "</div>"

        document.getElementById("data").innerHTML = htmlString;
    }
}


request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayNicely(this.responseText);
    }
    if (this.readyState == 4 && this.status == 404) {
        document.getElementById("data").innerHTML = "<strong>Ingredient not found. Please try again!</strong>";
    }
}



function submitIngredient() {
    let appid = "3755737a";
    let appKey = "e8d286856a2775535f230e0f8d05c433";

    let searchBarIngredient = document.getElementById("recipeForm")["ingredient"].value;

    let requestString = "https://api.edamam.com/search?q=" + searchBarIngredient;
    let e = document.getElementById("preselect");
    let preselect = e.options[e.selectedIndex].value;
    if (preselect != "") {
        requestString += " " + preselect;
    }

    requestString += "&app_id=" + appid + "&app_key=" + appKey + "&from=0&to=12";

    let nuts = document.getElementById("dietaryForm")["nutFree"].checked;
    if (nuts == true) {
        requestString += "&health=tree-nut-free";
    }

    let vegan = document.getElementById("dietaryForm")["vegan"].checked;
    if (vegan == true) {
        requestString += "&health=vegan";
    }

    let vegetarian = document.getElementById("dietaryForm")["vegetarian"].checked;
    if (vegetarian == true) {
        requestString += "&health=vegetarian";
    }

    let sugarConscious = document.getElementById("dietaryForm")["sugarConscious"].checked;
    if (sugarConscious == true) {
        requestString += "&health=sugar-conscious";
    }

    let calories = document.getElementById("dietaryForm")["maxCalories"].value;
    if (calories != "") {
        calories = "&calories=120-" + calories;
    }
    requestString += calories;
    console.log(requestString);

    request.open("GET", requestString);
    request.send();
}
