//Recepies According to Name 
const NameRequest = (Name)=>{

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Name}`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            var DataString = JSON.stringify(Data.drinks[0]);
            
            localStorage.setItem(`NameRequest`,DataString);
            
            DisplayData();

        }else{
            console.log(`error ${request.status}`)
        }
    }
}
const NameRequestName = (Name)=>{

    const request = new XMLHttpRequest();
    
    request.open("GET", `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Name}`);
    request.send();
    request.onload = ()=>{

        if(request.status == 200){
            var Data = JSON.parse(request.response);
            
            var NameArray = [];

            for (let i = 0; i< Data.drinks.length; i++) {
                NameArray[i] = Data.drinks[i].strDrink;         
            }

            localStorage.setItem(`NameRequestName`,(NameArray))
            const NameRequestArray = localStorage.getItem(`NameRequestName`);  
            
            let String = NameArray.toString();

            //let StringBig = String.split(',').join("<");  (Interesting)

            let StringBig = String.split(',').join(" | ");
            
            document.getElementById('cocktailnameTEXT').innerHTML = StringBig;
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


//Display Data
const DisplayData = () => {
    RequestInStorage = JSON.parse(localStorage.getItem(`NameRequest`));
        console.log(RequestInStorage);
    
        
    document.getElementById('NameImage').innerHTML = null;

    var element = document.getElementById('NameImage');

    var ImageElement = document.createElement('img');
    
    ImageElement.setAttribute('src', RequestInStorage.strDrinkThumb);

    element.appendChild(ImageElement);


  

    
    






}

//Search
const NameSearchInput = document.querySelector("[Data-Search]")
NameSearchInput.addEventListener("input",(e) => {
    //Looking Through All Inputs 
    const value = e.target.value
    if(value !== ""){
        NameRequestName(value);
    }
    //Search For Specific Name 
    document.getElementById("NameSearchButton").onclick = function(){ 
        var Name = document.getElementById("NameSearchTextBar").value;
        NameRequest(Name);

        
        
    }

})












var Ingredients = ["vodka","Gin","Lime Juice cordial"];

IngredientRequest(Ingredients);

RandomRequest();

var Ingredient = "light rum"

IngredientDetailRequest(Ingredient);

var Category = "Cocktail"


CategoryRequest(Category);