"use strict";

let app = {};

app.data = {    
    data: function() {
        return {
            contacts: [],
            user_email: "",
        };
    },
    methods: {

        // Add empty contact to UI and DB after add button is clicked
        add_contact: function () {
            axios.post(add_contact_url, {
                contact_name: this.contact_name,
                contact_affiliation: this.contact_affiliation,
                contact_description: this.contact_description,
            }).then(function (res) {
                app.load_data();
            })
        },

        // Delete contact from UI and DB after delete button is clicked
        delete_contact: function (contact_id) {
            axios.post(delete_contact_url, {
                id: contact_id,
            }).then(function (res) {
                app.load_data();
            })
        },

        // Toggle the edit mode of a field
        toggle_edit: function (contact, field_name) {
            contact[field_name + "_readonly"] = !contact[field_name + "_readonly"];
        },

        // Save the edited field to the DB
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

        // Store input image to server and display on UI
        upload_image: function (contact_id) {
            let input = document.getElementById("file-input");
            input.onchange = function () {
                let file = input.files[0];
                if (file) {
                    let reader = new FileReader();
                    reader.addEventListener("load", function () {
                        // Sends the image to the server.
                        axios.post(upload_image_url, {
                            id: contact_id,
                            contact_image: reader.result,
                        }).then(function () {
                            app.load_data();
                        });
                    });
                    reader.readAsDataURL(file);
                }
            }
            input.click();
        }
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

