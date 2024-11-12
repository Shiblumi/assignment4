"use strict";

// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};


app.data = {    
    data: function() {
        return {
            contacts: [],
            user_email: "",
            contact_name: "",
            contact_affiliation: "",
            contact_description: "",
        };
    },
    methods: {
        // Add contact after button is clicked
        add_contact: function () {
            axios.post(add_contact_url, {
                contact_name: this.contact_name,
                contact_affiliation: this.contact_affiliation,
                contact_description: this.contact_description,
            }).then(function (res) {
                app.load_data();
                app.vue.contact_name = "";
                app.vue.contact_affiliation = "";
                app.vue.contact_description = "";
            })
        },
    }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
    axios.get(get_contacts_url).then(function (res) {
        app.vue.contacts = res.data.contacts;
    })
}

app.load_data();

