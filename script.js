document.addEventListener('DOMContentLoaded', () => {
    // Initial Question elements
    const q1Input = document.getElementById('q1');
    const q2Input = document.getElementById('q2');
    const q3Input = document.getElementById('q3');
    const q4Input = document.getElementById('q4');
    // q5Input is removed
    const check1 = document.getElementById('check1');
    const check2 = document.getElementById('check2');
    const check3 = document.getElementById('check3');
    const check4 = document.getElementById('check4');
    // check5 is removed

    // Audio/Lyrics elements
    const lyricsToggle = document.getElementById('lyrics-toggle');
    const lyricsContent = document.getElementById('lyrics-content');

    // Maze elements
    const mazeContainer = document.getElementById('maze-container');
    const mazeIntroDiv = document.getElementById('maze-intro');
    const mazePathDescriptionDiv = document.getElementById('maze-path-description');
    const mazeOptionsDiv = document.getElementById('maze-options');
    const mazeFeedbackDiv = document.getElementById('maze-feedback');
    const mazeFinalRoomDiv = document.getElementById('maze-final-room');
    const allQuestionBlocks = document.querySelectorAll('.question-block');
    const mainQuestionsHeading = document.querySelector('.container > h1'); // "Answer the Questions" heading

    // --- CONFIGURATION FOR INITIAL QUESTIONS ---
    const initialCorrectAnswers = {
        q1: "Cupid",
        q2: "e",
        q3: ["patent", "provisional patent"], // Accept multiple correct answers for q3
        q4: "Shrutie"
        // q5 is removed
    };
    // --- END CONFIGURATION FOR INITIAL QUESTIONS ---

    // --- MAZE DATA STRUCTURE ---
    const mazeData = [
        { // This is the actual final stage now.
            id: 'maze_complete',
            isFinal: true,
            description: 'The figure smiles warmly. "Indeed, it is Shrutie. She poured her heart into this for you." The stars in the room seem to brighten, swirling into a gentle vortex of light. The harp music swells, and you feel a sense of peace and love wash over you. The dream begins to fade, leaving behind the warmth of this carefully crafted journey.<br><br>Congratulations, you have navigated the dream maze!'
        },
        {
            id: 'maze_start_intro',
            isIntro: true,
            description: `You open your eyes inside a world stitched from memory and magic. A sticker glows on the wall, cat-shaped, with a flickering word beneath it: HARVANOS. You’re barefoot, holding a coin, and in the air you hear a soft voice singing… you recognize your own.<br><br>A sign ahead says:<br>✨ To exit the dream, follow the truths hidden in play. ✨`,
            nextStageId: 'path1_doors'
        },
        {
            id: 'path1_doors',
            description: `🌫️ Path 1 – The Shrouded Passage<br>The air grows thick and heavy, your vision is obscured. Shapes loom ahead, indistinct and shifting. You can barely make out where you are or what's lurking in the distance.`,
            options: [
                { text: 'Approach the first hazy shape on the left.', nextStageId: 'wrong_turn_misty', feedback: 'The mist swirls, and you find yourself back where you started, the shapes still indistinct.', correct: false },
                { text: 'Investigate the central, wavering form.', nextStageId: 'wrong_turn_misty', feedback: 'A disorienting pulse emanates from this direction. You stumble back, the passage reforming before you.', correct: false },
                { text: 'Move towards the subtle warmth felt from the rightmost silhouette.', nextStageId: 'path2_coin', correct: true } // This was the "biryani" door
            ],
            isMisty: true // Custom flag to add a CSS class later
        },
        { // Specific wrong turn for misty path to keep the theme
            id: 'wrong_turn_misty',
            isWrongTurn: true,
            // Feedback is provided by the option that leads here
        },
        {
            id: 'path2_coin',
            description: `🛤️ Path 2 – The Video Oracle Chamber<br>Warmth and the comforting aroma of spices lead you into a cozy room. On a pedestal, a screen flickers to life, ready to play a special video message. Watch carefully!<br><br><div id="video-container" style="max-width: 100%; margin-bottom:10px;"><video id="coin-flip-video" width="100%" controls src="bday-vid.mp4"><p>Your browser doesn't support HTML5 video. Here is a <a href="bday-vid.mp4">link to the video</a> instead.</p></video></div><div style="margin-bottom:20px; text-align:left;"><button id="video-transcript-toggle" class="maze-hint-toggle" style="margin-left:0; margin-bottom:5px;">Show/Hide Transcript</button><div id="video-transcript-content" class="maze-hint-content" style="display:none; margin-left:0;"></div></div>In the video, I flip a coin four times. Listen to my script for each flip – does it hint at 'H' for Heads or 'T' for Tails? Enter the four-letter sequence you decode (e.g., HTHT).`,
            inputType: 'text',
            correctAnswer: 'HTHT',
            nextStageId: 'path3_mirror',
            localVideoSrc: 'bday-vid.mp4', // Updated to new filename
            videoTranscript: `“Hope rises when you're sure of the odds. But sometimes... even the sky turns.”<br><br>“There’s talk, always talk — but who listens when the coin tumbles?”<br><br>“Hope was something I held too tightly. It broke before I could let it go.”<br><br>“Tides shift. Time bends. And trust me... the answer’s already there.”`,
            hint: "Listen closely to the words I use around each coin flip. Some words might subtly suggest 'H' or 'T' sounds or concepts."
        },
        {
            id: 'path3_mirror',
            description: '🛤️ Path 3 – The Mirror Room<br>The coin shimmers and dissolves as you make your choice, revealing a new path. You enter a room lined with mirrors. Three reflections of yourself appear, each speaking a word as you approach:<br><br>Reflection on the Left: “Business”<br>Reflection in the Middle (glowing slightly blue): “Music”<br>Reflection on the Right: “Webapps”<br><br>A soft voice echoes: “Only one knows the way forward.”',
            options: [
                { text: 'Approach the "Business" reflection.', nextStageId: 'wrong_turn_general', feedback: 'The reflection smiles politely but offers no passage. "Ambition is good, but not the key here."', correct: false },
                { text: 'Approach the "Music" reflection (glowing blue).', nextStageId: 'path3_dirk_riddle1', correct: true }, // Leads to Dirk Riddle Part 1
                { text: 'Approach the "Webapps" reflection.', nextStageId: 'wrong_turn_general', feedback: 'The reflection shows you lines of code, intricate and complex, but the path remains hidden. "Logic serves, but heart leads."', correct: false }
            ]
        },
        {
            id: 'path3_dirk_riddle1',
            description: `🛤️ Path 3, Investigation – The Interconnected Riddle (Part 1)<br>The musical reflection warps and shifts, pulling you into what feels like a cluttered, yet strangely organized detective's office. A manila folder labeled "CASE FILE: The Unsolvable Truth" lies open on a messy desk. Inside, a typed note reads:<br><br><div class="case-file-riddle">"There’s a sickness that’s twisted the truth,<br>A lie that leaves no trace,<br>A girl who cannot die, yet she’s always in the race.<br>One joins the crew, though they're out of place,<br>But every road leads back to their face."</div><br>Who, or what, is this riddle describing?`,
            inputType: 'text',
            correctAnswer: 'DIRK', // Case-insensitive check
            nextStageId: 'path3_dirk_url_hint',
            hint: "Think of a certain holistic detective known for solving cases where everything is connected, even if it doesn't seem so at first."
        },
        {
            id: 'path3_dirk_url_hint',
            isNarrative: true, // Indicates no input, just text display
            description: `Correct! The answer is indeed <strong>DIRK</strong>.<br><br>As you utter the name, the case file on the desk glows faintly. A new sentence seems to type itself at the bottom of the page:<br><br><p style="text-align: center; font-style: italic; font-size: 1.1em; color: #7a5c58; padding:10px; border: 1px dashed #c0b2a3; background-color: #fdfaf6;">“You’ve found the one who never looks for clues — yet always finds them.<br>He’s the key, but keys don’t open doors... they unlock paths.<br>Try retracing your steps — but take a detour through the obvious.<br>Sometimes, changing direction means changing location.<br>And sometimes, changing a word... means changing a world.”</p><br>The air in the office shimmers. The path forward isn't in this room anymore... it's somewhere else you need to navigate to. The maze on this page is paused.`,
            // No nextStageId here, as the user needs to change the URL manually.
            // The Vigenere cipher will now be Path 4, and completion Path 5, but they are not directly linked from here.
        },
        // The Vigenere cipher and completion stages will remain, but will be effectively unlinked from the main flow on this page.
        // They are kept in case you want to re-integrate them later or for a different puzzle.
        // For now, the maze on index.html ends after path3_dirk_url_hint.
        // The next part of the puzzle is on dirk.html.
        // The Vigenere cipher is now an optional side-quest, not directly in the main path to completion.
        // It can be accessed if you re-link it or if the user finds it.
        {
            id: 'path4_find_key', // Original name restored
            description: `🛤️ Path 4, Part 1 – The Key Word Riddle<br>The musical reflection nods, and the mirror ripples. You step through into a quiet, elegant study. A single, beautifully handwritten note sits on a polished desk. It simply reads:<br><br><p style="text-align: center; font-style: italic; font-size: 1.2em; color: #5c5046;">"Right before the fun starts…"</p><br>What single word, found in your special song, fits this description and will serve as the key?`,
            inputType: 'text',
            correctAnswer: 'GOODBYE',
            nextStageId: 'path4_solve_cipher',
            hint: "I don't even think you need a clue my smart cookiee"
        },
        {
            id: 'path4_solve_cipher', // Original name restored
            description: `Correct! The key is indeed <strong>GOODBYE</strong>.<br><br>As you speak the word, a hidden compartment in the desk slides open. Inside, you find a small, neatly folded slip of paper. It reads:<br><br><div style="font-family: 'Courier New', Courier, monospace; font-size: 1.8em; text-align: center; padding: 15px; border: 1px solid #c0b2a3; background-color: #fdfaf6; margin: 15px auto; letter-spacing: 0.2em; width: fit-content;">Y A W O F</div><br>A new note appears beside it: <i>"With the key <strong>GOODBYE</strong>, use the timeless art of Vigenère to decrypt the sequence above. The single word revealed will open the final door."</i>`,
            inputType: 'text',
            correctAnswer: 'SMILE',
            nextStageId: 'maze_complete', // This would lead to the actual final completion.
            isFinalInput: true, // This is the last input before completing the maze
            hint: [
                "The decryption method is Vigenère.",
                "Remember to align the repeating key 'GOODBYE' under the ciphertext 'YAWOF'. The formula is: Plain = (Cipher_Letter_Value - Key_Letter_Value + 26) % 26.",
                "Numerical values: A=0, B=1, ..., Z=25. For 'Y' (Cipher) and 'G' (Key): (24 - 6 + 26) % 26 = 18, which is 'S'."
            ]
        },
        // Note: 'maze_complete' is now defined at the beginning of mazeData for clarity.
        { // Generic wrong turn, leads back to the previous correct stage
            id: 'wrong_turn_general',
            isWrongTurn: true, // Special flag
            // Feedback is provided by the option that leads here
            // nextStageId will be set dynamically to the previous correct stage
        }
    ];
    let currentMazeStageId = '';
    let previousCorrectStageId = ''; // To return to after a generic wrong turn

    // --- FUNCTIONS ---

    const jumpToMazeStage = (stageId) => {
        // Hide initial questions and any ongoing maze progress
        allQuestionBlocks.forEach(block => block.style.display = 'none');
        if (mainQuestionsHeading) mainQuestionsHeading.style.display = 'none';
        mazeIntroDiv.style.display = 'none'; // Usually hidden by renderMazeStage, but good to be explicit
        
        mazeContainer.style.display = 'block'; // Ensure maze container is visible
        renderMazeStage(stageId); // Directly render the specified stage
    };

    // Initial Questions Logic
    const checkInitialAnswer = (inputElement, checkElement, correctAnswerOrArray) => {
        const userAnswer = inputElement.value.trim().toLowerCase();
        let isCorrect = false;
        if (Array.isArray(correctAnswerOrArray)) {
            isCorrect = correctAnswerOrArray.some(ans => userAnswer === ans.toLowerCase());
        } else {
            isCorrect = (userAnswer === correctAnswerOrArray.toLowerCase());
        }

        if (isCorrect) {
            checkElement.style.display = 'inline';
            return true;
        } else {
            checkElement.style.display = 'none';
            return false;
        }
    };

    const checkAllInitialAnswers = () => {
        const allCorrect =
            check1.style.display === 'inline' &&
            check2.style.display === 'inline' &&
            check3.style.display === 'inline' &&
            check4.style.display === 'inline'; // Only check up to q4

        if (allCorrect) {
            // Hide all question blocks and the main "Answer the Questions" heading
            allQuestionBlocks.forEach(block => block.style.display = 'none');
            if (mainQuestionsHeading) mainQuestionsHeading.style.display = 'none';
            
            // Show "Let the fun begin..." message
            const funBeginsMessage = document.querySelector('.fun-begins-message');
            if (funBeginsMessage) {
                funBeginsMessage.style.display = 'block';
            }

            // Start the maze after a short delay
            setTimeout(() => {
                if (funBeginsMessage) funBeginsMessage.style.display = 'none'; // Hide message
                startMaze();
            }, 2000); // 2-second delay
        }
    };

    // Maze Logic
    const startMaze = () => {
        // Hide initial questions
        allQuestionBlocks.forEach(block => block.style.display = 'none');
        if (mainQuestionsHeading) mainQuestionsHeading.style.display = 'none';

        // Show maze
        mazeContainer.style.display = 'block';
        const introStage = mazeData.find(stage => stage.isIntro);
        if (introStage) {
            mazeIntroDiv.innerHTML = introStage.description;
            mazeIntroDiv.style.display = 'block';
            previousCorrectStageId = introStage.id; // Or the stage it leads to
            currentMazeStageId = introStage.nextStageId;
            renderMazeStage(currentMazeStageId);
        } else {
            console.error("Maze intro stage not found!");
        }
    };

    const renderMazeStage = (stageId) => {
        const stage = mazeData.find(s => s.id === stageId);
        if (!stage) {
            console.error(`Maze stage ${stageId} not found!`);
            return;
        }

        currentMazeStageId = stageId; // Update current stage

        // Clear previous content
        mazePathDescriptionDiv.innerHTML = '';
        mazeOptionsDiv.innerHTML = '';
        mazeFeedbackDiv.style.display = 'none';
        mazeFinalRoomDiv.style.display = 'none';
        if (!stage.isIntro) mazeIntroDiv.style.display = 'none'; // Hide intro after first step

        // Apply .misty-path class if stage.isMisty is true
        if (stage.isMisty) {
            mazePathDescriptionDiv.classList.add('misty-path');
            mazeOptionsDiv.classList.add('misty-path-options'); // To style buttons if needed
        } else {
            mazePathDescriptionDiv.classList.remove('misty-path');
            mazeOptionsDiv.classList.remove('misty-path-options');
        }

        if (stage.isFinal) {
            mazeFinalRoomDiv.innerHTML = stage.description;
            mazeFinalRoomDiv.style.display = 'block';
            return;
        }
        
        if (stage.isWrongTurn) {
            // Feedback was set by the option leading here, now just provide a way back
            // For misty wrong turn, ensure the mist effect is still applied to the feedback text
            if (previousCorrectStageId && mazeData.find(s => s.id === previousCorrectStageId)?.isMisty) {
                 mazePathDescriptionDiv.classList.add('misty-path'); // Re-apply if going back to misty
            }
            mazePathDescriptionDiv.innerHTML = mazeFeedbackDiv.innerHTML; // Show feedback as description
            const backButton = document.createElement('button');
            backButton.textContent = 'Try again';
            backButton.onclick = () => {
                mazeFeedbackDiv.style.display = 'none'; // Clear feedback before going back
                renderMazeStage(previousCorrectStageId);
            };
            mazeOptionsDiv.appendChild(backButton);
            return;
        }

        mazePathDescriptionDiv.innerHTML = stage.description;

        // If the stage has a localVideoSrc, update the video tag
        if (stage.localVideoSrc && stage.localVideoSrc !== 'YOUR_LOCAL_VIDEO_FILENAME_HERE') {
            const videoElement = mazePathDescriptionDiv.querySelector('#coin-flip-video');
            if (videoElement) {
                videoElement.src = stage.localVideoSrc;
                const videoLink = videoElement.querySelector('a'); // Fallback link
                if (videoLink) videoLink.href = stage.localVideoSrc;
            }
        } else if (stage.localVideoSrc === 'YOUR_LOCAL_VIDEO_FILENAME_HERE' && stage.id === 'path2_coin') { // Only show placeholder if it's the video stage and not configured
            const videoContainer = mazePathDescriptionDiv.querySelector('#video-container');
            if (videoContainer) {
                 videoContainer.innerHTML = "<p style='text-align:center; color:#888; padding: 20px;'>Video will appear here once configured with the filename.</p>";
            }
        }

        // Handle video transcript toggle for path2_coin
        if (stage.id === 'path2_coin' && stage.videoTranscript) {
            const transcriptToggleBtn = mazePathDescriptionDiv.querySelector('#video-transcript-toggle');
            const transcriptContentDiv = mazePathDescriptionDiv.querySelector('#video-transcript-content');
            if (transcriptToggleBtn && transcriptContentDiv) {
                transcriptContentDiv.innerHTML = stage.videoTranscript.replace(/<br><br>/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>'); // Wrap lines in <p> for better spacing
                transcriptToggleBtn.onclick = () => {
                    const isHidden = transcriptContentDiv.style.display === 'none';
                    transcriptContentDiv.style.display = isHidden ? 'block' : 'none';
                    transcriptToggleBtn.textContent = isHidden ? 'Hide Transcript' : 'Show Transcript';
                };
            }
        }


        if (stage.options) {
            stage.options.forEach(option => {
                const button = document.createElement('button');
                button.innerHTML = option.text; // Use innerHTML for potential styling like (glowing blue)
                if (option.text.includes("glowing slightly blue")) { // Basic way to style specific option
                    button.style.boxShadow = "0 0 10px lightblue, 0 0 5px blue";
                }
                button.onclick = () => {
                    mazeFeedbackDiv.style.display = 'none'; // Clear old feedback
                    if (option.correct) {
                        previousCorrectStageId = stage.id; // Current stage becomes previous correct
                        renderMazeStage(option.nextStageId);
                    } else {
                        mazeFeedbackDiv.innerHTML = option.feedback || "That doesn't seem right. Try again.";
                        mazeFeedbackDiv.style.display = 'block';
                        if (option.nextStageId === 'wrong_turn_general') {
                            previousCorrectStageId = stage.id;
                            renderMazeStage(option.nextStageId);
                        }
                    }
                };
                mazeOptionsDiv.appendChild(button);
            });
        }

        if (stage.inputType === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type your answer here';
            input.id = 'maze-answer-input';
            mazeOptionsDiv.appendChild(input);

            // Add hint for text input stages if available
            if (stage.hint) {
                const hintContainer = document.createElement('div'); // To hold button and content
                hintContainer.style.marginBottom = "15px"; // Add some space below the hint area
                
                const hintButton = document.createElement('button');
                hintButton.classList.add('maze-hint-toggle');
                
                const hintContentDiv = document.createElement('div');
                hintContentDiv.classList.add('maze-hint-content');
                hintContentDiv.style.display = 'none'; // Initially hidden
                hintContentDiv.style.marginTop = "5px"; // Space between button and hint text

                let currentHintIndex = 0;
                const hints = Array.isArray(stage.hint) ? stage.hint : [stage.hint]; // Ensure hints is an array

                const showNextHint = () => {
                    if (currentHintIndex < hints.length) {
                        const p = document.createElement('p');
                        // For tiered hints, add a "Hint X:" prefix. For single string hints, just show the hint.
                        const hintPrefix = Array.isArray(stage.hint) ? `<strong>Hint ${currentHintIndex + 1}:</strong> ` : "";
                        p.innerHTML = `${hintPrefix}${hints[currentHintIndex]}`;
                        p.style.marginBottom = "5px"; // Space between hints if multiple are shown
                        hintContentDiv.appendChild(p); // Append new hint, don't clear old ones for tiered
                        hintContentDiv.style.display = 'block';
                        currentHintIndex++;
                        if (currentHintIndex < hints.length) {
                            hintButton.innerHTML = `Show Hint ${currentHintIndex + 1} &#128161;`;
                        } else {
                            hintButton.innerHTML = 'All Hints Shown &#128161;';
                            hintButton.disabled = true;
                        }
                    }
                };
                
                // Initial button text
                if (Array.isArray(stage.hint) && hints.length > 0) {
                    hintButton.innerHTML = `Show Hint ${currentHintIndex + 1} &#128161;`;
                } else if (typeof stage.hint === 'string' && stage.hint.trim() !== '') {
                     hintButton.innerHTML = `Show Hint &#128161;`;
                } else { // No hint or empty hint
                    hintButton.style.display = 'none'; // Hide button if no hint
                }

                hintButton.onclick = showNextHint;

                hintContainer.appendChild(hintButton);
                hintContainer.appendChild(hintContentDiv);
                mazeOptionsDiv.insertBefore(hintContainer, input); // Insert container before input
            }

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Answer';
            submitButton.classList.add('submit-maze-answer');
            submitButton.onclick = () => {
                const userAnswer = input.value.trim();
                if (userAnswer.toLowerCase() === stage.correctAnswer.toLowerCase()) {
                    mazeFeedbackDiv.style.display = 'none';
                    if (stage.isFinalInput) previousCorrectStageId = stage.id; // Mark this as a correct step
                    renderMazeStage(stage.nextStageId);
                } else {
                    mazeFeedbackDiv.innerHTML = 'That name doesn’t feel right to the dreamer... Try again.';
                    mazeFeedbackDiv.style.display = 'block';
                }
            };
            mazeOptionsDiv.appendChild(submitButton);
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent default form submission if any
                    submitButton.click();
                }
            });
        }
    };


    // --- EVENT LISTENERS ---

    // Lyrics Toggle
    lyricsToggle.addEventListener('click', () => {
        const isHidden = lyricsContent.style.display === 'none';
        lyricsContent.style.display = isHidden ? 'block' : 'none';
    });

    // Hint Toggles for initial questions
    const hintToggles = document.querySelectorAll('.hint-toggle');
    hintToggles.forEach(button => {
        button.addEventListener('click', () => {
            const hintTargetId = button.getAttribute('data-hint-target');
            const hintContentElement = document.getElementById(hintTargetId);
            if (hintContentElement) {
                const isHidden = hintContentElement.style.display === 'none';
                hintContentElement.style.display = isHidden ? 'block' : 'none';
            }
        });
    });

    // Input field checks for initial questions
    q1Input.addEventListener('input', () => { checkInitialAnswer(q1Input, check1, initialCorrectAnswers.q1); checkAllInitialAnswers(); });
    q2Input.addEventListener('input', () => { checkInitialAnswer(q2Input, check2, initialCorrectAnswers.q2); checkAllInitialAnswers(); });
    q3Input.addEventListener('input', () => { checkInitialAnswer(q3Input, check3, initialCorrectAnswers.q3); checkAllInitialAnswers(); });
    q4Input.addEventListener('input', () => { checkInitialAnswer(q4Input, check4, initialCorrectAnswers.q4); checkAllInitialAnswers(); });
    // q5 event listener removed

    // Check for URL hash on page load
    if (window.location.hash === '#path4_find_key') {
        jumpToMazeStage('path4_find_key');
    } else if (window.location.hash === '#final_revelation') { // Keep old one just in case, or remove if not needed
        jumpToMazeStage('maze_complete');
    }
    // If no specific hash, the page loads normally with initial questions.
});
