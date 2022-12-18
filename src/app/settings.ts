export class Settings {
    public static apiKey: string = "cykyypzuWQ4w9OVpY1HMm6iF9";
    public static apiSecret: string = "8mcQGhBGR3jM5x0sya99f7Gq25qZ69OOI2FaDMGHjKLuaeffUZ";
    public static baseUrl: string = "https://api.twitter.com";
    public static proxyUrl: string = "http://localhost:3000/proxy";
    public static oauthToken = localStorage.getItem("oauth_token") as string
    public static tokenSecret = localStorage.getItem("oauth_token_secret") as string
    public static userID = localStorage.getItem("user_id") as string

}

