
export default class AuthException extends Error {

    constructor(
        public message: string,
        public statusCode: number,
        public code?:string
    ){
        super(message);
        this.name = "AuthException";
    }
}