define(['namespace', 'backbone', 'underscore', 'bootstrapjs'],
    function (ns, Backbone, _) {


    var Speakers = Backbone.Collection.extend({

        url: 'http://yec.localhost/speakers.json',

        initialize: function () {
            this.on('add', this.addOne);
        },

        parse: function (data) {

            var speakers = [];

            _.each(data.speakers, function (s) {
                //console.log(s);
                speakers.push(s.speaker);
            });

            return speakers;

        },

        reset: function (models) {
            console.log('about to add speakers');
            this.add(models);
        }

    });

    ns.Speakers = new Speakers();

    return ns.Speakers;

});