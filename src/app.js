//var angular = require("angular");
// data -> drinks
// {
//     "drinks":[
//        {
//           "idDrink":"17188",
//           "strDrink":"Mary Pickford",
//           "strDrinkAlternate":null,
//           "strDrinkES":null,
//           "strDrinkDE":null,
//           "strDrinkFR":null,
//           "strDrinkZH-HANS":null,
//           "strDrinkZH-HANT":null,
//           "strTags":"IBA,Classic",
//           "strVideo":null,
//           "strCategory":"Cocktail",
//           "strIBA":"Unforgettables",
//           "strAlcoholic":"Alcoholic",
//           "strGlass":"Cocktail glass",
//           "strInstructions":"Shake and strain into a chilled large cocktail glass",
//           "strInstructionsES":null,
//           "strInstructionsDE":"Sch\u00fctteln und abseihen in ein gek\u00fchltes gro\u00dfes Cocktailglas.",
//           "strInstructionsFR":null,
//           "strInstructionsZH-HANS":null,
//           "strInstructionsZH-HANT":null,
//           "strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/f9erqb1504350557.jpg",
//           "strIngredient1":"Light rum",
//           "strIngredient2":"Pineapple juice",
//           "strIngredient3":"Maraschino liqueur",
//           "strIngredient4":"Grenadine",
//           "strIngredient5":"Maraschino cherry",
//           "strIngredient6":null,
//           "strIngredient7":null,
//           "strIngredient8":null,
//           "strIngredient9":null,
//           "strIngredient10":null,
//           "strIngredient11":null,
//           "strIngredient12":null,
//           "strIngredient13":null,
//           "strIngredient14":null,
//           "strIngredient15":null,
//           "strMeasure1":"1 1\/2 oz ",
//           "strMeasure2":"1 oz ",
//           "strMeasure3":"1\/2 tsp ",
//           "strMeasure4":"1\/2 tsp ",
//           "strMeasure5":"1 ",
//           "strMeasure6":null,
//           "strMeasure7":null,
//           "strMeasure8":null,
//           "strMeasure9":null,
//           "strMeasure10":null,
//           "strMeasure11":null,
//           "strMeasure12":null,
//           "strMeasure13":null,
//           "strMeasure14":null,
//           "strMeasure15":null,
//           "strCreativeCommonsConfirmed":"No",
//           "dateModified":"2017-09-02 12:09:17"
//        }
//     ]
//  }
angular.module("deciderApp", [])
.factory('cocktailService', ['$http', '$q', ($http, $q) => {
    var getRandomCocktail = () => {
        console.log("calling getRandomCocktail");
        let deferred = $q.defer();
        let config = {
            method: "GET",
            url: "https://the-cocktail-db.p.rapidapi.com/random.php",
            headers: {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "80Tj0tzROQmshQ8z3ZvEzgpNhPKZp1YHqSojsnpS5qm3f5MXDN"
            }
        };

        $http(config)
            .then((data, status, headers, config) => {
                deferred.resolve(data);
            }, (data, status, headers, config) => {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    return {
        getRandomCocktail: getRandomCocktail
    }
}])
.controller("deciderController", ["$scope", "$http", "cocktailService", function deciderController($scope, $http, cocktailService) {
    var buildIngredientsArray = (drink) => {
        var ingredientsArray = [];

        for (var i = 1; i <= 15; i++) {
            let type = drink["strIngredient" + i];
            let measure = drink["strMeasure" + i];
            if (type === null) break; 
            ingredientsArray.push({type, measure});
        }

        return ingredientsArray;
    }

    var buildModel = ($scope, response) => {
        let drink = response.data.drinks[0];
        $scope.drinkTitle = drink.strDrink;
        $scope.drinkImg = drink.strDrinkThumb;
        $scope.drinkGlass = drink.strGlass;
        $scope.drinkInstructions = drink.strInstructions;
        $scope.ingredients = buildIngredientsArray(drink);
    }

    cocktailService.getRandomCocktail().then((response) => {
        buildModel($scope, response);
    },
    () => {
        console.log("error?")
    });
}]);