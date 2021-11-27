<script>
    import L from 'leaflet';
    import Leaflet from './Leaflet.svelte';
    import Control from './Control.svelte';
    import Marker from './Marker.svelte';
    import Popup from './Popup.svelte';
    import Polyline from './Polyline.svelte';
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
        return data;
    }

    const promise = getData();

    const colors = scaleSequential(interpolateRainbow).domain([0, markerLocations.length - 1]);
    const lines = markerLocations.slice(1).map((latLng, i) => {
        let prev = markerLocations[i];
        return {
            latLngs: [prev, latLng],
            color: colors(i),
        };
    });

    const initialView = [49.02597, 9.46082];

    let wind = true;
    let solar = true;
    let biogas = true;
    let showLines = true;

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

<Leaflet bind:map view={initialView} zoom={8}>
    <Control position="topleft">
        <MapToolbar bind:wind bind:biogas bind:solar bind:lines={showLines} />
    </Control>

    {#await promise}
        <p>Loading Plant Locations</p>
    {:then data}
        {#each data as plant}
            <Marker {plant} width={30} height={30}>
                {#if plant.Energieträger === 'B19'}
                    {#if wind}
                        <svg role="presentation" width="30" height="30">
                            <use xlink:href="#windenergie" />
                        </svg>
                    {/if}
                    {:else if plant.Energieträger === 'B16'}
                    {#if solar}
                    <svg role="presentation" width="30" height="30">
                        <use xlink:href="#solarenergie" />
                    </svg>
                    {/if}
                    {:else if plant.Energieträger === 'B01'}
                    {#if biogas}
                    <svg role="presentation" width="30" height="30">
                        <use xlink:href="#biogas" />
                    </svg>
                    {/if}
                {/if}
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
        {/each}
    {/await}

    {#if showLines}
        {#each lines as { latLngs, color }}
            <Polyline {latLngs} {color} opacity={0.5} />
        {/each}
    {/if}
</Leaflet>

<style type="text/scss">
    // svg {
    //     width: 30px;
    //     height: 30px;
    // }
    .popup-list {
        list-style-type: none;
        padding-left: 0;
    }
</style>
