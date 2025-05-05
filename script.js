document.addEventListener('DOMContentLoaded', () => {
    // Question elements
    const q1Input = document.getElementById('q1');
    const q2Input = document.getElementById('q2');
    const q3Input = document.getElementById('q3');
    const q4Input = document.getElementById('q4'); // New
    const q5Input = document.getElementById('q5'); // New
    const check1 = document.getElementById('check1');
    const check2 = document.getElementById('check2');
    const check3 = document.getElementById('check3');
    const check4 = document.getElementById('check4'); // New
    const check5 = document.getElementById('check5'); // New

    // Result elements
    const resultLinkDiv = document.getElementById('result-link');
    const revealLink = document.getElementById('reveal-link');

    // Audio/Lyrics elements
    const lyricsToggle = document.getElementById('lyrics-toggle');
    const lyricsContent = document.getElementById('lyrics-content');
    // const audioPlayer = document.getElementById('audio-player'); // If needed for controls

    // --- CONFIGURATION ---
    // Replace these with the actual correct answers (case-sensitive for comparison)
    const correctAnswers = {
        q1: "Cupid",
        q2: "Answer2",
        q3: "Answer3",
        q4: "Answer4", // New
        q5: "Answer5"  // New
    };

    // Replace this with the actual link you want to reveal
    const targetUrl = "https://github.com";
    // --- END CONFIGURATION ---

    // --- FUNCTIONS ---
    const checkAnswer = (inputElement, checkElement, correctAnswer) => {
        if (inputElement.value.trim() === correctAnswer) {
            checkElement.style.display = 'inline'; // Show checkmark
            return true;
        } else {
            checkElement.style.display = 'none'; // Hide checkmark
            return false;
        }
    };

    const checkAllAnswers = () => {
        const allCorrect =
            check1.style.display === 'inline' &&
            check2.style.display === 'inline' &&
            check3.style.display === 'inline' &&
            check4.style.display === 'inline' && // New
            check5.style.display === 'inline';   // New

        if (allCorrect) {
            revealLink.href = targetUrl;
            resultLinkDiv.style.display = 'block'; // Show the final link
        } else {
            resultLinkDiv.style.display = 'none'; // Hide the final link
        }
    };

    // --- EVENT LISTENERS ---

    // Lyrics Toggle
    lyricsToggle.addEventListener('click', () => {
        const isHidden = lyricsContent.style.display === 'none';
        lyricsContent.style.display = isHidden ? 'block' : 'none';
    });

    // Hint Toggles
    const hintToggles = document.querySelectorAll('.hint-toggle');
    hintToggles.forEach(button => {
        button.addEventListener('click', () => {
            const hintTargetId = button.getAttribute('data-hint-target');
            const hintContent = document.getElementById(hintTargetId);
            if (hintContent) {
                const isHidden = hintContent.style.display === 'none';
                hintContent.style.display = isHidden ? 'block' : 'none';
            }
        });
    });


    // Input field checks (using 'input' event for real-time checking)
    q1Input.addEventListener('input', () => {
        checkAnswer(q1Input, check1, correctAnswers.q1);
        checkAllAnswers(); // Check if all are correct after this change
    });

    q2Input.addEventListener('input', () => {
        checkAnswer(q2Input, check2, correctAnswers.q2);
        checkAllAnswers();
    });

    q3Input.addEventListener('input', () => {
        checkAnswer(q3Input, check3, correctAnswers.q3);
        checkAllAnswers();
    });

    q4Input.addEventListener('input', () => { // New
        checkAnswer(q4Input, check4, correctAnswers.q4);
        checkAllAnswers();
    });

    q5Input.addEventListener('input', () => { // New
        checkAnswer(q5Input, check5, correctAnswers.q5);
        checkAllAnswers();
    });


    // Initial check in case the browser autofills values (optional)
    // checkAnswer(q1Input, check1, correctAnswers.q1);
    // checkAnswer(q2Input, check2, correctAnswers.q2);
    // checkAnswer(q3Input, check3, correctAnswers.q3);
    // checkAllAnswers();
});
