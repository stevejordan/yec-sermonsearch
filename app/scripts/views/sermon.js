define(['namespace', 'backbone', 'underscore', 'text!templates/sermon.html'],
function (ns, Backbone, _, sermonTemplate) {

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

        parseDate: function (timestamp) {

            return new Date(timestamp * 1000);

        }

    });

    ns.SermonView = SermonView;

    return ns.SermonView;

});