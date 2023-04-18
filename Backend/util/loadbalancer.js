const loadbalancer = {};
/*
This function is part of a load balancing system that chooses which instance 
of a service should handle a request. In the ROUND_ROBIN strategy, 
the load balancer cycles through the available instances in a circular order, 
returning the index of the next available instance to handle the request.

The service argument is an object containing information about the service, 
including the instances available to handle requests. 
The service.index property keeps track of the last instance 
that was used to handle a request.

The function first increments the service.index property, 
and if it exceeds the number of available instances, 
it resets to 0 to cycle back to the first instance. 
It then calls the loadbalancer.isEnabled function with 
the updated index and the ROUND_ROBIN strategy to determine 
if the chosen instance is currently enabled to handle requests. 
If the instance is disabled, the function recursively 
calls itself with the next index until an enabled instance is found.

*/
loadbalancer.ROUND_ROBIN = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return loadbalancer.isEnabled(service, newIndex, loadbalancer.ROUND_ROBIN);
};
/*
This function checks if the instance at the given index of a service is enabled. 
If it is enabled, it returns the index. If it is not enabled, 
it recursively calls the given load balance strategy function with a new index 
(incremented by one) until it finds an enabled instance to return its index. 
If it reaches the end of the instances list without finding an enabled instance, 
it returns the first instance index (index 0) to use it instead. 
This function helps in load balancing by ensuring that only enabled instances are selected to handle requests.
*/
loadbalancer.isEnabled = (service, index, loadbalanceStrategy) => {
  if (service.instances[index].enabled) {
    return index;
  } else {
    const newIndex = ++index >= service.instances.length ? 0 : index;
    return loadbalanceStrategy(service, newIndex);
  }
};

module.exports = loadbalancer;
