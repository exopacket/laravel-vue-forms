export const forms = {
    LoginForm: await import("./login/login.js"),
    CreateAccountForm: await import("./create-account/create-account.js"),
    CreateEventForm: await import("./events/create.js"),
    CreateClassForm: await import("./create-class/create-class.js")
}