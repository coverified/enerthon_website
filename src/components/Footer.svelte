<footer>
    <p>
        &copy; CoVerified {new Date().getFullYear()}
    </p>
    <a href="https://www.coverified.info/" title="CoVerified Website" target="_blank" rel="noopener">
        Besucht uns auf unserer Website
    </a>
    <img src="logo.png" alt="CoVerified Logo" width="220" height="46" loading="lazy" />
</footer>

<style type="text/scss">
    footer {
        background-color: #ebeef0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;

        img {
            margin-top: 1rem;
            width: 13.75rem;
        }
    }

    @media (min-width: 960px) {
        footer {
            flex-direction: row;
            justify-content: space-around;

            img {
                margin-top: 0;
            }
        }
    }
</style>
