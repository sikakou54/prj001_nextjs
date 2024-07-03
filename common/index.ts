export function validatePassword(str: string) {
    const uppercaseRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const numberRegex = /\d/
    const hasUppercase = uppercaseRegex.test(str)
    const hasLowercase = lowercaseRegex.test(str)
    const hasNumber = numberRegex.test(str)
    if (hasUppercase && hasLowercase && hasNumber && str.length >= 8) {
        return true
    } else {
        return false
    }
}

export const getUrlParam = (name: string, url: string) => {
    if (url.includes(name)) {
        const urlParams = new URLSearchParams(url.split("#")[1])
        const param = urlParams.get(name);
        if (null !== param) {
            return param
        }
        return undefined
    }
    return undefined;
}