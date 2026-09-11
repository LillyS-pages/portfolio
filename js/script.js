/* ==========================================================================
   PORTFOLIO LILLY SCHATTNER – Verhalten
   Drei kleine Dinge, alle optional: Ohne JavaScript bleibt die Seite
   vollständig lesbar und bedienbar.

     1  Farbschema umschalten
     2  Abschnitte beim Scrollen einblenden
     3  Bildvorschau in der Projektliste
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1  FARBSCHEMA
     Der Anfangswert wird bereits im <head> jeder Seite gesetzt (siehe dort),
     damit beim Laden nicht kurz das falsche Schema aufblitzt. Hier hängt
     nur noch der Umschalter dran.
     ---------------------------------------------------------------------- */

  const knopf = document.querySelector('.theme-toggle');

  const zustandSetzen = () => {
    const dunkel = document.documentElement.dataset.theme === 'dark';
    if (knopf) knopf.setAttribute('aria-pressed', String(dunkel));
  };

  zustandSetzen();

  if (knopf) {
    knopf.addEventListener('click', () => {
      const neu =
        document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = neu;
      try {
        localStorage.setItem('theme', neu);
      } catch (e) {
        /* Privater Modus o. Ä. – dann gilt die Wahl nur für diese Seite. */
      }
      zustandSetzen();
    });
  }

  /* ------------------------------------------------------------------------
     2  EINBLENDEN BEIM SCROLLEN
     ---------------------------------------------------------------------- */

  const willBewegung = !window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches;
  const ziele = document.querySelectorAll('[data-reveal]');

  if (willBewegung && 'IntersectionObserver' in window) {
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((eintrag) => {
          if (eintrag.isIntersecting) {
            eintrag.target.classList.add('ist-sichtbar');
            beobachter.unobserve(eintrag.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    ziele.forEach((el) => beobachter.observe(el));
  } else {
    /* Kein IntersectionObserver oder Bewegung unerwünscht:
       alles sofort sichtbar machen, nichts bleibt versteckt. */
    ziele.forEach((el) => el.classList.add('ist-sichtbar'));
  }

  /* ------------------------------------------------------------------------
     3  BILDVORSCHAU IN DER PROJEKTLISTE
     Läuft nur dort, wo sie Sinn ergibt: echter Mauszeiger, großer
     Bildschirm, keine Reduced-Motion-Einstellung. Auf dem Handy steht das
     Bild ohnehin in der Liste.
     ---------------------------------------------------------------------- */

  const passt = window.matchMedia(
    '(min-width: 60rem) and (hover: hover) and (pointer: fine)'
  );
  const liste = document.querySelector('[data-projektliste]');

  if (liste && passt.matches && willBewegung) {
    let zielX = 0;
    let zielY = 0;
    let x = 0;
    let y = 0;
    let laeuft = false;
    let aktiv = null;

    const schleife = () => {
      /* Verzögertes Nachziehen wirkt weicher als 1:1-Folgen. */
      x += (zielX - x) * 0.14;
      y += (zielY - y) * 0.14;

      if (aktiv) {
        aktiv.style.setProperty('--x', x + 'px');
        aktiv.style.setProperty('--y', y + 'px');
      }

      if (Math.abs(zielX - x) > 0.4 || Math.abs(zielY - y) > 0.4) {
        requestAnimationFrame(schleife);
      } else {
        laeuft = false;
      }
    };

    liste.addEventListener('pointermove', (ereignis) => {
      const zeile = ereignis.target.closest('.zeile');
      aktiv = zeile ? zeile.querySelector('.zeile__bild') : null;

      zielX = Math.min(ereignis.clientX + 28, window.innerWidth - 380);
      zielY = Math.max(
        16,
        Math.min(ereignis.clientY - 130, window.innerHeight - 300)
      );

      if (!laeuft) {
        laeuft = true;
        requestAnimationFrame(schleife);
      }
    });
  }
})();
