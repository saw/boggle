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

function boggleIt(boggle, index, word, root, used) {
	// console.log(index);
	

	var v = index[0], h = index[1], thisBoggle;
	if(used[''+v+h]) {
		return;
	} 

	if(boggle[v] && boggle[v][h]) {
		thisBoggle = boggle[v][h];
	} else {
		return;
	}
	
	if(root[thisBoggle]) {
		word += thisBoggle;
		used[''+v+h] = true;
		
		if(root[thisBoggle].$ && word.length >= 3) {
			words.push(word);
		}

		//I admit this is a hacky way to track visited squares, but it works;
		boggleIt(boggle, [v - 1, h], word, root[thisBoggle], JSON.parse(JSON.stringify(used)));
		boggleIt(boggle, [v + 1, h], word, root[thisBoggle], JSON.parse(JSON.stringify(used)));
		boggleIt(boggle, [v, h +1], word, root[thisBoggle], JSON.parse(JSON.stringify(used)));
		boggleIt(boggle, [v, h -1], word, root[thisBoggle], JSON.parse(JSON.stringify(used)));
	}

}





fs.readFile('f2-33.txt', {encoding:'utf8'}, function (err, data) {
	var boggle;
	var letter, currentRoot, currentWord;
	if (err) throw err;
	dict = data ;
	dictArr = dict.split(/\n/);
	buildTrie(dictArr);
	boggle = buildBoggle(4);

	for (var n = 0; n < boggle.length; n++) {
		console.log(boggle[n].join('  '));
	}
	
	console.time('solve');
	for (var i = 0; i < boggle.length; i++) {
		for (var j = 0; j < boggle[i].length; j++) {
			boggleIt(boggle, [i,j], '', trie, {});
		}
	}
	console.timeEnd('solve');

	console.log(words);
});