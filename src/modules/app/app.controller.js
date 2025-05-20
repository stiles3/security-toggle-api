let assetState = {
  secured: false,
  lastUpdated: null,
};

const simulateError = () => {
  const random = Math.random();
  if (random < 0.2) return "timeout";
  if (random < 0.4) return "unauthorized";
  return null;
};

// get status
exports.status = async (req, res, next) => {
  const errorType = simulateError();

  if (errorType === "timeout") {
    setTimeout(() => res.status(504).send({ error: "Request timeout" }), 3000);
    return;
  }

  if (errorType === "unauthorized") {
    return res.status(401).send({ error: "Unauthorized access" });
  }

  res.json({
    secured: assetState.secured,
    lastUpdated: assetState.lastUpdated,
  });
};

//toggle status api
exports.toggleStatus = async (req, res, next) => {
  console.log("sd");
  const errorType = simulateError();

  // Random errors
  if (errorType === "timeout") {
    setTimeout(() => res.status(504).send({ error: "Request timeout" }), 3000);
    return;
  }

  if (errorType === "unauthorized") {
    return res.status(401).send({ error: "Unauthorized access" });
  }

  // Success case
  assetState.secured = !assetState.secured;
  assetState.lastUpdated = new Date().toISOString();

  res.json({
    secured: assetState.secured,
    lastUpdated: assetState.lastUpdated,
    message: `Asset is now ${assetState.secured ? "secured" : "unsecured"}`,
  });
};
