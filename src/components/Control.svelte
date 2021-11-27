<script context="module">
    import L from 'leaflet';

    class Control extends L.Control {
        constructor(el, position) {
            super({ position });
            this.el = el;
        }
        onAdd() {
            return this.el;
        }
        onRemove() {}
    }
</script>

<script>
    import { getContext, onDestroy } from 'svelte';
    let classNames = undefined;
    export { classNames as class };

    /** position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' */
    export let position;
    

    /** The control instance created by this component */
    export let control = undefined;
    const map = getContext('map')();

    function createControl(container) {
        control = new Control(container, position).addTo(map);
        return {
            destroy() {
                control.remove();
                control = undefined;
            },
        };
    }
</script>

<div style="display:hidden">
    <div class="control__container">

        <div use:createControl class={classNames}>
            {#if control}
            <slot {control} />
            {/if}
        </div>
    </div>
</div>

<style type="text/scss">
    .control__container {
        background-color: red;
        width: 300px;
        height: 500px;
        z-index: 1000;
    }
</style>
