ymaps.ready(function () {

    const addresses = document.querySelectorAll('[data-coordinate]')

    var map = new ymaps.Map('map', {
        center: JSON.parse(addresses[0].dataset.coordinate),
        zoom: 15,
        controls: ["zoomControl"]
    })

    addresses.forEach(address => {
        const placemark = new ymaps.Placemark(JSON.parse(address.dataset.coordinate))
        map.geoObjects.add(placemark)
        address.addEventListener('click', event => {
            map.panTo(JSON.parse(address.dataset.coordinate)).then(function () {
                map.setZoom(15)
            })
        })
    })

    // map.behaviors.disable('scrollZoom')

})