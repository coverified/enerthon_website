<script>
    import L from 'leaflet';
    import { getContext } from 'svelte';
    let classNames = undefined;
    export { classNames as class };
    export let popup = undefined;
    let showContents = false;
    let popupOpen = false;
    const layer = getContext('layer')();

    function createPopup(popupElement) {
        popup = L.popup({keepInView:true, autoClose:false}).setContent(popupElement);
        layer.bindPopup(popup);
        layer.on('popupopen', () => {
            // layer._icon.classList.add('activeMarker');
            popupOpen = true;
            showContents = true;
        });
        layer.on('popupclose', () => {
            popupOpen = false;
            // layer._icon.classList.remove('activeMarker');
            // Wait for the popup to completely fade out before destroying it.
            // Otherwise the fade out looks weird as the contents disappear too early.
            setTimeout(() => {
                if (!popupOpen) {
                    showContents = false;
                }
            }, 500);
        });
        return {
            destroy() {
                if (popup) {
                    layer.unbindPopup();
                    popup.remove();
                    popup = undefined;
                }
            },
        };
    }
</script>

<div class="hidden">
    <div use:createPopup class={classNames}>
        {#if showContents}
            <slot />
        {/if}
    </div>
</div>

<style type="text/scss">
    div {
        width: 18rem;
    }

    :global(.activeMarker) {
        outline: 3px solid #00FF94 !important;
        outline-offset: 5px;
        border-radius: 10rem;
    }

    // :global(.leaflet-popup) {
    //     top: 55px !important;
    //     left: 250px !important;
    //     position: absolute;
    // }
    // /* I moved the "tip" to the right location, but don't succeed in making it visible. */
    // :global(.leaflet-popup-tip-container) {
    //     top: 0px !important;
    //     overflow: auto !important;
    // }
    // :global(.leaflet-popup-tip) {
    //     box-shadow: none !important;
    //     background-clip: none !important;
    // }
    // :global(.leaflet-popup:before) {
    //     content: none;
    //     // position: absolute;
    //     border: 13px solid transparent;
    //     border-bottom-color: white;
    //     bottom: 0px;
    //     margin-left: -13px;
    // }
</style>
