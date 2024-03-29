export default {

    name: "LoginForm",

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
                // {
                //     type: "row",
                //     children: [
                //         {}
                //     ]
                // }
                {
                    key: "remember",
                    id: "login-remember",
                    type: "login-remember",
                    forgotLink: "/forgot"
                },
            ]
        },
    ]

}