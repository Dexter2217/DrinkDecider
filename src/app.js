//var angular = require("angular");

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
    cocktailService.getRandomCocktail().then((res) => {console.log(res)}, () => {console.log("error?")});
    $scope.message = "The message is here";
}]);