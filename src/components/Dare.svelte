<script>
    import { fade } from 'svelte/transition';
    import Modal, { getModal } from './Modal.svelte';

    let wind = false;
    let clouds = false;
    let basicMap = true;
    let slide;
    let count = 1;

    function handleBtnClick() {
        if (clouds && count < 2) {
            count++;
            slide = count + '/2';
        } else if (wind && count < 4) {
            count++;
            slide = count + '/4';
        }
    }
    function handleBackBtnClick() {
        if (clouds && count > 1) {
            count = count - 1;
            slide = count + '/2';
        } else if (wind && count > 1) {
            count = count - 1;
            slide = count + '/4';
        }
    }
</script>

<div class="map">
    <div class="map__text">
        <h2>Das passiert in Baden-Württemberg, damit du Strom hast.</h2>
        <p>
            Entdecke interaktiv, was passieren muss, dass der Strom immer ohne Probleme fließt und welche Faktoren das
            Stromnetz beeinflussen können. Drücke dazu einfach auf die interaktiven Elemente.
        </p>
        <div class="map__btns">
            {#if !clouds}
                <button
                    on:click={() => {
                        clouds = true;
                        basicMap = false;
                        wind = false;
                        count = 1;
                        slide = '1/2';
                    }}
                >
                    <svg role="presentation">
                        <use xlink:href="#clouds" />
                    </svg>
                </button>
            {:else}
                <button
                    class="pressed"
                    on:click={() => {
                        clouds = true;
                        basicMap = false;
                    }}
                >
                    <svg role="presentation">
                        <use xlink:href="#cloudspressed" />
                    </svg>
                </button>
            {/if}
            {#if !wind}
                <button
                    on:click={() => {
                        wind = true;
                        basicMap = false;
                        clouds = false;
                        count = 1;
                        slide = '1/4';
                    }}
                >
                    <svg role="presentation">
                        <use xlink:href="#wind" />
                    </svg>
                </button>
            {:else}
                <button
                    class="pressed"
                    on:click={() => {
                        wind = true;
                    }}
                >
                    <svg role="presentation">
                        <use xlink:href="#windpressed" />
                    </svg>
                </button>
            {/if}
        </div>
    </div>
    {#if wind && count === 1}
        <div class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#wind-icon" />
                </svg>
                Starker Wind
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Eine Starkwindfront zieht im Norden von Baden-Württemberg auf. Die Windkraftanlagen speisen nun massiv
                Strom ins Netz ein. Es kommt zu kritischen Engpässen im Leitungssystem.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    {#if wind && count === 2}
        <div transition:fade class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#wind-icon" />
                </svg>
                Starker Wind
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Im ersten Schritt, dem sogenannten negativen Redispatch weist die Systemführung konventionelle
                Kraftwerke und Windkraftanlagen im Norden an, ihre Einspeisung zu reduzieren. Erneuerbare Energien
                müssen gesetzlich vor allen anderen Erzeugungsarten eingespeist werden.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    {#if wind && count === 3}
        <div transition:fade class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#wind-icon" />
                </svg>
                Starker Wind
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Die Folge: der Strombedarf im Süden wird nicht mehr gedeckt. Deshalb schaltet die Systemführung im
                zweiten Schritt, dem sogenannten positiven Redispatch, direkt vor Ort im Süden Energie durch
                Biogasanlagen hinzu.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    {#if wind && count === 4}
        <div transition:fade class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#wind-icon" />
                </svg>
                Starker Wind
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Nach diesem zusätzlichen Redispatch sind alle Engpässe schließlich wieder ausgeglichen und das System
                ist wieder unkritisch.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    {#if clouds && count === 1}
        <div transition:fade class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#clouds-icon" />
                </svg>
                Zunehmende Bewölkung
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Ändert sich das Wetter durch zunehmende Bewölkung, wird weniger Solarstrom produziert und der Bedarf im
                Süden würde nicht mehr gedeckt.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    {#if clouds && count === 2}
        <div transition:fade class="map__info--box">
            <h3>
                <svg role="presentation">
                    <use xlink:href="#clouds-icon" />
                </svg>
                Zunehmende Bewölkung
                <span>
                    {#if slide}
                        {slide}
                    {/if}
                </span>
            </h3>
            <p>
                Durch Redispatch-Maßnahmen wird dieses Defizit schnell ausgeglichen, indem automatisch preisgünstiger
                Strom z.B. aus Biogasanlagen zugeschaltet wird. Somit ist das System wieder stabil und der Strom fließt
                weiterhin ungehindert durch die Netze.
            </p>
            <div class="btn__container">
                <button class="btn" on:click={handleBackBtnClick}>&#8592; zurück</button>
                <button class="btn btn--green" on:click={handleBtnClick}>weiter &#8594;</button>
            </div>
        </div>
    {/if}
    <div class="map__image">
        {#if basicMap}
            <div transition:fade>
                <img src="/map-default.svg" alt="map" />
            </div>
        {/if}
        {#if wind && count === 1}
            <img transition:fade src="/map-wind-01_dare.svg" alt="map" width="1920" />
        {/if}
        {#if wind && count === 2}
            <img transition:fade src="/map-wind-03_dare.svg" alt="map" />
        {/if}
        {#if wind && count === 3}
            <img transition:fade src="/map-wind-04_dare.svg" alt="map" />
        {/if}
        {#if wind && count === 4}
            <img transition:fade src="/map-wind-05_dare.svg" alt="map" />
        {/if}
        {#if clouds && count === 1}
            <img transition:fade src="/map-clouds-01_dare.svg" alt="map" />
        {/if}
        {#if clouds && count === 2}
            <img transition:fade src="/map-clouds-02_dare.svg" alt="map" />
        {/if}
    </div>
    <div class="video__container">
        <p><b>Jetzt spielen!</b> Kannst du<br /> einen BlackOut verhindern?</p>
        <button on:click={() => getModal('video').open()} class="btn btn--youtube">
            <svg role="presentation">
                <use xlink:href="#blackout" />
            </svg>
        </button>
    </div>
</div>
<Modal id="video">
    <video
        class=""
        src="enerthon_game_demo.mp4"
        preload=”none”
        autoplay
        controls
        playsinline
    />
</Modal>

<style type="text/scss">
    .map {
        display: flex;
        flex-direction: column;
        position: relative;
        padding-right: 0.9375rem;
        padding-left: 0.9375rem;

        &__text {
            margin-bottom: 2.3175rem;
            font-size: 1.25rem;
            line-height: 1.75rem;

            h2 {
                font-size: 1.875rem;
                line-height: 2.5rem;
            }
        }

        &__btns {
            display: flex;
            margin-top: 3rem;

            button {
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                background-color: #fff;

                + button {
                    margin-left: 2rem;
                }

                svg {
                    width: 4.4375rem;
                    height: 4.4375rem;
                }

                &.pressed {
                    background-color: #636363;
                }
            }
        }

        .map__info--box {
            background-color: #636363;
            height: 21.1875rem;
            position: relative;
            display: flex;
            flex-direction: column;
            color: #fff;
            padding-left: 5.625rem;
            padding-right: 1.625rem;
            border-top-right-radius: 1.25rem;
            border-bottom-right-radius: 1.25rem;

            h3 {
                color: #bcbcbc;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f0f0f0;
                font-size: 1.25rem;

                &:before {
                    position: absolute;
                    border-bottom: 1px solid #f0f0f0;
                    width: 100%;
                }

                span {
                    color: #fff;
                    margin-left: auto;
                    margin-right: 1.1875rem;
                }

                svg {
                    width: 4rem;
                    height: 4rem;
                    margin-right: 1.25rem;
                }
            }
        }

        &__image {
            img {
                width: 100%;
                right: 0;
                z-index: -1;
            }
        }
    }

    .video__container {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 200px;
        position: absolute;
        bottom: 0;
        right: 0;
        background: #ffffff;
        opacity: 0.8;
        border-top-left-radius: 29.5px;
        border-bottom-left-radius: 29.5px;
        padding: 1.875rem 1rem 1.875rem 2.5rem;

        .btn--youtube {
            border: 0;
            padding: 0;
            background: transparent;

            svg {
                width: 16rem;
                height: 3rem;
            }
        }
    }

    @media (min-width: 540px) {
    }
    @media (min-width: 720px) {
    }
    @media (min-width: 960px) {
        .map {
            display: grid;
            grid-template-columns: 38rem 82.5rem;
            grid-template-rows: 1fr 1fr;
            position: relative;
            padding-right: 0;
            padding-left: 0;
            margin-bottom: 5rem;

            &__text {
                padding-left: 5.625rem;
                padding-top: 3.75rem;
                margin-bottom: 2.3175rem;
                font-size: 1.25rem;
                line-height: 1.75rem;

                h2 {
                    font-size: 1.875rem;
                    line-height: 2.5rem;
                }
            }

            &__btns {
                display: flex;
                margin-top: 3rem;

                button {
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    background-color: #fff;

                    + button {
                        margin-left: 2rem;
                    }

                    svg {
                        width: 6.4375rem;
                        height: 6.4375rem;
                    }

                    &.pressed {
                        background-color: #636363;
                    }
                }
            }

            .map__info--box {
                background-color: #636363;
                height: 23.1875rem;
                position: relative;
                grid-column: 1 / 2;
                grid-row: 2 / 2;
                color: #fff;
                padding-left: 5.625rem;
                padding-right: 1.625rem;
                border-top-right-radius: 1.25rem;
                border-bottom-right-radius: 1.25rem;

                h3 {
                    color: #bcbcbc;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 1.25rem;

                    &:before {
                        position: absolute;
                        border-bottom: 1px solid #f0f0f0;
                        width: 100%;
                    }

                    span {
                        color: #fff;
                        margin-left: auto;
                        margin-right: 1.1875rem;
                    }

                    svg {
                        width: 4rem;
                        height: 4rem;
                        margin-right: 1.25rem;
                    }
                }

                .btn__container {
                    margin-top: auto;
                    margin-bottom: 2rem;
                }
            }

            &__image {
                img {
                    width: 100%;
                    height: auto;
                    right: 0;
                    position: absolute;
                    z-index: -1;
                }

                button {
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                    background-color: #fff;
                    position: absolute;
                    right: 7rem;
                    top: 23rem;

                    svg {
                        width: 7.4375rem;
                        height: 7.4375rem;
                    }
                }
            }
        }
    }

    @media (min-width: 1900px) {
        .map {
            margin-bottom: 10rem;
        }

        .video__container {
            bottom: -7rem;
        }
    }
</style>
