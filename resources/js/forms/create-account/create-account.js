export default {

    name: "CreateAccountForm",

    layout: {
        name: "Stacked",
        attrs: {
            //showDivider: true,
            //independent: true,
        }
    },

    sections: [
        {
            // title: "My title",
            // subtitle: "My subtitle",
            actions: [
                {
                    type: "submit",
                    style: "full-width"
                }
            ],
            elements: [
                {
                    key: "full_name",
                    id: "create-name",
                    type: "text",
                    title: "Full Name",
                    required: true,
                },
                {
                    key: "contact",
                    id: "create-contact",
                    type: "text",
                    title: "Email address or Phone",
                    required: true,
                },
                {
                    key: "password",
                    id: "create-password",
                    type: "password",
                    title: "Password",
                    required: true,
                },
            ]
        },
    ]

}