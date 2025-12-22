// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Coreano Tradicional",
        descricao: "Pão macio, salsicha especial, kimchi, cebolinha e molho gochujang",
        preco: 18.90,
        categoria: "tradicional"
    },
    {
        id: 2,
        nome: "Fire Seoul",
        descricao: "Pão com gergelim, duas salsichas, pimenta coreana, queijo e molho especial fire",
        preco: 22.50,
        categoria: "picante"
    },
    {
        id: 3,
        nome: "Dragon Roll",
        descricao: "Hot dog enrolado, cream cheese, cebola crispy, alga nori e molho teriyaki",
        preco: 24.90,
        categoria: "especial"
    },
    {
        id: 4,
        nome: "Cheese Bulgogi",
        descricao: "Carne bulgogi, queijo derretido, cebola caramelizada e molho especial",
        preco: 21.90,
        categoria: "tradicional"
    },
    {
        id: 5,
        nome: "Volcano Kimchi",
        descricao: "Kimchi extra picante, salsicha defumada, pimenta habanero e queijo",
        preco: 20.50,
        categoria: "picante"
    },
    {
        id: 6,
        nome: "K-Pop Special",
        descricao: "Mix de ingredientes coreanos, batata palha, ovo de codorna e molhos especiais",
        preco: 25.90,
        categoria: "especial"
    },
    {
        id: 7,
        nome: "Molho Gochujang",
        descricao: "Molho picante coreano tradicional, fermentado",
        preco: 5.90,
        categoria: "molho"
    },
    {
        id: 8,
        nome: "Molho Buldak",
        descricao: "Molho super picante estilo fogo coreano",
        preco: 6.50,
        categoria: "molho"
    },
    {
        id: 9,
        nome: "Molho Cheese",
        descricao: "Molho cremoso de queijo estilo coreano",
        preco: 5.50,
        categoria: "molho"
    },
    {
        id: 10,
        nome: "Maionese de Alho",
        descricao: "Maionese temperada com alho fresco",
        preco: 4.90,
        categoria: "molho"
    },
    {
        id: 11,
        nome: "Molho Suave",
        descricao: "Molho leve para quem prefere menos picante",
        preco: 4.50,
        categoria: "molho"
    },
    {
        id: 12,
        nome: "Molho Teriyaki",
        descricao: "Molho agridoce estilo japonês-coreano",
        preco: 5.90,
        categoria: "molho"
    }
];

// Carrinho de compras
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Elementos DOM
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const btnPedido = document.getElementById('btnPedido');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const btnFinalizar = document.getElementById('btnFinalizar');
const carrinhoVazio = document.getElementById('carrinhoVazio');
const carrinhoItens = document.getElementById('carrinhoItens');
const carrinhoTotal = document.getElementById('carrinhoTotal');
const cartCount = document.querySelector('.cart-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const cardapioItems = document.querySelectorAll('.cardapio-item');
const btnAdds = document.querySelectorAll('.btn-add');
const comboBtns = document.querySelectorAll('.btn-combo');
const pedidoForm = document.getElementById('pedidoForm');

// Elementos do modal de finalização
const finalizarOverlay = document.getElementById('finalizarOverlay');
const finalizarClose = document.getElementById('finalizarClose');
const finalizarForm = document.getElementById('finalizarForm');
const tipoPedidoRadios = document.querySelectorAll('input[name="tipoPedido"]');
const dadosEntrega = document.getElementById('dadosEntrega');
const taxaEntrega = document.getElementById('taxaEntrega');
const resumoItens = document.getElementById('resumoItens');
const resumoSubtotal = document.getElementById('resumoSubtotal');
const resumoTotal = document.getElementById('resumoTotal');

// Menu mobile toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Abrir/fechar modal do carrinho
btnPedido.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    atualizarCarrinho();
});

modalClose.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Filtros do cardápio
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        cardapioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Adicionar produto ao carrinho
btnAdds.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const produto = produtos.find(p => p.id === productId);
        
        if (produto) {
            adicionarAoCarrinho(produto);
            mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
        }
    });
});

// Adicionar combo ao carrinho
comboBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const comboId = btn.getAttribute('data-combo');
        let combo;
        
        switch(comboId) {
            case '1':
                combo = {
                    id: 100,
                    nome: 'Combo Seoul',
                    descricao: '1 Coreano Tradicional + 1 Bebida + 1 Porção de batata',
                    preco: 29.90
                };
                break;
            case '2':
                combo = {
                    id: 101,
                    nome: 'Combo Gangnam',
                    descricao: '2 Hot Dogs + 2 Bebidas + 1 Porção de onion rings + 1 Sobremesa',
                    preco: 49.90
                };
                break;
            case '3':
                combo = {
                    id: 102,
                    nome: 'Combo Busan',
                    descricao: '4 Hot Dogs + 4 Bebidas + 2 Porções de batata + Molhos extras',
                    preco: 79.90
                };
                break;
        }
        
        if (combo) {
            adicionarAoCarrinho(combo);
            mostrarNotificacao(`${combo.nome} adicionado ao carrinho!`);
        }
    });
});

// Adicionar item ao carrinho
function adicionarAoCarrinho(item) {
    const itemExistente = carrinho.find(prod => prod.id === item.id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...item,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarContadorCarrinho();
}

// Remover item do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarContadorCarrinho();
    atualizarCarrinho();
}

// Atualizar quantidade do item
function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) {
        removerDoCarrinho(id);
        return;
    }
    
    const item = carrinho.find(prod => prod.id === id);
    if (item) {
        item.quantidade = novaQuantidade;
        salvarCarrinho();
        atualizarContadorCarrinho();
        atualizarCarrinho();
    }
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCount.textContent = totalItens;
    
    if (totalItens > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Atualizar visualização do carrinho
function atualizarCarrinho() {
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoItens.style.display = 'none';
        carrinhoTotal.textContent = 'R$ 0,00';
        return;
    }
    
    carrinhoVazio.style.display = 'none';
    carrinhoItens.style.display = 'block';
    
    // Limpar itens anteriores
    carrinhoItens.innerHTML = '';
    
    let total = 0;
    
    // Adicionar cada item do carrinho
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <div class="carrinho-item-info">
                <h4>${item.nome}</h4>
                <p>${item.descricao}</p>
                <p class="item-preco">R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="carrinho-item-actions">
                <div class="carrinho-item-quantidade">
                    <button class="btn-diminuir" data-id="${item.id}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-aumentar" data-id="${item.id}">+</button>
                </div>
                <button class="carrinho-item-remover" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        carrinhoItens.appendChild(itemElement);
    });
    
    // Atualizar total
    carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adicionar eventos aos botões de quantidade
    document.querySelectorAll('.btn-diminuir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = carrinho.find(prod => prod.id === id);
            if (item) {
                atualizarQuantidade(id, item.quantidade - 1);
            }
        });
    });
    
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = carrinho.find(prod => prod.id === id);
            if (item) {
                atualizarQuantidade(id, item.quantidade + 1);
            }
        });
    });
    
    document.querySelectorAll('.carrinho-item-remover').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            removerDoCarrinho(id);
        });
    });
}

// Abrir modal de finalização
function abrirModalFinalizacao() {
    // Resetar formulário
    finalizarForm.reset();
    
    // Por padrão, mostrar retirada
    dadosEntrega.style.display = 'none';
    taxaEntrega.style.display = 'none';
    
    // Atualizar resumo
    atualizarResumoPedido();
    
    // Mostrar modal
    finalizarOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Atualizar resumo do pedido
function atualizarResumoPedido() {
    // Limpar resumo anterior
    resumoItens.innerHTML = '';
    
    let subtotal = 0;
    
    // Adicionar itens ao resumo
    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'resumo-item';
        itemElement.innerHTML = `
            <div class="resumo-item-info">
                <div class="resumo-item-nome">${item.nome}</div>
                <div class="resumo-item-detalhes">
                    <span>${item.quantidade}x</span>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                </div>
            </div>
            <div class="resumo-item-valor">
                R$ ${itemTotal.toFixed(2)}
            </div>
        `;
        
        resumoItens.appendChild(itemElement);
    });
    
    // Atualizar subtotal
    resumoSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    
    // Calcular total (subtotal + taxa se for entrega)
    const taxa = document.querySelector('input[name="tipoPedido"]:checked').value === 'entrega' ? 2 : 0;
    const total = subtotal + taxa;
    
    resumoTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Abrir modal de finalização quando clicar em "Finalizar Pedido"
btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione itens ao carrinho primeiro!', 'warning');
        return;
    }
    
    // Fechar modal do carrinho
    modalOverlay.style.display = 'none';
    
    // Abrir modal de finalização
    abrirModalFinalizacao();
});

// Fechar modal de finalização
finalizarClose.addEventListener('click', () => {
    finalizarOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

finalizarOverlay.addEventListener('click', (e) => {
    if (e.target === finalizarOverlay) {
        finalizarOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Alterar entre retirada e entrega
tipoPedidoRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'entrega') {
            dadosEntrega.style.display = 'block';
            taxaEntrega.style.display = 'flex';
        } else {
            dadosEntrega.style.display = 'none';
            taxaEntrega.style.display = 'none';
        }
        atualizarResumoPedido();
    });
});

// Submeter formulário de finalização
finalizarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const tipoPedido = document.querySelector('input[name="tipoPedido"]:checked').value;
    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    
    // Validação básica
    if (!nome || !telefone) {
        mostrarNotificacao('Por favor, preencha seu nome e telefone!', 'warning');
        return;
    }
    
    if (tipoPedido === 'entrega') {
        const bairro = document.getElementById('bairro').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        
        if (!bairro || !rua || !numero) {
            mostrarNotificacao('Para entrega, preencha bairro, rua e número!', 'warning');
            return;
        }
    }
    
    let mensagemWhatsApp = `*🍢 NOVO PEDIDO - HOT COREIA 🍢*\n\n`;
    mensagemWhatsApp += `*👤 Cliente:* ${nome}\n`;
    mensagemWhatsApp += `*📱 WhatsApp:* ${telefone}\n`;
    mensagemWhatsApp += `*📦 Tipo:* ${tipoPedido === 'entrega' ? '🚚 Entrega' : '🏪 Retirada na Loja'}\n\n`;
    
    if (tipoPedido === 'entrega') {
        const bairro = document.getElementById('bairro').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const pontoReferencia = document.getElementById('pontoReferencia').value;
        
        mensagemWhatsApp += `*📍 ENDEREÇO DE ENTREGA*\n`;
        mensagemWhatsApp += `🏘️ Bairro: ${bairro}\n`;
        mensagemWhatsApp += `🛣️ Rua: ${rua}, ${numero}\n`;
        if (complemento) mensagemWhatsApp += `🏠 Complemento: ${complemento}\n`;
        if (pontoReferencia) mensagemWhatsApp += `📍 Ponto de referência: ${pontoReferencia}\n`;
        mensagemWhatsApp += `\n`;
    }
    
    mensagemWhatsApp += `*📝 ITENS DO PEDIDO*\n`;
    
    let total = 0;
    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;
        mensagemWhatsApp += `🍽️ ${item.quantidade}x ${item.nome} - R$ ${itemTotal.toFixed(2)}\n`;
    });
    
    if (tipoPedido === 'entrega') {
        total += 2;
        mensagemWhatsApp += `🚚 Taxa de entrega: R$ 2,00\n`;
    }
    
    mensagemWhatsApp += `\n*💰 TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    mensagemWhatsApp += `*💳 FORMA DE PAGAMENTO:*\nA combinar com o cliente\n\n`;
    mensagemWhatsApp += `_📱 Pedido feito através do site Hot Coreia_`;
    
    // Codificar mensagem para URL do WhatsApp
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
    const numeroWhatsApp = '5511999999999'; // Substitua pelo número real
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');
    
    // Mostrar confirmação
    mostrarNotificacao('Pedido enviado! Abrindo WhatsApp para confirmação...', 'success');
    
    // Limpar carrinho
    carrinho = [];
    salvarCarrinho();
    atualizarContadorCarrinho();
    
    // Fechar modais
    finalizarOverlay.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Enviar formulário de pedido rápido
pedidoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(pedidoForm);
    const nome = pedidoForm.querySelector('input[type="text"]').value;
    const telefone = pedidoForm.querySelector('input[type="tel"]').value;
    
    if (!nome || !telefone) {
        mostrarNotificacao('Por favor, preencha seu nome e telefone!', 'warning');
        return;
    }
    
    mostrarNotificacao(`Pedido rápido enviado! Em breve entraremos em contato no WhatsApp: ${telefone}`, 'success');
    pedidoForm.reset();
});

// Mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'success') {
    // Remover notificações anteriores
    const notificacoesAntigas = document.querySelectorAll('.notificacao');
    notificacoesAntigas.forEach(notif => notif.remove());
    
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${mensagem}</span>
    `;
    
    // Estilos da notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#4CAF50' : '#FF9800'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        box-shadow: var(--shadow);
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Atualizar endereços obrigatórios baseado no tipo de pedido
function atualizarCamposObrigatorios() {
    const tipoPedido = document.querySelector('input[name="tipoPedido"]:checked').value;
    const camposEntrega = ['#bairro', '#rua', '#numero'];
    
    if (tipoPedido === 'entrega') {
        camposEntrega.forEach(seletor => {
            const campo = document.querySelector(seletor);
            campo.required = true;
        });
    } else {
        camposEntrega.forEach(seletor => {
            const campo = document.querySelector(seletor);
            campo.required = false;
        });
    }
}

// Inicializar campos obrigatórios
tipoPedidoRadios.forEach(radio => {
    radio.addEventListener('change', atualizarCamposObrigatorios);
});

// Inicializar contador do carrinho
atualizarContadorCarrinho();

// Formatar preços ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    // Atualizar contador inicial
    atualizarContadorCarrinho();
    
    // Inicializar campos obrigatórios
    atualizarCamposObrigatorios();
    
    // Adicionar animações para os itens do cardápio
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos do cardápio
    document.querySelectorAll('.cardapio-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});