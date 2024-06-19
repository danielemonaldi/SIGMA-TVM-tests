const config = {
    // Indicates whether each individual test should be reported during the run.
    verbose: true,
    // HTML report config
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "outputPath": "Report/test-report.html",
            "pageTitle": "SIGMA - TVM Tests report",
            "includeFailureMsg": true
        }]
    ],
};
  
module.exports = config;