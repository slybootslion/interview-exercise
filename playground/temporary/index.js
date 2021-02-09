function http (url, body, callback, handleError, count) {
  return fetch(url, body)
    .then(callback)
    .catch(err => {
      if (count <= 0) handleError(err)
      return http(url, body, callback, handleError, --count)
    })
}

http('https://cyberpunk.slybootslion.com/sys/test', { method: 'post' }, res => res.json().then(console.log), console.err, 3)
