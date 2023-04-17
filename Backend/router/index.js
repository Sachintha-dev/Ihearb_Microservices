const express = require(`express`);
const router = express.Router();
const axios = require(`axios`);
const fs = require("fs");
const loadbalancer = require("../util/loadbalancer");
const app = express();

const registry = require(`./registry.json`);
const { error, log } = require("console");

app.use(express.json());

router.post("/enable/:apiName", (req, res) => {
  const apiName = req.params.apiName;
  const requestBody = req.body;
  const instances = registry.services[apiName].instances;
  console.log(instances);
  const index = instances.findIndex((srv) => {
    return srv.url === requestBody.url;
  });
  if (index == -1) {
    res.send({
      status: "error",
      message:
        "Could not find " + requestBody.url + " " + "for service " + apiName,
    });
  } else {
    instances[index].enabled = requestBody.enabled;
    fs.writeFile(
      `./router/registry.json`,
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send(
            "Could not enable/disable" +
              requestBody.url +
              "" +
              "for service" +
              apiName +
              "\n" +
              error
          );
        } else {
          res.send(
            "Successfull enable/disabled " +
              requestBody.url +
              "" +
              "for service" +
              apiName
          );
        }
      }
    );
  }
});

router.all(`/:apiName/:path`, (req, res) => {
  const service = registry.services[req.params.apiName];
  if (service) {
    if (!service.loadBalanaceStrtegy) {
      service.loadBalanaceStrtegy = "ROUND_ROBIN";
      fs.writeFile(
        `./router/registry.json`,
        JSON.stringify(registry),
        (error) => {
          if (error) {
            res.send("Couldn't write a load balance stretagy" + error);
          }
        }
      );
    }
    const newIndex = loadbalancer[service.loadBalanaceStrtegy](service);
    const url = service.instances[newIndex].url;
    console.log(`index ${newIndex}`);
    console.log(url);
    console.log(url + req.params.path);
    axios({
      method: req.method,
      url: url + req.params.path,
      headers: req.headers,
      data: req.body,
    })
      .then((response) => {
        res.send(response.data);
        console.log("Hello");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.send(`API does not exist`);
  }
});

function registerApi(req, res) {
  console.log(req.body);
  const registerInfo = req.body;
  registerInfo.url =
    registerInfo.protocol +
    "://" +
    registerInfo.host +
    ":" +
    registerInfo.port +
    "/";
  if (apiAlreadyExists(registerInfo)) {
    res.send(
      `Configuration already exists for ${registerInfo.apiName} @ ${registerInfo.url}`
    );
    return;
  } else {
    if (!registry.services[registerInfo.serviceName]) {
      registry.services[registerInfo.serviceName] = {
        index: 0,
        instances: [],
      };
    }
    registry.services[registerInfo.serviceName].instances.push({
      ...registerInfo,
    });
    fs.writeFile(
      `./router/registry.json`,
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send("Couldn't register " + registerInfo.apiName + "\n" + error);
        } else {
          res.send("Successfully registered " + registerInfo.apiName + "\n");
        }
      }
    );
  }
}

router.post(`/register`, (req, res) => {
  const registerInfo = req.body;
  if (servicesAlreadyExist(registerInfo)) {
    registerApi(req, res);
  } else {
    registry.services[registerInfo.serviceName] = { index: 0, instances: [] };
    fs.writeFile(
      `./router/registry.json`,
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send("Couldn't register" + registerInfo.apiName + "\n" + error);
        } else {
          res.send("Successfull registerd " + registerInfo.apiName + "\n");
        }
      }
    );
    registerApi(req, res);
  }
});

router.post(`/unregister`, (req, res) => {
  const registerInfo = req.body;

  if (apiAlreadyExists(registerInfo)) {
    const index = registry.services[registerInfo.apiName].instances.findIndex(
      (instance) => {
        return registerInfo.url === instance.url;
      }
    );
    registry.services[registerInfo.apiName].instances.splice(index, 1);
    fs.writeFile(
      `./router/registry.json`,
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send("Couldn't Unregister" + registerInfo.apiName + "\n" + error);
        } else {
          res.send("Successfull Unregisterd " + registerInfo.apiName + "\n");
        }
      }
    );
  } else {
    `Configuration doesn't exists for ${registerInfo.apiName} @ ${registerInfo.url}`;
  }
});

const apiAlreadyExists = (registerInfo) => {
  const instances = registry.services[registerInfo.serviceName].instances;
  const existingInstance = instances.find(
    (instance) => instance.url === registerInfo.url
  );
  return !!existingInstance;
};

const servicesAlreadyExist = (registerInfo) => {
  if (registry.services.hasOwnProperty(registerInfo.serviceName)) {
    return true;
  }
  return false;
};

// Export the router object so it can be used by other parts of the application
module.exports = router;
