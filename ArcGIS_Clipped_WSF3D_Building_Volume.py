import arcpy

# Define the input raster
raster_tif = "WSF3D_V02_BuildingVolume.tif"

# Set the workspace environment
arcpy.env.workspace = r"C:\Users\Media\OneDrive\Documents\ArcGIS\Projects\MyProject20"

# Define the boundary shapefile to clip the image
boundary_shapefile = "Tunisia_Boundary.shp"

# Define the output clipped raster
output_clipped_raster = "Clipped_WSF3D_V02_BuildingVolume.tif"
clipped_raster = arcpy.sa.ExtractByMask(raster_tif, boundary_shapefile)
clipped_raster=clipped_raster/4000/3
clipped_raster.save(output_clipped_raster)

