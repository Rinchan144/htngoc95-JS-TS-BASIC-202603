let rawProjectName = "   Neko CRM   ";
let rawEnvName = "   ";
let rawPassRate = "82";
let rawHasReport = "true";
let rawCriticalMessage = "   ";
let browserUsed = "chrome"; // "chrome", "firefox", "safari", "edge"

let projectName = rawProjectName.trim();
let envName = rawEnvName.trim() || "Development";
let passRate = Number(rawPassRate);
let hasReport = rawHasReport.trim().toLowerCase() === "true";
let hasCriticalBug;
if (rawCriticalMessage === null || rawCriticalMessage === undefined) {
  hasCriticalBug = false;
} else if (rawCriticalMessage.trim() === "") {
  hasCriticalBug = false;
} else {
  hasCriticalBug = true;
}

let grade;
if (passRate >= 95) {
  grade = "EXCELLENT";
} else if (passRate >= 80) {
  grade = "GOOD";
} else if (passRate >= 60) {
  grade = "NEEDS IMPROVEMENT";
} else {
  grade = "CRITICAL";
}

let engine;
switch (browserUsed) {
  case "chrome":
  case "edge":
    engine = "Chromium";
    break;
  case "firefox":
    engine = "Gecko";
    break;
  case "safari":
    engine = "WebKit";
    break;
  default:
    engine = "Unknown";
}
let reportMessage = hasReport
  ? "Có report"
  : "Chưa có report";

let isReadyToRelease;
if (passRate < 80) {
  isReadyToRelease = false;
} else if (hasCriticalBug) {
  isReadyToRelease = false;
} else if (!hasReport) {
  isReadyToRelease = false;
} else {
  isReadyToRelease = true;
} 
let passRateFormatted = passRate.toFixed(2) + "%";
console.log(`Project: ${projectName}
Environment: ${envName}
Browser: ${browserUsed}
Engine: ${engine}

Pass Rate: ${passRateFormatted}
Grade: ${grade}
Has Report: ${hasReport ? "Có Report" : "Không có Report"}
Critical Bug: ${hasCriticalBug ? "Có bug nghiêm trọng" : "Không có bug nghiêm trọng"}

Ready: ${isReadyToRelease ? "YES" : "NO"}`);