// script.js

// Get the quiz questions from the selected file
if (document.getElementById('question')) {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');

    fetch(`json_files/${fileName}`)
        .then(response => response.json())
        .then(data => {
            let currentQuestionIndex = 0;

            function loadQuestion() {
                const questionData = data[currentQuestionIndex];
                const correctAnswer = questionData['Correct Answer']; // Store the correct answer
                document.getElementById('question').textContent = questionData.Question;

                const optionsDiv = document.getElementById('options');
                optionsDiv.innerHTML = ''; // Clear previous options

                // Add options as buttons
                for (let i = 1; i <= 5; i++) {
                    const option = questionData[`Option ${i}`];
                    if (option) addButton(option, correctAnswer); // Pass the correct answer
                }

                document.getElementById('result').textContent = '';
                document.getElementById('next-btn').style.display = 'none'; // Hide next button
            }

            function addButton(option, correctAnswer) {
                const button = document.createElement('button');
                button.textContent = option;
                button.className = 'option-button';
                button.onclick = () => checkAnswer(option, correctAnswer, button); // Pass the correct answer
                document.getElementById('options').appendChild(button);
            }

            function checkAnswer(selectedOption, correctAnswer, selectedButton) {
                const resultDiv = document.getElementById('result');

                // Check the answer
                if (selectedOption === correctAnswer) {
                    resultDiv.textContent = 'Correct!';
                    selectedButton.classList.add('correct'); // Highlight selected correct button
                } else {
                    resultDiv.textContent = 'Wrong answer. Try again!';
                    selectedButton.classList.add('wrong'); // Highlight selected wrong button
                }

                // Disable all buttons after selection
                const buttons = document.querySelectorAll('.option-button');
                buttons.forEach(button => {
                    button.disabled = true; // Disable all buttons
                    if (button.textContent === correctAnswer) {
                        button.classList.add('correct'); // Highlight correct answer
                    }
                });

                document.getElementById('next-btn').style.display = 'block'; // Show next button
            }

            document.getElementById('next-btn').onclick = () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < data.length) {
                    loadQuestion();
                } else {
                    document.getElementById('result').innerHTML = 'Quiz completed!';
                    document.getElementById('question').style.display = 'none';
                    document.getElementById('options').style.display = 'none';
                    document.getElementById('next-btn').style.display = 'none';
                }
            };

            loadQuestion(); // Load the first question
        })
        .catch(error => {
            console.error('Error fetching quiz data:', error);
        });
}
