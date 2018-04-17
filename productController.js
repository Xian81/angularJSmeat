angular.module("productitemProduct").controller("productController", function ($scope, $http) {

    $scope.products = [];
    var prodId;
    var localeditDiscontinued;

    $scope.init = function () {
        $http.get("http://localhost:8970/api/ProductItem/")
            .success(function (response) {
                $scope.products = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.productEdit = function (prodId) {
        $scope.isUpdatingProduct = true;
        $http.get("http://localhost:8970/api/ProductItem/" + prodId)
            .success(function (response) {
                //   $scope.editProductItem = response.ProductItemId;
                $scope.editProductId = response.ProductId;
               // $scope.editProduct = response.Product;
                $scope.editCost = response.Cost;
                $scope.editMeasurementId = response.MeasurementId;
                //$scope.editMeasurementName = response.MeasurementName;
                $scope.Discontinued = response.Discontinued;
                $scope.editQuantity = response.StockQty;
                prodId = response.ProductItemId;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };


    $scope.edit = function () {
        var editProductItem = {
            ProductItemId: prodId, 
            ProductId: $scope.editProductId,
            Cost: $scope.editCost,
            MeasurementId: $scope.editMeasurementId, 
            Discontinued: $scope.editDiscontinued,
            StockQty: $scope.editQuantity 
        };
        $http.put("http://localhost:8970/api/ProductItem/" + prodId, editProductItem)
            .success(function () {
                $scope.isUpdatingProduct = false;
                $scope.init();
            })
              .error(function (error) {
               $scope.errorMessage = error;
            });

    };

    $scope.cancelEdit = function () {
        $scope.isUpdating = false;

    }








    $scope.init();


    

    
    //$scope.products = [

    //{
    //        ProductItemId: 1,
    //        ProductId:2,
    //        Product: "Chicken",
    //        Cost: "1.50",
    //        MeasurementId:5,
    //        MeasurementName: "Item",
    //        Discontinued:"false",
    //        StockQty: "10"
    //    },
    //    {
    //        ProductItemId: 2,
    //        ProductId: 3,
    //        Product: "Meat",
    //        Cost: "2.00",
    //        MeasurementId: 5,
    //        MeasurementName: "Item",
    //        Discontinued: "false",
    //        StockQty:"8"
    //    }
    //];

    //$scope.add = function () {
    //    var productDetails = {
    //       // ProductItemId: $scope.products.length,
    //        ProductId: $scope.theProductId,
    //        Cost: $scope.theCost,
    //        MeasurementId: $scope.theMeasurementId,
    //        Discontinued: $scope.theDiscontinued,
    //        StockQty: $scope.theStock
    //    };

    //    $http.post("http://localhost:8970/api/ProductItem/", productDetails)
    //        .success(function () {
    //            $scope.isEditing = false;
    //            $scope.init();
    //        })
    //        .error(function (error) {
    //            $scope.errorMessage = error;

    //        });

    // }; 
 


    $scope.beginEditing = function () {
        $scope.isEditing = true;

    };

    $scope.cancelAddition = function () {
        $scope.isEditing = false;
        $scope.productName = "";
    };


    $scope.remove = function (productId) {
        var productToRemove = $scope.products.indexOf(productId);
        $scope.products.splice(productToRemove, 1);
    };


       


});