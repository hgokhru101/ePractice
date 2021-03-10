let app = angular.module("CRUDAPP", [])
const apiURL = "http://localhost:3000/api";
app.controller("Controller", ($scope, $http) => {
    $scope.addData = () => {
        let data = JSON.stringify({
            "StudentId": $scope.StudentId,
            "Name": $scope.Name,
            "Roll": $scope.Roll,
            "Birthday":$scope.Birthday
        })

        $http.post(`${apiURL}/save`,
                data
            )
            .then((response) => {
                console.log(response.data)
                $scope.fetchData();
            }, (error) => {
                console.log(error.data.error);
            });
    }
    $scope.fetchData=()=>{
        $http.get(`${apiURL}/fetchdata`)
        .then((response)=>{
            $scope.table_data=response.data
        }, (error) => {
            console.log(error.data.error);
        })
    }
    $scope.fetchData();
});