
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

//NOTICE ALBUMS.ID IS MATCHED WITH PHOTOS.ALBUMID