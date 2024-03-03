import arcpy
arcpy.env.workspace = "C:\\Users\\Media\\OneDrive\\Documents\\ArcGIS\\Projects\\MyProject19"
# Define the paths to the input raster files
clipped_resampled_wsf_tif = "Clipped_resampled_WSF3D_V02_BuildingVolume.tif"
raster_tif = "raste.tif"

# Define the output weighted raster file path
weighted_raster_tif = "Weighted_WSFD_V02_BuildingVolume.tif"

try:
    # Check out Spatial Analyst extension license
    arcpy.CheckOutExtension("Spatial")

    # Read the raster datasets
    clipped_resampled_wsf_raster = arcpy.Raster(clipped_resampled_wsf_tif)
    raster_raster = arcpy.Raster(raster_tif)

    # Multiply the estimated number of floors with the WSF dataset
    weighted_raster = arcpy.sa.Times(clipped_resampled_wsf_raster, raster_raster)
    lost_raster = arcpy.sa.Minus(weighted_raster, raster_raster)
    lost_raster2 = arcpy.sa.Con(lost_raster >= 0, -1, 0)
    lost_raster3 = arcpy.sa.Con(lost_raster2 == -1, 0, 1)
    weighted_raster_with_lost = arcpy.sa.Plus(weighted_raster, lost_raster3)
    # Save the resulting weighted raster to a new file
    weighted_raster_with_lost.save(weighted_raster_tif)

    print("Weighted raster file created successfully.")

except arcpy.ExecuteError:
    print(arcpy.GetMessages(2))

except Exception as e:
    print(e)
