fetch('json_files')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const fileLinks = htmlDoc.querySelectorAll('a');
        const quizList = document.getElementById('quiz-list');

        fileLinks.forEach(link => {
            const fileName = link.textContent;
            if (fileName.endsWith('.json')) {
                const button = document.createElement('button');
                button.textContent = fileName.replace('.json', '');
                button.onclick = () => window.location.href = `quiz.html?file=${fileName}`;
                quizList.appendChild(button);
            }
        });
    })
    .catch(error => console.error('Error fetching file list:', error));
