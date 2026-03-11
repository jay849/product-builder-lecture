// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/fwdmF9Gh7/";

let model, webcam, labelContainer, maxPredictions;
const startBtn = document.getElementById('start-btn');
const themeBtn = document.getElementById('theme-btn');
const loadingMessage = document.getElementById('loading-message');

// Theme toggle logic
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '라이트 모드';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? '라이트 모드' : '다크 모드';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(400, 400, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        loadingMessage.style.display = 'none';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const labelDiv = document.createElement("div");
            labelDiv.className = "prediction-bar-container";
            labelDiv.innerHTML = `
                <div class="label-name"></div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="label-prob"></div>
            `;
            labelContainer.appendChild(labelDiv);
        }
        
        startBtn.style.display = 'none';
    } catch (error) {
        console.error("Error initializing webcam or model:", error);
        loadingMessage.textContent = "오류가 발생했습니다. 카메라 권한을 확인해주세요.";
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability.toFixed(2);
        
        const container = labelContainer.childNodes[i];
        container.querySelector('.label-name').textContent = classPrediction === "Dog" ? "강아지" : (classPrediction === "Cat" ? "고양이" : classPrediction);
        container.querySelector('.label-prob').textContent = Math.round(probability * 100) + "%";
        container.querySelector('.progress-fill').style.width = (probability * 100) + "%";
        
        if (probability > 0.5) {
            container.classList.add('high-prob');
        } else {
            container.classList.remove('high-prob');
        }
    }
}

startBtn.addEventListener('click', init);
