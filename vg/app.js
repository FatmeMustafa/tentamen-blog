/***************SHOW & HIDE**************/
$('#myFormID').css('display', 'none');

$('#newPost').on('click', function() {
    $('#myFormID').show();
    $('#albumsContainerID').hide();
    $('#headline').hide();
});

$('#posts').on('click', function() {
    $('#myFormID').hide();
    $('#albumsContainerID').show();
    $('#headline').show();
});

/**************CREATE <DIV>**************/
let albumsContainer = document.createElement('div');
albumsContainer.id = 'albumsContainerID';
document.body.appendChild(albumsContainer); 

/*************FETCH ALBUMS***************/
fetch('https://jsonplaceholder.typicode.com/albums')    
.then(response => {
    console.log(response);                              //AJAX request data
    return response.json();                             //transform data to json
})
.then(albums => {                                       //execute code if fetch succeeds
    console.log(albums);
    addRandomLikes(albums);
    displayAlbums(albums);
})
.catch(error =>                                         //execute code if fetch fails
    console.log(error)
);

/**************FETCH PHOTOS**************/
fetch('https://jsonplaceholder.typicode.com/photos')    
.then(response => {
    return response.json();                       
})
.then(photos => {                            
    console.log(photos);
    displayPhotos(photos);
})
.catch(error =>                                
    console.log(error)
);

/************ADD RANDOM LIKES************/
function addRandomLikes(album) {
    album.forEach(like => {
        like['likes'] = Math.floor(Math.random() * 100);
    });
}

/*************DISPLAY ALBUMS*************/
function displayAlbums(album) {
    let displayAlbum = album.map(curAlbum =>
        `<div id="albums">
            <h3>${curAlbum.title}</h3>
            <span>Likes: ${curAlbum.likes}</span>
            <button class="loadPhotos">Load photos</button>
            <div class="loadedPhotos"></div>
        </div><br>`
    );
    displayAlbum1 = displayAlbum.join("");               //remove comma signs from arrays 
    document.getElementById('albumsContainerID').innerHTML = displayAlbum1;
}

/*************DISPLAY PHOTOS*************/
function displayPhotos(photos) {

    let $loadedPhotosDIV = $('.loadedPhotos');
    let $loadPhotosBTN = $('.loadPhotos');

    for (let i = 0; i < $loadedPhotosDIV.length; i++) { //loop through divs     
        $loadedPhotosDIV.each(function(i) {           
            let $loadedPhotosDIVid = $(this).attr('id', 'photosDiv-' + ++i);   //give each div id="phototDiv-" + number from 1-100
        });
    } 

    for (let i = 0; i < $loadPhotosBTN.length; i++) {   //loop through buttons
        $loadPhotosBTN.each(function(i) {
            let $loadPhotosBTNid = $(this).attr('id', ++i);                     //give each button id="number from 1-100"   
        });

        $loadPhotosBTN[i].onclick = function() {        //execute function when button is clicked
            let selectedBTN = this.id;                  //store id value of selected button
            let findMatch = photos.filter(function(photo) {
                return photo.albumId == selectedBTN;    //filter through all albumId's in photo and return albumId that match selectedBTN id
            });         
        
            let printingPhotos = findMatch.map(photo =>                        //why cant I print directly from filter()?
                `<br>
                <p>Photo Title:  ${photo.title}</p>
                <img src = "${photo.thumbnailUrl}">
                <hr>`
            );
            printingPhotos1 = printingPhotos.join("");
            document.getElementById('photosDiv-' + this.id).innerHTML = printingPhotos1;
        }
    }    
}

/****VALIDATION FUNCTION - CHARACTERS****/
function inputIsShort(input) {
    if (input.length < 5) {                         //if 5 is bigger then input character
        return 'must have at least 5 characters!';
    } else {
        return false;
    }
}

/******VALIDATION FUNCTION - CURSES******/
function inputIsFilthy(input) {
    let curseInputArray = input.split(' ');         //store each word separated by ' ' in curseInputArray 
        for (let curse of curseInputArray) {    
            if (curses.includes(curse)) {       
                return `WATCH YOUR LANGUAGE! >:( no need to use words like ${curse}!!!`
            }
        }            
    return false;
}

/***REGISTER FUNCTIONS IN FORMVALIDATOR***/
FormValidator.registerValidator('noShortInput', inputIsShort);              //call method formvalidator.registerValidator
FormValidator.registerValidator('noFilthyInput', inputIsFilthy);            //method registers validationfunction and its name

/***CONNECT VALIDATIONFUNCTION NAME AND INPUTFIELD***/
FormValidator.connectValidatorToField('noShortInput', 'Title');
FormValidator.connectValidatorToField('noShortInput', 'Content');
FormValidator.connectValidatorToField('noFilthyInput', 'Content');

/*******DISPLAY VALIDATION STATUS********/
$('#myForm').submit(function(){
    $('#status').empty();
    const data = {     
        Title: $('#userTitle').val(),
        Content: $('#userContent').val()
    };
    const errors = FormValidator.validate(data);
    if (errors.length) {
        for (let error of errors) {
            $('#status').append(
                `<p class="error">${error.fieldName}: ${error.errorMsg}</p>`
            )
        }
    } else {
        $('#status').append(
            `<p class="correct">Thank you! :)</p>`
        );
    }
});