// Function to resample the image to 100m
function resampleTo100m(image) {
  return image.resample('bilinear').reproject({
    crs: image.projection(),
    scale: 100
  });
}

// Function to export the resampled image to Google Earth Engine asset
function exportResampledImage(image, description, assetId, region, year) {
  Export.image.toAsset({
    image: resampleTo100m(image),
    description: description + '_' + region + '_' + year + '_100m',
    assetId: assetId + '/' + region + '/' + year + '/100m/' + description + '_' + region + '_' + year + '_100m',
    scale: 100,
    crs: 'EPSG:4326'
  });
}

// List of datasets to process
var datasets = [
  'DynamicWorld',
  'ERA5_2m_temperature_q1',
  'ERA5_2m_temperature_q2',
  'ERA5_2m_temperature_q3',
  'ERA5_2m_temperature_q4',
  'ERA5_2m_total_precip_q1',
  'ERA5_2m_total_precip_q2',
  'ERA5_2m_total_precip_q3',
  'ERA5_2m_total_precip_q4',
  'Nighttime_Lights',
  'sentinel2'
];

var region = 'tunisia';

// Loop through years from 2015 to 2019
for (var year = 2016; year <= 2019; year++) {
  // Iterate through the datasets and apply the resampling and exporting process
  for (var i = 0; i < datasets.length; i++) {
    var datasetName = datasets[i];
    var exportedImageId = 'users/aissanasralli/' + region + '/' + year + '/original/' + datasetName + '_' + region + '_' + year;

    // Load the exported image from Google Drive
    var exportedImage = ee.Image(exportedImageId);

    // Export the resampled image to Google Earth Engine asset
    exportResampledImage(exportedImage, datasetName, 'users/aissanasralli', region, year.toString());
  }
}
