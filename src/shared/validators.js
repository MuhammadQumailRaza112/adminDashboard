export function validateEmail(text) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return (re.test(text))
}

export function validatePassword(text) {
    var re = /^.{6,}$/
    return (re.test(text))
}
