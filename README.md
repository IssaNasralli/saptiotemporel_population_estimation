# Population Estimation Project

## Overview
This repository contains the code and documentation for a population estimation project using satellite imagery and machine learning techniques.

## Objective
The objective of this project is to accurately estimate population distribution and density at a fine spatial resolution using remote sensing data and advanced machine learning algorithms.

## Data Sources
### Pupulation Data 
- Landscan Global Population Database
- Population estimates from the National Institute of Statistics (INS) for the years 2015 and 2019
  WSF datasets assembled then resampled then clipped through Google Earth Engine :gee_assemblage_WSF2015_tiles.js
  Pixels of WSF datasets are standarized by Raster Calculator tool of ArcGIS : pixels with values less than 127 were reassigned a value of 0, while pixels with values greater than 127 were reassigned a value of 1   indicating building presence:
   - Condition 1 to obtain the raster data WSF_dataset_127 :  Con("WSF_dataset" < 127, 0, "WSF_dataset")
   - Condition 2 to obtain the raster data WSF_dataset_127_binary :  Con("WSF_dataset_127" !=0, 1, "WSF_dataset_127")

### Ancillary Data 
- Ancillary data obtained through Google Earth Engine : gee_obtained_ancillary.js
  - MCD43A4.061 (MODIS) for RGB imagery (Resolution: 500 meters)
  - Dynamic World V1 for Land Use/Land Cover (LULC) data (Resolution: 10 meters)
  - VIIRS Nighttime Day/Night Band for night-time light composites (Resolution: 463.83 meters)
  - ERA5 (ECMWF) for climate data, including temperature and precipitation (Resolution: 27830 meters)
- Ancillary data resampled through Google Earth Engine : gee_resample_ancillary.js
- Checking ancillary data CRS and datum  through Google Earth Engine : gee_crs_datum_ancillary.js
- Stacking ancillary data  through Google Earth Engine : gee_stack_ancillary.js

