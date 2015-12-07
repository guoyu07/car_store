
define(function() {

  var server = 'http://172.16.30.96:3000';


  return {
    /*
     * 获得登录的 access_token
     */
    login: function() {
      return $.ajax({
        type: 'post',
        dataType: 'json',
        url: server + '/oauth/token',
        data: {
          'phone': '15920191911',
          'password': '1234567890',
          'grant_type': 'password',
          'client_id': 'dbf597e4656661c6115b8603f277a899878c7a707cbfd241bf351da49a278d6d',
          'client_secret': '5c5de8b32c34a29271a33ddff965bee3f75c262899f43750ed8f691c3c2f3950'
        }
      }).done(function(data) {
        console.log(data)
      });
    },

    /*
     * 获得应用列表
     */
    getAllWares: function() {

      var xhr = new XMLHttpRequest();

      xhr.open('get', server + '/api/v1/wares.json?sn=8469e2920a239a83192eff5313abab82');
      xhr.setRequestHeader('Authorization', 'Bearer 3c85512a95a40b4cbb93b6b4bbb51aad476b5f1f28b705e728b9aafba05961c7');
      xhr.send(null);

      xhr.onreaderstatechange = function(e) {
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log('success')
        }
        else {
          console.log('error')
        }
      }
/*
      $.ajax({

      dataType: 'json',
      url: 'http://localhost:3000/api/v1/homes.json',
      data: {
        'sn': 'fldjslfjsl'
      },
      headers: {
        // 'aaaabbbb': 'hahahaha'
      },
      type: 'get'

    })
    .done(function(data) {
      console.log(data)
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });*/

/*
      $.ajax({
        url: server + '/api/v1/wares.json',
        type: 'get',
        dataType: 'json',
        data: {
          'sn': '8469e2920a239a83192eff5313abab82'
        },
        headers: {
          'Authorization': 'Bearer 3c85512a95a40b4cbb93b6b4bbb51aad476b5f1f28b705e728b9aafba05961c7'
        },
        success: function(data) {
          console.log(data);
        },
        error: function(XMLHttpRequest, textStatus) {
          console.log(textStatus);
        }
      });*/
    }
  }
});
