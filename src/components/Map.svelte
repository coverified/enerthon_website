<script>
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import Leaflet from './Leaflet.svelte';
    import Control from './Control.svelte';
    import Marker from './Marker.svelte';
    import Popup from './Popup.svelte';
    import Time from './Time.svelte';
    import MapToolbar from './MapToolbar.svelte';

    let map;
    export let showMap;

    async function getData() {
        let response = await fetch('/data/data.json');
        let data = await response.json();
        return data;
    }

    const promise = getData();

    const initialView = [48.72341, 9.26082];

    let wind = true;
    let solar = true;
    let marker;
    let biogas = true;
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

{#if showMap}
    <Leaflet bind:map view={initialView} zoom={8}>
        <Control position="topleft">
            <MapToolbar bind:wind bind:biogas bind:solar bind:power />
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
                                            Klarname:
                                            <b>{plant.Klarname}</b>
                                        </li>
                                        <li>
                                            Anschlussnetzbetreiber:
                                            <b>{plant.Anschlussnetzbetreiber}</b>
                                        </li>
                                        <li>
                                            Nettonennleistung (TRs):
                                            <b>{plant['Nettonennleistung in kW (TRs)']} kW</b>
                                        </li>
                                    </ul>
                                    <img alt="chart" src="/chart02.svg" loading="lazy" />
                                    <div class="popup-chart--text">
                                        <p>
                                            <b>40.400 kW</b>
                                        </p>
                                        <span>produziert Energie</span>
                                    </div>
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
                                            Klarname:
                                            <b>{plant.Klarname}</b>
                                        </li>
                                        <li>
                                            Anschlussnetzbetreiber:
                                            <b>{plant.Anschlussnetzbetreiber}</b>
                                        </li>
                                        <li>
                                            Nettonennleistung (TRs):
                                            <b>{plant['Nettonennleistung in kW (TRs)']} kW</b>
                                        </li>
                                    </ul>
                                    <img alt="chart" src="/chart01.svg" loading="lazy" />
                                    <div class="popup-chart--text">
                                        <p>
                                            <b>100.000 kW</b>
                                        </p>
                                        <span>produziert Energie</span>
                                    </div>
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
                                            Klarname:
                                            <b>{plant.Klarname}</b>
                                        </li>
                                        <li>
                                            Anschlussnetzbetreiber:
                                            <b>{plant.Anschlussnetzbetreiber}</b>
                                        </li>
                                        <li>
                                            Nettonennleistung (TRs):
                                            <b>{plant['Nettonennleistung in kW (TRs)']} kW</b>
                                        </li>
                                    </ul>
                                    <img alt="chart" src="/chart03.svg" loading="lazy" />
                                    <div class="popup-chart--text">
                                        <p>
                                            <b>120.450 kW</b>
                                        </p>
                                        <span>produziert Energie</span>
                                    </div>
                                </Popup>
                            </Marker>
                        {/if}
                    {/if}
                {/key}
            {/each}
        {/await}
    </Leaflet>
{:else}
    <img src="dashboard.jpg" alt="dashboard" class="dashboard" />
{/if}

<style type="text/scss">
    .dashboard {
        max-width: 100%;
        height: auto;
    }

    .popup {
        &-list {
            list-style-type: none;
            padding-left: 0;
        }

        &-chart--text {
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 2px;
        }
    }
</style>
