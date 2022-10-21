//Recepies According to Name 
const NameRequest = (Name)=>{

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Name}`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            
            console.log(Data.drinks);

        }else{
            console.log(`error ${request.status}`)
        }
    }
}

//Random Cocktail
const RandomRequest = ()=>{

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            
            console.log(Data.drinks[0]);

        }else{
            console.log(`error ${request.status}`)
        }
    }
}

// Drinks To Make With Given Ingredients in Order!!!
const IngredientRequest = (Ingredients)=>{

    for(let i = 0; i < Ingredients.length; i++){

        Ingredientselement = Ingredients[i];

        const request = new XMLHttpRequest();
        
        request.open("GET",`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredientselement}`);
        request.send();
        request.onload = ()=>{

            if(request.status == 200){
    
                let Data = JSON.parse(request.response);
    
                var Array = []; 
                
                    for(let i = 0; i < Data.drinks.length; i++){
                        
                        Array[i] = Data.drinks[i];

                    }   
                    
                    TransferData(Array,i);
    
            }else{
                console.log(`error ${request.status}`)
            }
        }
    }

    SchnittDrink(Ingredients.length);
}
const TransferData = (Array,i) => {

    const DrinkArray = JSON.stringify(Array)

    localStorage.setItem(`DrinkArray${i}`,DrinkArray);

    //Stored in Local Storage!!!

    const string = localStorage.getItem(`DrinkArray${i}`);

    const parsedstring = JSON.parse(string);

    //console.log(parsedstring);

}
const SchnittDrink = (length) => {

    localStorage.setItem("SchnittmengeDrinks",(SchnittmengeDrinks = []));

    for (let i = 0; i < length; i++) {
        
        if (i == 0) {
            localStorage.setItem("SchnittmengeDrinks",(localStorage.getItem(`DrinkArray${i}`)));
            
        } else {
            //console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));
            const SchnittAkt = JSON.parse(localStorage.getItem("SchnittmengeDrinks"));
            slen = SchnittAkt.length;
            

            const ArrAkt = JSON.parse(localStorage.getItem(`DrinkArray${i}`));
            alen = ArrAkt.length;

            // console.log(alen)
            // console.log(slen)



            Zwischenwert = [];
            // console.log(Zwischenwert);
        
            counter = 0;


            for (let ii = 0; ii < slen; ii++) {
                
                for (let j = 0; j < alen; j++) {
                    // console.log("hello");
                    if (SchnittAkt[ii].strDrink == ArrAkt[j].strDrink) {
                        Zwischenwert[counter] = SchnittAkt[ii];
                        
                        localStorage.setItem("Zwischenwert",JSON.stringify(Zwischenwert));
                        // console.log(counter);
                        counter = (counter + 1);
                    }                    
                }                
            }
            
            // console.log(JSON.parse(localStorage.getItem("Zwischenwert")));

            localStorage.setItem("SchnittmengeDrinks",localStorage.getItem("Zwischenwert"));

            // console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));
                   
        }
    }

    // Parsing the Intersection and printing DONE

    console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));;
    
}

//Cocktail Ingredient Lookup
const IngredientDetailRequest = (Ingredient)=>{

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${Ingredient}`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            
            console.log(Data.ingredients[0].strDescription);

        }else{
            console.log(`error ${request.status}`)
        }
    }
}

//Cocktail By Category
const CategoryRequest = (Category) => {

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${Category}`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            
            console.log(Data);

        }else{
            console.log(`error ${request.status}`)
        }
    }

}


//Search

const NameSearchInput = document.querySelector("[Data-Search]")
NameSearchInput.addEventListener("input",(e) => {
    const value = e.target.value
    NameRequest(value);
    console.log(value);
}) 












var Ingredients = ["vodka","Gin","Lime Juice cordial"];

IngredientRequest(Ingredients);

var Name = "Army Special"

NameRequest(Name);

RandomRequest();

var Ingredient = "light rum"

IngredientDetailRequest(Ingredient);

var Category = "Cocktail"


CategoryRequest(Category);