const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const context = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth -canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        context.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    // damit der Cursor dort malt wo er gerade ist
    const rect = canvas.getBoundingClientRect();

    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

    context.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    isPainting = true;
    startX = e.clientX - rect.left;
    startY = e.clientY;

    context.beginPath();
    context.movetTo(startX, startY);
})

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    context.stroke();
    context.beginPath();
})

canvas.addEventListener('mousemove', draw);