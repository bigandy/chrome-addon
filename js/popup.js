let changeColor = document.getElementById('changeColor');

console.log('hello world!');

chrome.storage.sync.get('color', function(data) {
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
	// console.log(element);

	// let color = element.target.value;

	chrome.tabs.executeScript(
		{
			code: `var paragraphs = document.querySelectorAll('p');

paragraphs.forEach(p => {
	var arr = p.innerHTML.split('');
	var count = 0;

	var result = arr.map((letter, index) => {
		if (letter !== '') {
			if (count >= 7) {
				count = 0;
			}
			count++;
			return '<span class="letter--' + count + '">' + letter + '</span>';
		} else {
			return letter;
		}
	}).join('');

	p.innerHTML = result;

});`
		}
	);

	var css = `
	.letter--1 {
  color: red;
}
.letter--2 {
  color: orange;
}
.letter--3 {
  color: yellow;
}
.letter--4 {
  color: green;
}
.letter--5 {
  color: blue;
}
.letter--6 {
  color: indigo;
}
.letter--7 {
  color: violet;
}

	`;

	chrome.tabs.insertCSS({
		code: css
	}, function() {
      if (chrome.runtime.lastError) {
        // message.innerText = 'Not allowed to inject CSS into special page.';
		console.log('thing error');
      } else {
        // message.innerText = 'Injected style!';
		console.log('thing not error');
      }
    })
};

