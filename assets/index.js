let signal     = document.getElementById("signal");
let signal_img = document.getElementById("signal_img");
let noise      = document.getElementById("noise");
let noise_img  = document.getElementById("noise_img");
let calculate  = document.getElementById("calculate");

signal.onchange = (event) => {
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
        signal_img.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
};

noise.onchange = (event) => {
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
        noise_img.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
};

calculate.onclick = () => {

    if (signal_img.src.substr(-1) == "#" || noise_img.src.substr(-1) == "#")
    {
        alert("Please select a signal and noise image");
        return;
    }

    s = tf.browser.fromPixels(signal_img);
    n = tf.browser.fromPixels(noise_img);

    if(s.shape.toString() !== n.shape.toString())
    {
        alert("Images are of not the same size");
        return;
    }   

    let mse = tf.losses.meanSquaredError (s,n).arraySync();
    let psnr = 10*Math.log10((255*255)/mse)
    console.log("MSE  : "+mse+"\n"+"PSNR : "+psnr);
    alert(`PSNR is : ${psnr}`);
};