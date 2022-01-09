'use strict';

/*Pig Game if roll ra 1 thì mất lượt và mất số điểm đã tích trong currentScores nếu số điểm người nào hơn 20 thì thắng*/


var scores, roundScores, activePlayer, gamePlaying, sixDuplicate;
/*
document.querySelector hay còn gọi là DOM Manipulation có thể dùng để Read element trên web page
var x = document.querySelector('#score-1').textContent;
console.log(x);
*/

startGame();

document.querySelector('.btn-roll').addEventListener('click', function() { // anonymous function vì không có tên nên không thể gọi lại
    if(gamePlaying){
        // 1. Random number
        //--- random cho số 0-1 khi này *6 sẽ cho ra từ 0-5 mà muốn xúc sắc từ 1-6 => +1
        var dice = Math.floor(Math.random() *6) + 1; //floor để làm tròn thành interger thay vì thập phân của random;

        // 2. Hiển thị kết quả
        var diceDOM = document.querySelector('.dice'); // để không phải select nhiều lần
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        if(dice === 6){
            sixDuplicate = sixDuplicate + 1;
        }
        // 3. Update roundScores nếu roll ra khác 1 
        if(dice !== 1 && sixDuplicate <= 1){
            roundScores = roundScores + dice;
            document.getElementById('current-'+ activePlayer).textContent = roundScores;
        }else{
            if(dice === 1){
                alert('The Dice is 1!. LOST TURN!');
            }else if(sixDuplicate > 1){
                scores[activePlayer] = 0;
                document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
                alert('Two 6 in a row!. LOST TURN!');
            }
            nextPlayer();
        }
    }

});
console.log();
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer] = scores[activePlayer] + roundScores;
        document.getElementById('current-'+ activePlayer).textContent = roundScores;
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];    
        var input = document.querySelector('.final-scores').value;
        console.log(input);
        var winScores;
        // Undefined, 0, null, "" coerced (ép kiểu) thành false
        // Những cái khác thì ép kiểu thành true
        if(input){ // nếu có input thì winScores là input còn không thì 100
            winScores = input;
        }else{
            winScores = 10;
        }
        // Kiểm tra ai thắng
        if(scores[activePlayer] >= winScores){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-'+ activePlayer).classList.add('player-winner');
            document.querySelector('.player-'+ activePlayer).classList.remove('player-active');
            gamePlaying = false;
        }else{
            // Chuyển player
            nextPlayer();
        }
    }

});

function startGame(){
    gamePlaying = true;
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;    
    sixDuplicate = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0').classList.remove('player-winner');
    document.querySelector('.player-1').classList.remove('player-winner');  
    document.querySelector('.player-0').classList.remove('player-active');
    document.querySelector('.player-1').classList.remove('player-active');
    document.querySelector('.player-0').classList.add('player-active');
}
document.querySelector('.btn-new').addEventListener('click',startGame);

function nextPlayer(){
    sixDuplicate = 0;
    roundScores = 0;
    document.getElementById('current-'+ activePlayer).textContent = roundScores;
    if(activePlayer === 0){
        activePlayer = 1;
    }else if(activePlayer === 1){
        activePlayer = 0;
    }
    document.querySelector('.player-0').classList.toggle('player-active');
    document.querySelector('.player-1').classList.toggle('player-active');
    document.querySelector('.dice').style.display = 'none'; // giấu xúc sắc khi đổi player cho đẹp
}


//--- querySelector cho phép chọn thứ như trong CSS nhưng khác ở chỗ sẽ chọn ele đầu tiên tìm thấy
//document.querySelector('#current-' + activePlayer).textContent = dice; // textContent chỉ display ra text khổng thể display ra HTML
//document.querySelector('#current-' + activePlayer).innerHTML = '<b>' + dice + '</b>'; // display ra text có dạng in đậm

/* 
    Challenges:
    - Nếu roll ra 6 liên tiếp 2 lần thì mất hết scores và mất lượt
    - Thêm chỗ để nhập số điểm tối đa để dành chiến thắng
    - Thêm 1 xúc sắc nữa. Player mất current scores khi khi 1 trong 2 súc xắc roll ra 1
*/

