define(['namespace', 'backbone', 'views/sermon', 'bootstrapjs'], 
    function(ns, Backbone, SermonView) {


    var Sermons = Backbone.Collection.extend({

        url: 'http://yec.localhost/sermons.json',

        initialize: function () {
            this.on('add', this.addOne);
        },

        parse: function (data) {

            var sermons = [];
            
            _.each(data.sermons, function (s) { 
                //console.log(s);
                sermons.push(s.sermon);
            });

            return sermons;

        },

        reset: function (models) {
            console.log('about to add sermons');
            this.add(models);
        },

        addOne: function (model) {
            console.log('adding a sermon');
            new SermonView({model: model});
        },

        resetList: function (sermons) {

            $('#results').html('');

            (sermons ? sermons : this).each(function (sermon) {
                new SermonView({model: sermon});
            });

        },

        //an approach to filtering
        search: function (letters) {

            var pattern = new RegExp(letters, 'gi');
            
            this.resetList(_(this.filter(function (data) {
                return pattern.test(data.get('title')) ||
                    pattern.test(data.get('field_passage')) ||
                    pattern.test(data.get('field_speaker'));
            })));

        },

        // better would be search functions for each facet 
        // (rather than push everything through search())
        // e.g.
        searchSpeakers: function (speakers) {
            
            this.resetList(_(this.filter(function (data) {

                var match = false;

                $.each(speakers, function (i, el) {
                    match = data.get('field_speaker').indexOf(el.value) !== -1;
                })
                                             
                return match;

            })));

        },

        searchBiblebook: function (books) {
            
            this.resetList(_(this.filter(function (data) {

                var match = false;

                $.each(books, function (i, el) {
                    match = data.get('field_passage').indexOf(el.value.substring(4)) !== -1;
                })
                                             
                return match;

            })));

        },

        searchDate: function (dateRange) {
            //test if any of the models.field_dateandtime falls within dateRange
        }
  
    });

    ns.Sermons = new Sermons;

    return ns.Sermons;

});