const form = document.getElementById('form');
const image = document.getElementById('image');
const result = document.getElementById('result');


    form.addEventListener('submit', (e) => {
        const file = image.files[0];
        if (!file) {
            result.innerHTML = "Please select an image to upload.";
            return;
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.files[0]);

        fetch('https://image-vision-api.onrender.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            result.innerHTML = `
                <div class="mt-4">
                    <h2 class="text-xl font-bold mb-2">Result</h2>
                    <p class="text-gray-800 text-sm">${data.result}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
        })
    })