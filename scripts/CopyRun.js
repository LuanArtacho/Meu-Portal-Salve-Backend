
const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //Aqui pegamos o endereço da carteira do proprietário do contrato e também pegamos um endereço aleatório da carteira e chamamos de randomPerson
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //Esse trecho compilará nosso contrato e gerará os arquivos necessários que precisamos para trabalhar com nosso contrato no diretório artifacts. Vá dar uma olhada depois que colocar para executar :)
    const waveContract = await waveContractFactory.deploy();
    //O que está acontecendo aqui é que a Hardhat criará uma rede Ethereum local, mas apenas para este contrato. Então, depois que o script for concluído, ele destruirá essa rede local. Então, toda vez que você executar o contrato, será uma nova blockchain. Qual é o ponto? É como atualizar seu servidor local todas as vezes para que você sempre comece de um papel em branco, o que facilita a depuração dos erros.
    await waveContract.deployed();
    //Vamos esperar até que o nosso contrato seja oficialmente implantado na nossa blockchain local! Nosso constructor é executado quando fazemos o deploy.
    console.log("Contract deployed to:", waveContract.address);
    //Finalmente, uma vez implantado, o waveContract.address basicamente nos dará o endereço do contrato. Este endereço é a forma como podemos encontrar nosso contrato na blockchain. Existem milhões de contratos no blockchain real. Assim, este endereço nos dá acesso fácil ao contrato com o qual estamos interessados em trabalhar! Isso será mais importante um pouco mais tarde, quando implantarmos em uma rede Ethereum real.
    //Comando para executar
    console.log("Contract deployed by:", owner.address);
    //Estamos fazendo isso só para ver o endereço da pessoa que está fazendo o deploy do nosso contrato. Somos curiosos!

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
  
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();