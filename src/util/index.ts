export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(imageUrl: string) {
  const cloudinaryBase = "https://res.cloudinary.com";
  if (imageUrl.startsWith(cloudinaryBase)) {
    return imageUrl;
  } else {
    return `/products/${imageUrl}.jpg`;
  }
}
