const NameRequest = ()=>{

    const request = new XMLHttpRequest();
    
    var LinkName = "www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka";
    
    request.open("GET", `https://${LinkName}`);
    request.send();
    request.onload = ()=>{
        console.log(request);
        if(request.status == 200){
            console.log(JSON.parse(request.response));
            var Data = JSON.parse(request.response);
            
            console.log(Data.drinks[2].idDrink);
            console.log(Data.drinks[2].strDrink);

        }else{
            console.log(`error ${request.status}`)
        }
    }
}

const IngredientRequest = (Ingredients)=>{

    console.log(Ingredients.length);

    for(let i = 0; i < Ingredients.length; i++){

        Ingredientselement = Ingredients[i];

        const request = new XMLHttpRequest();
        
        var LinkIngredient = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredientselement}`;
        
        request.open("GET",`https://${LinkIngredient}`);
        request.send();
        request.onload = ()=>{

            if(request.status == 200){
    
                let Data = JSON.parse(request.response);
    
                var Array = []; 
                
                    for(let i = 0; i < Data.drinks.length; i++){
                        
                        Array[i] = Data.drinks[i];
                    }       
    
                console.log(Array)  
            }else{
                console.log(`error ${request.status}`)
            }
        }
    }
}


var Ingredients = ["Gin","Vodka","Sugar"];

IngredientRequest(Ingredients);



