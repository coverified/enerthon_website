<script>
    import Modal, { getModal } from './Modal.svelte';
    import { User } from '../store.js';
</script>

<button on:click={() => getModal('login').open()} class="btn btn--green">
    <svg role="presentation">
        <use xlink:href="#login" />
    </svg>Login für Netzbetreiber</button
>
<Modal id="login">
    <div>
        <h2>Login für Netzbetreiber</h2>
        <input type="text" placeholder="Netzbetreiber" name="uname" required />
        <input type="password" placeholder="Passwort eingeben" name="psw" required />
        <button
            class="btn btn--green login"
            on:click={() => {
                getModal('login').close();
                User.signin();
            }}
        >
            <svg role="presentation">
                <use xlink:href="#login" />
            </svg>
            Login
        </button>
    </div>
</Modal>

<style type="text/scss">
    h2 {
        margin-bottom: 1.625rem;
        margin-top: 0;
    }

    input {
        background-color: #23292d;
        color: #fff;
        margin-bottom: 1rem;

        + input {
            margin-bottom: 2rem;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        padding: 4rem 6.25rem;

        button {
            width: 10rem;
        }
    }

    button {
        display: flex;
        align-items: center;
        padding-left: 1.25rem;
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 1rem;
        fill: #ccc;
    }
</style>
