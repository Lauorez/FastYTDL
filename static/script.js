function submit() {
    var url = document.getElementById("video_url").value
    var type = document.getElementById("type").value
    console.log(url)
    var body = {
        url: url,
        type: type
    }
    var headers = new Headers()
    headers.append("Content-Type", "application/json")
    var options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers
    }
    var request = new Request("/get_by_url", options)
    fetch(request).then(response => response.json()).then(json => {
        window.open("/download/" + json.filename)
    })
}