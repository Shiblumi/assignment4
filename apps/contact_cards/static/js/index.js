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
            toggle_add_contact: false,
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

        delete_contact: function (contact_id) {
            axios.post(delete_contact_url, {
                id: contact_id,
            }).then(function (res) {
                app.load_data();
            })
        },

        toggle_edit: function (contact, field_name) {
            contact[field_name + "_readonly"] = !contact[field_name + "_readonly"];
        },

        save_edit: function (contact, field_name) {
            let data = {id: contact.id};
            data[field_name] = contact[field_name];
            data['field_name'] = field_name;
            data['field_value'] = contact[field_name];

            axios.post(edit_contact_url, data)
            .then(function (res) {
                app.load_data();
            })
        },
    }
};

app.vue = Vue.createApp(app.data).mount("#app");

app.load_data = function () {
    axios.get(get_contacts_url).then(function (res) {
        app.vue.contacts = res.data.contacts.map(contact => ({
            ...contact,
            contact_name_readonly: true,
            contact_affiliation_readonly: true,
            contact_description_readonly: true,
        }));
    });
}

app.load_data();

