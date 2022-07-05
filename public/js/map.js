mapboxgl.accessToken = 'pk.eyJ1Ijoic2VtYWd1bCIsImEiOiJjbDU3eDFvc2sxeGw3M2twcHNqMnEzMzJhIn0.aAe0gwAjFIhu1dQkwL1k2g'
// 
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 9, // starting zoom
	projection: 'globe' // display the map as a 3D globe
});

new mapboxgl.Marker({
	color: 'green',
	draggable: true
}).setLngLat([13.453281, 52.5329816])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.384521537181707, 52.53396355686272])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.372996532790966, 52.49665215758351])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.370462607252215, 52.42737821117734])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.364415592598993, 52.48200153089764])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.477201764928068, 52.53047971546039])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.391220678423526, 52.588963796824416])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))

new mapboxgl.Marker({
	color: 'red',
	draggable: true
}).setLngLat([13.442090409832312, 52.528733677798506])
	.addTo(map)
	.on('dragend', event => console.log(event.target._lngLat))



const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-right')
