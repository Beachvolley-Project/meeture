mapboxgl.accessToken =
	"pk.eyJ1Ijoic2VtYWd1bCIsImEiOiJjbDU3eDFvc2sxeGw3M2twcHNqMnEzMzJhIn0.aAe0gwAjFIhu1dQkwL1k2g";
//
const map = new mapboxgl.Map({
	container: "map", // container ID
	style: "mapbox://styles/mapbox/streets-v11", // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 9.5, // starting zoom
	projection: "globe", // display the map as a 3D globe
});

axios.get("/api/locations").then(response => {
	for (let i = 0; i < response.data.length; i++) {
		addMarker1(response.data[i])
	}
})

const addMarker1 = (data) => {
	const marker = new mapboxgl.Marker({ "color": "red" })
	const minPopup = new mapboxgl.Popup()

	minPopup.setHTML(`<h3>${data.name}</h3> <br> <p>${data.address}</p>`)
	marker.setPopup(minPopup)
	marker.setLngLat(data.coordinates)
	marker.addTo(map)
}
map.on("load", addMarker1)

const addMarker = () => {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		const crd = pos.coords;
		const marker = new mapboxgl.Marker({ "color": "green" })
		const minPopup = new mapboxgl.Popup()

		minPopup.setHTML("<h3>You are here</h3>")
		marker.setPopup(minPopup)
		marker.setLngLat([crd.longitude, crd.latitude])
		marker.addTo(map)
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

map.on("load", addMarker)
addMarker();

const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-right')