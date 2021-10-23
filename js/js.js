document.addEventListener('DOMContentLoaded', function () {
    // auto dark
    var hour = new Date().getHours();
    if (hour > 20 || hour < 8) {
        bw();
    }

    function updateClock() {
        var now = new Date();
        document.getElementById('time').innerHTML = now
            .toLocaleTimeString('en-US', {
                timeZone: 'America/Los_Angeles',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                // second: "numeric"
            })
            .replace(/:/g, ' : ');

        // call this function again in 1000ms
        setTimeout(updateClock, 1000);
    }
    updateClock(); // initial call);

    function bw() {
        if (
            getComputedStyle(document.documentElement).getPropertyValue(
                '--background'
            ).trim() == '#fff'
        ) {
            document.documentElement.style.setProperty('--primary', '#f6f6f6');
            document.documentElement.style.setProperty('--background', '#111');
        } else {
            document.documentElement.style.setProperty('--primary', '#353535');
            document.documentElement.style.setProperty('--background', '#fff');
        }
    }

    document.getElementById('where').addEventListener(
        'click',
        function (event) {
            bw();
        },
        false
    );

    document.getElementById('logo').addEventListener(
        'click',
        function (event) {
            window.location.href = 'https://blh.im';
        },
        false
    );
});
