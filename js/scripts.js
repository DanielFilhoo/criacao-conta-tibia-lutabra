// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const letterInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
   return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
   const symbols = "(){}[]=<>/,.!@#$%&*+-";
   return symbols[Math.floor(Math.random() * symbols.length)];
};

// Função para gerar a senha
const generatePassword = (getSymbol, getNumber, getLetterUpperCase, getLetterLowerCase) => {
   let password = "";

   // Pegar o valor do comprimento da senha
   const passwordLength = +lengthInput.value; // O "+" converte string para número

   const generators = [];
   
   // Adicionar geradores com base nos checkboxes
   if (letterInput.checked) {
       generators.push(getLetterLowerCase, getLetterUpperCase);
   }
   if (numbersInput.checked) {
       generators.push(getNumber);
   }
   if (symbolsInput.checked) {
       generators.push(getSymbol);
   }

   if (generators.length === 0) {
       return;
   }

   // Gerar a senha com base nos geradores disponíveis
   for (let i = 0; i < passwordLength; i += generators.length) {
       generators.forEach(() => {
           const randomValue = generators[Math.floor(Math.random() * generators.length)]();
           password += randomValue;
       });
   }

   // Garantir que a senha tenha o comprimento correto
   password = password.slice(0, passwordLength);

   // Exibir a senha gerada
   generatedPasswordElement.style.display = "block";
   generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos
generatePasswordButton.addEventListener("click", (e) => {
   e.preventDefault(); // Prevenir comportamento padrão do botão
   generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
   generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
   e.preventDefault();

   const password = generatedPasswordElement.querySelector("h4").innerText;

   navigator.clipboard.writeText(password).then(() => {
       copyPasswordButton.innerText = "Senha copiada!";

       setTimeout(() => {
           copyPasswordButton.innerText = "Copiar";
       }, 1000);
   });
});
