let selectedPentestType = ''; // Variável para armazenar o tipo de pentest selecionado

const createModal = () => {
    const modal = document.createElement("div");
    modal.id = "modalPentest";
    modal.classList.add('modal');
    modal.innerHTML = `
        <button type="button" class="btn-close" aria-label="Close"></button>
        <div class="option" id="blackBox">
            <h2>Black Box</h2>
            <i class="bi bi-eye-slash" style="font-size: 60px; color: #6c757d;"></i>
            <p>Descrição da abordagem Black Box para o tipo de pentest.</p>
        </div>
        <div class="option" id="greyBox">
            <h2>Grey Box</h2>
            <i class="bi bi-eye" style="font-size: 60px; color: #6c757d;"></i>
            <p>Descrição da abordagem Grey Box para o tipo de pentest.</p>
        </div>
        <div class="option" id="whiteBox">
            <h2>White Box</h2>
            <i class="bi bi-eye-fill" style="font-size: 60px; color: #6c757d;"></i>
            <p>Descrição da abordagem White Box para o tipo de pentest.</p>
        </div>
    `;

    // Adiciona o evento para fechar o modal
    const btnClose = modal.querySelector('.btn-close');
    btnClose.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll');
    });

    // Adiciona evento para fechar ao clicar no backdrop (área escura)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove('no-scroll');
        }
    });

    document.body.appendChild(modal);
};

const openMainModal = (pentestType) => {
    // Cria o modal se não existir
    if (!document.getElementById('modalPentest')) {
        createModal();
    }
    
    // Armazena o tipo de pentest
    selectedPentestType = pentestType;
    
    const modal = document.getElementById('modalPentest');
    modal.style.display = "flex";
    document.body.classList.add('no-scroll');
};

// Função para criar o modal detalhado
const createDetailedModal = (type, context) => {
  const modal = document.createElement("div");
  modal.id = "detailedModal";
  modal.classList.add('modal');
  modal.innerHTML = 
      `<button type="button" class="btn-close" aria-label="Close"></button>
      <div class="boxText">
          <h2>${type} Pentest - ${context}</h2>
            <div class="hoverEffect">
              <div id="pentestVisual" class="pentest-visual"></div> <!-- Div para o texto visual -->
              <p id="pentestDescription"></p> <!-- Parágrafo para a descrição -->
            </div>
          <a href="https://api.whatsapp.com/send?phone=5511913739736" target="_blank" rel="noopener noreferrer" class="buttonBudget">Fazer orçamento profissional</a>
      </div>`;

  // Obtém a descrição e o texto visual com base no tipo e contexto
  const { text, visualText } = getPentestDescription(type, context);

  // Cria o elemento visual com texto estilizado
  const visualElement = document.createElement("div");
  visualElement.innerHTML = visualText;
  visualElement.classList.add("pentest-visual-content");

  // Insere o elemento visual dentro da div #pentestVisual
  const pentestVisualDiv = modal.querySelector("#pentestVisual");
  pentestVisualDiv.appendChild(visualElement);

  // Insere a descrição no parágrafo #pentestDescription
  const pentestDescription = modal.querySelector("#pentestDescription");
  pentestDescription.textContent = text;

  // Adiciona o evento para fechar o modal
  const btnClose = modal.querySelector('.btn-close');
  btnClose.addEventListener('click', () => {
      modal.style.display = "none";
      document.body.classList.remove('no-scroll');
  });

  // Adiciona evento para fechar ao clicar no backdrop (área escura)
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = "none";
          document.body.classList.remove('no-scroll');
      }
  });

  // Exibe o modal
  document.body.appendChild(modal);
};

// Função para abrir o modal
const openDetailedModal = (type, context) => {
  let modal = document.getElementById('detailedModal');

  // Cria o modal se ele não existir
  if (!modal) {
      createDetailedModal(type, context);
      modal = document.getElementById('detailedModal');
  }

  // Exibe o modal
  modal.style.display = "flex";
  document.body.classList.add('no-scroll'); // Evita rolagem

  // Atualiza o título
  const titleElement = modal.querySelector('h2');
  titleElement.textContent = `${type} Pentest - ${context}`;

  // Obtém e atualiza o texto visual e descrição correspondente
  const { text, visualText } = getPentestDescription(type, context);

  const visualContainer = modal.querySelector('#pentestVisual');
  visualContainer.innerHTML = ''; // Limpa o conteúdo anterior

  const visualElement = document.createElement('div');
  visualElement.innerHTML = visualText;
  visualElement.classList.add("pentest-visual-content");

  visualContainer.appendChild(visualElement);

  // Atualiza a descrição
  const descriptionElement = modal.querySelector("#pentestDescription");
  descriptionElement.textContent = text;
};

const getPentestDescription = (type, context) => {
  const descriptions = {
    black: {
      wireless: {
        text: "O Black Box Pentest Wireless envolve a realização de testes de segurança em redes sem fio, com o objetivo de identificar vulnerabilidades em protocolos de comunicação sem fio como Wi-Fi, Bluetooth e outras tecnologias de rede sem fio. Isso inclui a análise de falhas de configuração, interceptação de tráfego e testes de força bruta para avaliar a segurança de redes privadas. O especialista em segurança pode identificar vulnerabilidades de autenticação, criptografia fraca e problemas de segregação de redes, documentando potenciais riscos de acesso não autorizado a informações sensíveis ou possíveis interrupções de serviço.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-wifi"></i>
          </div>
          <div class="pentest-type-badge black-box">
            <span>BLACK BOX</span>
          </div>
          <h3>Wireless Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Wi-Fi Analysis</span>
            <span class="feature-tag">Bluetooth Testing</span>
            <span class="feature-tag">Traffic Interception</span>
            <span class="feature-tag">Brute Force</span>
          </div>
        `
      },
      mobile: {
        text: "O Black Pentest Mobile foca na segurança de aplicativos móveis, abordando falhas em plataformas como Android e iOS. A metodologia inclui a análise de vulnerabilidades em comunicação, armazenamento de dados sensíveis, falhas de autenticação e autorização, bem como ataques a APIs e outras interfaces do aplicativo móvel. Testes comuns incluem a exploração de vazamentos de dados, manipulação de armazenamento local inseguro, engenharia reversa de aplicativos para descobrir falhas de segurança e a tentativa de contornar mecanismos de proteção do dispositivo. O objetivo é identificar falhas que possam ser exploradas por atacantes para obter controle ou acesso a dados do usuário.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-phone"></i>
          </div>
          <div class="pentest-type-badge black-box">
            <span>BLACK BOX</span>
          </div>
          <h3>Mobile Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Android Testing</span>
            <span class="feature-tag">iOS Testing</span>
            <span class="feature-tag">API Security</span>
            <span class="feature-tag">Data Leaks</span>
          </div>
        `
      },
      web: {
        text: "O Black Pentest Web é voltado para a identificação de vulnerabilidades em sites e aplicativos web. O teste inclui a análise de falhas comuns como SQL Injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), falhas de autenticação e controle de sessão, além de exploração de configurações inseguras no servidor web e em APIs. O pentester pode realizar ataques de brute force em senhas, explorar falhas em formulários de entrada, e testar a segurança de serviços de backend. Este tipo de pentest visa descobrir como um atacante externo pode acessar dados sensíveis ou assumir o controle do sistema sem autorização.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-globe"></i>
          </div>
          <div class="pentest-type-badge black-box">
            <span>BLACK BOX</span>
          </div>
          <h3>Web Application Security</h3>
          <div class="pentest-features">
            <span class="feature-tag">SQL Injection</span>
            <span class="feature-tag">XSS Testing</span>
            <span class="feature-tag">CSRF Protection</span>
            <span class="feature-tag">Authentication</span>
          </div>
        `
      }
    },
    grey: {
      wireless: {
        text: "O Grey Pentest Wireless é uma abordagem menos invasiva e mais controlada para testar a segurança de redes sem fio. Este tipo de pentest é realizado com o consentimento e a colaboração do proprietário da rede, focando na identificação de vulnerabilidades em pontos de acesso Wi-Fi e dispositivos conectados. A análise envolve a verificação de configurações inseguras, como a falta de criptografia WPA2/WPA3, e o uso de senhas fracas, além de avaliar a capacidade da rede em resistir a ataques de intrusão e monitoramento de tráfego, sem comprometer o desempenho da rede. O objetivo é melhorar a segurança sem causar interrupções.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-wifi"></i>
          </div>
          <div class="pentest-type-badge grey-box">
            <span>GREY BOX</span>
          </div>
          <h3>Wireless Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Controlled Testing</span>
            <span class="feature-tag">WPA2/WPA3 Analysis</span>
            <span class="feature-tag">Network Monitoring</span>
            <span class="feature-tag">Performance Safe</span>
          </div>
        `
      },
      mobile: {
        text: "O Grey Pentest Mobile envolve a identificação de vulnerabilidades em aplicativos móveis, com o consentimento explícito do proprietário do sistema. O pentester foca em identificar falhas de segurança em apps utilizados em dispositivos móveis, como Android e iOS, realizando testes para avaliar a proteção de dados, criptografia, validação de entradas e resistência a ataques. A análise também foca em verificar como o aplicativo lida com a autenticação, armazenamento de dados e comunicação com servidores remotos. Este teste visa aprimorar a segurança sem comprometer a integridade do sistema ou dos usuários.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-phone"></i>
          </div>
          <div class="pentest-type-badge grey-box">
            <span>GREY BOX</span>
          </div>
          <h3>Mobile Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Data Protection</span>
            <span class="feature-tag">Encryption Review</span>
            <span class="feature-tag">Input Validation</span>
            <span class="feature-tag">Server Communication</span>
          </div>
        `
      },
      web: {
        text: "O Grey Pentest Web é voltado para a avaliação controlada e ética de vulnerabilidades em sites e aplicativos web. O pentester realiza um conjunto de testes em sistemas previamente autorizados para identificar falhas como injeção de código, fraquezas em autenticação e autorização, e exposição de dados sensíveis. A abordagem Grey Hat tem o objetivo de identificar pontos fracos sem causar danos, permitindo que o proprietário do sistema corrija vulnerabilidades antes que atacantes mal-intencionados possam explorá-las. Os testes podem incluir a revisão de código, auditorias de configuração de servidor e análise de tráfego de rede.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-globe"></i>
          </div>
          <div class="pentest-type-badge grey-box">
            <span>GREY BOX</span>
          </div>
          <h3>Web Application Security</h3>
          <div class="pentest-features">
            <span class="feature-tag">Code Review</span>
            <span class="feature-tag">Server Audit</span>
            <span class="feature-tag">Traffic Analysis</span>
            <span class="feature-tag">Ethical Testing</span>
          </div>
        `
      }
    },
    white: {
      wireless: {
        text: "O White Pentest Wireless é uma avaliação de segurança em redes sem fio realizada de maneira ética, com o objetivo de identificar falhas de configuração, interceptação de tráfego, e vulnerabilidades em protocolos de rede sem fio, com a permissão explícita do proprietário da rede. Esse penteste inclui a análise de sistemas Wi-Fi, Bluetooth e outras tecnologias de comunicação sem fio para garantir que não existam brechas que possam ser exploradas por atacantes. Testes comuns incluem a identificação de senhas fracas, falta de criptografia e falhas na autenticação, além da avaliação da resistência da rede contra ataques de negação de serviço (DoS).",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-wifi"></i>
          </div>
          <div class="pentest-type-badge white-box">
            <span>WHITE BOX</span>
          </div>
          <h3>Wireless Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Full Access</span>
            <span class="feature-tag">Configuration Review</span>
            <span class="feature-tag">DoS Resistance</span>
            <span class="feature-tag">Ethical Testing</span>
          </div>
        `
      },
      mobile: {
        text: "O White Pentest Mobile é focado na segurança de aplicativos móveis e realiza testes éticos para identificar falhas em plataformas como Android e iOS. O objetivo é avaliar a segurança do aplicativo, incluindo o armazenamento de dados sensíveis, comunicação com servidores, autenticação de usuários e a proteção contra ataques de engenharia reversa. O pentester testa as interações do aplicativo com a rede e dispositivos móveis, verificando se existem brechas que possam ser exploradas para roubo de dados ou controle do dispositivo. Esse teste visa melhorar a segurança e evitar a exploração de vulnerabilidades por atacantes mal-intencionados.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-phone"></i>
          </div>
          <div class="pentest-type-badge white-box">
            <span>WHITE BOX</span>
          </div>
          <h3>Mobile Security Assessment</h3>
          <div class="pentest-features">
            <span class="feature-tag">Source Code Access</span>
            <span class="feature-tag">Data Storage Review</span>
            <span class="feature-tag">Reverse Engineering</span>
            <span class="feature-tag">Network Security</span>
          </div>
        `
      },
      web: {
        text: "O White Pentest Web é uma abordagem ética e autorizada para identificar vulnerabilidades em sites e aplicativos web. O objetivo é realizar uma análise detalhada das possíveis falhas de segurança no site, como injeção de SQL, Cross-Site Scripting (XSS), e problemas com autenticação de usuários. A metodologia de pentesting White Hat foca em realizar testes rigorosos para garantir que o sistema esteja seguro e livre de falhas que possam ser exploradas por cibercriminosos. Os testes também incluem auditorias de configuração e revisões de código para garantir que as melhores práticas de segurança sejam seguidas.",
        visualText: `
          <div class="pentest-icon">
            <i class="bi bi-globe"></i>
          </div>
          <div class="pentest-type-badge white-box">
            <span>WHITE BOX</span>
          </div>
          <h3>Web Application Security</h3>
          <div class="pentest-features">
            <span class="feature-tag">Code Analysis</span>
            <span class="feature-tag">Configuration Audit</span>
            <span class="feature-tag">Best Practices</span>
            <span class="feature-tag">Comprehensive Testing</span>
          </div>
        `
      }
    }
  };

  // Retorna a descrição e texto visual com base no tipo e contexto
  return descriptions[type] && descriptions[type][context] 
    ? descriptions[type][context] 
    : { text: "Descrição não disponível", visualText: "<div class='error-message'>Informação não disponível</div>" };
};

// Inicializa a configuração dos modais
const abrirModais = () => {
    // Abre o modal principal ao clicar na caixa de pentest
    document.querySelectorAll(".icon-boxPentest").forEach(box => {
        box.addEventListener("click", () => {
            const pentestType = box.getAttribute('data-pentest'); // Obtém o tipo de pentest
            openMainModal(pentestType);
        });
    });

    // Adiciona eventos de clique para as opções dentro do modal principal
    document.body.addEventListener("click", (event) => {
        if (event.target.closest('#modalPentest .option')) {
            const option = event.target.closest('.option');
            const type = option.id.replace('Box', ''); // Obtém o tipo de pentest
            const context = selectedPentestType; // Usa o tipo de pentest como contexto
            openDetailedModal(type, context); // Passa o tipo de pentest e o contexto
        }
    });
};

abrirModais();








  //google maps
document.addEventListener("DOMContentLoaded", function () {
  const addressDiv = document.getElementById('address');
  const infoDiv = document.querySelector('.info');
  const mapContainer = document.getElementById('mapContainer');

  const initialWidth = infoDiv.offsetWidth;
  const initialHeight = infoDiv.offsetHeight;

  const addedHeight = 170;  
  const addedHeightSmallScreen = 190;  

  let expanded = false;
  function forceReflow(element) {
    return element.offsetWidth;
  }

  function windowSizeCheck() {
    return window.innerWidth > 991;
  }

  addressDiv.addEventListener('click', () => {
    if (windowSizeCheck()) {
      if (expanded) {
        mapContainer.style.transition = "all 0.1s ease-in-out";
        mapContainer.classList.remove('active');
        infoDiv.style.width = initialWidth + "px";
        forceReflow(infoDiv);
        infoDiv.classList.remove('active');
      } else {
        mapContainer.style.transition = "all 1s ease-in-out";
        mapContainer.classList.add('active');
        infoDiv.style.width = initialWidth + "px";
        forceReflow(infoDiv);
        infoDiv.classList.add('active');
        infoDiv.style.width = (initialWidth + 240) + "px";
      }
    } else {
      mapContainer.classList.toggle('active');
      const currentAddedHeight = window.innerWidth < 413 ? addedHeightSmallScreen : addedHeight;
      const adjustedHeight = initialHeight + currentAddedHeight;

      if (expanded) {
        infoDiv.style.height = initialHeight + "px";
        forceReflow(infoDiv);
        setTimeout(() => { infoDiv.style.height = null; }, 300);
      } else {
        infoDiv.style.height = initialHeight + "px";
        forceReflow(infoDiv);
        infoDiv.style.height = adjustedHeight + "px";
      }
    }
    expanded = !expanded;
  });
});


//animacao img1


//correcao do bug do modal

document.addEventListener('DOMContentLoaded', function() {
  const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
  modalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetModalId = button.getAttribute('data-bs-target');
      const targetModal = document.querySelector(targetModalId);
      preencherModalComAtributos(targetModal, button);
    });
  });
});

//fechar o menu ao clickar fora

document.addEventListener('click', function(event) {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.getElementById('navbar');
  
  if (mobileNavToggle && navbar) {
    if (mobileNavToggle.contains(event.target)) {
    } else if (
      (!navbar.contains(event.target) && !document.getElementById('header').contains(event.target)) ||
      event.target.classList.contains('bi-x')
    ) {
      const body = document.querySelector('body');
      const navbarToggle = document.querySelector('.mobile-nav-toggle');
      body.classList.remove('mobile-nav-active');
      navbarToggle.classList.remove('bi-x');
      navbarToggle.classList.add('bi-list');
    }
  }
});

function getTechnologyNameFromPath(path) {
  const segments = path.split('/');
  const filename = segments[segments.length - 1];
  let name = filename.split('.')[0];
  name = name.charAt(0).toUpperCase() + name.slice(1);
  
  if (name.toLowerCase() === 'html' || name.toLowerCase() === 'css' || name.toLowerCase() === 'js' || name.toLowerCase() === 'php') {
    name = name.toUpperCase();
  } else if (name.toLowerCase() === 'wordpress') {
    name = 'WordPress';
  } else if (name.toLowerCase() === 'midjourney') {
    name = 'MidJourney';
  } else if (name.toLowerCase() === 'chatgpt') {
    name = 'ChatGPT';
  }
  
  return name;
}

function preencherModalComAtributos(modal, button, newTechData = null) {
  modal.addEventListener('shown.bs.modal', function() {
    const modalElements = {
      title: modal.querySelector('.modal-title'),
      text: modal.querySelector('.modal-text'),
      gif: modal.querySelector('.modal-gif'),
      url: modal.querySelector('.modal-url'),
      footerUrl: modal.querySelector('.modal-footer .modal-url'),
      urlSpan: modal.querySelector('.modal-url span'),
      technologiesContainer: modal.querySelector('.technologies'),
      imagensContainer: modal.querySelector('.imgs'),
    };

    modalElements.title.textContent = button.getAttribute('data-title');
    modalElements.text.innerHTML = button.getAttribute('data-text').replace(/\\n/g, '\n').replace(/\n/g, '<br>');
    
    const domain = button.getAttribute('data-dominio');
    if (modalElements.url && modalElements.urlSpan) {
      modalElements.url.href = `http://${domain}`;
      modalElements.urlSpan.textContent = domain;
    }
    if (modalElements.footerUrl) {
      modalElements.footerUrl.href = `http://${domain}`;
    }

    const gif = button.getAttribute('data-gif');
    modalElements.gif.style.display = gif ? 'block' : 'none';
    if (gif) modalElements.gif.src = gif;

    let technologyLogos = fillTechnologyLogos(newTechData, button);
    modalElements.technologiesContainer.innerHTML = `<i class="bi bi-chevron-right"></i> <strong>Tecnologias usadas:</strong>`;
    modalElements.technologiesContainer.innerHTML += technologyLogos.join('');

    let imagens = fillImages(button);
    modalElements.imagensContainer.innerHTML = imagens.join('');

    setupPopover(modal);
    const modalBody = modal.querySelector('.modal-body');
    const modalHeader = modal.querySelector('.modal-header');

    modalBody.addEventListener('scroll', function() {
      const popoverElement = document.querySelector('.popover');
      if (popoverElement) {
        const popoverRect = popoverElement.getBoundingClientRect();
        const headerRect = modalHeader.getBoundingClientRect();
        
        if (popoverRect.top <= headerRect.bottom) {
          const popoverTriggerList = [].slice.call(modal.querySelectorAll('[data-bs-toggle="popover"]'));
          popoverTriggerList.forEach(function(popoverTriggerEl) {
            const popoverInstance = bootstrap.Popover.getInstance(popoverTriggerEl);
            if (popoverInstance) {
              popoverInstance.hide();
            }
          });
        }
      }
    });
  });
}

function fillTechnologyLogos(newTechData, button) {
  const technologyLogos = [];
  for (let i = 1; i <= 10; i++) {
    let logoSrc;
    if (newTechData && newTechData[i]) {
      logoSrc = newTechData[i];
    } else {
      logoSrc = button.getAttribute(`data-logo${i}`);
    }
    
    if (logoSrc) {
      const technologyName = getTechnologyNameFromPath(logoSrc);
      const techContainer = document.createElement('div');
      techContainer.classList.add('technology-container');
  
      const logoImage = document.createElement('img');
      logoImage.src = logoSrc;
      logoImage.alt = technologyName;
      logoImage.classList.add('img-fluid');
      logoImage.dataset.bsToggle = 'popover';
      logoImage.dataset.bsPlacement = 'top';
      logoImage.dataset.bsContent = technologyName;
  
      techContainer.appendChild(logoImage);
      technologyLogos.push(techContainer.outerHTML);
    }
  }
  return technologyLogos;
}

function fillImages(button) {
  const imagens = [];
  for (let i = 1; i <= 10; i++) {
    const imgSrc = button.getAttribute(`data-img${i}`);
    if (imgSrc) {
      imagens.push(`<img src="${imgSrc}" class="img${i} img-fluid" alt="Imagem ${i}" />`);
    }
  }
  return imagens;
}

function setupPopover(modal) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const triggerType = isTouchDevice ? 'click' : 'hover';
  const popoverTriggerList = [].slice.call(modal.querySelectorAll('[data-bs-toggle="popover"]'));
  
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl, { trigger: triggerType });
  });
}

function closeOtherPopovers(button) {
  const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
  popovers.forEach(function (popoverEl) {
    const popoverInstance = bootstrap.Popover.getInstance(popoverEl);
    if (popoverEl !== button && popoverInstance && popoverInstance._activeTrigger.click) {
      popoverInstance.hide();
    }
  });
}

document.addEventListener('click', function (event) {
  const target = event.target;
  if (target.getAttribute('data-bs-toggle') === 'popover') {
    closeOtherPopovers(target);
  }
});




//popover

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

function typeWriter(textElement, text, i, callback) {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(textElement, text, i, callback), 75);
  } else {
    callback();
  }
}

function animateDots() {
  const dots = document.querySelector('.loading-dots');
  if (!dots) return;
  
  dots.style.display = 'inline';
  dots.textContent = '';
  let count = 0;
  
  // Otimizado: usar requestAnimationFrame para melhor performance
  const animate = () => {
    count++;
    dots.textContent = '.'.repeat(count % 4);
    setTimeout(animate, 150);
  };
  animate();
}

// Função para esconder o loader rapidamente
function hideLoader() {
  const loader = document.querySelector('.loading-overlay');
  if (!loader) return;
  
  // Otimizado: usar transform em vez de opacity para melhor performance
  loader.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out';
  loader.style.transform = 'scale(0.95)';
  loader.style.opacity = '0';
  
  setTimeout(() => {
    loader.style.display = 'none';
    loader.style.transform = 'scale(1)'; // Reset para próxima vez
  }, 100);
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}
 



// whatsapp 

$(function () {
  $('#whatsapp').floatingWhatsApp({
    phone: '5511913739736',
    showPopup: "True",
    headerTilte: "whatsapp chat",
    message: "Olá! Gostaria de obter informações sobre seus serviços.",   
    position: "right",
  });
});

//carousel
$('.carousel').slick({
  dots: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  speed: 300,
  slidesToShow: 3,
  centerMode: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2 
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


// Adiciona 'active' ao link da seção "hero" quando a página carrega
window.addEventListener('DOMContentLoaded', (event) => {
  const heroLink = document.querySelector('#navbar a[href="#hero"]');
  if (heroLink) {
    heroLink.classList.add('active');
  }
  
  // Esconde o loader rapidamente quando a página carregar
  setTimeout(hideLoader, 300); // Reduzido para 300ms - SUPER RÁPIDO!
});

const sections = document.querySelectorAll('section[id]');
const navbarlinks = document.querySelectorAll('#navbar .scrollto');

// Evento de scroll
window.addEventListener('scroll', function() {
  const scrollPos = window.scrollY + (window.innerHeight * 0.7);
  let atBottom = false;

  if (scrollPos >= document.body.scrollHeight) {
    atBottom = true;
  }

  if (atBottom) {
    navbarlinks.forEach((link) => link.classList.remove('active'));
    const lastLink = document.querySelector('#navbar a[href="#contact"]');
    lastLink.classList.add('active');
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navbarlinks.forEach((link) => link.classList.remove('active'));
        const currentLink = document.querySelector(`#navbar a[href="#${section.id}"]`);
        currentLink.classList.add('active');
      }
    });
  }
});

// Rolagem suave com offset e condição especial para 'hero'
document.querySelectorAll('#navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);

    if (targetID === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetElement = document.getElementById(targetID);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 50;

        window.scrollTo({
          top: targetPosition + offset,
          behavior: 'smooth'
        });
      }
    }
  });
});

const botao = document.querySelector(".btnLow");

botao.addEventListener("click", () => {
  const aboutSection = document.querySelector("#about");
  
  if (aboutSection) {
    const scrollOffset = 50; 
    const scrollDistance = aboutSection.getBoundingClientRect().top + window.scrollY + scrollOffset;
    window.scroll({ top: scrollDistance, behavior: "smooth" });
  }
});

$(window).scroll(function(){
  if($(document).scrollTop() > 10){
      $(botao).fadeOut(); 
  } else {
      $(botao).fadeIn(); 
  }
});

function sitesRedirect(){
  const sites = document.querySelectorAll(".modal-footer button");

  sites.forEach(site => {
    site.addEventListener("click", () => {
      const siteUrl = site.dataset.url;
      window.open(siteUrl);
    });
  });
}

sitesRedirect();

(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  //eventos de rolagem 

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


//Estado ativo dos links da barra de navegação 
 
  let sections = select('section[id]', true);
  let navbarlinks = select('#navbar .scrollto', true);
  let lastActiveLink;

const navbarlinksActive = () => {
  const options = {
    rootMargin: '-70px 0px -70px 0px',
    threshold: 0.7, 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetSection = entry.target;
        const targetLink = document.querySelector(`#navbar a[href="#${targetSection.id}"]`);
        navbarlinks.forEach((link) => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
};

  // Back to top button
   
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  //Mobile nav toggle
   
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  //Rolar com deslocamento de classe .scrollto
   
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

 
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  //Skills animation
   
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  //Porfolio isotope and filter
   
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  //Initiate portfolio lightbox 
   
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  //Initiate portfolio details lightbox 

  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  //Portfolio details slider
   
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  //Testimonials slider
  
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  //Animation on scroll
   
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  //Initiate Pure Counter 
   
  new PureCounter();

})();

// Custom Cursor Trail Effect - Tons de Azul
document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    let trailCount = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            setTimeout(() => {
                isMoving = false;
            }, 50);
        }
        
        // Create cursor trail (apenas 25% das vezes para performance)
        if (Math.random() > 0.75) {
            createCursorTrail(mouseX, mouseY);
        }
        
        // Trail alternativo com gradiente (apenas 10% das vezes)
        if (Math.random() > 0.9) {
            createCursorTrailGradient(mouseX, mouseY);
        }
    });
    
    function createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Adiciona variação de tamanho
        const size = Math.random() * 4 + 4; // 4px a 8px
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 500);
    }
    
    function createCursorTrailGradient(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail-gradient';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Adiciona variação de tamanho
        const size = Math.random() * 6 + 6; // 6px a 12px
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 800);
    }
    
    // Efeito especial ao clicar
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
    
    function createClickEffect(x, y) {
        // Cria múltiplos trails ao clicar
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
                trail.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
                trail.style.background = '#0056b3';
                trail.style.width = '8px';
                trail.style.height = '8px';
                
                document.body.appendChild(trail);
                
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                    }
                }, 600);
            }, i * 50);
        }
    }
});