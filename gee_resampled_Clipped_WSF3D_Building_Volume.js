// Define the function to resample the image to 100m
function resampleTo100m(image) {
  return image.resample('bilinear').reproject({
    crs: image.projection(),
    scale: 100
  });
}

// Load the TIFF file
var image = ee.Image('users/aissanasralli/Clipped_WSF3D_V02_BuildingVolume');

// Resample the image to 100m
var resampledImage = resampleTo100m(image);

// Export the resampled image to Google Drive
Export.image.toDrive({
  image: resampledImage,
  description: 'Resampled_WSF3D_V02_BuildingVolume',
  folder: 'GEE_exports', // Specify your Google Drive folder
  scale: 100, // Set the scale to 100m
  crs: 'EPSG:4326' // Set the CRS to WGS84
});
