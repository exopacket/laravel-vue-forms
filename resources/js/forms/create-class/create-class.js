export default {

    name: "CreateAccountForm",

    layout: {
        name: "Stacked",
        attrs: {}
    },

    sections: [
        {
            elements: [
                {
                    type: "row",
                    width: [
                      "70%",
                      "30%"
                    ],
                    children: [
                        {
                            key: "name",
                            id: "create-class-name",
                            type: "text",
                            title: "Class name",
                            required: true,
                        },
                        {
                            key: "abbreviation",
                            id: "create-class-abbreviation",
                            type: "text",
                            title: "Abbreviation",
                            required: true,
                        },
                    ]
                },
                {
                    key: "sponsor",
                    id: "create-class-sponsor",
                    type: "select",
                    title: "Sponsor",
                    required: true,
                    emptyOption: true,
                    //createOption: "host/createSponsor" //dispatch
                    value: "empty",
                    getOptions: "actor/loadAllSponsors",
                    getOptionsLoading: "actor/isLoadingSponsors",
                    getOptionsValues: "actor/allSponsors",
                    optionKey: "name",
                    optionValue: "id"
                },
            ]
        },
    ]

}