if ('serviceWorker'in navigator){
    navigator.serviceWorker
    .register('static/js/service-worker.js')
    .then(function(registration){
        console.log('service worker registered');
        return registration;
    })
    .catch(function(err){
        console.log('unable to register service worker',err);
    });
}

//A2HS 
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none'

window.addEventListener('beforeinstallprompt',(e) =>{
    e.preventDefault();

    deferredPrompt =e;

    addBtn.style.display = 'block';

    addBtn.addEventListener('click',(e)=>{
        addBtn.style.display = 'none';

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult)=>{
            if(choiceResult.outcome =="accepted"){
                console.log('user accepted the A2HS Prompt');
            }
            else{
                console.log('user dismissed the A2HS Prompt');
            }
            deferredPrompt = null;

    });
});
});

//offline

window.addEventListener('online',function(e){
    console.log("your are now online");
    hideOfflineWarning();
},false);


window.addEventListener('offline',function(e){
    console.log("You are Offline");
    showofflineWarning();
},false);

if (navigator.onLine){
    hideOfflineWarning();
}
else{
    showofflineWarning();
}

function showofflineWarning(){
    document.querySelector('.offline-notification').classList.add('show');
}
function hideofflineWarning(){
    document.querySelector('.offline-notification').classList.remove('show');
}