export const buildAmazonFr = (isbn13: string, isbn10?: string): string =>
  isbn10
    ? `https://www.amazon.fr/dp/${isbn10}`
    : `https://www.amazon.fr/s?k=${isbn13}&i=stripbooks`;

export const buildFnac = (isbn13: string): string =>
  `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${isbn13}&sft=1&sl=1`;

export const buildBnf = (isbn13: string): string =>
  `https://catalogue.bnf.fr/rechercher.do?motRecherche=${isbn13}&critereRecherche=0&nivRech=0&index=ISB`;

export const buildWorldCat = (isbn13: string): string =>
  `https://search.worldcat.org/search?q=bn:${isbn13}`;

export interface PurchaseLink {
  label: string;
  href: string;
}

export function purchaseLinksFor(isbn13: string, isbn10?: string): PurchaseLink[] {
  return [
    { label: 'Amazon',    href: buildAmazonFr(isbn13, isbn10) },
    { label: 'Fnac',      href: buildFnac(isbn13) },
    { label: 'BnF',       href: buildBnf(isbn13) },
    { label: 'WorldCat',  href: buildWorldCat(isbn13) },
  ];
}
