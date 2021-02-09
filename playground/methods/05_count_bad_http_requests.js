function http (url, body, callback, handleError, count) {
  return fetch(url, body)
    .then(callback)
    .catch(err => {
      if (count <= 0) handleError(err)
      return http(url, body, callback, handleError, --count)
    })
}

http('https://www.explame.com', { method: 'post' }, res => res.json().then(console.log), console.err, 3)
