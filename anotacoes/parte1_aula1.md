# Bem começado, metade feito

---
## O projeto e sua Estrutura

O projeto consiste em uma página contendo um formulário para adicionar Negiciações.

Abaixo do formulário, há uma tabela com as negociações.

O HTML e CSS já estão implementados, também existem libs js que serão utilizadas no decorrer do projeto.

---
## Modelando uma Negociação

Vamos criar o script que declarará nossa classe `Negociacao` em `app/js/models/Negociacao.js`:

```js
class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = data
        this._quantidade = quantidade
        this._valor = valor

    }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }

    get volume() {

        return this._quantidade * this._valor;
    }
}
```

importamos o script em `app/index.html`:

```html
<script src="js/models/Negociacao.js"></script>
```
Agora, vamos criar o arquivo app/js/app.js que será o ponto de entrada da nossa aplicação. Não podemos esquecer e importá-lo em app/index.html:

```html
<!-- client/index.html -->
<!-- código anterior omitido -->
        <script src="js/models/Negociacao.js"></script>
        <script src="js/app.js"></script>
    </body>
<html>
```

Vamos testar a primeira regra. Uma negociação obrigatoriamente deve ter uma data, quantidade e valor:

```js
// app/js/app.js


let negociacao = new Negociacao(new Date(), 2, 100);
console.log(negociacao);
```


---
## Colocando o código a prova

A linguagem JavaScript não me proíbe de instanciar uma Negociação sem parâmetros.

```js
let negociacao = new Negociacao();
```

Além disso, nada nos impede de acessarmos as propriedade que começa com _:

```js
negociacao._quantidade = 10
```

O uso do prefixo é apenas uma convenção para indicar que a propriedade é privada.

Por mais que a linguagem JavaScript tenha evoluído, ela não consegue lidar com questões como essa sem termos que apelar para convenções ou aplicar técnicas que aumentam bastante a complexidade do nosso código.

O TypeScript consegue pegar em tempo de desenvolvimento estes erros que só podem ser detectados em tempo de execução no JavaScript.

---
## Instalação e Configuração do compilador

#### Precisamos criar o `package.json` que descreve os módulos do npm.

Dentro da pasta do projeto:

```sh
npm init
```

Podemos teclar ENTER para todas as perguntas. No final, teremos o arquivo `./package.json`:

#### Instalação do typescript:

```sh
npm install typescript@2.3.2 --save-dev
```

Dentro de instantes ele será instalado dentro da pasta ./node_modules.
O instalador adiciona esta informação no `package.json` na chave `"devDependencies": {}`

#### O arquivo tsconfig.json

Precisamos criar o arquivo `./tsconfig.json` que guardará as configurações do nosso compilador:

```json
{
    "compilerOptions": {        // configurações do compilador:
        "target": "es6",        //  codigo será compilado em **`es6`**
        "outDir": "app/js",     //  diretório de saida do compilador
        "noEmitOnError": true   //  Não gera arquivo .js caso tenha erros na compilação.
    },
    "include": [                // fonte dos arquivos a serem compilados.
        "app/ts/**/*"         
    ]
}
```

O parâmetro **`noEmitOnError = true `** não é obrigatório, mas ele evita gerar arquivos js a partir de códigos typescript inconsistentes, o que poderia gerar comportamentos não desejados durante a execução.

#### Script para o compilador

Uma boa prática é criarmos um script em nosso `package.json` que se encarregará de chamar o compilador para nós através do terminal.
Para isso, precisamos adicionar dentro da chave `scripts`, uma chamada para o **`tsc`**. Podemos nomear esta chamada de **`compile`**, por exemplo:

```json
{
  "name": "alurabank",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tsc" // script compile chama o tsc (compilador)
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^2.3.2"
  }
}
```

#### Executando o script compiler:

Através do terminal, dentro da pasta do projeto:

```sh
npm run compile
```

Os código dentro dos diretórios definidos no arquivo `tsconfig.json` serão compilados pro formato e local definido.

---
## Modelando com TypeScript

Vamos criar o script que declarará nossa classe `Negociacao` agora em type script no arquivo `app/ts/models/Negociacao.ts`.

Precisamos agora declarar os parâmetros da classe antes do *constructor*:

```ts
class Negociacao {

    _data;
    _quantidade;
    _valor;

    constructor(data, quantidade, valor) {
        this._data = data
        this._quantidade = quantidade
        this._valor = valor

    }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}
```

Podemos ainda declarar as propriedades como privada, utilizando o modificador `private`:

```ts
class Negociacao {

    private _data;
    private _quantidade;
    private _valor;

    constructor(data, quantidade, valor) {
        this._data = data
        this._quantidade = quantidade
        this._valor = valor

    }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}
```

Porém, no `HTML` ainda mantemos a importação para os arquivos **`.js`** que seão gerados. O navegador sempre trabalha com o javaScript.

---
## Automatizando o processo de Compilação

Podemos automatizar o processo de compilação que será disparado toda vez que um arquivo .ts for modificado. Para isso, vamos adicionar mais um script em `./package.json`, o script `"start": "tsc -w"`:

```json
{
  "name": "alurabank",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tsc",
    "start": "tsc -w"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^2.3.2"
  }
}
```

Agora, no terminal e dentro da pasta do projeto, vamos executar o comando:

```sh
npm start
```

O terminal ficará travado pois o serviço de monitoramento de arquivos do TypeScript terá entrado em ação. Experimente alterar os arquivos `.ts` e veja o resultado. Só não esqueça de recarregar seu navegador para que as mudanças dos últimos arquivos `.js` gerados sejam carregadas.
