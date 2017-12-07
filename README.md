# node-api-path
Simple module to organise your api paths and add networking to your node apps.

## Installation

`npm install --save node-api-path`

## Usage

In a node class where you want to configure your paths, simply import `ApiPathFetch` and initialise it as shown.
`ApiPathFetch` uses [`isomorphic fetch`](https://github.com/matthew-andrews/isomorphic-fetch) to make api calls. If you want to use your own networking library, 
simply import `ApiPath` instead of `ApiPathFetch`. `ApiPath` will build full URL's from your paths without 
providing networking. 
Passing the host path (in the example below: `http://127.0.0.1:8080/my/api`) is optional, if you don't specify it 
the library will look for the host path in the `SVC_URL` environment variable (`process.env.SVC_URL`).

 ```js
//ES6 module syntax
  import ApiPathFetch from 'node-api-path/lib/ApiPathFetch';

  let path = new ApiPathFetch({
          test_relative_path: 'verify-email/{0}/{1}',
          test_absolute_path: '/verify-email?username={0}&email={1}',
          test_full_url: 'http://example.com/verify-email/{0}/{1}',
          test_api_call: 'https://jsonplaceholder.typicode.com/posts/{0}'
        }, "http://127.0.0.1:8080/my/api")

    //usage
    //get full url
    let url = svcPath.test_relative_path
    //returns http://127.0.0.1:8080/my/api/verify-email/{0}/{1}
    let url = svcPath.test_absolute_path
    //returns http://127.0.0.1:8080/verify-email?username={0}&email={1}
    
    //get full url with params filled in
    let url = svcPath.test_relative_path.params("hello", "world")
    //returns http://127.0.0.1:8080/my/api/verify-email/hello/world
    let url = svcPath.test_absolute_path.params("hello", "world")
    //returns http://127.0.0.1:8080/verify-email?username=hello&email=world
    
    //or get full url with params filled in and fetch it (default is get) 
    svcPath.test_absolute_path.params("hello", "world").fetch().then(response => {
      //Success do something
    }).catch(error => {
        //error
      });
    
    //or if you don't want to chain and take advantage of being able to change
    //the default headers
    svcPath.setDefaultOptions({method:'POST'})
    let url = svcPath.test_absolute_path.params("hello", "world")
    svcPath.fetch(url, {body:"Hello World"}).then(response => {
          //success
        }).catch(error => {
          //error
        });
    
    //If you don't want to change the global options, you can pass them
    //to the fetch method
    svcPath.fetch(url, {method: 'POST', body:"Hello World"}).then(response => {
          //success
        }).catch(error => {
          //error
        });
```
`params(...parameters)` will encode your parameters. One less thing to worry about.

`fetch()` can also take in options that can be used to change from 'GET' to 'POST' or pass in a body or headers.
For more, take a look at the [`fetch` github page](https://github.com/github/fetch)

Alternatively, if you want to use your own networking library, you can still use `ApiPath` to 
maintain your paths.

`addPath(key, path)` takes in a key-value and maps the new key against the path after converting the supplied path to a full URL

`getApiHost()` for the above example, this would return `http://127.0.0.1:8080`

`getApiBase()` for the above example, this would return `http://127.0.0.1:8080/my/api`

```js
\\ES6 module syntax
  import ApiPath from 'node-api-path/lib/ApiPath';

  let path = new ApiPath({
          test_relative_path: 'verify-email/{0}/{1}',
          test_absolute_path: '/verify-email?username={0}&email={1}',
          test_full_url: 'http://example.com/verify-email/{0}/{1}',
          test_api_call: 'https://jsonplaceholder.typicode.com/posts/{0}'
        }, "http://127.0.0.1:8080/my/api")
    });

//usage
    //get full url
    let url = svcPath.test_api_call
    //get full url with params filled in
    let url = svcPath.test_api_call.params("hello", "world")
```

## Questions or suggestions?
Feel free to contact me on [Twitter](https://twitter.com/ali_muzaffar) or [open an issue](https://github.com/alphamu/node-api-path/issues/new).

