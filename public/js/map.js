mapboxgl.accessToken = 'pk.eyJ1Ijoic2VtYWd1bCIsImEiOiJjbDU3eDFvc2sxeGw3M2twcHNqMnEzMzJhIn0.aAe0gwAjFIhu1dQkwL1k2g'
// 
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 10, // starting zoom
	projection: 'globe' // display the map as a 3D globe
});

const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')