var fs = require('fs');

var dict, dictArr, trie = {}, words = [];

var thisWord = '', root;

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

function boggleIt(boggle, index, word, root) {
	// console.log(index);
	console.log('word', word);

	var v = index[0], h = index[1], thisBoggle;

	if(boggle[v] && boggle[v][h]) {
		thisBoggle = boggle[v][h];
		console.log(boggle[v][h]);
	} else {
		return;
	}
	
	if(root[thisBoggle]) {
		word += thisBoggle;
		
		if(root[thisBoggle].$ && word.length > 3) {
			words.push(word);
		}
		boggleIt(boggle, [v - 1, h], word, root[thisBoggle]);
		boggleIt(boggle, [v + 1, h], word, root[thisBoggle]);
		boggleIt(boggle, [v, h +1], word, root[thisBoggle]);
		boggleIt(boggle, [v, h -1], word, root[thisBoggle]);
	}

}





fs.readFile('f2-33.txt', {encoding:'utf8'}, function (err, data) {
	var boggle;
	var letter, currentRoot, currentWord;
	if (err) throw err;
	dict = data ;
	dictArr = dict.split(/\n/);
	buildTrie(dictArr);
	// boggle = buildBoggle(4);
	boggle = [
		['H', 'E', 'A', 'T'],
		['A','B','C','D'],
		['X','S','E','U'],
		['A','C', 'V','E']
	];
	console.log(boggle);
	// console.log(boggle);
	for (var i = 0; i < boggle.length; i++) {
		// console.log(i);
		for (var j = 0; j < boggle[i].length; j++) {
			boggleIt(boggle, [i,j], '', trie);
		}
	}

	console.log(words);
});