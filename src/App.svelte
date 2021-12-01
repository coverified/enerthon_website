<script>
    import Icons from './Icons.svelte';
    import Dare from './components/Dare.svelte';
    import Footer from './components/Footer.svelte';
    import Button from './components/Button.svelte';
    import Map from './components/Map.svelte';
    import Login from './components/Login.svelte';
    import { User } from './store.js';
    import { onDestroy } from 'svelte';
    let user;
    const unUser = User.subscribe((v) => (user = v));
    onDestroy(unUser);
    let showMap = true;
    // $: isLoggedIn = !!user;
    $: isLoggedIn = true;
</script>

<Icons />
<main>
    {#if isLoggedIn}
        <div class="intern_map">
            <div class="intern_map--nav">
                <div>
                    <button on:click={() => (showMap = true)} title="Übersicht" class="{showMap ? 'active' : ''}"> Übersicht </button>
                    <button on:click={(e) => (showMap = false)} class="{!showMap ? 'active' : ''}" title="Mein Dashboard"> Mein Dashboard </button>
                </div>
                <button class="d-flex" on:click={() => User.signout()}>
                    Netzbetreiber Mitte
                    <svg role="presentation">
                        <use xlink:href="#logout" />
                    </svg>
                </button>
            </div>
            <Map bind:showMap />
        </div>
    {:else}
        <div class="container bg-image">
            <div class="navigation__container">
                <Login />
            </div>
            <svg role="presentation">
                <use xlink:href="#heading" />
            </svg>
            <div class="text__container">
                <p>
                    Hast du dich schon mal gefragt, wie du täglich Strom bekommst? Was leisten die Netzbetreiber jeden
                    Tag, damit es zu keinem Zusammenbruch kommt?
                </p>
                <p>
                    Komm mit uns auf eine Reise durch das Stromnetz und verfolge die Wege vom Erzeuger bis zu dir nach
                    Hause.
                </p>
            </div>
            <div class="arrow__down" />
        </div>
        <Dare />
        <div class="info">
            <div>
                <h2>REDISPATCH 2.0 - DIE GRÜNE TRANSFORMATION.</h2>
                <p>
                    Zukünftig werden auch Anlagen der Erneuerbaren Energien und KWKG-Anlagen am Redispatch teilnehmen
                    und auch Verteilnetzbetreiber werden eine Rolle im Redispatch erhalten.
                </p>
                <Button label="mehr erfahren" href="#" style="btn btn--green" />
            </div>
            <img src="placeholder-video-renewable-energy.png" loading="lazy" class="d-none d-lg-block" />
        </div>
        <div class="info--grey">
            <div>
                <h2>Entdecke wie sich die Welt in den letzten Jahrzenten durch erneuerbare Energien verändert hat.</h2>
                <p>
                    Die erneuerbaren Energien in Deutschland haben sich in den vergangenen Jahren weiter entwickelt und
                    sind auf dem Weg, eine wichtige Säule unserer Energieversorgung zu werden.
                </p>
                <p>
                    Entdecke die Entwicklung im Laufe der Jahre, indem du dich durch die interaktive Zeitleiste bewegst,
                    die von 1971 bis heute reicht.
                </p>
                <Button label="Zeitstrahl interaktiv entdecken" href="#" style="btn btn--green" />
            </div>
            <img src="timeline.svg" alt="timeline" loading="lazy" class="d-none d-lg-block" />
        </div>
        <div class="info__boxes">
            <div class="info__boxes--green">
                <h2>Ihre Vorteile als Netzbetreibende</h2>
                <p>DA/RE ist bundesweit einsetzbar für alle Netzbetreiber!</p>
                <Button label="Vorteile kennen lernen" href="#" style="btn btn--white" />
            </div>
            <div class="info__boxes--white">
                <h2>Wie gesetzliche Regularien den Redispatch beeinflussen.</h2>
                <p>
                    Im Zuge des sog. Redispatch 2.0 wird der bilanzielle Ausgleich von allen Redispatch-Maßnahmen
                    gesetzlich vorgeschrieben, also auch für das Einspeisemanagement. Dies ist eine Hilfe für betroffene
                    Direktvermarkter und unterstützt die Systemsicherheit, da der bilanzielle Ausgleich koordiniert
                    durchgeführt werden kann.
                </p>
                <Button label="Für Anlagenbetreiber" href="#" style="btn btn--green" />
                <Button label="Für Netzbetreiber" href="#" style="btn btn--green" />
            </div>
        </div>
    {/if}
</main>
{#if !isLoggedIn}
    <Footer />
{/if}

<style type="text/scss">
    main {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        max-width: 2100px;
    }

    .d-none {
        display: none;
    }

    .bg-image {
        background-image: url('/header-frau.jpg');
        background-size: cover;
        padding: 0.975rem;

        svg {
            width: 19rem;
            height: 12rem;
            margin: 0 auto;
            display: flex;
        }

        .text__container {
            margin: 2rem 0;
            p {
                color: #fff;
                font-size: 1rem;
                font-weight: 400;
            }
        }

        .arrow__down {
            font-size: 2.75rem;
            justify-content: center;
            display: flex;
            padding-bottom: 1rem;

            &:before {
                content: '\2193';
                color: #fff;
            }
        }

        .navigation__container {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            button {
                margin-right: 1.25rem;
            }
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0.975rem;
        margin-top: 10px;

        h2 {
            font-weight: 700;
            font-size: 2rem;
            line-height: 3rem;
            color: #636363;
            margin-top: 0;
        }

        img {
            width: 100%;
            height: auto;
        }

        &--grey {
            background-color: #636363;
            color: #fff;
            padding: 0.975rem;
            padding-bottom: 2rem;
        }

        &__boxes {
            display: flex;
            flex-direction: column;
            margin-top: 3rem;

            &--green {
                padding: 0.975rem;
                padding-bottom: 3rem;
                background-color: #7cbe82;
                color: #fff;

                h2 {
                    margin-top: 0;
                }

                p {
                    margin-bottom: 1.25rem;
                }
            }

            &--white {
                border-top: 3px solid #161a1c;
                border-bottom: 3px solid #161a1c;
                padding-left: 30px;
                padding-right: 30px;
                padding-bottom: 45px;

                h2 {
                    color: #636363;
                }
            }
        }
    }

    h1 {
        color: #fff;

        text-transform: uppercase;
        font-size: 6rem;
        font-weight: 300;
        position: absolute;
        left: 17%;
        top: 23%;
    }

    .intern_map {
        background-color: #f0f0f0;

        &--nav {
            padding: 1.5rem 1.875rem 0;
            background-color: #161a1c;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: space-between;

            button {
                color: #fff;
                margin-right: 1.5rem;
            }

            button.active {
                box-shadow: inset 0 -0.33em 0 #00ff94;
                padding-left: 1rem;
                padding-right: 1rem;
                padding-bottom: 2.2rem;
            }
        }

        button {
            margin-top: 0;
            margin-bottom: 0;
            background-color: #161a1c;
            align-self: flex-start;
            border: 0;
            color: #fff;
        }

        .d-flex {
            display: flex;
        }

        svg {
            width: 1.25rem;
            height: 1.25rem;
            margin-left: 1rem;
        }
    }

    @media (min-width: 540px) {
    }
    @media (min-width: 720px) {
        .bg-image {
            svg {
                margin: 0;
                display: flex;
            }
        }
    }
    @media (min-width: 960px) {
        .bg-image {
            svg {
                width: 25rem;
                height: 18rem;
            }

            .text__container {
                margin-left: auto;
                max-width: 40%;

                p {
                    color: #fff;
                    font-size: 1.25rem;
                    font-weight: 400;
                }
            }

            .arrow__down {
                font-size: 3.75rem;
            }

            .navigation__container {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                button {
                    margin-right: 1.25rem;
                }
            }
        }
    }
    @media (min-width: 1140px) {
    }
    @media (min-width: 1320px) {
        .d-lg-block {
            display: block;
        }

        .bg-image {
            svg {
                width: 50rem;
                height: 32rem;
            }

            .text__container {
                width: 39.375rem;

                p {
                    color: #fff;
                    font-size: 1.875rem;
                    line-height: 2.3125rem;
                    font-weight: 400;
                }
            }

            .arrow__down {
                font-size: 5.75rem;
            }
        }

        .info {
            display: flex;
            flex-direction: row;
            position: relative;
            margin-top: 10px;
            height: 49rem;
            padding-right: 5.625rem;
            padding-left: 5.625rem;

            h2 {
                font-weight: 700;
                font-size: 5rem;
                line-height: 90px;
                color: #636363;
                max-width: 800px;
                margin-top: 0;
            }

            p {
                max-width: 400px;
            }

            img {
                position: absolute;
                z-index: -1;
                right: 0;
                top: 6rem;
                width: 60rem;
                height: auto;
            }

            &--grey {
                background-color: #636363;
                padding-right: 5.625rem;
                padding-left: 5.625rem;
                display: grid;
                grid-template-columns: 1fr 1fr;
                color: #fff;

                img {
                    margin: 0 auto;
                    padding-top: 4rem;
                    height: 32.5rem;
                    padding-bottom: 1rem;
                }

                div {
                    padding-left: 4.75rem;
                    padding-top: 4rem;
                }
            }

            &__boxes {
                display: flex;
                flex-direction: row;
                padding-right: 5.625rem;
                padding-left: 5.625rem;
                margin-top: 127px;
                margin-bottom: 127px;

                &--green {
                    background-color: #7cbe82;
                    width: 30%;
                    color: #fff;
                    padding: 30px 100px 46px 30px;
                    margin-right: 54px;

                    h2 {
                        margin-top: 0;
                    }

                    p {
                        margin-bottom: 1.25rem;
                    }
                }

                &--white {
                    width: 70%;
                    border-top: 3px solid #161a1c;
                    border-bottom: 3px solid #161a1c;
                    padding-left: 30px;
                    padding-right: 30px;
                    padding-bottom: 45px;

                    h2 {
                        color: #636363;
                    }
                }
            }
        }

        .navigation__container {
            padding-top: 1.25rem;
        }
    }
</style>
