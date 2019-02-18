var renderer = null,
scene = null,
camera = null,
SolarSystem = null,
cube = null,
sphereGroup = null,
sphere = null,
orbitControls = null;
var tmercury = null
,tvenus = null,
tearth = null,
tmars = null,
tjupiter = null,
tsaturn = null,
turanus = null,
tneptune = null,
tpluto=null;
var JupyterMoons = [10];
var SaturnMoons = [10];
var UranusMoons = [10];
var NeptuneMoons = [10];
var PlutoMoons = [5];
var t= 0;
var duration = 5000; // ms
var currentTime = Date.now();
var mercury,venus,earth,moon,mars,jupiter,saturn,uranus,neptune,Pluto,rings,ringsU,earthMoon;
var mercury_group ,venus_group ,earth_group ,mars_group ,jupiter_group ,saturn_group ,uranus_group ,neptune_group ,pluto_group ;
var mercpath
var merpot
function animate()
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    tmercury += 0.009;
    tvenus += 0.004;
    tearth += 0.007;
    tmars += 0.002;
    tjupiter += 0.001;
    tsaturn += 0.002;
    turanus += 0.0009;
    tneptune += 0.0004;
    tpluto += 0.0002;

    // SolarSystem.rotation.x += angle;

    // Rotate the cube about its Y axis
    // sun.rotation.y = Math.PI;
    // sun.rotation.x = Math.PI /2;
    sun.rotation.y += angle / 15;
    // Rotate the sphere group about its Y axis

    mercury.rotation.y += angle;
    venus.rotation.y += angle;
    earth.rotation.y += angle;
    mars.rotation.y += angle;
    jupiter.rotation.y += angle;
    saturn.rotation.y += angle;
    uranus.rotation.y += angle;
    neptune.rotation.y += angle;


    earthMoon.rotation.y += angle;
  
    // JupyterMoons.rotation.y += angle;
    // SaturnMoons.rotation.y += angle;
    // UranusMoons.rotation.y += angle;
    // NeptuneMoons.rotation.y += angle;
    // PlutoMoons.rotation.y += angle;
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
    scene.background = new THREE.Color( 0,0,0 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 5, 4000);
    camera.position.set(0, -100, 100);
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


    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/mercury.jpg";
    var mercuryBumpUrl = "images/mercurybump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mercury = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(1, 20, 20);
    var merctextureUrl = "images/venus.jpg";
    var mercuryBumpUrl = "images/venusbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    venus = new THREE.Mesh(geometry, material);

    // Earth
    geometry = new THREE.SphereGeometry(1, 20, 20);
    var earthMapUrl = "images/earth.jpg";
    var earthNormalMapUrl = "images/earthnormal.jpg";
    var earthspecularMapUrl = "images/earthspecular.jpg";
    map = new THREE.TextureLoader().load(earthMapUrl);
    normalMap = new THREE.TextureLoader().load(earthNormalMapUrl);
    specularMap = new THREE.TextureLoader().load(earthspecularMapUrl);
    var earth_materials = new THREE.MeshPhongMaterial({ map: map, normalMap: normalMap, specularMap: specularMap });
    earth = new THREE.Mesh(geometry, earth_materials);

    var moonSize = getRandomArbitrary(0.07, 0.09);
    MoonGeometry = new THREE.SphereGeometry(moonSize, 50, 50); 
    map = new THREE.TextureLoader().load("images/moon.jpg");
    earthMoon = new THREE.Mesh(MoonGeometry, new THREE.MeshPhongMaterial({map:map}));
    var radians = getRandomArbitrary(0, 360) * Math.PI / 2 ;
    earthMoon.position.x = Math.cos(radians)*1.5;
    earthMoon.position.y = Math.sin(radians)*1.5;
    earthMoon.position.z = getRandomArbitrary(-2, 2)

    earth_group.add(earthMoon);

    geometry = new THREE.SphereGeometry(2, 20, 20);
    var merctextureUrl = "images/mars.jpg";
    var mercuryBumpUrl = "images/marsbump.jpg";
    map = new THREE.TextureLoader().load(merctextureUrl);
    bumpMap = new THREE.TextureLoader().load(mercuryBumpUrl);
    var material = new THREE.MeshPhongMaterial({ map: map, bumpMap: bumpMap, bumpScale: 1.5 });
    mars = new THREE.Mesh(geometry, material);

    geometry = new THREE.SphereGeometry(5, 20, 20);
    var textureUrl = "images/jupiter.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    jupiter = new THREE.Mesh(geometry, material);
    createMoons(10, JupyterMoons, jupiter_group);

    geometry = new THREE.SphereGeometry(4, 20, 20);
    var textureUrl = "images/saturn.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    saturn = new THREE.Mesh(geometry, material);
    createMoons(10,  SaturnMoons, saturn_group);

    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/7.1 - saturn ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    rings = new THREE.Mesh( geometry, saturnMaterials );

    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/uranus.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    uranus = new THREE.Mesh(geometry, material);
    createMoons(10, UranusMoons, uranus_group);

    var geometry = new THREE.RingGeometry( 5, 7, 32 );
    var saturnRingsTexture = new THREE.TextureLoader().load("images/8.1 - uranus ring.png");
    var saturnMaterials = new THREE.MeshPhongMaterial({ map: saturnRingsTexture,side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    ringsU = new THREE.Mesh( geometry, saturnMaterials );
    

    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/neptune.png";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    neptune = new THREE.Mesh(geometry, material);
    createMoons(5, NeptuneMoons ,neptune_group);

    geometry = new THREE.SphereGeometry(3, 20, 20);
    var textureUrl = "images/pluto.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    Pluto = new THREE.Mesh(geometry, material);

    createMoons(5, PlutoMoons, pluto_group);

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

    mercpath = new THREE.EllipseCurve(0,0,48,43,0,  2 * Math.PI,true,0);
    var merpot = mercpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMer = new THREE.Line( geometry, material );

    var venpath = new THREE.EllipseCurve(0,0,60,53,0,  2 * Math.PI,false,0);
    var points = venpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseVen = new THREE.Line( geometry, material );

    var earthpath = new THREE.EllipseCurve(0,0,71,65,0,  2 * Math.PI,false,0);
    var points = earthpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseEart = new THREE.Line( geometry, material );

    var marspath = new THREE.EllipseCurve(0,0,83,76,0,  2 * Math.PI,false,0);
    var points = marspath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMart = new THREE.Line( geometry, material );

    var juppath = new THREE.EllipseCurve(0,0,117,107,0,  2 * Math.PI,false,0);
    var points = juppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseJup = new THREE.Line( geometry, material );

    var satpath = new THREE.EllipseCurve(0,0,135,120,0,  2 * Math.PI,false,0);
    var points = satpath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseSat = new THREE.Line( geometry, material );

    var urapath = new THREE.EllipseCurve(0,0,152,132,0,  2 * Math.PI,false,0);
    var points = urapath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseUrn = new THREE.Line( geometry, material );

    var neppath = new THREE.EllipseCurve(0,0,172,152,0,  2 * Math.PI,false,0);
    var points = neppath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseNep = new THREE.Line( geometry, material );

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
      for(var x=0; x<2000; x++) {
        tneptune += 0.0004;
          var asteroidSize = getRandomArbitrary(0.005, 0.5),
              asteroidShape1 = getRandomArbitrary(4, 10),
              asteroidShape2 = getRandomArbitrary(4, 10),
              asteroidPositionZ = getRandomArbitrary(-5, 5);
              asteroidPositionx = getRandomArbitrary(-5, 5);
          var asteroid = new THREE.Mesh( new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),   new THREE.MeshStandardMaterial({color:0xffffff,flatShading: THREE.FlatShading,roughness:9,metalness: 1}));
          asteroid.position.z = asteroidPositionZ;
          var radians = getRandomArbitrary(0, 360) * Math.PI / 2;
          asteroid.position.x = Math.cos(radians) * 94+asteroidPositionx;
          asteroid.position.y = Math.sin(radians) * 94+asteroidPositionx;
          asteroidBelt.add(asteroid);
      }

    scene.add( SolarSystem );
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createMoons(num_moons, moons, group){

    for (i = 0; i < num_moons; i++){
        var moonSize = getRandomArbitrary(0.09, 0.2);
        MoonGeometry = new THREE.SphereGeometry(moonSize, 50, 50); 
        map = new THREE.TextureLoader().load("images/moon.jpg");
        Moonpmesh = new THREE.Mesh(MoonGeometry, new THREE.MeshPhongMaterial({map:map}));
        var radians = getRandomArbitrary(0, 360) * Math.PI / 2 ;
        Moonpmesh.position.x = Math.cos(radians)*6.5;
        Moonpmesh.position.y = Math.sin(radians)*6.5;
        Moonpmesh.position.z = getRandomArbitrary(-2, 2);

        moons[i] = Moonpmesh;

        group.add(moons[i]);
    }
}