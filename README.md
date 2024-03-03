# Population Estimation Project

## Overview
This repository contains the code and documentation for a population estimation project using satellite imagery and machine learning techniques.

## Objective
The objective of this project is to accurately estimate population distribution and density at a fine spatial resolution using remote sensing data and advanced machine learning algorithms.

## Data Sources
### Pupulation Data 
- Landscan Global Population Database
- Population Evolution
  - Obtaining population  from the National Institute of Statistics (INS) for the years 2015 and 2019
  - WSF datasets assembled then resampled then clipped through Google Earth Engine to obtain WSF_dataset_15.tiff and WSF_dataset_19.tiff :gee_assemblage_WSF2015_tiles.js
  -  Pixels of WSF datasets are standarized by Raster Calculator tool of ArcGIS : pixels with values less than 127 were reassigned a value of 0, while pixels with values greater than 127 were reassigned a value       of 1 indicating building presence:
     - Condition 1_15 to obtain the raster data WSF_dataset_15_127 :  Con("WSF_dataset_15" < 127, 0, "WSF_dataset_15")
     - Condition 2_15 to obtain the raster data WSF_dataset_15_127_binary :  Con("WSF_dataset_15_127" !=0, 1, "WSF_dataset_15_127")
     
     - Condition 1_19 to obtain the raster data WSF_dataset_19_127 :  Con("WSF_dataset_19" < 127, 0, "WSF_dataset_19")
     - Condition 2_19 to obtain the raster data WSF_dataset_19_127_binary :  Con("WSF_dataset_19_127" !=0, 1, "WSF_dataset_19_127")
  - WSF BuildingVolume datasets (WSF3D_V02_BuildingVolume.tif) is clipped (ArcGIS_Clipped_WSF3D_Building_Volume.py) e

### Ancillary Data 
- Ancillary data obtained through Google Earth Engine : gee_obtained_ancillary.js
  - MCD43A4.061 (MODIS) for RGB imagery (Resolution: 500 meters)
  - Dynamic World V1 for Land Use/Land Cover (LULC) data (Resolution: 10 meters)
  - VIIRS Nighttime Day/Night Band for night-time light composites (Resolution: 463.83 meters)
  - ERA5 (ECMWF) for climate data, including temperature and precipitation (Resolution: 27830 meters)
- Ancillary data resampled through Google Earth Engine : gee_resample_ancillary.js
- Checking ancillary data CRS and datum  through Google Earth Engine : gee_crs_datum_ancillary.js
- Stacking ancillary data  through Google Earth Engine : gee_stack_ancillary.js

