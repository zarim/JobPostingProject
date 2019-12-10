
// this function provides a prototype for the test cases
function candidate_profile() {
  // this allows an array of inputs for test cases
  return Array.prototype.slice.call(arguments);
}

// describes the suite of test cases enumerated by the "it" functions
describe('candidate_login()', function() {
  // tests is a list of test arguments
  // the cases in this list are described
  // in more detail in the unit test readme
  var tests = [
    {args: ["lhampto4@scmail.spelman.edu", "8885556969", "Atlanta, GA", "Doctorate", "www.linkedin.com/in/lelia-hampton", true], expected: ["lhampto4@scmail.spelman.edu", "8885556969", "Atlanta, GA", "Doctorate", "www.linkedin.com/in/lelia-hampton", true]},

    {args: ["zmcfadde@scmail.spelman.edu", "9198506909", "Durham, NC", "Doctorate", true], expected: ["zmcfadde@scmail.spelman.edu", "9198506909", "Durham, NC", "Doctorate", true]},

    {args: ["jlangham@scmail.spelman.edu", "6178092020", "Boston, MA", "Doctorate", true], expected: ["jlangham@scmail.spelman.edu", "6178092020", "Boston, MA", "Doctorate", true]},

    {args: ["uegwim@scmail.spelman.edu", "2021881881", "Washington, D.C.", "Master's"], expected: ["uegwim@scmail.spelman.edu", "2021881881", "Washington, D.C.", "Master's", true]},

    {args: ["mruff@scmail.spelman.edu", "4698045670", "Fort Worth, TX", "Doctorate", true], expected: ["mruff@scmail.spelman.edu", "4698045670", "Fort Worth, TX", "Doctorate", true]},

    {args: ["leliawashere@gmail", "1998", "leliahampton.github.io", true], expected: ["leliawashere@gmail.com", "1998", "leliahampton.github.io", true]},

    {args: ["zarirules@gmail.com", "9198898817",  false], expected: ["zarirules@gmail.com", "9198898817", true]},

    {args: ["somebodypleasestopjaida", "6172298080", ["NSBE", "ACM", "IEEE"], true], expected: ["somebodypleasestopjaida", "6172298080", ["NSBE", "ACM", "IEEE"], true]},

    {args: ["leliawashere@gmail.com", "1998891777", "leliahampton.github.io", true], expected: ["leliawashere@gmail.com", "1998891777", "leliahampton.github.io", true]}
  ];

  // this goes through each argument in the tests lists and 
  // tests whether the expected value matches the test argument
  tests.forEach(function(test) {
    it('assigns args', function() {
      var res = candidate_login.apply(null, test.args); // assigns res to test arguments
      assert.equal(res, test.expected); // returns true if matches, returns false otherwise
    });
  });
});