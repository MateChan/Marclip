const utf8ToBase64 = str => {
    const arr = new TextEncoder("utf-8").encode(str)
    const raw = String.fromCharCode(...arr)
    const b64 = window.btoa(raw)
    return b64
}
const base64ToUtf8 = b64 => {
    const raw = window.atob(b64)
    const arr = Array.prototype.map.call(raw, x => x.charCodeAt(0))
    const buf = Uint8Array.from(arr).buffer
    const str = new TextDecoder("utf-8").decode(buf)
    return str
}
const base64ToUrl = b64 => {
    return String(b64 || "").replace(/[\+\/]/g, match => {
        return {
            "+" : "-",
            "/" : "_"
        }[match] || match
    }).replace(/=+$/, "")
}
const urlToBase64 = b64url => {
    const b64 = String(b64url || "").replace(/[\-\_]/g, match => {
        return {
            "-" : "+",
            "_" : "/"
        }[match] || match
    }) + "==="
    return b64.substring(0, (Math.floor(b64.length / 4) * 4))
}
export { utf8ToBase64, base64ToUrl, urlToBase64, base64ToUtf8 }