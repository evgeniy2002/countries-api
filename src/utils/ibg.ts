export const ibg = () => {
  let ibg = document.querySelectorAll<HTMLElement>('.ibg');
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector<HTMLElement>('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector<HTMLElement>('img')?.getAttribute('src') + ')';
    }
  }
};
