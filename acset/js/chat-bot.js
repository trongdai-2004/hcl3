async function generateByAPI(prompt) {
    const apiKey = 'AIzaSyAIPPPqQYbxzpFA-kAwcY1d6jFdSQQ-SeE';
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    
    try {
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": [{
                    "parts": [{
                        "text": prompt + 'bạn là bot trả lời về món ăn vặt,trả lời ngắn gọn,nhưng lịch sự'
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
   
    } catch (error) {
        return error.message
    }
}


export async function getText(prompt,callback) {
    // dùng với APIkey 
    const result = await generateByAPI(prompt)
    callback(result)

    // setTimeout(() => {
    //     callback('Chào bạn hôm nay bạn thế nào!')
    // }, 1000);
    
}


