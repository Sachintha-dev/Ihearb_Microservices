const express = require(`express`);
const router = express.Router();
const axios = require(`axios`);
const fs = require("fs");
const loadbalancer = require("../util/loadbalancer");
const app = express();
const registry = require(`./registry.json`);
const { error, log } = require("console");

app.use(express.json());
/*
This function is a route handler that handles a POST request to enable or disable 
an instance of a microservice in the registry. 
It expects the name of the microservice to be passed in as a parameter in the URL,
and the URL of the instance to be enabled or disabled to be passed in the request body.

The function first retrieves the instances of the microservice from the registry, 
and then finds the index of the instance that matches the URL passed in the request body.
If it cannot find the instance, it returns an error message indicating that 
it could not find the instance for the specified microservice.

If it does find the instance, it sets the enabled property of t
hat instance to the value passed in the request body, and then 
writes the updated registry back to the registry.json file. 
If there is an error while writing to the file, it returns an
error message indicating that it could not enable/disable the 
instance for the specified microservice. If the write is successful, 
it returns a success message indicating that the instance has been 
successfully enabled or disabled for the specified microservice.
*/
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
/*
This function is a request handler for all HTTP methods and paths 
that match the specified pattern (/:apiName/:path or /:apiName/:path/:id).
It retrieves the service information from the registry using the apiName 
parameter in the request URL.

If the service is found, it checks if the loadBalanaceStrtegy property is set.
If it's not set, it sets the default value to "ROUND_ROBIN" and updates the 
registry file.

Next, it uses the load balancing strategy specified in the service information
to select one of the instances of the service, and constructs the target URL 
for the request using the selected instance's URL and the path and id parameters 
from the request URL.

Then, it makes the actual HTTP request to the selected instance using the 
axios library, passing along the HTTP method, URL, headers, and body from the original request. 
If the request is successful, it sends the response back to the client. 
If the request fails, it logs the error.

If the specified apiName does not exist in the registry, 
it sends a response back to the client indicating that the
API does not exist.
*/

router.all([`/:apiName/:path`, `/:apiName/:path/:id`], (req, res) => {
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
    console.log(req.headers.authorization);
    console.log(req.params.path);
    const newurl =
      req.params.id !== undefined
        ? url + req.params.path + "?id=" + req.params.id
        : url + req.params.path;
    console.log(newurl);
    const headers = req.headers;
    if (headers.authorization) {
      const token = headers.authorization.split(" ")[1];
      headers.Authorization = `Bearer ${token}`;
    }
    axios({
      method: req.method,
      url: newurl,
      headers: headers,
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

/*
This registerApi function is responsible for registering a new API with the API Gateway. 
When a microservice comes online, it sends a registration request to the API Gateway. 
This request is received by the registerApi function, which extracts the relevant information 
from the request body, such as the service name, API name, protocol, host, and port.

The function then checks whether the API has already been registered in the registry file, 
which is a JSON file that stores information about all the registered APIs. If the API already exists,
the function sends a response indicating that the configuration already exists for that API. 
If the API does not exist, the function creates a new entry in the registry file for the service, 
adds the instance details to the corresponding service, and saves the updated registry file to disk.

If there is an error while writing to the registry file, the function sends a response indicating that the
registration failed along with the error message. If the registry file is updated successfully, 
the function sends a response indicating that the registration was successful.

In summary, the registerApi function is responsible for handling registration requests from microservices,
updating the registry file with the details of the newly registered APIs,
and sending appropriate responses to indicate whether the registration was successful or not.
*/
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

/*
This function handles POST requests to register a new microservice with the API gateway.
When a microservice sends a registration request with its service details, the function checks
if a service with the same name already exists in the registry.
if it does, the function calls the registerApi function to add the new instance of the service to the registry. 
If the service does not already exist, the function creates a new service entry in the registry and 
then calls the registerApi function to add the new instance of the service to the registry.

The registerApi function adds the new service instance details to the registry and saves the updated registry to a JSON file. 
If there is an error while saving the registry to the file, the function returns an error response to the client. 
Otherwise, the function returns a success response to the client.
*/

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
          res.send("Successfully registered " + registerInfo.apiName + "\n");
        }
      }
    );
  }
});

/*
This code defines a function to unregister a service from the registry. The function takes a POST request with 
information about the service to unregister, including the API name and the service URL.

The function first checks if the service is already registered by calling the apiAlreadyExists function.
If the service is registered, it finds the index of the service instance to remove from the instances array
for that API in the registry object. It then removes the instance from the array and writes the updated 
registry object to the registry.json file. Finally, it sends a response to indicate whether 
the unregistering was successful or not.

The apiAlreadyExists function is a helper function that takes the registerInfo object and checks if an instance 
with the same URL is already registered for that API. If it finds a matching instance, 
it returns true, otherwise it returns false.
*/

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
/*
This is a helper function called apiAlreadyExists that checks
whether a given microservice API already exists in the registry
object by looking through the array of instances for that API.

The function takes in registerInfo object as a parameter, 
which contains information about the microservice being registered,
including its serviceName and url.

It then looks for the serviceName property in the registry.
services object to get the array of instances for that service, 
and checks if any of those instances have a url property that 
matches the url property of the registerInfo object.

If an existing instance with a matching url property is found,
 the function returns true. Otherwise, it returns false.
*/
const apiAlreadyExists = (registerInfo) => {
  const instances = registry.services[registerInfo.serviceName].instances;
  const existingInstance = instances.find(
    (instance) => instance.url === registerInfo.url
  );
  return !!existingInstance;
};
/*
This servicesAlreadyExist function checks whether a service with the given
serviceName already exists in the registry. 
It does this by first checking if the registry object has a property with the key serviceName.
If it does, it returns true, indicating that the service already exists. Otherwise, 
it returns false, indicating that the service does not exist in the registry.
*/
const servicesAlreadyExist = (registerInfo) => {
  if (registry.services.hasOwnProperty(registerInfo.serviceName)) {
    return true;
  }

  return false;
};

// Export the router object so it can be used by other parts of the application
module.exports = router;
