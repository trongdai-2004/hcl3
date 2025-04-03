import { getText } from './chat-bot.js';

let btn_send = document.getElementById('btn-send');
let input_send = document.getElementById('input-send');

function renderMessage(sendMess) {
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
    let chat_body = document.querySelector('.chatbox-detail__body');

    // Thêm tin nhắn người gửi
    chat_body.insertAdjacentHTML('beforeend', `
        <div class="send align-self-end mb-lg-3 p-2 mx-3 mb-2">
            ${sendMess}
            <div class="text-muted" style="font-size: 12px;">${time}</div>
        </div>
    `);

    // Thêm loading message
    let loadingMess = document.createElement('div');
    loadingMess.className = "receive mb-lg-3 p-2 mx-3 mb-2";
    loadingMess.innerHTML = `
        <div class="loadMessage">
            <div class="loadMessage-item"></div>
            <div class="loadMessage-item"></div>
            <div class="loadMessage-item"></div>
        </div>
    `;
    chat_body.appendChild(loadingMess);

    // Cuộn xuống cuối cùng
    chat_body.scrollTop = chat_body.scrollHeight;

    // Gọi API để lấy tin nhắn phản hồi
    getText(sendMess, (receiveMess) => {
        // Xóa loading message trước khi thêm tin nhắn trả lời
        loadingMess.remove();
        
        // Thêm tin nhắn trả lời
        chat_body.insertAdjacentHTML('beforeend', `
            <div class="receive mb-lg-3 p-2 mx-3 mb-2">
            ${receiveMess}
            <div class="text-muted" style="font-size: 12px;">${time}</div>
            </div>
            `);
            
            // Cuộn xuống khi tin nhắn phản hồi được thêm
            chat_body.scrollTop = chat_body.scrollHeight;
    });
}

function sendMessage() {
    let input_value = input_send.value.trim();
    if (input_value !== '') {
        renderMessage(input_value);
        input_send.value = ''; 
    }
}

btn_send.addEventListener('click', sendMessage);

input_send.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


let back_cbmain = document.getElementById('back-cbmain');
let chatbox_main = document.querySelector('.chatbox-main');
let chatbox_detail = document.querySelector('.chatbox-detail');

chatbox_detail.style.display = 'none';

document.querySelector('.list-group-item').addEventListener('click', function () {
    chatbox_main.style.display = 'none';
    chatbox_detail.style.display = 'block';
});

back_cbmain.addEventListener('click', function () {
    chatbox_detail.style.display = 'none';
    chatbox_main.style.display = 'block';
});


// focus vao input 
document.querySelector('.chatbox-detail').onclick = function(){
    document.getElementById('input-send').focus()
}