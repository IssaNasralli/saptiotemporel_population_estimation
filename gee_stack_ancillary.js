// Function to stack images for a given year
var stackImagesForYear = function(region, year) {
  // Construct the image IDs for each dataset
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

  // Load the datasets for the current year and region
  var images = datasets.map(function(dataset) {
    var imageId = 'users/aissanasralli/' + region + '/' + year + '/100m/' + dataset + '_' + region + '_' + year + '_100m';
    return ee.Image(imageId);
  });

  // Stack the bands
  var stackedImage = ee.Image.cat(images).toFloat();

  // Export the stacked image
  Export.image.toAsset({
    image: stackedImage,
    description: 'stacked_image_' + region + '_' + year,
    assetId: 'users/aissanasralli/' + region + '/' + year + '/stacked_image_' + region + '_' + year,
    scale: 100,
    maxPixels: 1e13
  });
};

// Specify the years of interest
var startYear = 2015;
var endYear = 2019;

// Iterate over the years and stack images for Tunisia
for (var year = startYear; year <= endYear; year++) {
  stackImagesForYear('tunisia', year);
}
