export default function chain(...generatorFuncs) {
  if (generatorFuncs.length < 1) {
    throw new Error('Need at least 1 argument');
  }
  let generatorObject = generatorFuncs[generatorFuncs.length - 1]();
  generatorObject.next(); // generator is now ready for input
  for (let i = generatorFuncs.length - 2; i >= 0; i--) {
    const generatorFunc = generatorFuncs[i];
    generatorObject = generatorFunc(generatorObject);
    // Start the generator
    generatorObject.next();
  }
  return generatorObject;
}
