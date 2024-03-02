# Population Estimation Project

## Overview
This repository contains the code and documentation for a population estimation project using satellite imagery and machine learning techniques.

## Objective
The objective of this project is to accurately estimate population distribution and density at a fine spatial resolution using remote sensing data and advanced machine learning algorithms.

## Data Sources
### Pupulation Data 
- Landscan Global Population Database
- Population estimates from the National Institute of Statistics (INS) for the years 2015 and 2019
  WSF datasets assembled then resampled then clipped:gee_assemblage_WSF2015_tiles.js 
### Ancillary Data 
- Ancillary data obtained through Google Earth Engine : gee_obtained_ancillary.js
  - MCD43A4.061 (MODIS) for RGB imagery (Resolution: 500 meters)
  - Dynamic World V1 for Land Use/Land Cover (LULC) data (Resolution: 10 meters)
  - VIIRS Nighttime Day/Night Band for night-time light composites (Resolution: 463.83 meters)
  - ERA5 (ECMWF) for climate data, including temperature and precipitation (Resolution: 27830 meters)
- Ancillary data resampled through Google Earth Engine : gee_resample_ancillary.js
- Ancillary data CRS and datum checked : gee_crs_datum_ancillary.js

