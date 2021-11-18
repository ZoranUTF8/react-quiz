using axios library that handled ajax request for data fetching.
Returnes promises

axios benefits:

Axios automatically converts the data to JSON, so you don’t have to.

One of the main selling points of Axios is its wide browser support. Even old browsers like IE11 can run Axios without any issue.

The simplicity of setting timeout in Axios is one of the reasons some developers prefer it to fetch(). In Axios, you can use the optional timeout property in the config object to set the number of milliseconds before the request is aborted. For example:

axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    // 4 seconds timeout
  data: {
    firstName: 'David',
    lastName: 'Pollock'
  }
})
.then(response => {/* handle the response */})
.catch(error => console.error('timeout exceeded'))

const response = await axios.get(url).catch((err) => console.log(err));






