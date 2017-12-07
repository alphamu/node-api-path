import ApiPath from '../src/ApiPathFetch';

describe('Main Library Functions', function () {
  let svcPath = new ApiPath({
    test_relative_path: 'verify-email/{0}/{1}',
    test_absolute_path: '/verify-email/{0}/{1}',
    test_full_url: 'http://example.com/verify-email/{0}/{1}',
    test_api_call: 'https://jsonplaceholder.typicode.com/posts/{0}',
    test_api_call_post: 'https://jsonplaceholder.typicode.com/posts'
  }, "http://127.0.0.1:8080/my/api")

  it("Check relative path", function () {
    let path = svcPath.test_relative_path
    expect(svcPath.test_relative_path).toEqual("http://127.0.0.1:8080/my/api/verify-email/{0}/{1}");
    //Test chained params call
    path = path.params("hello", "world")
    expect(path).toEqual("http://127.0.0.1:8080/my/api/verify-email/hello/world");
  });

  it("Check absolute path", function () {
    let path = svcPath.test_absolute_path
    expect(path).toEqual("http://127.0.0.1:8080/verify-email/{0}/{1}");
    //Test chained params call
    path = path.params("hello", "world")
    expect(path).toEqual("http://127.0.0.1:8080/verify-email/hello/world");
  });

  it("Check full url", function () {
    let path = svcPath.test_full_url
    expect(svcPath.test_full_url).toEqual("http://example.com/verify-email/{0}/{1}");
    //Test static params call
    path = ApiPath.params(path, "hello", "world")
    expect(path).toEqual("http://example.com/verify-email/hello/world");
  });

  it("Check chained full url", function () {
    let path = svcPath.test_full_url.params("hello", "world")
    expect(path).toEqual("http://example.com/verify-email/hello/world");
  });

  it("Check async url call 1", function (done) {
    svcPath.test_api_call.params("1").fetch().then(response => {
      expect(response.status).toEqual(200);
      done()
    }).catch(error => {
      expect(error).toEqual(false);
      done()
    });
  })

  it("Check async url call 2", function (done) {
    svcPath.fetch(ApiPath.params(svcPath.test_api_call, "2")).then(response => {
      expect(response.status).toEqual(200);
      done()
    }).catch(error => {
      expect(error).toEqual(false);
      done()
    });
  })

  it("Change default options", function () {
    expect(svcPath.getDefaultOptions()).toEqual({
      method: 'GET',
      body: null,
      headers: {Accept: "application/json", 'Content-Type': 'application/json'}
    })
    svcPath.setDefaultOptions({method: "POST"})
    expect(svcPath.getDefaultOptions()).toEqual({
      method: 'POST',
      body: null,
      headers: {Accept: "application/json", 'Content-Type': 'application/json'}
    })
  })

  it("Check async url chained post", function (done) {
    expect(svcPath.getDefaultOptions()).toEqual({
      method: 'POST',
      body: null,
      headers: {Accept: "application/json", 'Content-Type': 'application/json'}
    })
    svcPath.test_api_call_post.fetch().then(response => {
      expect(response.status).toEqual(200);
      done()
    }).catch(error => {
      expect(error).toEqual(false);
      done()
    });
  })

  it("Check async url post", function (done) {
    expect(svcPath.getDefaultOptions()).toEqual({
      method: 'POST',
      body: null,
      headers: {Accept: "application/json", 'Content-Type': 'application/json'}
    })

    svcPath.fetch(svcPath.test_api_call_post).then(response => {
      expect(response.status).toEqual(201);
      done()
    }).catch(error => {
      expect(error).toEqual(false);
      done()
    });
  })
});


