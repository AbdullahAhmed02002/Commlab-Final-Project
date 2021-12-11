// objects needed: scene, camera, renderer
// scene holds objects, cameras, lights

const scene = new THREE.Scene();

// Perspective Camera: Human eye perspective
// First arg: field of view, second arg: aspect ratio, third & fourth arg: view frustum
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  // element to use is canvas
  canvas: document.querySelector('#bg'),
});


// Setting pixel ratio to window device pixel ratio
// makes canvas full screen by renderer size = window size
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// Moving camera from middle of scene to z-axis*/
camera.position.setZ(30);

renderer.render( scene,camera );
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

// To light entire scene

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper) //shows position of point light, adds grid to scene

const controls = new THREE.OrbitControls(camera, renderer.domElement);



// populating 'space' with stars! :)
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24); // sphere geometry
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

// randomly generating x,y,z position values using array
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) ); // randomly generates number between -100 and +100, used to set position of star
  star.position.set(x,y,z);
  scene.add(star)
}

// 180 stars
Array(100).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('/NightSky.jpg');
scene.background = spaceTexture;


// recursive function making infinite loop to call render method
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();

  renderer.render(scene,camera);
}

animate()








// My Avatar
const abdullahTexture = new THREE.TextureLoader().load('Myself.jpg');

const abdullah = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: abdullahTexture})
);
scene.add(abdullah)




// The Moon
const moonTexture= new THREE.TextureLoader().load('Moon_Website.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture, // wraps image around sphere
  } )
);
scene.add(moon)
