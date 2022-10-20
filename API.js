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

    console.log(parsedstring);

}

const SchnittDrink = (length) => {

    localStorage.setItem("SchnittmengeDrinks",(SchnittmengeDrinks = []));

    for (let i = 0; i < length; i++) {
        
        if (i == 0) {
            localStorage.setItem("SchnittmengeDrinks",(localStorage.getItem(`DrinkArray${i}`)));
            
        } else {
            console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));
            const SchnittAkt = JSON.parse(localStorage.getItem("SchnittmengeDrinks"));
            slen = SchnittAkt.length;
            

            const ArrAkt = JSON.parse(localStorage.getItem(`DrinkArray${i}`));
            alen = ArrAkt.length;

            console.log(alen)
            console.log(slen)



            Zwischenwert = [];
            console.log(Zwischenwert);
        
            counter = 0;


            for (let ii = 0; ii < slen; ii++) {
                
                for (let j = 0; j < alen; j++) {
                    console.log("hello");
                    if (SchnittAkt[ii].strDrink == ArrAkt[j].strDrink) {
                        Zwischenwert[counter] = SchnittAkt[ii];
                        
                        localStorage.setItem("Zwischenwert",JSON.stringify(Zwischenwert));
                        console.log(counter);
                        counter = (counter + 1);

                    }
                    
                }
                
                
            }
            
            console.log(JSON.parse(localStorage.getItem("Zwischenwert")));

            localStorage.setItem("SchnittmengeDrinks",localStorage.getItem("Zwischenwert"));

            console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));
                   
        }
    }

    // Parsing the Intersection and printing

    console.log(JSON.parse(localStorage.getItem("SchnittmengeDrinks")));;
    
}


var Ingredients = ["Lime","sugar","mint","Cachaca"];

IngredientRequest(Ingredients);



