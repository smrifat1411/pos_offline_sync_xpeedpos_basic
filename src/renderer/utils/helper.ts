export const filterProductsNotInLocals = (
  remoteProducts: any[],
  LocalProductNames: any[]
) => {
  const susPecious = remoteProducts.filter((product: any) => {
    return !LocalProductNames.includes(product.name);
  });
  const trimmedSuspecious = susPecious.map((product: any) => {
    const { _id, __v, ...trimmedProduct } = product;
    return trimmedProduct;
  });

  // console.log(trimmedSuspecious);

  return trimmedSuspecious;
};

export const filterProductsNotInApi = (
  localProducts: any[],
  remoteProducts: any[]
) => {
  const susPecious = localProducts.filter(
    (localItem: any) =>
      !remoteProducts.some(
        (remoteItem: any) => remoteItem.name === localItem._data.name
      )
  );
  const modifiedSuspecious = susPecious.map((product: any) => {
    const { name, category, description, price } = product._data;

    return {
      name,
      category,
      description,
      price,
    };
  });

  return modifiedSuspecious;
};

let counter = 0;
let initialTimestamp = Date.now();
export const generateSequentialId = () => {
  const currentTime = Date.now();
  const uniqueId = Math.floor(Math.random() * 10000);
  if (currentTime > initialTimestamp) {
    counter = 0; // Reset counter if a new millisecond is reached
    initialTimestamp = currentTime;
  }
  return `${initialTimestamp}${counter++}${uniqueId}`;
};


// export const orderPostModifier
