require.config({
    paths: {
        jquery: 'vendor/jquery.min',
        underscore: '../components/underscore/underscore-min',
        backbone: '../components/backbone/backbone-min',
        text: '../components/text/text',
        bootstrapjs: '../components/bootstrap-js/bootstrap.min',
        bootstrapdatepicker: 'vendor/bootstrap-datepicker'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrapjs: {
            deps: [ 'jquery' ],
        },
        bootstrapdatepicker: {
            deps: [ 'bootstrapjs' ],
        }
    }
});

require(
    ['namespace', 'collections/sermons', 'testdata', 'bootstrapdatepicker'],
    function (ns, Sermons, testData) {

    //check for test data
    if (testData) {
        Sermons.reset(Sermons.parse(testData));
    } else {
        Sermons.fetch();
    }

    var defaultSearchText = null;

    //hook up main events
    $('body').on('keyup focusin', '[name="phrasesearch"]', function (e) {

        var $target = $(e.target),
            letters = $target.val();

        if (!defaultSearchText) {
            console.log('first time, setting default to ' + letters);
            defaultSearchText = letters;
            $target.val('');
            return;
        }

        if (letters === defaultSearchText) {
            $target.val('');
            return;
        }

        if (letters.length === 0) {
            console.log('back to 0, setting val to ' + defaultSearchText);
            $target.val(defaultSearchText);
            ns.Sermons.resetList();
            return;
        }

        if (letters.length < 2) {
            console.log('less than 2, reset list');
            ns.Sermons.resetList();
            return;
        }

        console.log('searching!');
        ns.Sermons.search(letters);

    })

    .on('focusout', '[name="phrasesearch"]', function (e) {
        $(e.target).val(defaultSearchText);
    })

    .on('click', '[name^="facet"]:not([name*=date])', function () {

        //find out what has changed
        var speakersChosen = $('[name="facet[speaker]"]:checked').toArray(),
            biblebooksChosen = $('[name^="facet[biblebook"]:checked').toArray();

        if (speakersChosen.length) {
            ns.Sermons.searchSpeakers(speakersChosen);
            return;
        }

        if (biblebooksChosen.length) {
            ns.Sermons.searchBiblebook(biblebooksChosen);
            return;
        }

        //ns.Sermons.resetList();

    })

    .on('dateready', function () {

        // + converts to unix timestamp
        var dateRangeChosen = {
            start: +new Date($('[name="facet[date-start]"]').val()) / 1000,
            end: +new Date($('[name="facet[date-end]"]').val()) / 1000
        };

        ns.Sermons.searchDate(dateRangeChosen);

    });

});