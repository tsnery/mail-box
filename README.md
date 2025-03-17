# Carta de Amor Animada

Uma aplicação web romântica e interativa que exibe uma sequência de animações culminando em uma mensagem de amor personalizada.

## Funcionalidades

- Animação de caixa de correio interativa
- Transição suave para animação de carta abrindo
- Exibição de uma mensagem de amor em um papel amassado
- Efeitos visuais românticos (corações flutuantes, partículas brilhantes)
- Design responsivo para visualização em dispositivos móveis

## Como usar

### Método 1: Abrir diretamente (pode não funcionar em alguns navegadores)

1. Clone este repositório
2. Abra o arquivo `index.html` em um navegador web
3. Toque/clique na caixa de correio para iniciar a animação
4. Aprecie a sequência de animações e a mensagem de amor

### Método 2: Usar o servidor local (recomendado)

1. Clone este repositório
2. Certifique-se de ter o Node.js instalado
3. Execute o servidor local:
   ```
   node server.js
   ```
4. Abra o navegador e acesse `http://localhost:3000`
5. Toque/clique na caixa de correio para iniciar a animação
6. Aprecie a sequência de animações e a mensagem de amor

### Método 3: Testar apenas as animações

Se estiver tendo problemas com as animações, você pode testar apenas as animações Lottie:

1. Abra o arquivo `test-animations.html` em um navegador
2. Clique nos botões para reproduzir cada animação
3. Verifique se há mensagens de erro no console do navegador

## Solução de problemas

Se as animações não estiverem funcionando:

1. Verifique se os arquivos JSON das animações estão presentes e válidos

   - Execute `node validate-json.js` para verificar a validade dos arquivos JSON
   - Se algum arquivo estiver inválido, a aplicação tentará usar os arquivos de teste como fallback

2. Abra o console do navegador (F12) para verificar erros

   - A aplicação exibe mensagens de depuração no console e no elemento de status na tela

3. Tente usar o servidor local (Método 2) para evitar problemas de CORS

   - Execute `node server.js` para iniciar o servidor
   - Execute `node check-server.js` em outro terminal para verificar se os arquivos estão sendo servidos corretamente

4. Teste apenas as animações usando a página de teste

   - Abra `test-animations.html` no navegador para testar apenas as animações Lottie
   - Esta página usa os arquivos de teste que sabemos que funcionam

5. Se nada funcionar, tente usar os arquivos de teste diretamente
   - Edite `main.js` e altere os caminhos dos arquivos para usar `test-mailbox.json` e `test-letter.json`

## Personalização

Para personalizar a mensagem de amor, edite a variável `loveMessage` no arquivo `main.js`.

```javascript
const CONFIG = {
  // Mensagem de amor que aparecerá no papel
  loveMessage: "Sua mensagem personalizada aqui...",

  // Outras configurações...
};
```

## Tecnologias utilizadas

- HTML5
- CSS3 (Animações, Flexbox, Media Queries)
- JavaScript (ES6+)
- Lottie para animações vetoriais
- Canvas para efeitos de partículas

## Arquivos de animação

- `mail-box.json` - Animação da caixa de correio
- `letter-opening-animation.json` - Animação da carta abrindo
- `test-mailbox.json` - Animação alternativa da caixa de correio
- `test-letter.json` - Animação alternativa da carta

## Créditos

Desenvolvido com ❤️ para expressar amor de forma criativa e interativa.
