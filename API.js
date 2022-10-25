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

            RequestInStorage = JSON.parse(localStorage.getItem(`NameRequest`));
            DisplayData(RequestInStorage);
            

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
            var DataString = JSON.stringify(Data.drinks[0]);
            
            localStorage.setItem(`RandomRequest`,DataString);
            document.getElementById("NameButtonIngredients").style=display="none"

            RequestInStorage = JSON.parse(localStorage.getItem(`RandomRequest`));
            DisplayData(RequestInStorage);
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
    request.onload = async ()=>{
        
        if(request.status == 200){
            var Data = JSON.parse(request.response);

            localStorage.setItem(`IngredientDetail`,Data.ingredients[0].strDescription);
            let Detail = localStorage.getItem("IngredientDetail");

            if(Detail != "null"){
                const tex = document.createElement("h5");
                tex.innerHTML = Detail;
                document.getElementById("IngredientsInfo").appendChild(tex);

                const tex1 = document.createElement("h1");
                tex1.innerHTML = "\n";
                document.getElementById("IngredientsInfo").appendChild(tex1);
            }

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





//Display Data (Name/Random)
const DisplayData = (RequestInStorage) => {
    

    //Displaying Hidden
    document.getElementById("Lines").style.display="block"
    document.getElementById("IngredientDiv").style.display="block"

    //GettingTheData
    console.log(RequestInStorage);

    //Showing Name
    document.getElementById("NameText").innerHTML = RequestInStorage.strDrink;
    
    //Passing Image
    document.getElementById('NameImage').innerHTML = null;
    var element = document.getElementById('NameImage');
    var ImageElement = document.createElement('img');
    ImageElement.setAttribute('src', RequestInStorage.strDrinkThumb);
    ImageElement.setAttribute('width', "15%");
    element.appendChild(ImageElement);

    //Showing Recepie

    Ingredients = [];

    if(RequestInStorage.strIngredient1 != null) Ingredients[0] = RequestInStorage.strIngredient1
    if(RequestInStorage.strIngredient2 != null) Ingredients[1] = RequestInStorage.strIngredient2
    if(RequestInStorage.strIngredient3 != null) Ingredients[2] = RequestInStorage.strIngredient3
    if(RequestInStorage.strIngredient4 != null) Ingredients[3] = RequestInStorage.strIngredient4
    if(RequestInStorage.strIngredient5 != null) Ingredients[4] = RequestInStorage.strIngredient5
    if(RequestInStorage.strIngredient6 != null) Ingredients[5] = RequestInStorage.strIngredient6
    if(RequestInStorage.strIngredient7 != null) Ingredients[6] = RequestInStorage.strIngredient7
    if(RequestInStorage.strIngredient8 != null) Ingredients[7] = RequestInStorage.strIngredient8
    if(RequestInStorage.strIngredient9 != null) Ingredients[8] = RequestInStorage.strIngredient9
    if(RequestInStorage.strIngredient10 != null) Ingredients[9] = RequestInStorage.strIngredient10
    if(RequestInStorage.strIngredient11 != null) Ingredients[10] = RequestInStorage.strIngredient11
    if(RequestInStorage.strIngredient12 != null) Ingredients[11] = RequestInStorage.strIngredient12
    if(RequestInStorage.strIngredient13 != null) Ingredients[12] = RequestInStorage.strIngredient13
    if(RequestInStorage.strIngredient14 != null) Ingredients[13] = RequestInStorage.strIngredient14
    if(RequestInStorage.strIngredient15 != null) Ingredients[14] = RequestInStorage.strIngredient15

    let IngredientsString = Ingredients.toString();

    IngredientsFinal = IngredientsString.split(',').join("\r\n");

    document.getElementById("NameIngredients").innerHTML = IngredientsFinal;

    //Snowing Measurements

    Measure = [];

    if(RequestInStorage.strMeasure1 != null) Measure[0] = RequestInStorage.strMeasure1
    if(RequestInStorage.strMeasure2 != null) Measure[1] = RequestInStorage.strMeasure2
    if(RequestInStorage.strMeasure3 != null) Measure[2] = RequestInStorage.strMeasure3
    if(RequestInStorage.strMeasure4 != null) Measure[3] = RequestInStorage.strMeasure4
    if(RequestInStorage.strMeasure5 != null) Measure[4] = RequestInStorage.strMeasure5
    if(RequestInStorage.strMeasure6 != null) Measure[5] = RequestInStorage.strMeasure6
    if(RequestInStorage.strMeasure7 != null) Measure[6] = RequestInStorage.strMeasure7
    if(RequestInStorage.strMeasure8 != null) Measure[7] = RequestInStorage.strMeasure8
    if(RequestInStorage.strMeasure9 != null) Measure[8] = RequestInStorage.strMeasure9
    if(RequestInStorage.strMeasure10 != null) Measure[9] = RequestInStorage.strMeasure0
    if(RequestInStorage.strMeasure11 != null) Measure[10] = RequestInStorage.strMeasure11
    if(RequestInStorage.strMeasure12 != null) Measure[11] = RequestInStorage.strMeasure12
    if(RequestInStorage.strMeasure13 != null) Measure[12] = RequestInStorage.strMeasure13
    if(RequestInStorage.strMeasure14 != null) Measure[13] = RequestInStorage.strMeasure14
    if(RequestInStorage.strMeasure15 != null) Measure[14] = RequestInStorage.strMeasure15

    let MeasureString = Measure.toString();

    console.log(MeasureString)

    MeasureFinal = MeasureString.split(',').join("\r\n");

    document.getElementById("NameMeasure").innerHTML = MeasureFinal;

    //Instructions

    document.getElementById("NameInstructions").innerHTML = RequestInStorage.strInstructions;
}
//Search (Name/Random)
const NameSearchInput = document.querySelector("[Data-Search]")
NameSearchInput.addEventListener("input",(e) => {
    //Looking Through All Inputs 
    const value = e.target.value
    if(value !== ""){
        NameRequestName(value);
    }
    //Search For Specific Name 
    if(e.inputType == "deleteContentBackward"){ 
        document.getElementById("NameImage").innerHTML = null;
        document.getElementById("NameText").innerHTML = null;
        document.getElementById("NameIngredients").innerHTML = null;
        document.getElementById("NameMeasure").innerHTML = null;
        document.getElementById("NameInstructions").innerHTML = null;
        document.getElementById("NameButtonIngredients").style=display="none"
        document.getElementById("IngredientDiv").style.display="none"
        document.getElementById("Lines").style.display="none" 
    } 
    //When Enter is Pressed
    pressed = 0;
    NameSearchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if(pressed == 0){
                event.preventDefault();
                document.getElementById("NameSearchButton").click();
                pressed += 1
            }
        }
    })
    // When Button Pressed
    document.getElementById("NameSearchButton").onclick = function(){ 
        var Name = document.getElementById("NameSearchTextBar").value;
        NameRequest(Name);  
    }

})
//Random (Name/Random)
document.getElementById("NameRandomButton").onclick = function(){
    RandomRequest();
}
//Get Ingredients (Custom)
document.getElementById("IngredientButton").onclick = async function(){
    document.getElementById("NameButtonIngredients").style.display="block";

    //Delete existing Elements
    document.getElementById("IngredientsInfo").innerHTML = null;
    for (let i = 0; i < Ingredients.length; i++) {
        
        // Create element Text:
        IngredientDetailRequest(Ingredients[i])
    }
}






var Ingredients = ["vodka","Gin","Lime Juice cordial"];

IngredientRequest(Ingredients);

var Ingredient = "light rum"

IngredientDetailRequest(Ingredient);

var Category = "Cocktail"

CategoryRequest(Category);