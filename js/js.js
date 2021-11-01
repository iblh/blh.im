document.addEventListener('DOMContentLoaded', function () {
    // auto dark
    var hour = new Date().getHours();
    if (hour >= 19 || hour <= 7) {
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
    updateClock(); // initial call;

    function bw() {
        if (
            getComputedStyle(document.documentElement)
                .getPropertyValue('--background')
                .trim() == '#fff'
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

    function hoverWhere() {
        var sections = document.getElementsByClassName('section');
        for (var i = 0; i < sections.length; i++) {
            sections[i].addEventListener('mouseenter', function () {
                this.querySelector('.where').classList.add('vis');
            });
            sections[i].addEventListener('mouseleave', function () {
                this.querySelector('.where').classList.remove('vis');
            });
        }
    }
    hoverWhere();
});

function toggleDetail(e) {
    var detailItem = e.currentTarget.querySelector('.details');

    if (detailItem.id == 'vis_detail') {
        detailItem.removeAttribute('id');
    } else {
        if (document.getElementById('vis_detail') != null) {
            document.getElementById('vis_detail').removeAttribute('id');
        }
        detailItem.setAttribute('id', 'vis_detail');
    }
}
