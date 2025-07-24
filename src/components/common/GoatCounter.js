import { useEffect } from 'react';

export default function GoatCounter() {
  useEffect(() => {
    if (document.getElementById('goatcounter-script')) return;
    const script = document.createElement('script');
    script.id = 'goatcounter-script';
    script.setAttribute('data-goatcounter', 'https://lollo176ita.goatcounter.com/count');
    script.async = true;
    script.src = '//gc.zgo.at/count.js';
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);
  return null;
}
