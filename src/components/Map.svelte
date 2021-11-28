<script>
    import L from 'leaflet';
    import Leaflet from './Leaflet.svelte';
    import Control from './Control.svelte';
    import Marker from './Marker.svelte';
    import Popup from './Popup.svelte';
    import Polyline from './Polyline.svelte';
    import Time from './Time.svelte';
    import MapToolbar from './MapToolbar.svelte';
    import { scaleSequential } from 'd3-scale';
    import { interpolateRainbow } from 'd3-scale-chromatic';

    let map;
    let markerLocations = [];

    async function getData() {
        let response = await fetch('/data/data.json');
        let data = await response.json();
        data.forEach((e) => {
            markerLocations.push([e.lat, e.lng]);
        });
        console.log(markerLocations);
        return data;
    }

    markerLocations = [
        [47.952341, 8.515025],
        [47.70819, 7.926348],
        [49.602228, 9.61516],
        [48.017241, 8.602017],
        [48.894, 9.015],
        [49.698201, 9.787749],
        [48.195, 10.055],
        [47.952341, 8.515025],
        [49.153, 9.693],
        [49.059187, 9.788426],
        [49.128626, 9.794838],
        [47.70819, 7.926348],
        [48.928871, 10.273493],
        [48.887, 9.854],
        [48.751312, 10.169209],
        [49.46, 8.5],
        [49.446, 8.568],
        [49.524198, 8.451864],
    ];

    const promise = getData();

    const lines = markerLocations.slice(1).map((latLng, i) => {
        let prev = markerLocations[i];
        return {
            latLngs: [prev, latLng],
            color: '#4FE58B',
        };
    });

    const initialView = [48.72341, 9.26082];

    let wind = true;
    let solar = true;
    let biogas = true;
    let showLines = true;
    let power = 0;

    $: power;

    function resizeMap() {
        if (map) {
            map.invalidateSize();
        }
    }

    function resetMapView() {
        map.setView(initialView, 5);
    }
</script>

<svelte:window on:resize={resizeMap} />

<!-- Can just use an import statement for this, when outside the REPL -->
<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""
/>

<Leaflet bind:map view={initialView} zoom={9}>
    <Control position="topleft">
        <MapToolbar bind:wind bind:biogas bind:solar bind:power bind:lines={showLines} />
    </Control>
    <Control position="topright">
        <Time />
    </Control>
    {#await promise}
        <p>Loading Plant Locations</p>
    {:then data}
        {#each data as plant}
            {#key power}
                <!-- Wind -->
                {#if plant.Energieträger === 'B19' && plant['Nettonennleistung in kW (TRs)'] > power}
                    {#if wind}
                        <Marker {plant} width={50} height={50}>
                            <svg role="presentation" width="50" height="50">
                                <use xlink:href="#windenergie" />
                            </svg>
                            <Popup>
                                <ul class="popup-list">
                                    <li>
                                        <b>Klarname:</b>
                                        {plant.Klarname}
                                    </li>
                                    <li>
                                        <b>Anschlussnetzbetreiber:</b>
                                        {plant.Anschlussnetzbetreiber}
                                    </li>
                                    <li>
                                        <b>Nettonennleistung (TRs):</b>
                                        {plant['Nettonennleistung in kW (TRs)']} kW
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    {/if}
                {/if}
                <!-- Solar -->
                {#if plant.Energieträger === 'B16' && plant['Nettonennleistung in kW (TRs)'] > power}
                    {#if solar}
                        <Marker {plant} width={40} height={40}>
                            <svg role="presentation" width="40" height="40">
                                <use xlink:href="#solarenergie" />
                            </svg>
                            <Popup>
                                <ul class="popup-list">
                                    <li>
                                        <b>Klarname:</b>
                                        {plant.Klarname}
                                    </li>
                                    <li>
                                        <b>Anschlussnetzbetreiber:</b>
                                        {plant.Anschlussnetzbetreiber}
                                    </li>
                                    <li>
                                        <b>Nettonennleistung (TRs):</b>
                                        {plant['Nettonennleistung in kW (TRs)']} kW
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    {/if}
                {/if}
                <!-- Biogas -->
                {#if plant.Energieträger === 'B01' && plant['Nettonennleistung in kW (TRs)'] > power}
                    {#if biogas}
                        <Marker {plant} width={40} height={40}>
                            <svg role="presentation" width="40" height="40">
                                <use xlink:href="#biogas" />
                            </svg>
                            <Popup>
                                <ul class="popup-list">
                                    <li>
                                        <b>Klarname:</b>
                                        {plant.Klarname}
                                    </li>
                                    <li>
                                        <b>Anschlussnetzbetreiber:</b>
                                        {plant.Anschlussnetzbetreiber}
                                    </li>
                                    <li>
                                        <b>Nettonennleistung (TRs):</b>
                                        {plant['Nettonennleistung in kW (TRs)']} kW
                                    </li>
                                </ul>
                            </Popup>
                        </Marker>
                    {/if}
                {/if}
            {/key}
            {#if showLines}
                {#each lines as { latLngs, color }}
                    <Polyline {latLngs} {color} opacity={0.2} />
                {/each}
            {/if}
        {/each}
    {/await}
</Leaflet>

<style type="text/scss">
    .popup-list {
        list-style-type: none;
        padding-left: 0;
    }
</style>
