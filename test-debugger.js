let total = 0;

function afterloop(total) {
    console.log("total =", total);
}

function debugManager() {
    for (let index = 0; index < 100; index++) {
        console.log("test case", index);
        total += index;
    }
    afterloop(total);
}

debugManager();

// A function to simulate saving candidate data
function saveCandidateData(candidate) {
    console.log("saveCandidatedata 1", candidate);
    if (candidate.Fullname) {
        console.log("saveCandidatedata 1.1 name is valid.", candidate.Fullname);
    } else {
        console.log("saveCandidatedata 1.2 name is invalid.");
    }
};

saveCandidateData({});

function validateCandidate(candidate) { };

function doSaveCandidate(candidate) { };

function afterSaveCandidate() { };