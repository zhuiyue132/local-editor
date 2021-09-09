export default function loadData(success) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `./theme.css?t=${+new Date()}`, true)

  xhr.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      success(this.response)
    }
  }
  xhr.onerror = function () {
    console.error(this.statusText)
  }
  xhr.send()
}
