<script>
    let label;
    let href;
    let target;
    let style;
    let rel;
    export { label, href, target, rel, style };
</script>

<a {href} class={style} {target} {rel} title={label}>
    {label}
</a>

<style type="text/scss">
    :global(.btn) {
        padding: 0.75rem 2.372rem 0.75rem 2.875rem;
        border-radius: 1.5625rem;
        display: inline-block;    
    }
    
    :global(.btn + .btn) {
        margin-top: 1rem;
    }

    :global(.btn--green) {
        background-color: #7cbe82;
        color: #fff !important;
    }

    :global(.btn--white) {
        color: #7cbe82 !important;
        background-color: #fff;
    }

    @media (max-width: 992px) {
    }
</style>
