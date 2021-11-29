<script>
    import { onMount } from 'svelte';

    let time = new Date();

    // these automatically update when `time`
    // changes, because of the `$:` prefix
    $: hours = time.getHours();
    $: minutes = time.getMinutes();
    $: seconds = time.getSeconds();

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    function getMonth(c) {
        let monthsList = [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return monthsList[c.getMonth()];
    }
    function getDate(c) {
        return c.getDate();
    }
    function getHour(c) {
        return c.getHours();
    }
    function getMinute(c) {
        return c.getMinutes() < 10 ? '0' + c.getMinutes() : c.getMinutes();
    }
</script>

<div class="container">
    <div class="date-time">
        <span class="date">{getDate(time)}. {getMonth(time)} {new Date().getFullYear()}</span>
        <span class="time">{getHour(time)}:{getMinute(time)} Uhr</span>
    </div>
</div>

<style type="text/scss">
    .container {
        margin-right: 1.25rem;
    }

    .date-time {
        display: flex;
        flex-direction: column;
    }

    span {
        font-size: 30px;
        color: #636363;
        line-height: 40px;
        text-align: right;
    }
</style>
