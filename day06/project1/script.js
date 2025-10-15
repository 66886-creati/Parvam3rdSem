const likeButton=document.querySelector('.like-btn');
const unlikeButton=document.querySelector('.unlike-btn');

const likeCount=document.querySelector('.like-count');

let likes=0;
likeButton.addEventListener('click', () => {
    console.log('Like button clicked');

    likes++;
    likeCount.innerHTML=`${likes} Like`;

});

unlikeButton.addEventListener('click',() => {
    console.log('unlike button clicked');

    if (likes > 0 ) 
        likes--;
        
    likeCount.innerHTML=`${likes} Like`;
});