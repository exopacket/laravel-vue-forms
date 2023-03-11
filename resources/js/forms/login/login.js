export default {

    name: "LoginForm",

    layout: {
        name: "Stacked",
        attrs: {
            showDivider: true,
            independent: true,
        }
    },

    sections: [
        {
            // title: "My title",
            // subtitle: "My subtitle",
            elements: [
                {
                    key: "contact",
                    id: "login-contact",
                    type: "text",
                    title: "Email address or Phone",
                    required: true,
                },
                {
                    key: "password",
                    id: "login-password",
                    type: "password",
                    title: "Password",
                    required: true,
                },
            ]
        },
    ]

}