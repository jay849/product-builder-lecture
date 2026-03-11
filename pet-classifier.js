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
        
        analysisStatus.style.display = 'inline-block';
        analysisStatus.textContent = "실시간 분석 중...";
        
        window.requestAnimationFrame(loop);
    } catch (e) {
        console.error(e);
        loadingMessage.textContent = "카메라를 켤 수 없습니다.";
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
        loadingMessage.textContent = "사진을 여기로 끌어다 놓으세요";
        
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

// 이미지 파일 처리
async function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        uploadPreview.src = event.target.result;
        uploadPreview.style.display = 'block';
        loadingMessage.style.display = 'none';
        
        analysisStatus.style.display = 'inline-block';
        analysisStatus.textContent = "이미지를 분석하고 있습니다...";
        
        await loadModel();
        uploadPreview.onload = async () => {
            await predict(uploadPreview);
            analysisStatus.textContent = "분석 완료!";
            setTimeout(() => {
                if (!isWebcamRunning) analysisStatus.style.display = 'none';
            }, 3000);
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
});

imageContainer.addEventListener('dragleave', () => {
    imageContainer.classList.remove('drag-over');
});

imageContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    imageContainer.classList.remove('drag-over');
    handleImageFile(e.dataTransfer.files[0]);
});

// 판별 실행
async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        const probability = prediction[i].probability.toFixed(2);
        
        const container = labelContainer.childNodes[i];
        // 이모지 및 한글 명칭 설정
        let labelName = classPrediction;
        if (classPrediction === "Dog") labelName = "🐶 강아지";
        else if (classPrediction === "Cat") labelName = "🐱 고양이";
        
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
