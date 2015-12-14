angular.module('dorm', [])
  .controller('DormController', function ($http, $scope, $filter) {
    var dorm = this
    $scope.testng = 'angular OK'
    var arraylength
    var dormdata
    var i = 0

    $http.get('/database').success(function (data) {
      $scope.dormdb = data
      arraylength = $scope.dormdb.length
      dormdata = data
      // console.log(dormdata[0]._id)
      getdata()
    }).error(function (data, status, headers, config) {})

    getdata = function () {
      $http.get('/detaildorm').success(function (data) {
        do {
          if (dormdata[i]._id == data) {
            // console.log(dormdata[i])
            $scope.detaildorm = dormdata[i]
          }
          i++
        } while (i < arraylength)

        // console.log($scope.detaildorm)
        }).error(function (data, status, headers, config) {})

        $http.get('/editdata').success(function (data) {
          i = 0
          do {
            if (dormdata[i]._id == data) {
              // console.log(dormdata[i])
              $scope.detaildorm = dormdata[i]
              console.log($scope.detaildorm)
              dorm.id = $scope.detaildorm._id
              dorm.namedorm = $scope.detaildorm.namedormair
              dorm.address = $scope.detaildorm.addressdormair
              dorm.priceair = $scope.detaildorm.priceair
              dorm.pricefan = $scope.detaildorm.pricefan
              dorm.tel = $scope.detaildorm.contact
              dorm.nametel = $scope.detaildorm.namecontact
              dorm.distance = $scope.detaildorm.distance
              dorm.namedorm = $scope.detaildorm.namedormair
              dorm.empair = $scope.detaildorm.emproomair
              dorm.empfan = $scope.detaildorm.emproomfan
              dorm.etc = $scope.detaildorm.etc
              break
            }
            i++
          } while (i < arraylength)

          // console.log($scope.detaildorm)
          }).error(function (data, status, headers, config) {})
        }

        $scope.querydorm = function (id) {
          console.log(id)

        }

        dorm.login = function () {
          datalogin = {
            username: dorm.username,
            password: dorm.password
          }
          $http.post('/public/admin', datalogin).then(function (response) {
            if (response.data) window.location = 'data.html'
            else alert('incorrect')
          })
        }
        dorm.edit = function (id, index) {
          console.log('=' + id + index)
        }
        dorm.editroom = function () {
          console.log('edit')
          data = {
            _id: dorm.id,
            namedormair: dorm.namedorm,
            addressdormair: dorm.address,
            priceair: dorm.priceair,
            pricefan: dorm.pricefan,
            contact: dorm.tel,
            namecontact: dorm.nametel,
            distance: dorm.distance,
            emproomair: dorm.empair,
            emproomfan: dorm.empfan,
            etc: dorm.etc
          }
          $http.post('/public/update', data).then(function (response) {
            if (response.data) {
              window.location = '../data.html'
              console.log('pass')
            }
            else alert('Incorrect')
          })
        }
        dorm.addroom = function () {
          console.log('add')
          data = { namedormair: dorm.addnamedorm,
            addressdormair: dorm.addaddress,
            priceair: dorm.addprice,
            pricefan: dorm.addpriceair,
            contact: dorm.addtel,
            namecontact: dorm.addnametel,
            distance: dorm.adddistance,
            emproomair: dorm.addemp,
            emproomfan: dorm.addempair,
            etc: dorm.addetc
          }
          $http.post('/public/add', data).then(function (response) {
            if (response.data) {
              window.location = 'data.html'
              console.log('pass')
            }
            else alert('Incorrect')
          })
        }
        dorm.cancer = function () {
          window.location = 'admin.html'
        }
        dorm.goadd = function () {
          dorm.addnamedorm = ''
          dorm.addaddress = ''
          dorm.addpriceair = ''
          dorm.addpricefan = ''
          dorm.addtel = ''
          dorm.addnametel = ''
          dorm.adddistance = ''
          dorm.addnamedorm = ''
          dorm.addempair = ''
          dorm.addempfan = ''
          dorm.addetc = ''
          window.location = 'add.html'
        }
        dorm.delete = function (id, index) {
          $http.post('/database', { _id: id}).then(function (response) {
            dorm.data.splice(index, 1)
          })
        }
        dorm.query = function () {
          $http.get('/database').success(function (response) {
            dorm.data = response
            console.log(dorm.data)
          })
        }
      })
