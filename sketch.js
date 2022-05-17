var trex, trexRunning,trexCollided ;
var edges;
var solo, imageSolo;
var SoloInvisivel;
var clouds, imageClouds,cloudsGp;
var cactos, imageCacto1,imageCacto2,imageCacto3,imageCacto4,imageCacto5,imageCacto6, cactosGp;
var score=0;
var play = 1;
var end = 0;
var gameState = play;
var records =0;
var gameover,gameoverImg
var restarte, restarteImg
var pulo,morte, pontos;

//preload carrega as midías
function preload(){
 //animação do Trex
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadAnimation("trex_collided.png");
 pulo=loadSound("jump.mp3")
 morte=loadSound("die.mp3")
 pontos=loadSound("checkpoint.mp3")
  //imagem do solo
  imageSolo = loadImage("ground2.png");
  restarteImg=loadImage("restart.png")
  gameoverImg=loadImage("gameOver.png")
  // imagem nuvens
  imageClouds = loadImage("cloud.png");
  imageCacto1 = loadImage("obstacle1.png");
  imageCacto2 = loadImage("obstacle2.png");
  imageCacto3 = loadImage("obstacle3.png");
  imageCacto4 = loadImage("obstacle4.png");
  imageCacto5 = loadImage("obstacle5.png");
  imageCacto6 = loadImage("obstacle6.png");

}
//setup faz aconfiguração
function setup(){
  createCanvas(windowWidth,windowHeight)
  // criando as bordas
  edges = createEdgeSprites();
 
  //crie um sprite de trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trexRunning);
  trex.addAnimation("collided", trexCollided);
  trex.scale=0.5;
  trex.debug=false
  //trex.setCollider("rectangle",0,0,50,50,60)
  trex.setCollider("circle",0,0,25)
  //sprite do solo
  solo =createSprite(width/2,height-30,width,2);
  solo.addImage("solo", imageSolo);
  //criando o solo invisivel
  soloInvisivel = createSprite(width/2,height-10,width,2);
  soloInvisivel.visible = false;

  //criando grupos de nuvem e cactos
  cloudsGp = new Group();
  cactosGp =  new Group();

 gameover=createSprite(width/2,height-120,100,10)
  gameover.addImage(gameoverImg)
  gameover.scale=0.5 

  restarte=createSprite(width/2,height-80,100,10)
  restarte.addImage(restarteImg)
  restarte.scale=0.5
  gameover.visible=false
  restarte.visible=false
}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");

  // vendo se trex ta colidindo com cacto
  if(trex.isTouching(cactosGp)){
    gameState= end;
   //morte.play()
  }

  //game state: estados do jogo
  if (gameState == play){
    score+=Math.round(getFrameRate()/40);
    if(score%100===0&&score>0){
      pontos.play( )
    }
     // fazero trex pular
    if(touches.length>0|| keyDown("space")&& trex.y>height-36) {
      trex.velocityY = -12;
      pulo.play()
      touches=[]
       // dando velocidade ao solo
    }
   solo.velocityX =-(12+score/100);
  //conferindo a rolagem do solo
    if( solo.x < 350){
      solo.x=solo.width/2;
       }
    createCactos(); 
    createClouds();
  }

  if (gameState == end){
    trex.changeAnimation("collided", trexCollided);
    solo.velocityX=0;
    cloudsGp.setVelocityXEach(0);
    cactosGp.setVelocityXEach(0);
    cloudsGp.setLifetimeEach(-1)
    cactosGp.setLifetimeEach(-1)
    gameover.visible=true
    restarte.visible=true
    if(records<score){
      record=score
    }
    if(mousePressedOver(restarte)){
      gameState=play
      gameover.visible=false
      restarte.visible=false
      cloudsGp.destroyEach()
      cactosGp.destroyEach()
      trex.changeAnimation("running", trexRunning);
     score=0
    }
  }
  
  //texto para vida
  fill("black");
  stroke("blue");
  textAlign(CENTER, TOP);
  textSize(18);
  text("Score "+score, width-74,height-180 );
  text("Record "+records,  width-74,height-165 );


 // chamando a  função de gravidade
  gravity();

  //colisão do trex com as bordas
  trex.collide(soloInvisivel);
  //console.log(trex.Y);
   
   //coordenadas do mouse na tela
  //text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}

// função de gravidade
function gravity(){
  trex.velocityY+=0.5;
}
//funç~~ao de criar as nuvens
function createClouds(){
  if(frameCount%60==0){
    clouds = createSprite(width,random(height-186,height-100),40,10);
    clouds.velocityX = -(4+score/100);
    clouds.addImage(imageClouds);
    clouds.scale=random(0.3,1.4);
    clouds.depth =trex.depth -1;
    clouds.lifetime = width/clouds.velocityX;
    cloudsGp.add(clouds);
}
}

//função de criar os cactos
function createCactos(){
  if(frameCount%100==0){
    cactos = createSprite(width,height-30,10,50);
    cactos.velocityX = -(4+score/100);
    cactos.scale= 0.5;
    cactos.lifetime=width/cactos.velocityX;
    cactosGp.add(cactos);
    cactos.depth =trex.depth;
  
    var sorteioCactos = Math.round(random(1,6)); 
        switch(sorteioCactos) {
          case 1: cactos.addImage(imageCacto1);     
          break;
          case 2: cactos.addImage(imageCacto2);
          break;
          case 3: cactos.addImage(imageCacto3);
          break;
          case 4: cactos.addImage(imageCacto4);
          break;
          case 5: cactos.addImage(imageCacto5);
          break;
          case 6: cactos.addImage(imageCacto6);
              break;
    }
   
  }
  }   
  