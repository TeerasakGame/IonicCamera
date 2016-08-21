angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicActionSheet,$cordovaCamera) {
  $scope.image = "img/images.png";
  $scope.showDetail = function() {
  $ionicActionSheet.show({
    titleText: 'การนำเข้ารูป',
    buttons: [
      { text: 'จากเครื่อง' },
      { text: 'จากกล้อง' },
    ],
    cancelText: 'ยกเลิก',
    cancel: function() {
      console.log('CANCELLED');
    },
    buttonClicked: function(index) {
        switch (index) {
          case 0:
          //  alert("111");
            var options = {
                  destinationType: Camera.DestinationType.FILE_URI,
                  sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                  correctOrientation: true,
                  quality: 100,
                  allowEdit: true,
                }
            $cordovaCamera.getPicture(options).then(function(imageData){
              $scope.image = imageData;
              //$scope.imgURI = "data:image/jped;base64," + results;
            },function(err){

            });
            break;
          case 1:
              //alert("222");
              var options = {
                  quality: 100,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  //  targetWidth: 300,
                  //targetHeight: 400,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: true,
                  correctOrientation:true
                  };

              $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              $scope.image = "data:image/jpeg;base64," + imageData;
              }, function(err) {
              // error
              });
            break;
        }
      console.log('BUTTON CLICKED', index);
      return true;
    },
  });
};
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
