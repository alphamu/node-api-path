import ApiPath from '../src/ApiPath';

describe('Main Library Functions', function () {
  let svcPath = new ApiPath({
    test_relative_path: 'verify-email/{0}/{1}',
    test_absolute_path: '/verify-email?username={0}&email={1}',
    test_full_url: 'http://example.com/verify-email/{0}/{1}',
    test_api_call: 'https://jsonplaceholder.typicode.com/posts/{0}'
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
    expect(path).toEqual("http://127.0.0.1:8080/verify-email?username={0}&email={1}");
    //Test chained params call
    path = path.params("hello", "world")
    expect(path).toEqual("http://127.0.0.1:8080/verify-email?username=hello&email=world");
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
});


