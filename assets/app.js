// Ficha que monta a mensagem do WhatsApp, parallax leve da foto e botão fixo no celular.
(() => {
  document.documentElement.classList.add('js');
  const WHATSAPP = 'https://wa.me/5562993117395?text=';
  const reduz = matchMedia('(prefers-reduced-motion: reduce)');

  // Mensagem montada com o que a pessoa respondeu; campos vazios ficam de fora.
  const ficha = document.getElementById('ficha');
  const previa = document.getElementById('previa');
  const enviar = document.getElementById('enviar');
  const montar = () => {
    const d = new FormData(ficha);
    const nome = String(d.get('nome') || '').trim();
    const incomoda = String(d.get('incomoda') || '').trim();
    const receio = String(d.get('receio') || '');
    const antes = String(d.get('antes') || '');
    const perguntas = d.getAll('perguntas').map(String);
    const linhas = [`Oi, Dra. Carolina! ${nome ? `Sou ${nome} e ` : ''}vim pelo site. Quero agendar uma avaliação.`];
    if (incomoda) linhas.push(`Gostaria de melhorar: ${incomoda}`);
    if (receio) linhas.push(`Meu maior receio: ${receio}.`);
    if (antes) linhas.push(`Já fiz procedimento estético: ${antes}.`);
    if (perguntas.length) linhas.push(`Quero entender: ${perguntas.join(', ')}.`);
    const texto = linhas.join('\n');
    previa.textContent = texto;
    enviar.href = WHATSAPP + encodeURIComponent(texto);
  };
  ficha.addEventListener('input', montar);
  ficha.addEventListener('change', montar);
  ficha.addEventListener('submit', (e) => e.preventDefault());
  montar();

  // Parallax: foto e marcações andam em velocidades diferentes.
  const camadas = [...document.querySelectorAll('[data-profundidade]')];
  let pedido = 0;
  const mover = () => {
    pedido = 0;
    if (reduz.matches || innerWidth < 860) return;
    for (const el of camadas) {
      const y = scrollY * Number(el.dataset.profundidade);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };
  addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(mover); }, { passive: true });

  // Botão fixo do celular aparece quando a abertura sai da tela.
  const flutuante = document.querySelector('.flutuante');
  new IntersectionObserver(([e]) => flutuante.classList.toggle('ativo', !e.isIntersecting))
    .observe(document.querySelector('.abertura .acoes'));
})();
