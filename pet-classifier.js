// Teachable Machine 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/fwdmF9Gh7/";

let model, webcam, labelContainer, maxPredictions;
let isWebcamRunning = false;

const startBtn = document.getElementById('start-btn');
const stopCameraBtn = document.getElementById('stop-camera-btn');
const loadingMessage = document.getElementById('loading-message');
const imageUpload = document.getElementById('image-upload');
const uploadPreview = document.getElementById('upload-preview');
const webcamContainer = document.getElementById('webcam-container');
const imageContainer = document.getElementById('image-container');
const analysisStatus = document.getElementById('analysis-status');

// 모델 로드 함수 (페이지 로드 시 즉시 실행되도록 개선)
async function loadModel() {
    if (!model) {
        try {
            console.log("Loading model...");
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            
            // 모델 로딩 시작 전 상태 표시
            analysisStatus.style.display = 'block';
            analysisStatus.textContent = "🧠 AI 모델을 불러오는 중입니다...";
            
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            createLabelElements();
            
            console.log("Model loaded successfully.");
            analysisStatus.style.display = 'none'; // 로드 완료 후 숨김
        } catch (error) {
            console.error("Model load failed:", error);
            analysisStatus.style.display = 'block';
            analysisStatus.textContent = "❌ 모델 로딩 실패. 인터넷 연결을 확인하세요.";
        }
    }
}

// 초기 로드 시 모델 미리 불러오기
window.addEventListener('DOMContentLoaded', loadModel);

// 결과 라벨 생성
function createLabelElements() {
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ""; 
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
        
        imageContainer.style.display = 'none';
        webcamContainer.style.display = 'flex';
        webcamContainer.innerHTML = "";
        webcamContainer.appendChild(webcam.canvas);
        
        startBtn.style.display = 'none';
        document.querySelector('.upload-wrapper').style.display = 'none';
        stopCameraBtn.style.display = 'block';
        
        // 상태 표시
        analysisStatus.style.display = 'block';
        analysisStatus.textContent = "⚡ 실시간으로 분석하고 있습니다...";
        
        window.requestAnimationFrame(loop);
    } catch (e) {
        console.error("Webcam setup error:", e);
        loadingMessage.textContent = "카메라 권한을 허용해 주세요.";
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
        loadingMessage.textContent = "여기에 사진을 끌어다 놓거나 아래 버튼을 누르세요!";
        
        startBtn.style.display = 'block';
        document.querySelector('.upload-wrapper').style.display = 'block';
        stopCameraBtn.style.display = 'none';
        analysisStatus.style.display = 'none';
    }
}

async function loop() {
    if (!isWebcamRunning) return;
    webcam.update(); 
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// 이미지 파일 처리 로직 (분석 안정성 극대화)
async function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    // 1. 상태 표시
    analysisStatus.style.display = 'block';
    analysisStatus.textContent = "🔍 AI가 이미지를 분석하고 있습니다...";
    
    const reader = new FileReader();
    reader.onload = (event) => {
        // 미리보기 설정
        uploadPreview.src = event.target.result;
        uploadPreview.style.display = 'block';
        loadingMessage.style.display = 'none';

        // 2. 이미지가 화면에 렌더링된 후 분석 시작 (안정적인 분석을 위해 약간의 지연)
        uploadPreview.onload = async () => {
            if (!model) {
                await loadModel();
            }
            
            try {
                await predict(uploadPreview);
                analysisStatus.textContent = "✅ 분석 완료!";
                
                setTimeout(() => {
                    if (!isWebcamRunning) {
                        analysisStatus.style.display = 'none';
                    }
                }, 3000);
            } catch (err) {
                console.error("Prediction error:", err);
                analysisStatus.textContent = "❌ 분석 중 오류가 발생했습니다.";
            }
        };
    };
    reader.readAsDataURL(file);
}

imageUpload.addEventListener('change', (e) => {
    handleImageFile(e.target.files[0]);
});

imageContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageContainer.classList.add('drag-over');
    analysisStatus.style.display = 'block';
    analysisStatus.textContent = "여기에 사진을 놓으세요!";
});

imageContainer.addEventListener('dragleave', () => {
    imageContainer.classList.remove('drag-over');
    if (!isWebcamRunning) analysisStatus.style.display = 'none';
});

imageContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    imageContainer.classList.remove('drag-over');
    handleImageFile(e.dataTransfer.files[0]);
});

// 판별 실행 (안전한 결과 처리)
async function predict(imageElement) {
    if (!model) return;
    
    const prediction = await model.predict(imageElement);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability.toFixed(2);
        
        const container = labelContainer.childNodes[i];
        if (!container) continue;

        let labelName = classPrediction;
        const lowerName = classPrediction.toLowerCase();
        
        if (lowerName.includes("dog") || lowerName.includes("강아지")) {
            labelName = "🐶 강아지";
        } else if (lowerName.includes("cat") || lowerName.includes("고양이")) {
            labelName = "🐱 고양이";
        }
        
        container.querySelector('.label-name').textContent = labelName;
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
