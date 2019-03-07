module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
    },
    "plugins": ['react', 'jsx-a11y', 'import'],
    "rules": {
        "react/prop-types": 0,
        "no-console": 0,
        "no-unused-vars": 0,
        "class-methods-use-this": 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
}
};
