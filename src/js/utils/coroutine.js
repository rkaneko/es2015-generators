export default function coroutine(generatorFunction) {
  return ((...args) => {
    const generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  });
}
