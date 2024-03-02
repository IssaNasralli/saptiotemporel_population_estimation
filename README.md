# Population Estimation Project

## Overview
This repository contains the code and documentation for a population estimation project using satellite imagery and machine learning techniques.

## Objective
The objective of this project is to accurately estimate population distribution and density at a fine spatial resolution using remote sensing data and advanced machine learning algorithms.

## Data Sources
- Population estimates from the National Institute of Statistics (INS) for the years 2015 and 2019
- Landscan Global Population Database
- Ancillary data obtained through Google Earth Engine (GEE):
  - MCD43A4.061 (MODIS) for RGB imagery (Resolution: 500 meters)
  ## JavaScript Code for Obtaining MODIS Dataset (GEE)
```javascript
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
```
  - Dynamic World V1 for Land Use/Land Cover (LULC) data (Resolution: 10 meters)
  - VIIRS Nighttime Day/Night Band for night-time light composites (Resolution: 463.83 meters)
  - ERA5 (ECMWF) for climate data, including temperature and precipitation (Resolution: 27830 meters)
  
