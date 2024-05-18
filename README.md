# cesiumjs-with-threejs
This template project demonstrates how to combine the powerful geospatial visualization capabilities of [CesiumJS](https://cesium.com/platform/cesiumjs/) with the versatile 3D rendering capabilities of [Three.js](https://threejs.org/). Use this template when you need both Cesium's advanced geospatial features and Three.js's general 3D rendering functionalities.

<img width="500" alt="Screenshot 2024-05-18 at 19 23 17" src="https://github.com/leon-juenemann/cesiumjs-with-threejs/assets/32913978/42e548fb-28d8-4721-bda4-39b4d7fa5203">

How it works:
- Stack two HTML canvases on top of eachother
- Assign one canvas to Cesium and the other to Three
- Synchronize the cameras
- Cesium's camera is the one the user manipulates
- Draw globe and buildings in Cesium
- Draw everything else in Three (template uses a rotating cube)

Run the app:
- `npm install`
- `npm run dev`
  
Limitations:
- We just draw the Three canvas onto the Cesium canvas
- 3D objects in Cesium (e.g. buildings) that are in front of objects in Three (cube) are not displayed correctly
- The cube in the image is actually positioned behind the building

<img width="500" alt="Screenshot 2024-05-18 at 19 25 43" src="https://github.com/leon-juenemann/cesiumjs-with-threejs/assets/32913978/f13f7f05-e12e-433a-9fc7-7b2dff342b3f">
