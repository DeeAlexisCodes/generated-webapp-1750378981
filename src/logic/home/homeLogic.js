export async function getLogoData() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    icon: '+',
    text: 'FrontrowMD'
  };
}

export async function getHeroSectionContent() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    title: 'AI-Powered <span class="highlight">Doctor-Vetted</span> Review Generation',
    subtitle: 'Transform product pages into authentic, clinically-informed reviews that build trust and drive conversions.',
    ctaText: 'Get Started',
    ctaLink: 'product_input.html'
  };
}

export function getHeroImageUrl() {
  return 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
}

export async function getHeroImageAltText() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return 'A friendly, professional doctor in a modern setting';
}

export async function getEvidenceBasedBubbleText() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return 'Evidence-Based';
}

export async function getFooterData() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    copyright: '&copy; 2024 FrontrowMD. All rights reserved.'
  };
}