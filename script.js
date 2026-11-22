
const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ساخت کره سه بعدی
const geometry = new THREE.IcosahedronGeometry(1.7, 2);

const material = new THREE.MeshStandardMaterial({
    color: 0x9333ea,
    wireframe: true,
    transparent: true,
    opacity: 0.35
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// نورها
const light1 = new THREE.PointLight(0xa855f7, 3);
light1.position.set(3, 3, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x38bdf8, 2);
light2.position.set(-4, -3, 3);
scene.add(light2);

// ذرات شناور
const particleGeometry = new THREE.BufferGeometry();

const particleCount = 1200;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
}

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
    color: 0xa855f7,
    size: 0.025,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
);

scene.add(particles);

// حرکت موس
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

// انیمیشن
function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.0015;
    sphere.rotation.y += 0.002;

    sphere.rotation.x += (mouseY * 0.2 - sphere.rotation.x) * 0.005;
    sphere.rotation.y += (mouseX * 0.2 - sphere.rotation.y) * 0.005;

    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0002;

    renderer.render(scene, camera);
}

animate();

// تنظیم اندازه صفحه
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// افکت سه بعدی کارت‌ها با حرکت موس
document.querySelectorAll(".project-card, .skill-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -12;
        const rotateY = ((x / rect.width) - 0.5) * 12;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});
