# 🎓 Alfabeto Interativo - ang-alphabet-project

Um projeto Angular educativo e interativo desenvolvido para ajudar crianças a aprenderem o alfabeto através de reconhecimento de voz e atividades gamificadas.

## 🎯 Objetivos do Projeto

O projeto foi desenvolvido para auxiliar crianças com dificuldades em decorar:
- A ordem das letras do alfabeto
- Os formatos das letras (maiúsculas e minúsculas)
- A diferença entre letras de forma e cursivas
- A pronúncia correta de cada letra

## 🎮 Como Funciona

1. **Tela Inicial**: Exibe todas as 26 letras do alfabeto em um grid colorido
2. **Cada Letra**: Mostra 4 variações:
   - Letra maiúscula de forma
   - Letra minúscula de forma
   - Letra maiúscula cursiva
   - Letra minúscula cursiva

3. **Modo Jogo**:
   - Ao clicar em "Iniciar", todas as letras ficam ocultas
   - Uma letra aleatória aparece por vez
   - A aplicação acessa o microfone para ouvir a criança
   - Se a letra for pronunciada corretamente, ela fica verde e a próxima aparece
   - O jogo continua até completar todas as 26 letras

## 🛠️ Tecnologias Utilizadas

- **Angular 18**: Framework principal
- **Bootstrap 5**: Framework CSS responsivo
- **Web Speech API**: Reconhecimento de voz
- **TypeScript**: Linguagem de programação
- **HTML5 & CSS3**: Interface e estilização

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI instalado globalmente: `npm install -g @angular/cli`

### Instalação

1. Navegue até o diretório do projeto:
```bash
cd ang-alphabet-project
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
ng serve
```

4. Abra o navegador em `http://localhost:4200`

### Build para Produção

```bash
ng build
```

Os arquivos compilados estarão em `dist/ang-alphabet-project/`

## 🌐 Compatibilidade de Navegadores

O reconhecimento de voz funciona melhor nos seguintes navegadores:
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Safari (com suporte limitado)
- ⚠️ Firefox (não suporta Web Speech API)

## 🎨 Características

### Design
- Interface colorida e atrativa para crianças
- Gradientes animados para cada letra
- Responsivo (desktop, tablet e mobile)
- Fontes legíveis e grandes
- Animações suaves e feedback visual

### Funcionalidades
- ✅ Grid de 26 letras do alfabeto
- ✅ Cada letra mostra 4 formatos diferentes
- ✅ Reconhecimento de voz em tempo real
- ✅ Feedback visual para acertos (verde)
- ✅ Escolha aleatória de letras
- ✅ Modo jogo com ocultação progressiva
- ✅ Botão para reiniciar o jogo
- ✅ Feedback de status em português

## 📁 Estrutura do Projeto

```
ang-alphabet-project/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Lógica do jogo
│   │   ├── app.component.html    # Template da interface
│   │   └── app.component.css     # Estilos específicos
│   ├── styles.css                # Estilos globais
│   └── index.html                # HTML principal
├── angular.json                  # Configuração do Angular
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## 🔧 Desenvolvimento

### Adicionar novos recursos

Para adicionar novas funcionalidades ao projeto:

1. Crie novos componentes: `ng generate component nome-do-componente`
2. Adicione serviços: `ng generate service nome-do-servico`
3. Implemente features conforme necessário

### Testes

```bash
ng test
```

Para testes end-to-end:

```bash
ng e2e
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvido com

Angular, TypeScript, Bootstrap e muito ☕

---

**Diversão e aprendizado para todos! 🎉**
