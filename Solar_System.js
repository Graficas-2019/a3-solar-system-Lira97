var renderer = null,scene = null,camera = null,SolarSystem = null,cube = null,sphereGroup = null,sphere = null,orbitControls = null;
var tmercury = null,tvenus = null,tearth = null,tmars = null,tjupiter = null,tsaturn = null,turanus = null,tneptune = null,tpluto=null;
var jupiter_moons = [10];
var saturn_moons = [10];
var uranus_moons = [10];
var neptune_moons = [10];
var pluto_moons = [5];
var t= 0;
var duration = 5000; // ms
var currentTime = Date.now();
var mercury,venus,earth,moon,mars,jupiter,saturn,uranus,neptune,Pluto,rings,ringsU,earthMoon;
var mercury_group ,venus_group ,earth_group ,mars_group ,jupiter_group ,saturn_group ,uranus_group ,neptune_group ,pluto_group ;
var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();
function animate()
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    tmercury += 0.009;
    tvenus += 0.007;
    tearth += 0.004;
    tmars += 0.002;
    tjupiter += 0.0007;
    tsaturn += 0.002;
    turanus += 0.0009;
    tneptune += 0.0004;
    tpluto += 0.0002;

    sun.rotation.y += angle / 15;

    mercury.rotation.y += angle;
    venus.rotation.y += angle;
    earth_group.rotation.z -= angle;
    mars.rotation.y += angle;
    jupiter_group.rotation.z -= angle;
    saturn_group.rotation.z -= angle;
    uranus_group.rotation.z -= angle;
    neptune_group.rotation.z -= angle;
    pluto_group.rotation.z -= angle;

    earthMoon.rotation.z += angle;

    for (i = 0; i < 10; i++){
        jupiter_moons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
        saturn_moons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
        uranus_moons[i].rotation.z += angle;
    }
    for (i = 0; i < 10; i++){
        neptune_moons[i].rotation.z += angle;
    }
    for (i = 0; i < 5; i++){
        pluto_moons[i].rotation.z += angle;
    }
    
    asteroidBelt.rotation.z += angle/39;
    
    mercury_group.position.x = 48*Math.cos(tmercury) + 0;
    mercury_group.position.y = 43*Math.sin(tmercury) + 0;

    venus_group.position.x = 60*Math.cos(tvenus) + 0;
    venus_group.position.y = 53*Math.sin(tvenus) + 0;

    earth_group.position.x = 71*Math.cos(tearth) + 0;
    earth_group.position.y = 65*Math.sin(tearth) + 0;

    mars_group.position.x = 83*Math.cos(tmars) + 0;
    mars_group.position.y = 76*Math.sin(tmars) + 0;

    jupiter_group.position.x = 117*Math.cos(tjupiter) + 0;
    jupiter_group.position.y = 107*Math.sin(tjupiter) + 0;

    saturn_group.position.x = 135*Math.cos(tsaturn) + 0;
    saturn_group.position.y = 120*Math.sin(tsaturn) + 0;

    uranus_group.position.x = 152*Math.cos(turanus) + 0;
    uranus_group.position.y = 132*Math.sin(turanus) + 0;

    neptune_group.position.x = 172*Math.cos(tneptune) + 0; 
    neptune_group.position.y = 152*Math.sin(tneptune) + 0;

    pluto_group.position.x = 192*Math.cos(tpluto) + 0;
    pluto_group.position.y = 172*Math.sin(tpluto) + 0;
}

function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();

    orbitControls.update();
}

function createScene(canvas)
{
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color
     // Load the background texture
    var texture = THREE.ImageUtils.loadTexture( 'images/space.jpg' );
    var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
                 map: texture
             }));
 
    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;
 
         // Create your background scene
    
         backgroundScene .add(backgroundCamera );
         backgroundScene .add(backgroundMesh );
    // scene.background = new THREE.Color( 0,0,0 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 5, 4000);
    camera.position.set(0, -350, 180);
    scene.add(camera);

    SolarSystem = new THREE.Object3D;
    SolarSystem.position.set(0, 0, 0);

    // Add a directional light to show off the objects
    var light = new THREE.PointLight(0xffffff, 1, 10000 );

    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    var ambientLight = new THREE.AmbientLight(0xffcc00, 0.5);
    scene.add(ambientLight);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    var textureUrl = "images/sun.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var geometry = new THREE.SphereGeometry(38, 32, 32);
    sun = new THREE.Mesh(geometry, material);
    SolarSystem.add( sun );

    mercury_group = new THREE.Object3D;
    venus_group = new THREE.Object3D;
    earth_group = new THREE.Object3D;
    mars_group = new THREE.Object3D;
    jupiter_group = new THREE.Object3D;
    saturn_group = new THREE.Object3D;
    uranus_group = new THREE.Object3D;
    neptune_group = new THREE.Object3D;
    pluto_group = new THREE.Object3D;

    // mercury sphere
    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/mercury.jpg";
    var mercuryBumpUrl = "images/mercurybump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mercury = new THREE.Mesh(geometry, material);
    // venus sphere

    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/venus.jpg";
    var mercuryBumpUrl = "images/venusbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    venus = new THREE.Mesh(geometry, material);

    // Earth sphere
    geometry = new THREE.SphereGeometry(1, 20, 20);
    var earthMapUrl = "images/earth.jpg";
    var earthNormalMapUrl = "images/earthnormal.jpg";
    var earthspecularMapUrl = "images/earthspecular.jpg";
    map = new THREE.TextureLoader().load(earthMapUrl);
    normalMap = new THREE.TextureLoader().load(earthNormalMapUrl);
    specularMap = new THREE.TextureLoader().load(earthspecularMapUrl);
    var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
    earth = new THREE.Mesh(geometry, earth_materials);

    // moon sphere
    var moonSize = getRandomArbitrary(0.1, 0.2);
    moon = new THREE.SphereGeometry(moonSize, 50, 50); 
    map = new THREE.TextureLoader().load("images/moon.jpg");
    earthMoon = new THREE.Mesh(moon, new THREE.MeshPhongMaterial({map:map}));
    var radians = getRandomArbitrary(0, 360) * Math.PI / 2 ;
    earthMoon.position.x = Math.cos(radians)*1.5;
    earthMoon.position.y = Math.sin(radians)*1.5;
    earthMoon.position.z = getRandomArbitrary(-2, 2)

    earth_group.add(earthMoon);
    // mars sphere
    geometry = new THREE.SphereGeometry(2, 20, 20);
    var merctextureUrl = "images/mars.jpg";
    var mercuryBumpUrl = "images/marsbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mars = new THREE.Mesh(geometry, material);
    
    // jupiter sphere

    geometry = new THREE.SphereGeometry(5, 20, 20);
    var textureUrl = "images/jupiter.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    jupiter = new THREE.Mesh(geometry, material);
    createMoons(10, jupiter_moons, jupiter_group);// jupiter moons
    
    // saturn sphere
    geometry = new THREE.SphereGeometry(4, 20, 20);
    var textureUrl = "images/saturn.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    saturn = new THREE.Mesh(geometry, material);
    createMoons(10,  saturn_moons, saturn_group);// saturn moons
    
    // saturn ring 
    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/7.1 - saturn ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    rings = new THREE.Mesh( geometry, saturnMaterials );

    // uranus  
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/uranus.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    uranus = new THREE.Mesh(geometry, material);
    createMoons(10, uranus_moons, uranus_group);// uranus moons
    
    // uranus ring 
    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/8.1 - uranus ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    ringsU = new THREE.Mesh( geometry, saturnMaterials );
    
    // neptune  
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/neptune.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    neptune = new THREE.Mesh(geometry, material);
    createMoons(10, neptune_moons ,neptune_group);// neptune moons

    // pluto  
    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/pluto.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    Pluto = new THREE.Mesh(geometry, material);
    createMoons(5, pluto_moons, pluto_group);// pluto moons

    //rotation all the planet to get the front face
    sun.rotation.x = Math.PI /2;
    mercury.rotation.x = Math.PI /2;
    venus.rotation.x = Math.PI /2;
    earth.rotation.x = Math.PI /2;
    mars.rotation.x = Math.PI /2;
    jupiter.rotation.x = Math.PI /2;
    saturn.rotation.x = Math.PI /2;
    neptune.rotation.x = Math.PI /2;
    uranus.rotation.x = Math.PI /2;
    ringsU.rotation.x = Math.PI /2;
    Pluto.rotation.x = Math.PI /2;
    
    // ellipse of mercury 
    var mercpath = new THREE.EllipseCurve(0,0,48,43,0,  2 * Math.PI,true,0);
    var merpot = mercpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMer = new THREE.Line( geometry, material );
    // ellipse of venus 
    var venpath = new THREE.EllipseCurve(0,0,60,53,0,  2 * Math.PI,false,0);
    var points = venpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseVen = new THREE.Line( geometry, material );
    // ellipse of earth 
    var earthpath = new THREE.EllipseCurve(0,0,71,65,0,  2 * Math.PI,false,0);
    var points = earthpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseEart = new THREE.Line( geometry, material );
    // ellipse of mars 
    var marspath = new THREE.EllipseCurve(0,0,83,76,0,  2 * Math.PI,false,0);
    var points = marspath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMart = new THREE.Line( geometry, material );
    // ellipse of jupiter 
    var juppath = new THREE.EllipseCurve(0,0,117,107,0,  2 * Math.PI,false,0);
    var points = juppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseJup = new THREE.Line( geometry, material );
    // ellipse of saturn 
    var satpath = new THREE.EllipseCurve(0,0,135,120,0,  2 * Math.PI,false,0);
    var points = satpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseSat = new THREE.Line( geometry, material );
    // ellipse of uranus 
    var urapath = new THREE.EllipseCurve(0,0,152,132,0,  2 * Math.PI,false,0);
    var points = urapath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseUrn = new THREE.Line( geometry, material );
    // ellipse of neptune 
    var neppath = new THREE.EllipseCurve(0,0,172,152,0,  2 * Math.PI,false,0);
    var points = neppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseNep = new THREE.Line( geometry, material );
    // ellipse of pluto 
    var plupath = new THREE.EllipseCurve(0,0,192,172,0,  2 * Math.PI,false,0);
    var points = plupath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipsePlu = new THREE.Line( geometry, material );
    
    // Create a group for the sphere
    sphereEllipse = new THREE.Object3D;
    Planets = new THREE.Object3D;

    sphereEllipse.add( ellipseMer );
    sphereEllipse.add( ellipseVen );
    sphereEllipse.add( ellipseEart );
    sphereEllipse.add( ellipseMart );
    sphereEllipse.add( ellipseJup );
    sphereEllipse.add( ellipseSat );
    sphereEllipse.add( ellipseUrn );
    sphereEllipse.add( ellipseNep );
    sphereEllipse.add( ellipsePlu );
    
    mercury_group.add( mercury );
    venus_group.add( venus );
    earth_group.add( earth );
    mars_group.add( mars );
    jupiter_group.add( jupiter );
    saturn_group.add( rings );
    saturn_group.add( saturn );
    uranus_group.add( uranus );
    uranus_group.add( ringsU );
    neptune_group.add( neptune );
    pluto_group.add( Pluto );

    Planets.add( mercury_group );
    Planets.add( venus_group );
    Planets.add( earth_group );
    Planets.add( mars_group );
    Planets.add( jupiter_group );
    Planets.add( saturn_group );
    Planets.add( uranus_group );
    Planets.add( neptune_group );
    Planets.add( pluto_group );

    SolarSystem.add(sphereEllipse);
    SolarSystem.add(Planets);

    asteroidBelt = new THREE.Object3D();
    Planets.add(asteroidBelt);
    // for to create 2000 asteroids
      for(var x=0; x<2000; x++) {
        tneptune += 0.0004;
        // randoms to get the size of the asteroid ,shapes,and position in z and y 
          var asteroidSize = getRandomArbitrary(0.005, 0.5),
              asteroidShape1 = getRandomArbitrary(4, 10),
              asteroidShape2 = getRandomArbitrary(4, 10),
              asteroidPositionZ = getRandomArbitrary(-5, 5);
              asteroidPositionx = getRandomArbitrary(-5, 5);
          var asteroid = new THREE.Mesh( new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),   new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
          asteroid.position.z = asteroidPositionZ;
          var radians = getRandomArbitrary(0, 360) * Math.PI / 2;
          //position in the bell of asteroids 
          asteroid.position.x = Math.cos(radians) * 94+asteroidPositionx;
          asteroid.position.y = Math.sin(radians) * 94+asteroidPositionx;
          asteroidBelt.add(asteroid);
      }

      var mtlLoader = new THREE.MTLLoader();//texture for the death star
      mtlLoader.load("assets/death-star-II.mtl", function(materials){
          
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          
          objLoader.load("assets/death-star-II.obj", function(mesh){//obj for the death star
        
              mesh.traverse(function(node){
                  if( node instanceof THREE.Mesh ){
                      node.castShadow = true;
                      node.receiveShadow = true;
                      node.light = true
                  }
              });
          
              scene.add(mesh);
                mesh.position.set(0, 300, 0);
               mesh.scale.set(.09,.09,.09);
            mesh.rotation.x = Math.PI/2;
        
          });
          
       });

    scene.add( SolarSystem );
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createMoons(num, moons, group)
{

    for (i = 0; i < num; i++)
    {
        //randon size of the moons
        var moonSize = getRandomArbitrary(0.09, 0.2);
        geometry = new THREE.SphereGeometry(moonSize, 50, 50); 
        map = new THREE.TextureLoader().load("images/moon.jpg");
        moon = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map}));
        var radians = getRandomArbitrary(0, 360) * Math.PI / 2 ;
        moon.position.x = Math.cos(radians)*6.5;
        moon.position.y = Math.sin(radians)*6.5;
        moon.position.z = getRandomArbitrary(-2, 2);
        moons[i] = moon;
        group.add(moons[i]);
    }
}