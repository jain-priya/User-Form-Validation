app.controller("myctrl", ($scope, myfactory, $http) => {
    console.log("Inside controller");
    $scope.formSubmit = function (isValid) {
        if (!isValid)
            window.alert("Form cannot be Submitted..");
        else {
            console.log("Inside func formSubmit")
            //        var today = new Date();
            //        var minAge = 18;
            //        $scope.userForm.age = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
            console.log($scope.userForm);
            $http.post("/user-form", $scope.userForm).then(function (data) {
                console.log("Data Inside form Post");
                console.log(data.data);
                switch (data.data) {
                    case 'WrongNumber':

                        $scope.errorMessage = 'Number is Wrong';
                        break;
                    case 'CannotSave':
                        $scope.errorMessage = 'User Already Exist or wrong E-mail';
                        break;
                    case 'Saved':
                        window.alert("Form Submitted.");
                        location.reload();
                        break;
                    default:
                        $scope.errorMessage = false;
                }
            }, function (err) {
                console.log("Error Inside form post " + err);

            });
        }
    }
})
