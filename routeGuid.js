function initMap() {
    const markerArray = [];
    
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 35.660721, lng: 139.795726 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //ルートをマップにレンダリングする
    const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
    //マップ情報を表示するミニウィンドウ
    const stepDisplay = new google.maps.InfoWindow();
    
    //初期値を使ったルート検索と結果表示
    calculateAndDisplayRoute(
      directionsRenderer,
      directionsService,
      markerArray,
      stepDisplay,
      map
    );
  
    
    const onClickHandler = function () {
      calculateAndDisplayRoute(
        directionsRenderer,
        directionsService,
        markerArray,
        stepDisplay,
        map
      );
    };

    document.getElementById("submit").addEventListener("click",onClickHandler);
  }
  
  function calculateAndDisplayRoute(
    directionsRenderer,
    directionsService,
    markerArray,
    stepDisplay,
    map
    ) {
    // First, remove any existing markers from the map.
    for (let i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }

    directionsService.route(
      {
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        //statusがOKの時resultの中に最低一個のルート情報が格納されている
        //マーカは交差点や高速乗り換えなど(=step)があるごとに設定される.
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          showSteps(result, markerArray, stepDisplay, map);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  
  function showSteps(directionResult, markerArray, stepDisplay, map) {
    //legs には DirectionSteps が入る。
    //way point が設定されてなければ一つ。されていればそれごとの幅づつ。(例)start~way[0],way[0]~way[1],way[1]~end
    //また、trangitの時のみ、routes[0].fere(運賃)が存在する
    const myRoute = directionResult.routes[0].legs[0];
    for (let i = 0; i < myRoute.steps.length; i++) {
      const marker = (markerArray[i] =
        markerArray[i] || new google.maps.Marker());
      marker.setMap(map);
      marker.setPosition(myRoute.steps[i].start_location);
      attachInstructionText(
        stepDisplay,
        marker,
        myRoute.steps[i].instructions,
        map
      );
    }
  }
  
  function attachInstructionText(stepDisplay, marker, text, map) {
    //マップ上のあるマーカがクリックされた時に情報を表示する
    google.maps.event.addListener(marker, "click", () => {
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }