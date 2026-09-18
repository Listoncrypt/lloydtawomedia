export const SITE = {
  brand: 'LLOYD TAWO',
  brandSuffix: 'FILMS',
  location: '',
  role: 'DIRECTOR OF PHOTOGRAPHY',

  contact: {
    email: '',
    phone: '',
    instagram: 'lloydtawo',
    linkedin: 'https://www.linkedin.com/in/lloyd-tawo-576b8118a/',
  },
};

export const HAS_DIRECT_CONTACT = Boolean(
  SITE.contact.email ||
    SITE.contact.phone ||
    SITE.contact.instagram ||
    SITE.contact.linkedin,
);

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
