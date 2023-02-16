import { utf8ToBase64, base64ToUrl, base64ToUtf8, urlToBase64 } from "./convert.js"

const details       = document.getElementById("details")
const mdContent     = document.getElementById("mdContent")
const editArea      = document.getElementById("editArea")
const wordCount     = document.getElementById("wordCount")
const previewButton = document.getElementById("previewButton")
const shareButton   = document.getElementById("shareButton")
const resetButton   = document.getElementById("resetButton")
const params = new URLSearchParams(document.location.search)
const safeStr = params.get("t")
const isEdit = params.get("p")
const rawStr = base64ToUtf8(urlToBase64(safeStr))

window.onload = ()=>{
    const tmpHeight = mdContent.contentWindow.document.body.scrollHeight
    if(tmpHeight > 1000){
        mdContent.height = 1000
    } else if (tmpHeight < 300) {
        mdContent.height = 300
    } else {
        mdContent.height = mdContent.contentWindow.document.body.scrollHeight;
    }
}

const setWordCount = () => {
    const len = editArea.value.length
    wordCount.innerText = "文字数: " + len
    if(editArea.value) {
        previewButton.disabled = false
        shareButton.disabled = false
    }
    else {
        previewButton.disabled = true
        shareButton.disabled = true
    }
}

const makeParams = preview => {
    const params = new URLSearchParams({
        "t": base64ToUrl(utf8ToBase64(editArea.value))
    })
    if(preview) params.set("p", "true")
    return "?" + params.toString()
}

editArea.addEventListener("input", setWordCount)

previewButton.addEventListener("click", () => {
    location.assign(location.origin + location.pathname + makeParams(true))
})

shareButton.addEventListener("click", () => {
    navigator.share({
        url: location.origin + location.pathname + makeParams(false)
    })
})

resetButton.addEventListener("click", () => {
    location.assign(location.origin + location.pathname)
})

if(safeStr) {
    mdContent.src="iframe.html"+document.location.search
    if(isEdit) {
        editArea.value = rawStr
    }
}
else {
    details.style.display = "none"
}
setWordCount()
hljs.highlightAll()
