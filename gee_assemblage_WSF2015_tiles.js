var image1 = ee.Image("users/aissanasralli/WSF2015_v2_10_30");
var image2 = ee.Image("users/aissanasralli/WSF2015_v2_10_32");
var image3 = ee.Image("users/aissanasralli/WSF2015_v2_10_34");
var image4 = ee.Image("users/aissanasralli/WSF2015_v2_10_36");
var image2 = ee.Image("users/aissanasralli/WSF2015_v2_6_32");
var image5 = ee.Image("users/aissanasralli/WSF2015_v2_6_34");
var image6 = ee.Image("users/aissanasralli/WSF2015_v2_8_30");
var image7 = ee.Image("users/aissanasralli/WSF2015_v2_8_34");
var image8 = ee.Image("users/aissanasralli/WSF2015_v2_8_36");


// FeatureCollection of Tunisian regions
var tunisiaBoundary = ee.FeatureCollection('FAO/GAUL/2015/level1');


// Mosaic the images
var mergedImage = ee.ImageCollection([image1, image2, image3, image4, image5, image6, image7, image8]).mosaic();

// Load administrative boundary of Tunisia
var tunisiaBoundary = ee.FeatureCollection('FAO/GAUL/2015/level0').filter(ee.Filter.eq('ADM0_NAME', 'Tunisia'));
// Create a region of interest (ROI) based on the administrative boundary
var roi = tunisiaBoundary.geometry();



// Reduce the mosaic to select the first image encountered
var reducer = ee.Reducer.first();
var derivedImage = mergedImage.reduce(reducer);

// Clip the derived image to the region of interest (Tunisia boundary)
var clippedDerivedImage = derivedImage.clip(roi);

// Display the clipped derived image
//Map.addLayer(clippedDerivedImage, {}, 'Derived Image');
// Reproject and resample the clipped derived image
var resampledImage = clippedDerivedImage.reproject({
  crs: clippedDerivedImage.projection(),
  scale: 100
});
Map.addLayer(resampledImage, {}, 'Derived Image');
print(" CRS:", resampledImage.projection());
Export.image.toDrive({
  image: clippedDerivedImage,
  description: 'clippedDerivedImage',
  maxPixels: 1e13
});
