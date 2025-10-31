# 📖 Instruções de Uso - Alfabeto Interativo

## 🚀 Como Iniciar o Projeto

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Executar o Servidor de Desenvolvimento
```bash
npm start
```
ou
```bash
ng serve
```

### Passo 3: Abrir no Navegador
- O projeto abrirá automaticamente em `http://localhost:4200`
- Se não abrir automaticamente, copie e cole a URL no navegador

## 🎮 Como Usar a Aplicação

### Tela Inicial
1. Você verá todas as 26 letras do alfabeto exibidas em um grid colorido
2. Cada letra mostra 4 formatos diferentes:
   - **Maiúscula de forma** (A)
   - **Minúscula de forma** (a)
   - **Maiúscula cursiva** (A)
   - **Minúscula cursiva** (a)

### Iniciar o Jogo
1. Clique no botão **"🚀 Iniciar"**
2. O navegador solicitará permissão para acessar o microfone - **aceite a permissão**
3. Todas as letras ficarão ocultas
4. Uma letra aleatória aparecerá

### Jogar
1. **Fale o nome da letra** que aparece na tela
2. Se acertar:
   - ✅ A letra ficará **verde**
   - 🎊 Uma nova letra aleatória aparecerá
   - 🎉 Continue até completar todas as 26 letras!
3. Se não acertar:
   - 🎤 O microfone continuará ouvindo
   - ✅ Tente novamente!

### Parar o Jogo
- Clique no botão **"⏸️ Parar"** a qualquer momento

### Jogar Novamente
- Após completar todas as letras, clique em **"🔄 Jogar Novamente"** para recomeçar

## 🎯 Dicas Importantes

### Navegadores Recomendados
- ✅ **Google Chrome** (melhor performance)
- ✅ **Microsoft Edge** (boa performance)
- ⚠️ **Firefox** (não suporta reconhecimento de voz)
- ⚠️ **Safari** (suporte limitado)

### Configuração do Microfone
1. Certifique-se de que o microfone está funcionando
2. **Conceda permissão** quando o navegador solicitar
3. Fale **claramente** e **em voz alta**
4. Reduza ruídos de fundo

### Pronúncia
- Fale o **nome da letra** (por exemplo: "A", "B", "C")
- Você pode falar apenas a letra ou "letra A", "é A"
- O reconhecimento funciona em **português brasileiro**

### Resolução de Problemas

**Problema: Microfone não funciona**
- Verifique as permissões do navegador
- Certifique-se de que o microfone está conectado
- Teste o microfone em outros sites

**Problema: Não reconhece a voz**
- Fale mais alto e mais claro
- Certifique-se de estar em um ambiente silencioso
- Use Chrome ou Edge (melhor reconhecimento)

**Problema: Página não carrega**
- Verifique se o servidor está rodando
- Confira a URL: `http://localhost:4200`
- Tente recarregar a página (F5)

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
npm start              # Iniciar servidor de desenvolvimento
ng serve               # Iniciar servidor (alternativa)
ng serve --open        # Iniciar e abrir no navegador
```

### Build
```bash
npm run build          # Construir para produção
ng build               # Construir (alternativa)
ng build --prod        # Construir otimizado
```

### Testes
```bash
npm test               # Executar testes unitários
ng test                # Executar testes
ng e2e                 # Executar testes end-to-end
```

## 📁 Estrutura de Arquivos

```
ang-alphabet-project/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Lógica principal do jogo
│   │   ├── app.component.html     # Interface do usuário
│   │   └── app.component.css      # Estilos do componente
│   ├── styles.css                 # Estilos globais
│   └── index.html                 # HTML principal
├── dist/                          # Build de produção
├── node_modules/                  # Dependências
├── README.md                      # Documentação
├── INSTRUÇÕES.md                  # Este arquivo
└── package.json                   # Configurações e dependências
```

## 🎨 Recursos Visuais

- **Cores vibrantes**: Cada letra tem uma cor única em gradiente
- **Animações suaves**: Feedback visual agradável
- **Layout responsivo**: Funciona em desktop, tablet e mobile
- **Fontes legíveis**: Fácil leitura para crianças

## 💡 Recursos Educacionais

- ✅ Ensina o alfabeto de forma divertida
- ✅ Mostra diferentes formatos de letras
- ✅ Pratica pronúncia correta
- ✅ Feedback positivo (cores verdes)
- ✅ Ordem aleatória aumenta o desafio

## 📞 Suporte

Se encontrar problemas ou tiver dúvidas:
1. Verifique se todas as dependências estão instaladas
2. Certifique-se de usar um navegador compatível
3. Verifique as permissões do microfone
4. Consulte a documentação do Angular: https://angular.dev

---

**Divirta-se aprendendo! 🎉🎓**

