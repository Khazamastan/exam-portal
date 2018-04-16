var apiMapping = {
    "saveExampApiUrl" : "exam/save",
    "saveAnswer" : "exam/saveAnswer"
};

var HOST = "http://localhost:9009/";

const getapiMapping = function(apiName){
    return apiMapping[apiName]; 
};

export getapiMapping;