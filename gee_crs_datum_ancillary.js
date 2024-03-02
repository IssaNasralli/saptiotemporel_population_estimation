// Specify the asset IDs for each dataset
var assetIds = [
  'users/aissanasralli/tunisia/2015/original/ERA5_2m_temperature_q1_tunisia_2015',
  'users/aissanasralli/tunisia/2015/original/ERA5_2m_temperature_q4_tunisia_2015',
  'users/aissanasralli/tunisia/2015/original/Nighttime_Lights_tunisia_2015'
];

// Loop through the asset IDs and print the CRS for each dataset
assetIds.forEach(function(assetId) {
  var image = ee.Image(assetId);
  print(assetId + " CRS:", image.projection());
});