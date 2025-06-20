export async function getHeaderData() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    logoName: "FrontrowMD",
    logoIcon: "+",
    homeLink: "/"
  };
}

export async function getInputSectionData() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    title: "Start a New Review Generation",
    subtitle: "Enter a product page URL to begin the analysis and review creation process.",
    formAction: "processing.html",
    inputPlaceholder: "https://www.example.com/product/item-123",
    buttonText: "Generate Reviews"
  };
}

export async function getRecentProducts() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    {
      title: "Vitamin C Serum",
      urlDisplay: "sephora.com/product/...",
      image: getProductImage1Url(),
      linkHref: "#",
      altText: "Vitamin C Serum"
    },
    {
      title: "Daily Moisturizer SPF 30",
      urlDisplay: "ultabeauty.com/product/...",
      image: getProductImage2Url(),
      linkHref: "#",
      altText: "Daily Moisturizer SPF 30"
    },
    {
      title: "Retinol Night Cream",
      urlDisplay: "amazon.com/product/...",
      image: getProductImage3Url(),
      linkHref: "#",
      altText: "Retinol Night Cream"
    }
  ];
}

export function getProductImage1Url() {
  return "https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=600";
}

export function getProductImage2Url() {
  return "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=600";
}

export function getProductImage3Url() {
  return "https://images.pexels.com/photos/7262911/pexels-photo-7262911.jpeg?auto=compress&cs=tinysrgb&w=600";
}

export async function getFooterData() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    copyrightText: "© 2024 FrontrowMD. All rights reserved."
  };
}