///////////////////////////////////////////////////////////////////////
//////////////////////////MODIS//////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Define a function to collect MODIS images for a given region and year
var CollectMODISForRegionAndYear = function(regionName, level, admName, startYear, endYear) {
  // Define a region of interest (ROI) based on the specified parameters
  var country = ee.FeatureCollection('FAO/GAUL/2015/' + level)
    .filter(ee.Filter.eq(admName, regionName));
  var roi = country.geometry();

  // Iterate over the years
  for (var year = startYear; year <= endYear; year++) {
    // Set the start and end dates based on the year parameter
    var startDate = year + '-01-01';
    var endDate = year + '-12-31';

    // Load MODIS data
    var dataset = ee.ImageCollection('MODIS/061/MCD43A4')
                  .filter(ee.Filter.date(startDate, endDate))
                  .select([
                    'Nadir_Reflectance_Band1', 'Nadir_Reflectance_Band4',
                    'Nadir_Reflectance_Band3'
                  ])
                  .filterBounds(roi); // Apply ROI filter

    // Visualization parameters
    var trueColorVis = {
      min: 0.0,
      max: 4000.0,
      gamma: 1.4,
    };
    // Export the result to Google Earth Engine asset
    Export.image.toAsset({
      image: dataset.median(),
      description: 'MODIS_' + regionName + '_' + year,
      assetId: 'users/aissanasralli/' + regionName + '/' + year + '/original/modis_' + regionName + '_' + year,
      scale: 500,
      region: roi, // Set the region of interest
      crs: 'EPSG:4326',
      maxPixels: 1e13
    });
  }
};
 CollectMODISForRegionAndYear('Tunisia', 'level0', 'ADM0_NAME', 2015, 2019);


///////////////////////////////////////////////////////////////////////
//////////////////////////LULC////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Define a function to stack images for a given region and year
var CollectImagesForRegionAndYear = function(regionName, level, admName, startYear, endYear) {
  // Define a region of interest (ROI) based on the specified parameters
  var country = ee.FeatureCollection('FAO/GAUL/2015/' + level)
    .filter(ee.Filter.eq(admName, regionName));
  var geometry = country.geometry();
  var roi = country.geometry();

  // Iterate over the years
  for (var year = startYear; year <= endYear; year++) {
    // Set the start and end dates based on the year parameter
    var startDate = year + '-01-01';
    var endDate = year + '-12-31';

    // Load Dynamic World data for the specified year
    var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
                 .filterDate(startDate, endDate)
                 .filterBounds(geometry);
    var classification = dw.select('label');
    var dwComposite = classification.reduce(ee.Reducer.mode());
    var dwVisParams = {
      min: 0,
      max: 8,
      palette: [
        '#419BDF', '#397D49', '#88B053', '#7A87C6', '#E49635', '#DFC35A',
        '#C4281B', '#A59B8F', '#B39FE1'
      ]
    };

    // Display the classified composite on the map
    Map.addLayer(dwComposite.clip(geometry), dwVisParams, 'Classified Composite - ' + regionName + ' ' + year);

if (regionName === 'Sfax Ville') {
  regionName = 'sfax_ville';
} 
    // Export the image to Google Earth Engine assets
    Export.image.toAsset({
      image: dwComposite,
      description: 'DynamicWorld_' + regionName + '_' + year,
      assetId: 'users/aissanasralli/' + regionName + '/' + year + '/original/DynamicWorld_' + regionName + '_' + year,
      scale: 10,
      region: geometry,
      maxPixels: 1e13
    });
  }
};

// Collect images for Tunisia (level0)
//CollectImagesForRegionAndYear('Tunisia', 'level0', 'ADM0_NAME', 2016, 2020);

// Collect images for Sfax Ville (level2)
CollectImagesForRegionAndYear('Sfax Ville', 'level2', 'ADM2_NAME', 2016, 2020);
///////////////////////////////////////////////////////////////////////
//////////////////////////Nighttime Lights////////////////////////////
/////////////////////////////////////////////////////////////////////

// Define a function to collect Nighttime Lights images for a given region and year
var CollectNighttimeLightsForRegionAndYear = function(regionName, level, admName, startYear, endYear) {
  // Define a region of interest (ROI) based on the specified parameters
  var country = ee.FeatureCollection('FAO/GAUL/2015/' + level)
    .filter(ee.Filter.eq(admName, regionName));
  var geometry = country.geometry();

  // Iterate over the years
  for (var year = startYear; year <= endYear; year++) {
    // Set the start and end dates based on the year parameter
    var startDate = year + '-01-01';
    var endDate = year + '-12-31';

    // Load VIIRS Nighttime Lights data for the specified year
    var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
      .filter(ee.Filter.date(startDate, endDate))
      .filterBounds(geometry);
    var nighttime = dataset.select('avg_rad');
    var nighttimeVis = {min: 0.0, max: 60.0};

    // Display Nighttime Lights on the map
    Map.centerObject(geometry, 6);
    Map.addLayer(nighttime.mean(), nighttimeVis, 'Nighttime Lights - ' + regionName + ' ' + year);
    Map.addLayer(geometry, {color: 'FF0000'}, 'Country Boundary');
if (regionName === 'Sfax Ville') {
  regionName = 'sfax_ville';
} 
    // Export the image to Google Earth Engine assets
    Export.image.toAsset({
      image: nighttime.mean(),
      description: 'Nighttime_Lights_' + regionName + '_' + year,
      assetId: 'users/aissanasralli/' + regionName + '/' + year + '/original/Nighttime_Lights_' + regionName + '_' + year,
      scale: 463,
      region: geometry,
      maxPixels: 1e13
    });
  }
};

// Collect Nighttime Lights for Tunisia (level0)
//CollectNighttimeLightsForRegionAndYear('Tunisia', 'level0', 'ADM0_NAME', 2016, 2020);

// Collect Nighttime Lights for Sfax Ville (level2)
CollectNighttimeLightsForRegionAndYear('Sfax Ville', 'level2', 'ADM2_NAME', 2016, 2020);


///////////////////////////////////////////////////////////////////////
//////////////////////////Climate ////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// Define a function to collect ERA5 temperature and precipitation images for a given region, year, and quarter
var CollectERA5ForRegionYearAndQuarter = function(regionName, level, admName, startYear, endYear, quarters) {
  // Define a region of interest (ROI) based on the specified parameters
  var country = ee.FeatureCollection('FAO/GAUL/2015/' + level)
    .filter(ee.Filter.eq(admName, regionName));
  var roi = country.geometry();

  // Iterate over the years
  for (var year = startYear; year <= endYear; year++) {
    // Iterate over the quarters
    for (var i = 0; i < quarters.length; i++) {
      var q = quarters[i];

      // Set the date range based on the quarter
      var startDate, endDate;
      if (q === 'q1') {
        startDate = year + '-01-01';
        endDate = year + '-03-31';
      } else if (q === 'q2') {
        startDate = year + '-04-01';
        endDate = year + '-06-30';
      } else if (q === 'q3') {
        startDate = year + '-07-01';
        endDate = year + '-09-30';
      } else if (q === 'q4') {
        startDate = year + '-10-01';
        endDate = year + '-12-31';
      } else {
        // Default to the whole year
        startDate = year + '-01-01';
        endDate = year + '-12-31';
      }

      // Filter and clip temperature data
      var era5_2mt = ee.ImageCollection('ECMWF/ERA5/DAILY')
        .select('mean_2m_air_temperature')
        .filter(ee.Filter.date(startDate, endDate))
        .filterBounds(roi)
        .median()
        .clip(roi);

      // Filter and clip precipitation data
      var era5_tp = ee.ImageCollection('ECMWF/ERA5/DAILY')
        .select('total_precipitation')
        .filter(ee.Filter.date(startDate, endDate))
        .filterBounds(roi)
        .median()
        .clip(roi);

      // Display the images on the map
      Map.centerObject(roi, 6);
      Map.addLayer(roi, {color: 'FF0000'}, 'Region of Interest');
      Map.addLayer(era5_2mt, {min: 250, max: 300, palette: ['blue', 'white', 'red']}, 'ERA5 2m Temperature - ' + regionName + ' ' + year + ' ' + q);
      Map.addLayer(era5_tp, {min: 0, max: 10, palette: ['blue', 'white', 'green']}, 'ERA5 Total Precipitation - ' + regionName + ' ' + year + ' ' + q);

      if (regionName === 'Sfax Ville') {
        regionName = 'sfax_ville';
      }

      // Export to Google Earth Engine Asset
      Export.image.toAsset({
        image: era5_2mt,
        description: 'ERA5_2m_temperature_' + q + '_' + regionName + '_' + year,
        assetId: 'users/aissanasralli/' + regionName + '/' + year + '/original/ERA5_2m_temperature_' + q + '_' + regionName + '_' + year,
        scale: 27830,
      });

      Export.image.toAsset({
        image: era5_tp,
        description: 'ERA5_2m_total_precip_' + q + '_' + regionName + '_' + year,
        assetId: 'users/aissanasralli/' + regionName + '/' + year + '/original/ERA5_2m_total_precip_' + q + '_' + regionName + '_' + year,
        scale: 27830,
      });
    }
  }
};

// Define quarters to iterate over
var quarters = ['q1', 'q2', 'q3', 'q4'];

// Collect ERA5 images for Tunisia (level0)
//CollectERA5ForRegionYearAndQuarter('Tunisia', 'level0', 'ADM0_NAME', 2016, 2020, quarters);

// Collect ERA5 images for Sfax Ville (level2)
CollectERA5ForRegionYearAndQuarter('Sfax Ville', 'level2', 'ADM2_NAME', 2016, 2020, quarters);

///////////////////////////////////////////////////////////////////////
//////////////////////////World Pop //////////////////////////////////
/////////////////////////////////////////////////////////////////////




// Define a region of interest Sfax Ville
var country = ee.FeatureCollection('FAO/GAUL/2015/level2')
  .filter(ee.Filter.eq('ADM2_NAME', 'Sfax Ville'));
var roi = country.geometry();

// Extract population information for the specified region
var populationStats = worldpopImage.clip(roi);

// Export the image to a Google Drive
Export.image.toDrive({
  image: populationStats,
  description: 'population_stats_asset',
  scale: 10, // Adjust the scale (resolution) as needed
  region: roi // Set the region for export
});

// Export the Image to a Google Earth Engine asset
Export.image.toAsset({
  image: populationStats, // Use 'image' for Image objects
  description: 'population_stats_asset',
  assetId: 'users/aissanasralli/worldpop_sfax_ville_2015',
  scale: 10, // Adjust the scale (resolution) as needed
  region: roi // Set the region for export
});

