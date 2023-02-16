import { urlToBase64, base64ToUtf8 } from "./convert.js"

const mdContent     = document.getElementById("mdContent")
const params = new URLSearchParams(document.location.search)
const safeStr = params.get("t")
const rawStr = base64ToUtf8(urlToBase64(safeStr))

if(safeStr && window.frameElement) {
    mdContent.innerHTML = marked.parse(rawStr)
}
hljs.highlightAll()
