window.addEventListener('load', function () {

  // this a subset of the features that Rocket League events provides - however,
  // when writing an app that consumes events - it is best if you request
  // only those features that you want to handle.
  //
  // NOTE: in the future we'll have a wildcard option to allow retrieving all
  // features
  var textarea = document.getElementById('textareaMessage');

  var g_interestedInFeatures = [

    'goals',
    'deaths',
    'match'
  ];

  function registerEvents() {
    // general events errors
    overwolf.games.events.onError.addListener(function(info) {
      var log = 'Error: ' + JSON.stringify(info);
      textarea.value += log + '\n';
      console.log('Error: ' + JSON.stringify(info));
    });

    // 'static' data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates.addListener(function(info) {
      var log = 'Info UPDATE: ' + JSON.stringify(info);
      textarea.value += log + '\n';
      console.log(log);
    });

    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(function(info) {
      var log = 'EVENT FIRED: ' + JSON.stringify(info);
      textarea.value += log + '\n';
      console.log(log);
    });
  }

  function setFeatures() {

    overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(info) {
      console.log('Set required features:');
      console.log(JSON.stringify(info));
      if (info.status == 'error') {
        //console.log('Could not set required features: ' + info.reason);
        //console.log('Trying in 2 seconds');
        window.setTimeout(setFeatures, 2000);
        return;
      }

    });
  }

  // Start here
  console.log('Rocket League GAME EVENTS CONSUMER SAMPLE APP');
  registerEvents();
  setTimeout(setFeatures, 3000);
});
