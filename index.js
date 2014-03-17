var fs = require('fs');

var dict, dictArr, trie = {}, words = [];

function checkNode(root, word, ind) {

	if(!word[ind]) {
		return;
	}

	if(root[word[ind]]) {
		checkNode(root[word[ind]], word, ind+1);
	} else {
		if(!word[ind+1]) {
			root[word[ind]] = {$:true};
		} else {
			root[word[ind]] = {};
			checkNode(root[word[ind]], word, ind+1);
		}
		
	}
}

function buildTrie(data) {
	console.log('build trie');
	console.time('trie');
	var thisWord;

	for (var len = data.length, i = 0; i <= len; i++) {
		if(typeof data[i] !== 'string') {
			continue;
		}
		thisWord = data[i].toUpperCase();
		checkNode(trie, thisWord, 0);

	}
	console.timeEnd('trie');
}

function getRandomLetter() {
	var letter = String.fromCharCode((Math.round(Math.random() * 25)) + 65);
	// if(letter === 'Q') {
		// return 'QU';
	// } else {
		return letter;
	// }
}

function buildBoggle(size) {
	var boggle = [];
	for (var i = 0; i < size; i++) {
		boggle[i] = [];
		for (var j = 0; j < size; j++) {
			boggle[i][j] = getRandomLetter();
		}
	}

	return boggle;

}

var count =0;

function boggleIt(boggle, index) {
	count++;
	var word = '';
	var letter;

	var startLetter = boggle[index[0]][index[1]];

	var root = trie;
	for(var i = 0; i < boggle[index[0]].length; i++) {
		
		letter = boggle[index[0]][index[1] +i];
		
		if(root[letter]) {
			word += letter;
			
			if(root[letter].$ && (word.length > 1 || word === 'A' || word === 'I')) {
				// console.log(word);
				words.push(word);
			} 

			root = root[letter];
		} else {
			return;
		}
	}

}



fs.readFile('dict.txt', {encoding:'utf8'}, function (err, data) {
	var boggle;
	var letter, currentRoot, currentWord;
	if (err) throw err;
	dict = data;
	dictArr = dict.split(/\n/);
	buildTrie(dictArr);
	boggle = buildBoggle(4);
	console.log(boggle);
	// console.log(boggle);
	for (var i = 0; i < boggle.length; i++) {
		// console.log(i);
		for (var j = 0; j < boggle[i].length; j++) {
			// console.log(j);
			boggleIt(boggle, [i,j]);
		}
	}

	console.log(words);
});