var p = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
  .catch(error => console.log(error))
  .then(error => console.log(error))
