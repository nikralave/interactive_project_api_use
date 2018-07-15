let request = new XMLHttpRequest();
let pageNumber = 1;

function displayNicely(apiData) {
    let newData = JSON.parse(apiData);
    console.log(newData);


    let htmlString = "";
    let sugarRDI = 20;
    let fatRDI = 10;

    let count = 0;

        // Health & Ingredients Lists
        $(document).ready(function() {
            $(".bottom_button").click(function(){
                $(this).next().on().slideToggle();
            });
        });
        $(document).ready(function() {
           $(".bottom_button2").click(function(){
        $(this).next().stop(true).slideToggle('slow');
    });
        });

    for (var i = 0; i < 12; i++) {
        // adding bootstrap row every 3rd loop   
        count++;
        if (i % 3 == 0) {
            htmlString += "</div>" + "</div>" + "<div class = 'container'>" + "<div class ='row' id = 'spacer'>";
        }
        // link and image display
        let link = newData.hits[i].recipe.url;
        let image = newData.hits[i].recipe.image;
        let recipeTitle = newData.hits[i].recipe.label;
        let recipeSource = newData.hits[i].recipe.source;


        htmlString += "<div class='col-xs-12 col-sm-6 col-md-4'>";
        htmlString += "<div>" + `<img src=${image} class='image'>` + "</div>";
        htmlString += "<div><strong><h3>" + recipeTitle.toUpperCase() + "</h3></strong></div>";
        htmlString += "<div><strong>By: "+ `<a href=${link}>` + recipeSource + "</a></strong></div>";
        htmlString += "<div><strong>Link to website: </strong>" + `<a href=${link}>` + "Link to source" + "</a>" + "</div>";
    
        
      
        htmlString += "<button class = 'btn btn-default bottom_button'>Health Labels</button><div style='display:none'><ul>";


        for (var j = 0; j < newData.hits[i].recipe.healthLabels.length; j++) {
            htmlString += "<li>" + newData.hits[i].recipe.healthLabels[j] + "</li>";
        }
        
        
        htmlString += "</ul></div><br/>";
        
        
       
        
      
        
        htmlString += "<button class = 'btn btn-default bottom_button2'>Ingredients</button><div style='display:none'><ul> ";

        for (var p = 0; p < newData.hits[i].recipe.ingredientLines.length; p++) {
            htmlString += "<p>" + newData.hits[i].recipe.ingredientLines[p] + "</p>";
        }
        htmlString += "</ul></div>";
        

        


        //serving and nutritional information

        let serving = newData.hits[i].recipe.yield;
        let calories = newData.hits[i].recipe.calories;
        let caloriesPerServing = parseInt(calories) / parseInt(serving);
        
        caloriesPerServing = caloriesPerServing.toFixed(0);
        htmlString += "<div class = 'flex-container'><div class = 'circle'><p>Serves: </p>" + serving + "</div>";
        htmlString += "<div class = 'circle'><p>Cals par serve: </p><p> " + caloriesPerServing + "</p></div></div>";
        
        let sugar = 1;
        if(newData.hits[i].recipe.totalNutrients.SUGAR!=null){
            sugar = newData.hits[i].recipe.totalNutrients.SUGAR.quantity;
        }
        let fat = newData.hits[i].recipe.totalNutrients.FAT.quantity;
        htmlString += "<div><strong>Sugar % of RDI: </strong> " + (sugar / sugarRDI).toFixed(2) + "</div>";
        htmlString += "<div><strong>Fat % of RDI: </strong> " + (fat / fatRDI).toFixed(2) + "</div>";
        htmlString += "</div>"

        //print out prev and next buttons
        if (i == 11) {
            console.log("got here" + pageNumber);
            htmlString += "<button onclick='submitIngredient(pageNumber+1)'>Next</button>";
            
    //        for(var j=1;j<=10;j++)
     //       {
     //           htmlString += "<button onclick='submitIngredient("+j+")'>"+j+"</button>";
      //      }
            if (pageNumber > 1) {
                htmlString += "<button onclick='submitIngredient(pageNumber-1)'>Previous</button>";
            }
        }
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


function submitIngredient(pageNumber) {
//    window.location.href = "../results.html";
    let appid = "3755737a";
    let appKey = "e8d286856a2775535f230e0f8d05c433";

    let searchBarIngredient = document.getElementById("recipeForm")["ingredient"].value;

    let requestString = "https://api.edamam.com/search?q=" + searchBarIngredient;
    let e = document.getElementById("preselect");
    let preselect = e.options[e.selectedIndex].value;
    if (preselect != "") {
        requestString += " " + preselect;
    }

    requestString += "&app_id=" + appid + "&app_key=" + appKey;
    console.log(pageNumber);
    pageNumber = parseInt(pageNumber, 10);
    let start = pageNumber * 12 - 12;
    let end = pageNumber * 12;
    requestString += "&from=" + start + "&to=" + end;

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

$(document).ready(function() {
           $(".bottom_button").click(function(){
        $(this).next().on().slideToggle();
    });
        });
        
