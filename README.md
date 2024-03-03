# Population Estimation Project

## Overview
This repository contains the code and documentation for a population estimation project utilizing satellite imagery and machine learning methodologies.

## Objective
The primary objective of this project is to accurately estimate population distribution and density at a fine spatial resolution by leveraging remote sensing data and advanced machine learning algorithms.

## Data Sources
### Population Data 
- **Landscan Global Population Database:** This dataset provides global population estimates at a high spatial resolution.
- **Population Evolution:**
  - Population data from the National Institute of Statistics (INS) for the years 2015 and 2019.
  - **World Settlement Footprint (WSF) datasets:** Assembled, resampled, and clipped through Google Earth Engine (GEE) to obtain WSF_dataset_15.tiff and WSF_dataset_19.tiff. Code: `gee_assemblage_WSF2015_tiles.js`.
  - **WSF BuildingVolume datasets:** Clipped using ArcGIS, then resampled by GEE to represent the estimated number of floors per pixel. Code: `ArcGIS_Clipped_WSF3D_Building_Volume.py` and `gee_resampled_Clipped_WSF3D_Building_Volume.js`.
  - **Dasymetric mapping layer weighting:** Computed using ArcGIS. Code: `ArcGIS_Weighted_WSFD_V02_BuildingVolume.py`.

### Ancillary Data 
- **Ancillary data obtained through Google Earth Engine:** Includes MCD43A4.061 (MODIS) for RGB imagery, Dynamic World V1 for Land Use/Land Cover (LULC) data, VIIRS Nighttime Day/Night Band for night-time light composites, and ERA5 (ECMWF) for climate data (temperature and precipitation). Resolution details: RGB imagery (500 meters), LULC (10 meters), night-time light composites (463.83 meters), climate data (27830 meters). Code: `gee_obtained_ancillary.js`.
- **Ancillary data resampled through Google Earth Engine:** Code: `gee_resample_ancillary.js`.
- **Checking ancillary data CRS and datum through Google Earth Engine:** Code: `gee_crs_datum_ancillary.js`.
- **Stacking ancillary data through Google Earth Engine:** Code: `gee_stack_ancillary.js`.
