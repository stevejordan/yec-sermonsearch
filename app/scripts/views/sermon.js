define(['namespace', 'backbone', 'text!templates/sermon.html'], 
function(ns, Backbone, sermonTemplate) {

    var SermonView = Backbone.View.extend({

        tagName: 'div',
        className: 'result',
        template: _.template(sermonTemplate),

        initialize: function () {
            this.render();
        },

        render: function () {

            var json = this.model.toJSON();

            console.log('rendering a sermon');
            console.log(this.model.toJSON());

            json.field_dateandtime = 
                this.parseDate(json.field_dateandtime);

            this.$el.html(this.template(json));

            $('#results').append(this.el);
        },

        parseDate: function (rfcDate) {

            var date = {};
            
            date.yy   = rfcDate.substring(0,4);
            date.mo   = rfcDate.substring(5,7);
            date.dd   = rfcDate.substring(8,10);
            date.hh   = rfcDate.substring(11,13);
            date.mi   = rfcDate.substring(14,16);
            date.ss   = rfcDate.substring(17,19);

            date.myutc = Date.UTC(
                date.yy-0,
                date.mo-1,
                date.dd-0,
                date.hh-0,
                date.mi-0,
                date.ss-0
            );

            return new Date(date.myutc);

        }

    });

    ns.SermonView = SermonView;

    return ns.SermonView;

});