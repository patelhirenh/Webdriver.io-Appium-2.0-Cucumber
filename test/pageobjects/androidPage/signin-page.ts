import Page from "../page";

class SignInPage extends Page {

    public get signInMessage() {
        return $('//h1');
    }

    public get signInButton() {
        return $('//button');
    }

    public get emailAddress() {
        return $('//input[@name="email"]');
    }

    public get password() {
        return $('//input[@name="password"]');
    }

}

export default new SignInPage()