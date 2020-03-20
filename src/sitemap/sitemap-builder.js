require('babel-register');

const router = require('./sitemap').default;
const Sitemap = require('../').default;

const filterConfig = {
    isValid: false,
    rules: [
        /\*/,
    ],
};

const paramsConfig = {
    '/search/:name': [
        { projectName: ['United States', 'Italy', 'Spain', 'Iran', 'United Kingdom', 'France'] },
    ]
};

(
    new Sitemap(router)
        .filterPaths(filterConfig)
        .applyParams(paramsConfig)
        .build('https://mapvirus.com')
        .save('./sitemap.xml')
);