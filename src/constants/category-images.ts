export function getCategoryImage(name?: string, image?: string): string {
  if (image && typeof image === "string") {
    return image;
  }

  // Simple fallback; you can expand this to map specific names to images
  // using assets in /public (e.g., /categories/electronics.png)
  return "/file.svg";
}


