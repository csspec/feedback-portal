(function() {
    var fragment = window.location.hash.slice(1);
    var tosend = {
        hash: fragment
    };
    var httpRequest;
    makeRequest('/check_token', JSON.stringify(tosend));
    console.log("Checking validity of token " + JSON.stringify(tosend));

    function makeRequest(url, data) {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log("unable to make request");
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(data);
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                window.location = JSON.parse(httpRequest.responseText).redirect_uri;
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
})();
