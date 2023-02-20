export function validationPassword(pass){
    if(pass.length < 8){
        return "short";
    }
}

export function validationUsername(username){
    let reg = /[\u0600-\u06FF\u0750-\u077F]/;
    if(username.length < 4){
        return "short";
    }
    if (reg.test(username)) {
        return "arbic";
    }
}

