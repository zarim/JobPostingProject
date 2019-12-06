// this function provides a prototype for the test cases
function signup() {
  // this allows an array of inputs for test cases  
  return Array.prototype.slice.call(arguments);
}

// describes the suite of test cases enumerated by the "it" functions
describe('signup()', function() {
  // tests is a list of test arguments
  // the cases in this list are described
  // in more detail in the unit test readme
  var tests = [
    {args: ["lhampto4@scmail.spelman.edu", "glass1"], expected: ["lhampto4@scmail.spelman.edu", "glass1"]},
    {args: ["zmcfadde@scmail.spelman.edu", "glass2"], expected: ["zmcfadde@scmail.spelman.edu", "glass2"]},
    {args: ["jlangham@scmail.spelman.edu", "glass3"], expected: ["jlangham@scmail.spelman.edu", "glass3"]},
    {args: ["uegwim@scmail.spelman.edu", "glass4"], expected: ["uegwim@scmail.spelman.edu", "glass4"]},
    {args: ["mruff@scmail.spelman.edu", "glass5"], expected: ["mruff@scmail.spelman.edu", "glass5"]},
    {args: ["leliawashere", "1998"], expected: ["", ""]},
    {args: ["zarirules", 2000], expected: ["", 0]},
    {args: ["somebodypleasestopjaida", 1998], expected: ["", 0]},
  ];

  // this goes through each argument in the tests lists and 
  // tests whether the expected value matches the test argument
  tests.forEach(function(test) {
    it('correctly assigns args', function() {
      var res = signup.apply(null, test.args); // assigns res to test arguments
      assert.equal(res, test.expected); // returns true if matches, returns false otherwise
    });
  });
});