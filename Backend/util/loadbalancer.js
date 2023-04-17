const loadbalancer = {};

loadbalancer.ROUND_ROBIN = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return loadbalancer.isEnabled(service, newIndex, loadbalancer.ROUND_ROBIN);
};

loadbalancer.isEnabled = (service, index, loadbalanceStrategy) => {
  if (service.instances[index].enabled) {
    return index;
  } else {
    const newIndex = ++index >= service.instances.length ? 0 : index;
    return loadbalanceStrategy(service, newIndex);
  }
};

module.exports = loadbalancer;
