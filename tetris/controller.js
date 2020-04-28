/*キーボード入力時の処理*/
document.body.onkeydown = function(e) {
  // キーに名前をセット
	var keys = {
		37: 'left',
		39: 'right',
		40: 'down',
		38: 'rotate'
	};

	if ( typeof keys[ e.keyCode ] != 'undefined' ) {
		// セットされたキーの場合はtetris.jsに記述された処理を呼び出す
		keyPress( keys[ e.keyCode ] );
		// 描画処理を行う
		render();
	}
};

// keypress時
function keyPress( key ) {
	switch ( key ) {
		case 'left':
		if ( valid( -1 ) ) {
			--currentX; 
		}
		break;

		case 'right':
		if ( valid( 1 ) ) {
			++currentX;
		}
		break;

		case 'down':
		if ( valid( 0, 1 ) ) {
			++currentY;
		}
		break;

		case 'rotate':
		// 回転
		var rotated = rotate( current );
		if ( valid( 0, 0, rotated ) ) {
			current = rotated;
		}
		break;
	}
}

// 操作ブロックを回す処理
function rotate( current ) {
	var newCurrent = [];
	for ( var y = 0; y < 4; ++y ) {
		newCurrent[ y ] = [];
		for ( var x = 0; x < 4; ++x ) {
			newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
		}
	}
	return newCurrent;
}