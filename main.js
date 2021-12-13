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
camera.position.setZ(0);

renderer.render( scene,camera );
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0xa7a7c7}); // Grayish blue
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xe75480) // Soft pink
pointLight.position.set(5,5,5)

// To light entire scene

const ambientLight = new THREE.AmbientLight(0xA9A9A9); // Dark gray
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper) //shows position of point light, adds grid to scene

const controls = new THREE.OrbitControls(camera, renderer.domElement);


// populating 'space' with stars!
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24); // sphere geometry with each sphere having radius of 0.30
  const material = new THREE.MeshStandardMaterial( { color: 0xd4fffc}) // Pale cyan
  const star = new THREE.Mesh( geometry, material );


// three js math helpers used
// randomly generating x,y,z position values using array
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) ); // randomly generates number between -100 and +100, used to set position of star
  star.position.set(x,y,z);
  scene.add(star)
}

// 285 stars
Array(285).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('thisonemaybe.jpg');
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
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('reflector.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5,35,35),
  new THREE.MeshStandardMaterial( {
    map: moonTexture, // takes image of moon and wraps around sphere
    normalMap: normalTexture // normal map added gives appearance of depth and reflects light off
  }  )
);
scene.add(moon)
// changing position of moon
moon.position.z = 30;
moon.position.setX(-10);



// changing positions when when user scrolls
function moveCamera(scrollData) {
  console.log("hello"); // for testing
  const t = document.body.getBoundingClientRect().top; // gives dimensions of viewport and distance from top of webpage
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  abdullah.rotation.y += 0.01;
  abdullah.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
// calls function whenever user scrolls
document.body.onscroll = moveCamera
