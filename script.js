const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipeContainer = document.getElementById('recipeContainer')

searchForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const recipe = searchInput.value;
    getRecipes(recipe);

  });


  function getRecipes(recipe){
    fetch(`https://api.edamam.com/search?q=${recipe}&app_id=a712a2cb&app_key=717b56563b7663ec66ce70553e79c17b&from=0&to=15`)
        .then(function(response){
            return response.json();
        }).then(function(jsondata){
            console.log(jsondata.hits[0].recipe)
            console.log(jsondata.hits[0].recipe.totalNutrients)
            let output = '';
            jsondata.hits.forEach(element => {
                const label = element.recipe.label;
                const calories = element.recipe.calories;
                const image = element.recipe.image;
                const url = element.recipe.url;
                let healthLabelsArray = element.recipe.healthLabels;
                let healthLabels = '';
                for (let index = 0; index <6; index++) {
                    healthLabels += healthLabelsArray[index] + ','
                }
                const ingredientLines = element.recipe.ingredientLines;
                const vitaminA = element.recipe.totalNutrients.VITA_RAE;
                const vitaminC = element.recipe.totalNutrients.VITC;
                const vitaminD = element.recipe.totalNutrients.VITD;
                const vitaminE = element.recipe.totalNutrients.TOCPHA;
                const vitaminK = element.recipe.totalNutrients.VITK1;
                

                output += `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${label}</h5>
                  <p class="card-text"><strong>Calories</strong>: ${calories.toFixed(2)}<br>
                  <strong>Health Labels</strong>: ${healthLabels}<br>
                  <strong>Nutrients</strong>: <br>
                  <ul>
                    <li>${vitaminA.label} - ${vitaminA.quantity.toFixed(2)}${vitaminA.unit}</li>
                    <li>${vitaminC.label} - ${vitaminC.quantity.toFixed(2)}${vitaminC.unit}</li>
                    <li>${vitaminD.label} - ${vitaminD.quantity.toFixed(2)}${vitaminD.unit}</li>
                    <li>${vitaminE.label} - ${vitaminE.quantity.toFixed(2)}${vitaminE.unit}</li>
                    <li>${vitaminK.label} - ${vitaminK.quantity.toFixed(2)}${vitaminK.unit}</li>
                    </ul><br>
                    </p><br>
                  <a href="${url}" target="_blank" class="btn btn-primary">View Recipe</a>
                </div>
              </div>
              </div>`;

            });
            recipeContainer.innerHTML = output;
        })
  }















// btn.onclick = fun => {
//     fetch("https://api.edamam.com/search?q=pizza&app_id=a712a2cb&app_key=717b56563b7663ec66ce70553e79c17b")
//     .then(function(response){
//         return response.json();
//     }).then(function(jsondata){
//         console.log(jsondata)
//         // console.log(jsondata.hits[0].recipe.image)
//         // console.log(jsondata.hits[0].recipe.url)
//         // console.log(jsondata.hits[0].recipe.healthLabels)
//         // console.log(jsondata.hits[0].recipe.ingredientLines)
//         // console.log(jsondata.hits[0].recipe.calories)
//         // console.log(jsondata.hits[0].recipe.totalNutrients)
//     })

// }