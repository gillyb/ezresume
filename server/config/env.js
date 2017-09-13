const givenEnv = process.env['ENV'];

if (givenEnv && ['dev', 'prod'].indexOf(givenEnv.toLowerCase()) !== -1) {
    console.log('\nGiven env : ' + givenEnv.toLowerCase() + '\n');
    module.exports = givenEnv.toLowerCase();
    return;
}

console.log('\nNo (or invalid) environment given, defaulting to \'dev\'\n');

module.exports = 'dev';