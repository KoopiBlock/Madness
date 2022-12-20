export const formatVariantName = (variantName) => {
    const [, name] = variantName.split(" - ");
  
    return name ? name : "One style";
  };