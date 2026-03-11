// Teachable Machine 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/fwdmF9Gh7/";

let model, webcam, labelContainer, maxPredictions;
let isWebcamRunning = false;

const startBtn = document.getElementById('start-btn');
const stopCameraBtn = document.getElementById('stop-camera-btn');
const themeBtn = document.getElementById('theme-btn');
const loadingMessage = document.getElementById('loading-message');
const imageUpload = document.getElementById('image-upload');
const uploadPreview = document.getElementById('upload-preview');
const webcamContainer = document.getElementById('webcam-container');
const imageContainer = document.getElementById('image-container');

// 테마 변경 로직
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '라이트 모드 켜기';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? '라이트 모드 켜기' : '다크 모드 켜기';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 모델 로드 함수
async function loadModel() {
    if (!model) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        createLabelElements();
    }
}

// 결과 라벨 생성
function createLabelElements() {
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ""; // 기존 내용 삭제
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
}

// 카메라 시작
async function startWebcam() {
    loadingMessage.textContent = "카메라를 준비하는 중...";
    await loadModel();

    const flip = true; 
    webcam = new tmImage.Webcam(400, 400, flip); 
    
    try {
        await webcam.setup(); 
        await webcam.play();
        isWebcamRunning = true;
        
        // 화면 UI 전환
        imageContainer.style.display = 'none';
        webcamContainer.style.display = 'flex';
        webcamContainer.innerHTML = "";
        webcamContainer.appendChild(webcam.canvas);
        
        startBtn.style.display = 'none';
        document.querySelector('.upload-wrapper').style.display = 'none';
        stopCameraBtn.style.display = 'inline-block';
        
        window.requestAnimationFrame(loop);
    } catch (e) {
        console.error(e);
        loadingMessage.textContent = "카메라를 켤 수 없습니다. 권한을 확인해주세요.";
    }
}

// 카메라 종료
function stopWebcam() {
    if (webcam) {
        webcam.stop();
        isWebcamRunning = false;
        
        webcamContainer.style.display = 'none';
        imageContainer.style.display = 'flex';
        uploadPreview.style.display = 'none';
        loadingMessage.style.display = 'block';
        loadingMessage.textContent = "아래 버튼을 눌러 시작해 보세요!";
        
        startBtn.style.display = 'inline-block';
        document.querySelector('.upload-wrapper').style.display = 'inline-block';
        stopCameraBtn.style.display = 'none';
    }
}

async function loop() {
    if (!isWebcamRunning) return;
    webcam.update(); 
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// 이미지 업로드 처리
imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 이미지 미리보기 표시
    const reader = new FileReader();
    reader.onload = async (event) => {
        uploadPreview.src = event.target.result;
        uploadPreview.style.display = 'block';
        loadingMessage.style.display = 'none';
        
        await loadModel();
        // 이미지가 로드된 후 예측 실행
        uploadPreview.onload = async () => {
            await predict(uploadPreview);
        };
    };
    reader.readAsDataURL(file);
});

// 판별 실행
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
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

startBtn.addEventListener('click', startWebcam);
stopCameraBtn.addEventListener('click', stopWebcam);
