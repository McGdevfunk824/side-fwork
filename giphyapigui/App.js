window.addEventListener("DOMContentLoaded", function () {

    var gifSearch = document.querySelector('.gif-search-container'),
        gifSearchTerm = document.querySelector('.gif-search-term'),
        gifSearchLimit = document.querySelector('.gif-search-limit'),
        gifOutput = document.querySelector('.gifs-output'),
        loader = document.querySelector('.loader'),
        apiKey = 'yourgiphyapikey';

    var searchTerm = '',
        searchLimit = 1,
        output = '';

    gifSearch.addEventListener('keyup', debounce(function () {

        loader.style.display = 'block';

        gifOutput.innerHTML = '';

        output = '';

        searchTerm = gifSearchTerm.value;

        searchLimit = gifSearchLimit.value;

        if (searchLimit < 1 || searchLimit > 200) {
            searchLimit = 30;
            gifSearchLimit.value = searchLimit;
        }

        fetch('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + searchTerm + '&limit=' + searchLimit).then(function (res) {
            return res.json();
        }).then(function (data) {

            var gifs = data.data;

            loader.style.display  = 'none';

            if (gifs.length > 0) {

                gifs.forEach(function (gif) {

                    output += '<div class="gif-container"><a href="' + gif.images.original.url + '" target="_blank"><img src="' + gif.images.fixed_width_downsampled.url + '" class="gif"></a></div>';
                });

                gifOutput.innerHTML = output;
            } else {

                gifOutput.innerHTML = '<p>😔 No GIFS Found 😔</p>';
            }
        }).catch(function (err) {

            loader.style.display = 'none';

            gifOutput.innerHTML = '<p>\uD83D\uDE14 Error: ' + err.message + ' \uD83D\uDE14</p>';
        });
    }));

    function debounce(func) {
        var _this = this,
            _arguments = arguments;

        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
        var immediate = arguments[2];

        var timeout = void 0;

        return function () {

            var context = _this,
                args = _arguments;

            clearTimeout(timeout);

            timeout = setTimeout(function () {

                timeout = null;
                if(!immediate) func.apply(context, args);
            }, wait);

            if (immediate && !timeout) func.apply(context, args);
        };
    }
});
