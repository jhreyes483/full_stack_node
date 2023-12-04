export class User{
    constructor(
        public _id: any,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public image: string,
        public role: string
    ){}
}