require("babel-register")({
    presets: ["es2015", "react"]
});

const router = require('./sitemap').default;
const Sitemap = require('react-router-sitemap').default;

const filterConfig = {
    isValid: false,
    rules: [
        /\*/,
    ],
};

const paramsConfig = {
    '/search/:name': [
        { name: ['United States', 'Italy', 'Spain', 'Iran', 'United Kingdom', 'France'] },
    ]
};

(
    new Sitemap(router)
        .filterPaths(filterConfig)
        .applyParams(paramsConfig)
        .build('https://mapvirus.com')
        .save('./sitemap.xml')
);