<script>
    import Control from './Control.svelte';
    export let wind = true;
    export let solar = true;
    export let biogas = true;
    export let power = undefined;

    let value;
    let input;

    const handleSubmit = () => {
        power = value;
    };

    const handleKeyup = (event) => {
        if (event?.code == 'Enter') {
            event.preventDefault();
            input.blur();
            power = value;
        }
    };
</script>

<div class="leaflet-control--filter">
    <label class="control control-checkbox">
        <input type="checkbox" bind:checked={wind} />
        <div class="control_indicator" />
        <svg role="presentation" width="50" height="50">
            <use xlink:href="#windenergie" />
        </svg>
        <p>Wind</p>
    </label>
    <label class="control control-checkbox">
        <input type="checkbox" bind:checked={solar} />
        <div class="control_indicator" />
        <svg role="presentation" width="50" height="50">
            <use xlink:href="#solarenergie" />
        </svg>
        <p>Solar</p>
    </label>
    <label class="control control-checkbox">
        <input type="checkbox" bind:checked={biogas} />
        <div class="control_indicator" />
        <svg role="presentation" width="50" height="50">
            <use xlink:href="#biogas" />
        </svg>
        <p>Biogas</p>
    </label>
    <form class="form__power" on:submit|preventDefault={handleSubmit}>
        <label><b>Leistung > </b></label>
        <input
            type="number"
            bind:this={input}
            bind:value
            on:keyup|preventDefault={handleKeyup}
            placeholder={power}
            id="power"
            name="power"
            class="text-field text-field--power"
        />
        <p>kW</p>
    </form>
</div>

<style type="text/scss">
    .selected {
        background-opacity: 25%;
        background-color: #dcc;
    }

    :global(.leaflet-control--filter) {
        background-color: #636363;
        padding: 1rem;
    }

    .form {
        &__search {
            .btn {
                appearance: none;
                background: none;
                margin-bottom: 0;
                position: absolute;
                right: 9px;
                top: 9px;
                border: 0;
                padding-bottom: 0.75rem;

                svg {
                    color: #fff;
                    width: 24px;
                    height: 24px;
                }
            }
            .btn-delete {
                font-weight: bold;
            }
        }

        &__power {
            position: relative;
            color: #fff;
            font-size: 1.25rem;
            font-weight: 300;
            border-top: 2px solid #161a1c;
            padding-top: 1.25rem;

            label {
                margin-bottom: 1rem;
            }

            p {
                position: absolute;
                right: 9px;
                top: 49px;
            }
        }
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type='number'] {
        -moz-appearance: textfield;
    }

    button {
        width: 2rem;
        height: 2rem;
        border: 0;
        background-color: transparent;
        transition-property: background-color, background-opacity;
        transition-duration: 250ms;
        border-radius: 0.375rem;
    }

    .single-click:hover {
        background-opacity: 50%;
        background-color: lightgray;
    }

    .text-field {
        padding: 0.5rem;
        padding-right: 2.25rem;
        font-size: 16px;
        border-width: 1px;
        border-color: #fffff;
        background-color: #bcbcbc;
        color: #ffffff;
        border-style: solid;
        border-radius: 4px;
        box-shadow: -50px 0px 0px rgba(66, 66, 66, 0);
        text-shadow: -50px 0px 0px rgba(66, 66, 66, 0);

        &--power {
            background-color: #636363;
        }
    }

    .control {
        font-family: arial;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 5px;
        padding-top: 3px;
        cursor: pointer;
        font-size: 16px;

        p {
            color: #fff;
            margin-left: 0.8125rem;
        }
    }
    .control input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    .control_indicator {
        position: relative;
        top: 2px;
        left: 0;
        height: 20px;
        width: 20px;
        margin-right: 1.625rem;
        background: #636363;
        border: 1px solid #fff;
        border-radius: 3px;
    }
    .control:hover input ~ .control_indicator,
    .control input:focus ~ .control_indicator {
        background: #636363;
    }

    .control input:checked ~ .control_indicator {
        background: #636363;
    }
    .control:hover input:not([disabled]):checked ~ .control_indicator,
    .control input:checked:focus ~ .control_indicator {
        background: #636363;
    }
    .control input:disabled ~ .control_indicator {
        background: #e6e6e6;
        opacity: 0.6;
        pointer-events: none;
    }
    .control_indicator:after {
        box-sizing: unset;
        content: '';
        position: absolute;
        display: none;
    }
    .control input:checked ~ .control_indicator:after {
        display: block;
    }
    .control-checkbox .control_indicator:after {
        left: 8px;
        top: 4px;
        width: 3px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
</style>
